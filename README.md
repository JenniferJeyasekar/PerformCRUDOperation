# PerformCRUDOperation
Steps to create database connection
 1.Install AWS CLI version 2 
 2.Open new terminal and type the following
        aws configure
        npm install aws-sdk
3.Start DynamoDB using the following command
        java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
4.In another terminal,run the below command to create Employee table
        node CreateTable.js

Steps to run Server
1.In the terminal,run the below command
        node App.js

Steps to run the client
1.Run the below commands in command prompt, to install dependant modules and start the client
        npm install 
        npm start
2.In the terminal,react-scripts is started
3.http://localhost:3000 is loaded in the browser.

Now the Server is loaded, dyanmodb is started and CRUD operations can be performed in the browser.
