var Entrant = require('../models/entrant');

/*
 |--------------------------------------------------------------------------
 | Projects
 |--------------------------------------------------------------------------
 */

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

module.exports = function(app) {
    
  // Create Entrant
  app.post('/api/entrants', function (req, res) {
    var entrant = new Entrant(req.body)
    entrant.save( function (err, entrant) {
      if (!entrant) { return res.status(500).send('Couldn\'t save entry') } 

      // Generate emailToken
      var token = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      entrant.emailToken = token;
      entrant.save();
      // Send link to confirm email
      app.mailer.send('emails/confirm-email', {
        to: entrant.email,
        subject: 'Please Confirm Email for UBI Raffle',
        entrant: entrant
      }, function (err) {
        if (err) { console.log(err); return }
      });
      
      res.send('Entrant added!');
    });
  });

  app.get('/api/confirm', function (req, res) {
    entrant.findOne({ emailToken: req.query.token }, function (err, entrant) {
      if (!entrant) { return res.status(500).send('Email not confirmed') } 

      entrant.confirmedAt = new Date();
      entrant.save();

      res.send('Email address confirmed!')
    })
  })

  // // Show Entrant
  // app.get('/api/entrants/:id', function (req, res) {
  //   Entrant.findById(req.params.id).exec(function (err, entrant) {
  //     if (!entrant) { return res.status(404).send('No entrant found') } 

  //     res.send(entrant);
  //   });
  // });

  // // Index Entrant
  // app.get('/api/entrants', function (req, res) {
  //   Entrant.find(function (err, entrants) {
  //     if (!entrants) { return res.status(404).send('No entrants found') } 
      
  //     res.send(entrants);
  //   });
  // });

  // // Update Entrant
  // app.put('/api/entrants/:id/edit', function (req, res) {
  //   Entrant.findByIdAndUpdate(req.params.id, req.body).exec(function (err, entrant) {
  //     if (!entrant) { return res.status(400).send('Entrant not saved') } 

  //     res.send(entrant);
  //   });
  // });

  // // Delete Entrant
  // app.delete('/api/entrants/:id', function (req, res) {
  //   Entrant.findByIdAndRemove(req.params.id, function (err, entrant) {
  //     if (!entrant) { return res.status(404).send('No entrant found') } 

  //     res.send("Successfully deleted entrant")
  //   });
  // });
}