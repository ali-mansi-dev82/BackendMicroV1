const { default: Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "mysql",
  database: "swap_mart_db",
  port: 3306,
  user: "root",
  password: "",
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
