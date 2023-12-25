import express from "express";
import controller from "../controllers/User"
import validate from "../middleware/validators";

const router = express.Router();

router.post('/signup', validate("signup"), controller.signup);
router.post('/login', validate("login"), controller.login);

export = router;



