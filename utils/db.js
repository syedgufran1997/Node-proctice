import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "sequelize_practice",
  "root",
  "Syedgufran@333",
  {
    host: "localhost",
    dialect: "mysql",
    port: "3306",
  }
);
export default sequelize;
