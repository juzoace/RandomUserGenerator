# Random User Generator
👋 Hello, Welcome to the Random User Generator API Repo

# APPLICATION FEATURES
🎉 Below are some of main feature of the Random User Generator Api
1) Authentication System using passport. 
2) Route protection 
3) Call to an external Api  web service (randomuser.me)
4) Swagger Documentation
5) 
# APPLICATION REQUIREMENTS
Ensure you have the following installed and properly setup on your Pc: Node.js, MongoDB, MongoDB compass, Git, Postman & Chrome Browser 
# RUNNING THE APP LOCALLY
1) Clone the app
2) Move into the root directory of the app 
3) Download project dependencies using yarn install
4) Create a development.env file (in your root directory) and add the following variables: 
NODE_ENV=development
HOST=localhost
PORT=3000
DB_PORT=27017
DB_DATABASE=MyDattabase
DB_HOST=localhost

5) Run the app in your terminal using "yarn dev"
6) To access the swagger documentation open http://localhost:3000/api-docs in your web browser. 


# AWS EC2 DEPLOYMENT & RUNNING
1) Open a Git Bash Terminal (on windows)
2) Create an Ec2 Instance and download the necessary apps on the instance (i.e git, npm, node, yarn). Follow this guide for deploying it: https://www.youtube.com/watch?v=oHAQ3TzUTro 
3) Clone the repo into the aws ec2 instance
4) Move into the project folder using "cd RandomUserGenerator/"
5) Run "yarn install" to download project dependencies
6) Run "node generateKeypair.js" to generate passport authentication keys
7) Create a service file for the instace using the command (without ""): "sudo vim /etc/systemd/system/RandomUserGenerator.service". This will help to keep the service running and also restart the service whenever it goes down.  Add the following to the file: 

[Unit]
Description=My Node Server
After=multi-user.target

[Service]
ExecStart=/usr/bin/node /home/ec2-user/RandomUserGenerator/index.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=my-node-server
User=ec2-user
EnvironmentFile=/home/ec2-user/lotr/app.env

[Install]
WantedBy=multi-user.target

8) Create the environment variable file using the command "vim app.env"
9) Paste the following environment variables into the app.env file: NODE_ENV='production' PORT='8080' MONGOLAB_URI='****Your MongoDB Database Connection String******' npm run prod. P.S: Input your mongodb database connection string into the MONGOLAB_URI vaiable
10) Save the file using ":wq: 
11) Start the service file crteated in step 7 by using the command "sudo systemctl start RandomUserGenerator.service"
12) Locate your Public Ipv4 address in your ec2 console. E.g http://3.139.102.88:8080. This will be used to access the api.  
13) Test the routes using postman. i.e http://3.139.102.88:8080/register

Need further help, reach out to me through email: uzochukwunwigwe@gmail.com, whatsapp: +2348161812871
To learn more about the endpoints, run the app locally and enter http://localhost:4000/api-docs on your browser to see the swagger documentation.


