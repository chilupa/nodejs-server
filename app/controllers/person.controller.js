const Person = require("../models/person.model.js");

// Create and Save a new Person
exports.create = (req, res) => {
  // Create a person
  const person = new Person({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    mobileNumber: req.body.mobileNumber
  });

  // Save Person in the database
  person
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating document."
      });
    });
};

// Retrieve and return all people from the database.
exports.findAll = (req, res) => {
  Person.find()
    .then(persons => {
      res.send(persons);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving persons."
      });
    });
};

// Update a Person identified by the id in the request
exports.update = (req, res) => {
  // Find Person and update it with the request body
  Person.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      mobileNumber: req.body.mobileNumber
    },
    { new: true }
  )
    .then(person => {
      if (!person) {
        return res.status(404).send({
          message: "Person not found with id " + req.params.id
        });
      }
      res.send(person);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Person not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating Person with id " + req.params.id
      });
    });
};

// Delete a Person with the specified id in the request
exports.delete = (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).send({
          message: "Person not found with id " + req.params.id
        });
      }
      res.send({ message: "Person deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Person not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.id
      });
    });
};
