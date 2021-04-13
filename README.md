# Base Node.js
this is an Base Node.js project.

# programming language?
- JavaScript

# Are you using an API system?
- Yes, as we use REST APIs


## App Versions
- Node => 10.14.14
- mongoose => 5.4.7
- mongodb => 3.1.10

## Project Structure
├── config                          # Handle all the Permissions, Resources, Roles, enum values in the system
│   ├── auth                        # Handle all the Permissions, Resources, Roles in the system
│   │   ├── authorization.js        # Contains all the Permissions for each user role
│   │   ├── resource_name.js        # Contains all the Resources that a user can do actions on
│   │   └── role.js                 # Contains all the Roles in the system
│   ├── constants                   # Handle all the enum values in the system like
│   │   ├── common.js               # Contains all the enum values for the allowed file types
│   │   ├── language.js             # Contains all the enum values for all Languages
│   │   ├── notification.js         # Contains all the enum values for Notification types
│   │   ├── payment_methods.js      # Contains all the enum values for payment methods
│   │   ├── productFields.js        # Contains all the enum values for the allowed product fields types
│   │   ├── productRequest.js       # Contains all the enum values for the allowed product Request status
│   │   └── user.js                 # Contains all the enum values for the allowed user status
│   ├── config.dev.js               # Contains all of the development environment variables
│   ├── config.prod.js              # Contains all of the production environment variables
│   └── express.js                  # Handle express configuration
├── controller                      # Handle the incoming work HTTP requests and decides which service should do the work
|                          
├── db                              # Handle all the database  models, schemas, queries, functions
│   ├── models                      # Contains all the db  models, schemas
│   ├── plugins                     # Handle database timestamp
│   ├── BaseModel.js                # Handle all the database queries, functions for all the models
│   ├── index.js                    # Handle database configurations like: connection, initialization,...etc
│   └── ModelsFactory.js            # Handle the creation of the database models
├── docs                            # Handle swagger configurations
├── helpers                         # Handle throwing errors, sending notifications, file storge, hashing data
│   ├── errors                      # Handle throwing errors
│   ├── notifications               # Handle sending notifications (sms, push notifications)
│   ├── projections                 # Contains some of the database collections projection
│   ├── storage                     # Handle files upload and delete to/from aws s3
│   ├── validations                 # Handle requests validation
│   ├── crypto.js                   # Handle hashing the data with bcrypt, jsonwebtoken/jwt
│   ├── http-codes.js               # Contains response error codes
│   ├── mobileNumberValidation.js   # Handle any Mobile validation
│   └── utils.js                    
├── routes                          # Contains all the app endpoints /routes
├── services                        # Handle business logic
├── test                            # Contains some test cases
├── utils                           # Handle image resize
├── .gitignore                      
├── api.yml                         # Contains all the app apis documentation(swagger)
├── app.js                          # Handle app configurations, initialization
├── package.json
├── package-lock.json
└── README.md

## App Environment Variables
* you can change any of these in `config.dev.js` file for development/testing environment
* you can change any of these in `config.prod.js` file for production environment

- PORT (app running port)
- db.url (database url)
- storage (object/files storage credentials)
- auth.local.key (jsonwebtoken/jwt secret Key)
- guest (guest data for any guest user)
- NODE_ENV (running environment)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## instructions
* install node.js on your local machine
* install mongodb on your local machine
* run mongodb on your local machine
* clone the project and then `cd urate`
* install npm packages ```npm install```
* change the database url(db.url) in `config.dev.js` file to your local mongodb url   
* change the storage credentials with your aws s3 credentials  
* the run the application by ```npm run start```

- Your app is running and accessible on `localhost:3000`

## Note
- when you run the app for the first time on your local machine an admin user will be created
  with mobile: 01111111111 and password 123456  and name: Admin.
- you can change admin data or stop creating admin from `db -> index.js` file
- all apis that need authentication you will need to send authorization key with value {token} in the headers
