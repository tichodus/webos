import { Folder } from "src/kernel/file-system/models/folder";
import { File } from 'src/kernel/file-system/models/file';
import root from 'src/kernel/file-system/root';

const folder = new Folder({ path: "calculator" });
folder.Parent = root;
export const calculatorLauncher = new File(folder.Path + "/", {title:"Calculator",icon: `calculator.png` });
console.log(calculatorLauncher);

folder.addNode(calculatorLauncher);
