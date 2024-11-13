const { default: Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
  host: "bcnk827f67fytor5mgme-mysql.services.clever-cloud.com",
  dialect: "mysql",
  database: "bcnk827f67fytor5mgme",
  port: 3306,
  user: "u1il5ze2avph9cp0",
  password: "AcnIrO1qUcBtepxmukFA",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
