# DatabaseSearch

## Description

Page that shows the MongoDB databases that are in your PC, with their collections and documents.
You can create new documents, update, or delete them.

Also, there's a konami code that will activate a little surprise (up, up, down, down, left, right, left, right, b, a)

This is the option 1B. Basic requirements, deployment, create-update-delete before Saturday - 8AM.

## Demo

-   [You can check the app here](https://mongodb-search.herokuapp.com)

## How to run locally

You will need node.js and Mongodb installed in your machine. You will also need Mongodb running in the background.

After cloning the repository, use

    yarn install

to install all the project dependencies.

I used env variables, so you will need to create a .env file in the root of the project. This project runs locally, so create the variables DB_HOST and DB_PORT that suits to your mongo configuration. Also, you can select a MongoDB Atlas database, in that case, you will need to create another env variable called MONGO_DB_ATLAS and assign the source of your db. You will need to change the file /db/MongoUtils.js in order to select your local or atlas db.

After that, you can run the server with

    yarn start

And the server will deploy in localhost:3000

## Authors

-   **Luis Ruiz** - [Larruibo](https://github.com/larruibo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
