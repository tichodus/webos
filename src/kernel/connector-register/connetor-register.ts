import { Connector } from '../connector/connector';


export class ConnectorRegister {
    private register: Map<number, Connector>;

    constructor() {
        this.register = new Map();
    }

    public registerConnector(taskId: number, connector: Connector) {
        this.register.set(taskId, connector);
    }

    public getWindow(taskId: number) {
        return this.register.get(taskId);
    }
}

const conenctorRegister: ConnectorRegister = new ConnectorRegister();
export default conenctorRegister;