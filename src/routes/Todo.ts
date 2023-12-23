import express from "express";
import controller from "../controllers/Todo"


const router = express.Router();

router.post('/create', controller.createTodo);
router.get('/:id', controller.readTodo);
router.get('/', controller.readAllTodos);
router.patch('/:id', controller.updateTodo);
router.delete('/:id', controller.readAllTodos);

export = router;




