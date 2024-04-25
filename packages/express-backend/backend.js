// backend.js
import express from "express";
import cors from "cors";

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

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.status(200).send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.status(200).send(result);
  } else if (job != undefined) {
    let result = findUserByJob(job);
    result = { users_list: result };
    res.status(200).send(result);
  } else {
    res.status(200).send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(200).send(result);
  }
});

const addUser = (user) => {
  console.log(user);
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const {name, job} = req.body;
  const id = Math.random().toString(10).substring(3,9);
  const userToAdd = {id, name, job};
  addUser(userToAdd);
  res.status(201).send();
});

app.delete("/users/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = users["users_list"].findIndex(
      (user) => user.id === id
    );
    users["users_list"].splice(index, 1);
    res.status(204).send();
  } catch {
    res.status(404);
  }
});