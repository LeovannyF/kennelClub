const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const {db, Dog, syncSeed} = require('./db/models.js');
const path = require('path');
const bodyParser = require('body-parser');


app.use(express.static('dist'));
app.use(bodyParser.json()); // dont forget that bodyparser needs to be towards the top in order to except all the json data


app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/api/dogs', (req, res, next) => {
  Dog.findAll()
  .then(response => res.send(response));
})

app.get('/api/dogs/:id', (req, res, next) => {
  console.log(req.params.id) //need params for data that is coming in from the user
  Dog.findOne({
    where: {
      id:req.params.id
    }
  })
  .then(response => res.send(response))
  .catch(next);
})

app.post('/api/dogs', (req, res, next) => {
  Dog.create({name:req.body.name}); //takes what axios is sending and creates it in the database
})

app.put('/api/dogs/:id', (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  Dog.update({
    name: req.body.name
  }, {
    where:{ id:req.params.id}
  })
})

app.delete('/api/dogs/:id', (req, res, next) => {
  Dog.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(204).end())
  .catch(next)
})

app.listen(port, () => {
  console.log(`I am listening on port ${port}`);
});

const init = async () => {
  await db.sync({force:true})
  await syncSeed();
}


init();

module.exports = app;
