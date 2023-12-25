import cron from "node-cron"

export interface Task {
    callback: () => void,
    cronString: string
}

export default class Schedule {


    private static tasks: Task[] = [];

    public static addToScheduleQueue = (task: Task) => {
        this.tasks.push(task)
    }

    public static schedule = () => {

        const run = (task: Task) => {
            cron.schedule(task.cronString, task.callback);
        }

        this.tasks.map(run)
    }

}