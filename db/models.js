Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);
const {dogName} = require('./seed');

const Dog = db.define('dog', {
  name:{
    type: Sequelize.STRING
  }
});

const syncSeed = async () => {
  // const[Pug, Bulldog, Pitbull, Saluki] = await Promise.all(dogName.map(dog => {
  //   return Dog.create({name: dog});
  // }));
}

module.exports = {
  db,
  Dog,
  syncSeed
}
