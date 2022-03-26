import { Op } from "sequelize";
import Todo from "./todos.model.js";

// update, delete - update, destroy
// constraints and validations
// getter and setter

let todos = [
  {
    id: 1,
    title: "Learn React",
    description: "s",
    completed: true,
  },
  {
    id: 2,
    title: "Learn Redux",
    description: "s",
    completed: true,
  },
  {
    id: 3,
    title: "Learn GraphQL",
    description: "s",
    completed: true,
  },
];

function responseBuilder(success, error, data) {
  return {
    success,
    error,
    data,
  };
}

export const helloworld = (req, res, next) => {
  res.json({ message: "Hello World" });
};

export const getTodos = (req, res) => {
  console.log("search", req.query.search);

  if (req.query.search) {
    return Todo.findAll({
      where: {
        [Op.or]: {
          title: {
            [Op.substring]: req.query.search,
          },
          description: {
            [Op.substring]: req.query.search,
          },
        },
      },
    })
      .then((todos) => {
        return res.status(200).json(responseBuilder(true, null, { todos }));
      })
      .catch((e) => {
        console.log(e);
        return res
          .status(500)
          .json(responseBuilder(false, "Something went wrong", null));
      });
  }

  Todo.findAll({ raw: true })
    .then((todos) => {
      return res.status(200).json({
        success: true,
        error: null,
        data: todos,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong",
      })
    );
};
export const addTodo = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  if (!title) {
    return res.status(400).json({
      success: false,
      error: "You must provide todo",
      data: null,
    });
  }

  const newTodo = {
    title,
    description,
  };

  // todos.push(newTodo);

  Todo.create(newTodo)
    .then((todo) => {
      return res.status(200).json(responseBuilder(true, null, { todo }));
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Something went wrong",
      });
    });
};

export const deleteTodoBody = (req, res) => {
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
};

export const getTodosById = (req, res) => {
  const id = req.params.id;

  console.log("id===>", req.params);
  Todo.findByPk(id)
    .then((todo) => {
      if (todo) {
        return res.status(200).json(
          responseBuilder(true, null, {
            todo,
          })
        );
      }
      return res.status(400).json(
        responseBuilder(false, " Requested to with id is not found", {
          todo: null,
        })
      );
    })
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong",
      })
    );
};

export const deleteTodoParams = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: {
      id: id,
    },
  })
    .then((deletedTodo) => {
      console.log("Deleted Todo =>>", deletedTodo);
      if (deletedTodo) {
        res
          .status(200)
          .json(responseBuilder(true, null, { todo: deletedTodo }));
      }
      return res
        .status(400)
        .json(responseBuilder(false, "Todo with id not found", {}));
    })
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong",
      })
    );
  // const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

  // console.log(id, todoIndex);

  // Todo.destroy();
  // if (todoIndex == -1) {
  //   return res
  //     .status(400)
  //     .json(responseBuilder(false, `Todo not found - ${id}`, null));
  // }

  // let deleteTodos = todos.splice(todoIndex, 1);

  // return res
  //   .status(200)
  //   .json(responseBuilder(true, null, { data: deleteTodos }));
};

export const updateTodo = (req, res) => {
  const id = req.params.id;

  const data = req.body;

  Todo.update(data, {
    where: {
      id: id,
    },
  })
    .then((todo) => {
      console.log("patch ==>", todo);
      if (todo[0]) {
        return res.status(200).json(responseBuilder(true, null, { todo }));
      }
      return res.status(400).json(responseBuilder(false, "Id not found", {}));
    })
    .catch((e) =>
      res.status(500).json(responseBuilder(false, "Something went wrong", null))
    );
};
