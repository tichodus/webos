// import Task from './task';
// import { Thread } from './thread';

// export class TaskManager {
//     private tasksNumber: number;

//     constructor() {
//         this.tasksNumber = 1 // 0 is browser's main thread;
//     }

//     fork(): Task {
//         return new Task(this.tasksNumber++,new Thread())
//     }
// }