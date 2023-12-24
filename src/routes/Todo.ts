import express from "express";
import controller from "../controllers/Todo"
import { validateToken } from "../middleware/AuthToken";


const router = express.Router();

router.post('/create', validateToken, controller.createTodo);
router.get('/:id', validateToken, controller.readTodo);
router.get('/', validateToken, controller.readAllTodos);
router.patch('/:id', validateToken, controller.updateTodo);
router.delete('/:id', validateToken, controller.readAllTodos);

export = router;




