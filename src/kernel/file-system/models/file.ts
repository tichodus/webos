import { Node, NodeType, NodeOptions } from "./node";

export class File extends Node {
  private dataLink: string;
  constructor(dataLink: string, options?: NodeOptions) {
    super(NodeType.FILE);
    this.dataLink = dataLink;
    this.title = options
      ? options.title
        ? options.title
        : "new file"
      : "new file";
    this.path = dataLink;
    this.dataLink = this.path;
    this.icon = options
      ? options.icon
        ? options.icon
        : "insert_drive_file"
      : "insert_drive_file";
  }

  public getInfo(): string | Node[] {
    return this.dataLink;
  }
}
