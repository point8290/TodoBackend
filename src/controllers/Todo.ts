import { NextFunction, Request, Response } from "express";
import Todo from "../models/Todo";
import User from "../models/User";
import Logging from "../services/logging";


const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await User.findOne({
            email: req.user?.email,
        }, { _id: 1 });

        const todo = await Todo.create({
            ...req.body, user: user?._id
        });

        res.status(200).json({ todo });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

const readTodo = async (req: Request, res: Response, next: NextFunction) => {
    Logging.info("read todo")
    const todoId = req.params.id;
    try {
        const todo = await Todo.findById(todoId).populate('user', { name: 1, _id: 0 });

        res.status(200).json({ todo })
    }
    catch (error) {
        res.status(500).json({ error })
    };
}

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoId = req.params.id;

        await Todo.findByIdAndUpdate(todoId, {
            ...req.body
        });

        const todo = await Todo.findById(todoId).populate('user', { name: 1, _id: 0 });

        res.status(200).json({ todo });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    try {
        const todo = await Todo.findByIdAndDelete(todoId)

        res.status(200).json({ message: "Todo deleted successfully" })
    }
    catch (error) {
        res.status(500).json({ error })
    };
}
const readAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({
            email: req.user?.email,
        }, { _id: 1 });

        const todos = await Todo.find({ user: user?._id }).populate('user', { name: 1, _id: 0 })
        res.status(200).json({ todos });

    } catch (error) {
        res.status(500).json({
            error
        });
    }

}

export default { createTodo, readAllTodos, readTodo, deleteTodo, updateTodo };