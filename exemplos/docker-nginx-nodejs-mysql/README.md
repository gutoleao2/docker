# fullcycle-docker-course-nginx-nodejs-challenge
Implementation of a challenge using Docker, nginx, and Node.js, referring to the completion of the Docker course, done on the Full Cycle platform.

## Challenge description

In this challenge, you'll put into practice what you've learned about using nginx as a reverse proxy. The main idea is that when a user accesses nginx, nginx will make a call to our node.js application. This application, in turn, will add a record to our mysql database, registering a name in the people table.

The return from the node.js application to nginx should be:

```
<h1>Full Cycle Rocks!</h1>

- List of names registered in the database.
```
Generate docker-compose in a way that we just run: docker-compose up -d that everything should be working and available on port: 8080.

Upload everything to a GitHub repository.

- The programming language for this challenge is Node/JavaScript.

## Challenge answer

The source code, docker files, and docker-compose file contained in this repository.