
export enum NodeType {
    FILE,
    FOLDER
}

export enum Permission {
    WRITE,
    READ,
    WRITEANDREAD
}

export interface NodeOptions {
    permission?: Permission;
    title?: string;
    icon?: string;
    path?: string;
}

export abstract class Node {
    protected nodeType: NodeType;
    protected permission: Permission;
    protected title: string;
    protected icon: string;
    protected path: string;

    constructor(nodeType: NodeType) {
        this.nodeType = nodeType;
        this.permission = Permission.WRITEANDREAD;
    }

    public get Type() {
        return this.nodeType;
    }

    public get Permission() {
        return this.permission;
    }

    public set Permission(permission: Permission) {
        this.permission = permission;
    }

    public get Title() {
        return this.title;
    }

    public set Title(title: string) {
        this.title = title;
    }

    public get Icon() {
        return this.icon;
    }

    public set Icon(icon: string) {
        this.icon = icon;
    }

    public get Path() {
        return this.path;
    }

    public setRelativePath(path: string) {
        this.path = `${this.path}/${path}`;
    }

    public abstract getInfo(): string | Node[];
}
