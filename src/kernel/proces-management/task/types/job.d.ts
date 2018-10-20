export type Job = {
    taskId: number;
    job: () => void;
}