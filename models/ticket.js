const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TicketSchema = Schema({
  owner: { type: String, required: true },

  ticketName: { type: String, required: true },

  pin: { type: Schema.Types.Number, required: true }, // pin will be result = date - mins -seconds

  creationDate: { type: Schema.Types.Date, required: true },

  expiryDate: { type: Schema.Types.Date, required: true }
});

module.exports = mongoose.model("Tickets", TicketSchema);
