const cds = require('@sap/cds');
module.exports = cds.service.impl(function() {
  this.before('CREATE', 'Event', async (req) => {
    const event = req.data;
    event.datum = new Date(event.datum);
  });

  this.after('READ', 'Event', (events) => {
    events.forEach(event => {
      event.locatie = event.locatie.toUpperCase();
    });
  });
});

