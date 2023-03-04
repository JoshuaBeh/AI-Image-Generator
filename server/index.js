require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const routes = require('./routes/openaiRoutes');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(express.json());
app.use(staticMiddleware);
app.use('/openai', routes);

app.get('/images', (req, res, next) => {
  const sql = `
    select *
    from "Images"
    order by "imageId" desc
  `;

  db.query(sql)
    .then(result => {
      const data = result.rows;
      res.json(data);
    })
    .catch(error => {
      next(error);
    });
});

app.post('/images', (req, res, next) => {
  const { userId, src, prompt } = req.body;
  const sql = `
    insert into "Images" ("userId", "src", "prompt")
    values ($1, $2, $3)
    returning *
  `;
  const params = [userId, src, prompt];
  db.query(sql, params)
    .then(result => {
      const [data] = result.rows;
      res.status(201).json(data);
    })
    .catch(error => {
      next(error);
    });
});

app.get('/images/:imageId', (req, res, next) => {
  const imageId = Number(req.params.imageId);
  if (!imageId) {
    throw new ClientError(400, 'imageId must be a positive integer');
  }
  const sql = `
    select "imageId",
           "userId",
           "src",
           "prompt"
      from "Images"
     where "imageId" = $1
  `;
  const params = [imageId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with imageId ${imageId}`);
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(error => next(error));
});

app.post('/images/likedImage', (req, res, next) => {
  const { imageId, userId } = req.body;
  if (!imageId || !userId) {
    throw new ClientError(400, 'imageId and userId must be positive integers');
  }
  const sql = `
    insert into "Liked_Image" ("imageId", "userId")
      values ($1, $2)
  `;
  const params = [imageId, userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(error => next(error));
});

app.delete('/images/likedImage', (req, res, next) => {
  const { imageId, userId } = req.body;
  if (!imageId || !userId) {
    throw new ClientError(400, 'imageId and userId must be positive integers');
  }
  const sql = `
    delete from "Liked_Image"
          where "imageId" = $1 and "userId" = $2
  `;
  const params = [imageId, userId];
  db.query(sql, params)
    .then(result => {
      res.status(204).json(result.rows[0]);
    })
    .catch(error => next(error));
});

app.get('/images/:imageId/likedImage', (req, res, next) => {
  const sql = `
    select *
      from "Liked_Image"
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => next(error));
});

app.get('/images/mylikes/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'imageId must be a positive integer');
  }
  const sql = `
    select "src",
           "prompt",
           "Images"."userId",
           "Images"."imageId"
      from "Images"
      join "Liked_Image" using ("imageId")
     where "Liked_Image"."userId" = $1
     order by id desc;
  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => next(error));
});

app.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "Users" ("username", "hashedPassword")
        values ($1, $2)
        returning *
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "Users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
