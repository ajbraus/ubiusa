var Entrant = require('../models/entrant');

/*
 |--------------------------------------------------------------------------
 | Projects
 |--------------------------------------------------------------------------
 */

module.exports = function(app) {
  
  // Create Entrant
  app.post('/api/entrants/new', function (req, res) {
    var entrant = new Entrant(req.body)
    entrant.save( function (err, entrant) {
      if (!entrant) { return res.status(500).send('Couldn\'t save entrant') } 
      
      res.send('Entrant added!');
    });
  });

  // Show Entrant
  app.get('/api/entrants/:id', function (req, res) {
    Entrant.findById(req.params.id).exec(function (err, entrant) {
      if (!entrant) { return res.status(404).send('No entrant found') } 

      res.send(entrant);
    });
  });

  // Index Entrant
  app.get('/api/entrants', function (req, res) {
    Entrant.find(function (err, entrants) {
      if (!entrant) { return res.status(404).send('No entrants found') } 
      
      res.send(entrants);
    });
  });

  // Update Entrant
  app.put('/api/entrants/:id/edit', function (req, res) {
    Entrant.findByIdAndUpdate(req.params.id, req.body).exec(function (err, entrant) {
      if (!entrant) { return res.status(400).send('Entrant not saved') } 

      res.send(entrant);
    });
  });

  // Delete Entrant
  app.delete('/api/entrants/:id', function (req, res) {
    Entrant.findByIdAndRemove(req.params.id, function (err, entrant) {
      if (!entrant) { return res.status(404).send('No entrant found') } 

      res.send("Successfully deleted entrant")
    });
  });
}