insert into "Users" ("username", "hashedPassword")
  values ('RandomUser1', 'password1234');

insert into "Images" ("userId", "src", "prompt")
  values (1, 'something.jpg', 'man on the moon');

insert into "Liked_Image"("imageId", "userId")
  SELECT "imageId", "userId"
    from "Images"
      where "imageId" = 1 and "userId" = 1;
