// backend.js
import express from "express";
import cors from "cors";
import { getUsers, findUserById, findUserByName, findUserByJob, findUserByNameAndJob, addUser, deleteUser } from "./users-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    let users
    findUserByNameAndJob(name, job).then(
      (result) => {
        users = result;
        res.status(200).send(users);
      }).catch();
  } else if (name != undefined) {
    let users
    findUserByName(name).then(
      (result) => {
        users = result;
        res.status(200).send(users);
      }).catch();
  } else if (job != undefined) {
    let users
    findUserByJob(job).then(
      (result) => {
        users = result;
        res.status(200).send(users);
      }).catch();
  } else {
    let users 
    getUsers().then(
      (result) => {
        users = result;
        res.status(200).send(users);
      }).catch();
  }
});


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let user
  findUserById(id).then(
    (result) => {
      user = result;
      if (user === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(200).send(user);
      }
    }).catch();
});

app.post("/users", (req, res) => {
  addUser(req.body).then(
    () => {
      res.status(201).send();
    }).catch();
});

app.delete("/users/:id", (req, res) => {
  const id = req.body.id;
  deleteUser(id).then(
    () => {
      res.status(204).send();
    }).catch( (error) => { console.log(error); });
});