import mongoose from "mongoose";
import User from "./users.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

export function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = User.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (name && job) {
    promise = findUserByNameAndJob(name, job);
  }
  return promise;
}

export function findUserById(id) {
  return User.findById(id);
}

export function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

export function findUserByName(name) {
  return User.find({ name: name });
}

export function findUserByJob(job) {
  return User.find({ job: job });
}

export function findUserByNameAndJob(name, job) {
  return User.find({ name: name, job: job });
}

export function deleteUser(id) {
  return User.findByIdAndDelete(id);
}