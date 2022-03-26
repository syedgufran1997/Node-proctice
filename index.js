import express from "express";
import cors from "cors";
import {
  helloworld,
  getTodos,
  addTodo,
  deleteTodoParams,
  getTodosById,
} from "./todos/todos.controller.js";
import sequelize from "./utils/db.js";
import Todo from "./todos/todos.model.js";

const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function logger(req, res, next) {
  console.log(`${req.method} ${req.path} `);
  next();
}

app.get("/", helloworld);

app.get("/api/todos", getTodos);

app.get("/api/todosbyid/:id", getTodosById);

app.post("/api/todos", addTodo);

app.delete("/api/todos/:id", deleteTodoParams);

const startServer = () => {
  sequelize.sync();
  sequelize
    .authenticate()
    .then(() => {
      console.log("DB Connected");
      app.listen(8000, () =>
        console.log(`Server started successfully on 8000`)
      );
    })
    .catch((err) => console.log("Failed to connect", err));
};

startServer();
