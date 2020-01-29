# Diagnosis app
This is a simple app that manages diagnosis record.

# Downloading the app
Open up a terminal o your machine, navigate to a directory of your choice and run the command
```bash
git clone https://github.com/franko172000/diagnosis-ass.git
```

# Dependency
This application need Redis to function properly. Make sure redis server is installed and running on your machine 

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
```bash
Get Diagnosis Records
Method : GET
/api/v1/diagnosis/get?limit=10&page=1

Get one Diagnosis Record
Method : GET
/api/v1/diagnosis/get-one?code=test

Edit Diagnosis Record
/api/v1/diagnosis/edit
Method : POST
body 
{
	"category" : "required",
	"diagnosis_code" : "required",
	"full_code": "required",
	"full_description" : "required",
	"partial_description" : "required"
}
            
Add Diagnosis Record
/api/v1/diagnosis/create
Method : POST
body 
{
	"category" : "required",
	"diagnosis_code" : "required",
	"full_description" : "required",
	"partial_description" : "required"
}

Delete Diagnosis Record
Method : DELETE
/api/v1/diagnosis/delete?code=test

Get Categories
Method : GET
/api/v1/category/get?limit=10&page=1

Get one category
Method : GET
/api/v1/category/get-one?code=test

Edit category
/api/v1/category/edit
Method : POST
body 
{
	"name" : "required",
	"code" : "required",
}
            
Add category
/api/v1/category/create
Method : POST
body 
{
	"name" : "required",
	"code" : "required",
}

Delete category
Method : DELETE
/api/v1/category/delete?code=test

```

#Author
Anyaso Franklin <br />
franko172000@gmail.com



