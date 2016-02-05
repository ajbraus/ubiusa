/*
 * ARTICLE MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntrantSchema = new Schema({
    created_at          : { type: Date }
  , updated_at          : { type: Date }
  , email               : { type: String }
  
  , first               : { type: String }
  , last                : { type: String }
  , story               : { type: String }

  , address_1           : { type: String }
  , address_2           : { type: String }
  , city                : { type: String }
  , state               : { type: String }
  , phone               : { type: String }

  // , entries      : { type: Schema.Types.ObjectId, ref: 'Entry' }
  
});

// BEFORE/AFTER FILTER
EntrantSchema.pre('save', function(next){
  // SET CREATED_AT AND UPDATED_AT
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

// EXPORT POST MODEL
var Entrant = mongoose.model('Entrant', EntrantSchema);

module.exports = Entrant;