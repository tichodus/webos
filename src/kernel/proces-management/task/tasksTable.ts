import { Task } from './task';


export class TasksTable {
    private tasks: Task[];

    constructor() {
        this.tasks = new Array<Task>();
    }

    public getTask(taskId: number): Task {
        const concreteTask = this.tasks.find((task: Task) => task.Pid === taskId);
        if (!concreteTask) {
            throw Error("Task with given id is not registered in the TasksTable");
        }
        return concreteTask;
    }

    public removeFromTable(taskId: number) {
        this.tasks = this.tasks.filter((task: Task) => task.Pid !== taskId);
    }

    public register(task: Task) {
        this.tasks.push(task);
    }
}

const tasksTable = new TasksTable();
export default tasksTable;