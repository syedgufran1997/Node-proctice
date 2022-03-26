import sequelize from "../utils/db.js";
import { DataTypes } from "sequelize";

const Todo = sequelize.define(
  "todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     isEmail: true,
    //   },
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 20],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// User.create({ username: "JohnDoe", email: "sf", age: "25" }, { raw: true })
//   .then((user) => console.log(user))
//   .catch((e) => console.log(e.errors));

export default Todo;
