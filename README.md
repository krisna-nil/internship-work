# M_plus_store

> NodeJs and MySQL is used



---

## Table of Contents 

- [Installation](#installation)
- [How to Run?](#how to run)
- [Features](#features)
- [How to Contribute](#how to contribute)

---

## Installation

- Download and Install MySQL, MySQL Workbench, PostMan 

### Clone

- Clone this repo to your local machine using 
```shell
	 	C:\Users\aashu\Documents\nodeJS>git clone https://gitlab.com/sololobo/m_plus_store.git
``` 

### Setup

- Navigate to directory m_plus_store. 
> Run 
```shell
	 	C:\Users\aashu\Documents\nodeJS\m_plus_store>npm install
``` 

---

## How to Run?

- Open MySQL workbench. Reverse Engineer the .mwb file or import the .sql file. (Google how to do it).
- In the table user_types, insert two values. (1, 'Store'), (2, 'Patient') [Skip if already present]
- Update your mysql USER and PASSWORD in config/db_config.js. 
> Run
```shell
		C:\Users\aashu\Documents\nodeJS\m_plus_store>npm start
```
-  Navigate to directory crosscut_backend_task/crosscut_backend_task1

> If you see this, you are good to go.
	
```shell
		Server is running on port 3001.
        Successfully connected to the database.
```

---

## Features
- GET http://localhost:3001/
- GET http://localhost:3001/stores/
- POST http://localhost:3001/stores/

---

## How to Contribute
- Create a branch of your name and push the changes there.