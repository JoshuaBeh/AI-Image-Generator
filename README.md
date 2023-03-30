# AI Image Generator

A full-stack web application built with JavaScript, React, Node.js. It allows
users to create images with the [DALL.E 2 API](https://openai.com/product/dall-e-2), view the recently generated images,
and view the most liked images.

[Link to App](https://ai-image-generator2.herokuapp.com/)

## Features and Technologies

* Implemented OpenAI's DALLE.2 API, to allow the creation of AI generated images.
* Made use of Hash Routing to dynamically swap the content the user sees.
* Assembled a database in PostgreSQL and a server in Node.js to store and manipulate data, allowing users to sign in, browse images, save images, and like images.
* Implemented user authentication and authorization using JSON Web Tokens and Argon2 password hashing.

## User can create an AI generated image
![generate](https://user-images.githubusercontent.com/113414352/227803882-2b6dd43a-6f15-41ef-a109-dc6a89754983.gif)
## User can like an image
![Like an image](https://user-images.githubusercontent.com/113414352/227803897-77f22fa1-e5b2-4de9-81eb-87be1e572661.gif)
## User can sign in
![signup](https://user-images.githubusercontent.com/113414352/227804145-a430463d-5688-4277-93e0-9f523a75d0a4.gif)
## User can view all images and top images
![topall6](https://user-images.githubusercontent.com/113414352/227804859-483d8e80-0167-4d8b-baa3-d43539a204f8.gif)

## Running AI Image Generator on your local machine

* System Requirements
..* Node.js
..* PostgreSQL
..* Git

1. Install Dependencies
..* Make sure you have Node.js installed on your machine.
..* Clone the repository from GitHub `https://github.com/JoshuaBeh/AI-Image-Generator.git`.
..* Navigate to the cloned repository and run `npm install` to install all dependencies.
2. OpenAI Account
..* Sign up for an account at (https://openai.com/product).
..* Navigate to your profile to access your API key.
3. AWS Account
..* Sign up for an account at (https://aws.amazon.com/).
..* Create a new S3 bucket and a new user for the bucket.
..* The bucket name, region, and key ID are needed within the `.env` file.
4. Configuration Files
..* Create a new file called `.env` at the root of the repository.
..* Copy the contents of the `.env.example` file into the new `.env` file.
..* Replace the placeholder values in the `.env` file with your own configuration settings.
