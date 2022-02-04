import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [
  {
    id: 1,
    text: "Learn React",
    completed: true,
  },
  {
    id: 2,
    text: "Learn Redux",
    completed: true,
  },
  {
    id: 3,
    text: "Learn GraphQL",
    completed: true,
  },
];

function logger(req, res, next) {
  console.log(`${req.method} ${req.path} `);
  next();
}

app.get("/", (req, res, next) => {
  res.json({ message: "Hello World" });
});

app.get("/api/todos", (req, res) => {
  return res.status(200).json({
    success: true,
    error: null,
    data: todos,
  });
});

app.post("/api/todos", (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).json({
      success: false,
      error: "You must provide todo",
      data: null,
    });
  }

  const newTodo = {
    id: todos.length + 1,
    text: text,
    completed: true,
  };

  todos.push(newTodo);

  return res.status(201).json({
    success: true,
    error: null,
    data: newTodo,
  });
});

app.delete("/api/todos", (req, res) => {
  const todoid = req.body.id;

  if (!todoid && todoid.length <= 0) {
    return res.status(400).send({
      success: false,
      status: "Failed to delete todo",
    });
  }

  const deleteTodos = todos.filter((todoItem) => todoItem.id !== todoid);

  todos = deleteTodos;

  return res.status(201).send({
    success: true,
    error: null,
    status: `todo ${req.body.id} removed successfully`,
    data: deleteTodos,
  });
});

const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Server started successfully on port ${PORT} `)
);
