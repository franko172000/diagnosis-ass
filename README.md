# Diagnosis app
This is a simple app that manages diagnosis record.

# Downloading the app
Open up a terminal o your machine, navigate to a directory of your choice and run the command
```bash
git clone https://github.com/franko172000/diagnosis-ass.git
```
# Setting up DB
1. Open up the .env file, replace the values shown below with your database configuration.
```bash
DB_HOST=  database host here
DB_SCHEMA=  database name here
DB_USER= database user here
DB_PASS= database user password here
DB_PORT= database port number
DATABASE_CLIENT= database client. Example: mysql, pg = postgresql

```

# Running on Node environment
make sure NodeJS is already installed on your machine. Get it here (https://nodejs.org/en/download/)
```bash
$ npm install
$ npm start
```
# Running Test
To run the test scripts, run the command below.
```bash
$ npm run test
```
# Running on Docker
1. make sure docker is already installed on your machine. Get it here (https://docs.docker.com/docker-for-windows/install/)
2. Open up a terminal on your machine and run the command
```bash
$ docker-compose up
```

# Endpoints


#Author
Anyaso Franklin
franko172000@gmail.com



