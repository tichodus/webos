import { Node, NodeType, NodeOptions } from './node';

export class File extends Node {
    private dataLink: string;
    constructor(dataLink: string, options?: NodeOptions) {
        super(NodeType.FILE);
        this.dataLink = dataLink;
        this.title = "new file";
        this.path = dataLink;
        this.dataLink = this.path;
        this.icon = "insert_drive_file";
    }

    public getInfo(): string | Node[] {
        return this.dataLink;
    }
}