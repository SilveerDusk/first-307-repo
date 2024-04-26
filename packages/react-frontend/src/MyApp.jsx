// src/MyApp.jsx
import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((data) =>  setCharacters(data) )
      .catch((error) => { console.log(error); });
  }, [] );

  function fetchUsers() {
    const promise = fetch('http://localhost:8000/users');
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateUserList(person) { 
    postUser(person).then((res) => {
      if(res && res.status === 201) {
        return res.json();
    }}).then((newUser) => {
      setCharacters([...characters, newUser]);
    }).catch((error) => { console.log(error); });
  }

  function deleteUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "id": id }),
    });
    return promise;
  }

  function removeOneCharacter(id) {
    const userId = id;
    deleteUser(id).then( result => {
      if(result && result.status === 204){
        const updated = characters.filter((user) => {
          return user._id !== userId;
        });
        setCharacters(updated);
      }
    }).catch((error) => { console.log(error); })
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateUserList} />
    </div>
  );
}

export default MyApp;
