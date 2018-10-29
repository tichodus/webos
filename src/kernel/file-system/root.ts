import { Node } from "./models/node";
import { Folder } from './models/folder';

const root: Node = new Folder({ path: "src/root/" });

export default root;