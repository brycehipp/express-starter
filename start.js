// import environmental variables from our .env file
require('dotenv').config({ path: '.env' })

// READY?! Let's go!

// Import all the models

// Start our app!
const app = require('./app')

app.set('port', process.env.PORT || 7777)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
