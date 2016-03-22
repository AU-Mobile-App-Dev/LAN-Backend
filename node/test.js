var siege = require('siege');
siege()
  .on(5000)
  .for(50).times
  .get('/api/users')
  .attack()