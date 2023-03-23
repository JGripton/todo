# todo
 Simple To-Do list application with auth and language translation
 
 # Auth0 Config
 Sign up at https://auth0.com/
 
 Create a new single web page application:
 ![image](https://user-images.githubusercontent.com/102507947/227118237-c7085e87-9b20-40b0-b9cb-2eda7bcb7308.png)
 Select Angular then navigate to the settings page:
 ![image](https://user-images.githubusercontent.com/102507947/227118841-c9608e80-6568-494d-bd6b-f62243c0fb7d.png)
 Add your application's address to the Application URIs
 ![image](https://user-images.githubusercontent.com/102507947/227118537-7c7eab15-cbcd-45c5-adee-c143d719a4a1.png)
 Your domain and clientId can be found at the top of the Settings page under Basic Information.
 Add them to the auth_config.json file:
 ```{
  "domain": "",
  "clientId": "",
  "audience": "https://express.sample",
  "serverUrl": "http://localhost:4200"
}
```
 
 # Running backend
 First, configure backend .env to connect to your database. Then add your AUTH0_AUDIENCE and AUTH0_DOMAIN to the .env.
 
 ```cd api```
 
 Install dependencies 
 
 ```npm install```
 
 Run
 
 ```npm run start```
 
Backend service should now be running at http://localhost:3000/

# Running frontend

Open todoList folder

   ``` cd todoList ```
 
 Install dependencies 
 
  ``` npm install ```
  
  Run
  
   ``` npm run start ```
   
   Frontend should now be running at http://localhost:4200/
   
   
   # Creating a database on Google Cloud
   
   First, sign up for google cloud and enable billing on your account. This will be required for deployment too.
   
   Search "SQL" in the search bar
   
   Create a new postgres instance and configure it like so
   
   ![image](https://user-images.githubusercontent.com/102507947/220314712-497b9dbe-8b04-4f8f-98fb-bccb67593170.png)
   ![image](https://user-images.githubusercontent.com/102507947/220314763-1a570c04-fee2-45fe-b0f1-ddd6bb92c9b3.png)
   
   
   Once the instance is created, add the host and password to the .env file

   
   
   # Creating App Engine Instance
   

   The following steps should be done for both the backend and the frontend
   
   Create a new project
   ![image](https://user-images.githubusercontent.com/102507947/220313388-a950e145-1a30-4985-9b5f-a5ea2606c2e6.png)


   Search for app engine in the search bar and create new App Engine
   ![image](https://user-images.githubusercontent.com/102507947/220313598-48141521-f8d3-4599-a729-ca70d88312d7.png)


   Select a region and leave service account as default

   On each project, search fr Compute Engine API and enable it 
   ![image](https://user-images.githubusercontent.com/102507947/220313913-cb417962-c437-410b-a943-81874ae137a4.png)


   Both projects are now ready for applications to be deployed
   
   # Deploying code to GCP App Engine instance
   
   The backend should be pushed first so that the API URL can be added to the frontend's .env
   
   Install the [Cloud SDK](https://cloud.google.com/sdk/docs/install) on your local machine 
   
   Build production files using npm
   
   ``` npm run build ```
   
   Initialise google cloud using gcloud
   
   ``` gcloud init ```
   
   Make any required changes to the app.yaml file. The files provided should work fine however.
   
   Deploy the backend using
   
   ``` gcloud app deploy ```
   
   Enter the URL for the backend API into the .env file at /todoList/.env
   
   Navigate to the frontend folder and then initialise google cloud and then deploy
   
   ``` gcloud init ```
   
   ``` gcloud app deploy ```
   
   The frontend will now be accessible at the URL in your console

# Screenshots
Task page signed in:
![image](https://user-images.githubusercontent.com/102507947/227115952-33536d61-fbdf-467d-9c31-3643ec924a69.png)

Task page signed out:
![image](https://user-images.githubusercontent.com/102507947/227116309-e1ae3ca6-def0-4e24-9600-a4a745a318d7.png)

