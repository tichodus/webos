import { Folder } from "src/kernel/file-system/models/folder";
import { File } from 'src/kernel/file-system/models/file';
import root from 'src/kernel/file-system/root';

const folder = new Folder({ path: "blocker" });
folder.Parent = root;
export const blockerLauncher = new File(folder.Path + "/",{title:"Blocker",icon:"blocker.png"});
folder.addNode(blockerLauncher);
