module.exports = app => {
  const person = require("../controllers/person.controller.js");

  // Retrieve all Persons
  app.get("/persons", person.findAll);

  // Create a new Person
  app.post("/person", person.create);

  // Update a Person with id
  app.put("/person/:id", person.update);

  // Delete a Person with id
  app.delete("/person/:id", person.delete);
};
