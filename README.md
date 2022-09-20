# Fruitmark
Fullstack mobile application created with React Native and NodeJs

### Installation of dev environtment

In order to test the app and go through the React Native Application 

- Clone the React Native project

`$ git clone https://github.com/Doniben/Fruitmark.git`

You got frontend and backend environtments.

#### Frontend React Native Application

Go inside the folder `./fruitmarkRNFront` by
`$ cd fruitmarkRNFront`

install dependencies by:
`$ npm install`

In order to launch the application with an Android virtual device, install Android Studio and any virtual device. Same if you prefer to launch an iOs device with Xcode on mac.

Launch the application:
`$ npm start`

and press "a" if you want to run an android device or "i" if you want to run and iOs device.

The application is connected to an API Deployed in Vercel and Railway.

If you want to run the backend in localhost, change the Base URL in the file './assets/common/baseURL.js' to your IP.
Note: It must to be your local IP, not the localhost. Look the example in line 11 from the file baseURL.js 

#### Backend NodeJs API

- Go to the folder `fruitmarkBackend`
- Ask to Doniben for the .env file. It contains global variables with API url, connection to the database hosted on Mongo Atlas, the port and a secret key to access the jwt when login.
- Install dependencies:
`$ npm install`
- Run the API:
`$ npm start`