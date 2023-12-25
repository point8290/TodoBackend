import { expireTodo } from "../controllers/Todo";
import Schedule, { Task } from "./Schedule";


export const scheduleExpireTodoTask = () => {

    const task: Task = {
        cronString: "0 0 * * *",
        callback: expireTodo
    }

    Schedule.addToScheduleQueue(task);
    Schedule.schedule();

}




