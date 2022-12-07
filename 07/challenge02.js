import input from './input.js'

class FsItem {
    name = undefined;
    parent = undefined;
    makeSpacingString = (number, char = ' ') => Array.from(Array(number)).fill(char).join('')
    getDepth = () => 1 + (this.parent?.getDepth() ?? 0);
}
class Dir extends FsItem {
    type = 'dir'
    children = [];

    constructor(name, parent) {
        super();
        this.name = name;
        this.parent = parent;
    }
    add = (child) => this.children.push(child);
    getSize = () => this.children.reduce((acc, curr)=>acc+curr.getSize(),0);
    getFatChildren = (threshold) => this.children.reduce((acc, curr)=>{
        if (curr.getSize() > threshold) acc.push(curr);
        return acc;
    },[]);
    getChildrenFolderRec = () => this.children
        .filter(x=>x.type==='dir')
        .flatMap(x=>[x, ...x.getChildrenFolderRec()])
    goTo(dirName){
        const dir = this.children.find(x=>x.name === dirName);
        if (!dir) {
            throw new Error('Directory not found');
        }
        return dir;
    }
    addDir(dirName){
        let currDir = this.children.find(x=> x.name === dirName)
        if (!currDir) {
            const newDir = new Dir(dirName, this);
            this.children.push(newDir)
            currDir = newDir;
        }
        return currDir;
    }
    addFile(fileName, size, parent) {
        this.children.push(new File(fileName, size, parent));
    }

    toString = () => `${this.makeSpacingString(this.getDepth(), '.')}${this.name}(${this.getSize()})${this.children.map(x=>`\n${x}`) || ''}`;
}

class File extends FsItem {
    type = 'file'
    size = 0;
    constructor(name, size, parent) {
        super();
        this.name = name;
        this.size = size;
        this.parent = parent;
    }
    getSize = () => +this.size;
    toString = () => `${this.makeSpacingString(this.getDepth(), '.')}${this.name}`;
}
const root = new Dir('root', undefined);
root.children=[new Dir('/')];

const output = input.split('\n')
    .filter(x=>x!=='')
    .reduce((acc, curr)=>{

        const changeFolderCom = '$ cd';
        if (curr.startsWith(changeFolderCom)) {
            const folderName = curr.split(changeFolderCom)[1].trim();
            if (folderName === '..') {
                acc.currentDir = acc.currentDir.parent;
            } else {
                acc.currentDir = acc.currentDir.goTo(folderName);
            }
            return acc;
        }
        const directoryItemOutput = 'dir ';
        if (curr.startsWith(directoryItemOutput)){
            const folderName = curr.split(directoryItemOutput)[1].trim();
            acc.currentDir.addDir(folderName, acc.currentDir);
            return acc;
        }
        const [, size, fileName] = /(\d+) (.*)/.exec(curr) || [];
        if (fileName){
            acc.currentDir.addFile(fileName, size, acc.currentDir);
            return acc;
        }
        if (curr === "$ ls") return acc;
        return acc;
    }, {
        currentDir: root,
        fs: root,
    })

console.log(output.fs.toString());

const threshold = 100000;
const fatChildren = output.fs.children[0].getFatChildren(threshold).map(x=>x.getSize());
const sum = (a,b)=>a+b;


const totalSpace = 70000000;
const neededSpace = 30000000;
const availableSpace = totalSpace - output.fs.children[0].getSize();

console.log('available space',availableSpace);
const minSizeDelete = neededSpace - availableSpace;
console.log('minimum size for a directory to be deleted', minSizeDelete);

console.log(
    output.fs.children[0]
        .getChildrenFolderRec()
        .filter(x=>x.getSize()>minSizeDelete)
        .map(x=>({size: x.getSize(), name: x.name}))
        .sort((a,b) => a.size - b.size)
);