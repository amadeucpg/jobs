const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jobs', 'amadeu', '96812569', {
      host: 'localhost', // ou o host do seu banco de dados
      dialect: 'mysql',
      // outras opções de configuração, se necessário
});   

module.exports= sequelize