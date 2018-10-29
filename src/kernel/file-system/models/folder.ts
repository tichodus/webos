import { Node, NodeType, NodeOptions } from './node';


export class Folder extends Node {
    private children: Node[];
    private parent: Node;

    constructor(options?: NodeOptions) {
        super(NodeType.FOLDER);

        this.children = new Array<Node>();
        this.title = "New folder";
        this.path = options ? options.path ? options.path : `${this.title}` : `${this.title}`;
        this.icon = "folder";
    }

    public getInfo(): string | Node[] {
        return this.children;
    }

    public addNode(node: Node) {
        this.children.push(node);
    }

    public remeoveNode(node: Node) {
        this.children = this.children.filter(nodeData => nodeData.Path !== node.Path);
    }

    public get Parent() {
        return this.parent;
    }

    public set Parent(parent: Node) {
        this.parent = parent;
    }

} 