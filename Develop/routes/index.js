const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
//Catch -all route for any other routes
router.use((req, res) => {

  res.status(404).send("<h1>Wrong Route!</h1>")//Respond with a 404 for unmatched routes
});

module.exports = router;