import { Folder } from "src/kernel/file-system/models/folder";
import { File } from 'src/kernel/file-system/models/file';
import root from 'src/kernel/file-system/root';

const folder = new Folder({ path: "test" });
folder.Parent = root;
export const testApp = new File(folder.Path + "/");
folder.addNode(testApp);
