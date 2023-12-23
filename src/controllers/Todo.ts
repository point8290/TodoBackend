import { NextFunction, Request, Response } from "express";
import Todo from "../models/Todo";


const createTodo = (req: Request, res: Response, next: NextFunction) => {

}

const readTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    Todo.findById(todoId).then((todo) => {
        todo ? res.status(200).json({ todo }) : res.status(404).json({ message: "Todo not found" });
    }).catch(error => {
        res.status(500).json({ error })
    });
}

const updateTodo = (req: Request, res: Response, next: NextFunction) => {

}

const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    Todo.findByIdAndDelete(todoId).then((todo) => {
        todo ? res.status(201).json({ message: "Todo item deleted" }) : res.status(404).json({ message: "Todo not found" });
    }).catch(error => {
        res.status(500).json({ error })
    });
}
const readAllTodos = (req: Request, res: Response, next: NextFunction) => {

}

export default { createTodo, readAllTodos, readTodo, deleteTodo, updateTodo };