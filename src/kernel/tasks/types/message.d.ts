export type Message = {
    message: string;
    body: object | number | string | undefined | [];
    onRun?: any;
    onResume?: () => any;
    onPause?: () => any;
    onTerminate?: () => any;
}