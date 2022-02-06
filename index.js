import express from "express";
import cors from "cors";
import {
  helloworld,
  getTodos,
  addTodo,
  deleteTodo,
} from "./todos/todos.controller.js";

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

app.post("/api/todos", addTodo);

app.delete("/api/todos", deleteTodo);

const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Server started successfully on port ${PORT} `)
);
