const Sequelize = require('sequelize');
const {sequelize} = require('../config/auth');
const logger = require('../config/logger');

const sequelizeInstance = new Sequelize(sequelize.url);
const dB = {};

// const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {
//   host : process.env.DBHOST,
//   dialect : 'mysql',
//   pool : {
//     max : 5,
//     min : 0,
//     acquire : 6000,
//     idle: 1000
//   }
// });


sequelizeInstance.authenticate()
.then(() => {
  logger.info('Database is good');
})
.catch(err => {
  logger.error('Database no dey work', err);
})


dB.Sequelize = Sequelize;
dB.sequelize = sequelizeInstance;

dB.notifications = require('./notification')(sequelizeInstance, Sequelize);
dB.users = require('./user')(sequelizeInstance, Sequelize);
dB.tokens = require('./token')(sequelizeInstance, Sequelize);

// method

dB.users.paginate = async(limit, page, where) => {
  let offset = page <= 0 ? 0 : (page - 1) * limit;

  const result = await dB.users.findAndCountAll({
    limit,
    offset,
    where
  })

  let userObj = {};
  let totalPages = Math.ceil(result.count / limit);
  userObj.dataCount = result.count;
  userObj.page = page == 0 ? 1 : page;
  userObj.totalPages = totalPages;
  userObj.userData = result.rows;

  return userObj;
}

//Relationships




module.exports = {
  dB
};