# ☣ 🔗 Threat Identification & Response 

🎓 Master Thesis Project at The Technical University of Denmark (DTU) 📚

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)




## 🤔 What is this?

Thesis title: Methods for exhaustive identification of attack vectors represented graphically.

## ▶ Try it out:

https://dtu-tir.netlify.app/

## 💻 Installation guide:

### Prerequisite:

Both the frontend- and backend-project depends on the npm and Node packets. You are free to try out the projects with the latest version of these, however I recommend to use the exact version as me to avoid any errors that might occur:

npm version: `9.1.3`

node version `16.18.0`

This guide is targeted Linux and MacOS distributions and have not been tested on a Windows system. First you will need nvm (node version manager) for installing and handling node versions. Use either curl or wget below. You can check if nvm is installed with the command: 

`nvm --version`

### Install nvm

- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
- `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

### Install node and npm

- `nvm install 16.18.0`
- check versions: `node -v; npm -v`
- if npm is not correct version: `npm install -g npm@9.1.3`

### Install MySQL and create table

- `apt install mysql-server`
- `sudo mysql`
- `CREATE DATABASE mydb;`
- `use mydb;`

```
CREATE TABLE components(
  component_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  component_name VARCHAR(200),
  component_category VARCHAR(200),
  component_description VARCHAR(200)
) ENGINE=INNODB;
```

```
INSERT INTO 
	components(component_name, component_category, component_description)
VALUES
	('Network Card','input','this is a network card'),
	('Keyboard','input','a keyboard component'),
	('Router','input','this is a router component'),
	('Printer','output','this is a printer');
```

- `exit`

### Setup and run the projects

The frontend and backend are two separate projects located in their respective folders. You will need a terminal for each project. cd into each of them, and follow the steps below:

#### Backend

- `cd backend`
- `sudo npm install`
- `npm start`
- `Note that whenever the backend detects a change to the code, e.g. you make a newline and save it, the server is refreshed live. This is handy in case of an error or server crash, and you want to refresh / restart.`

#### Frontend

- `cd frontend`
- `sudo npm install`
- `npm run serve`
- open browser: `http://localhost:8080/`


