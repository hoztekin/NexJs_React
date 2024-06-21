This project is still being developed — PRs, Contributions and Issues are all welcome!

Getting started
To get the Node server running locally:

Clone this repo
npm install to install all required dependencies
Create MongoDb Cluster and Get Connection MongoDb URI
Set environment variables in config.env under ./config/env
Set MONGO_URI = <YOUR_MONGO_URI>
for client npm run dev to start the local server
for api npm start to start local server

Code Overview
Dependencies
expressjs - The server for handling and routing HTTP requests
mongoose - For modeling and mapping MongoDB data to JavaScript
bcryptjs - Hashing Password
dotenv - Zero-Dependency module that loads environment variables
tailwindcss - css library
antdesign - template
antdesign/chart - chart
reduxjs/toolkit - management
multer - Node.js middleware for uploading files
react 18
react-to-print - export to print
react-router-dom - navigation
