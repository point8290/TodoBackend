import express from "express";
import controller from "../controllers/Todo"
import { validateToken } from "../middleware/AuthToken";
import validate from "../middleware/validators";


const router = express.Router();

router.post('/', validateToken, validate("createTodo"), controller.createTodo);
router.get('/:id', validateToken, controller.readTodo);
router.get('/', validateToken, controller.readAllTodos);
router.patch('/:id', validateToken, validate("updateTodo"), controller.updateTodo);
router.delete('/:id', validateToken, controller.deleteTodo);

export = router;




