'use strict'

/**
 * @author Eulogia Koinē
 * @see File
 */

importClass(java.nio.file.Paths);
importClass(java.nio.file.Files);

const _SD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const _SD_PATH = Paths.get(_SD);
const deleteDir = (dir => {
    const list = dir.toFile().list();

    for(let path of list){
        path = dir.resolve(path);

        if(Files.isDirectory(path)){
            deleteDir(path);
        } else {
            Files.delete(path);
        }
    }

    return Files.delete(dir);
}).bind(undefined);

module.exports = (function(){

const File = require('./File.js');

function Directory(path, createIfNotExists){
    if(path === undefined || path === null){
        throw new TypeError('Directory_ please input the path(1st argument)');
    }

    if(path.startsWith(_SD)){
        path = Paths.get(_SD).relativize(Paths.get(path));
    }
    this.path = path = Paths.get(_SD).resolve(path);

    Object.defineProperty(this, 'contents', {
        value: {},
        writable: false,
        enumerable: true,
        configurable: true
    });

    this._isWorking = false;

    if(Files.exists(path)){
        const list = path.toFile().list(), contents = this.contents;

        let str, type, name;
        for(let p of list){
            p = path.resolve(p), name = new String(p.fileName).replace(/\.(txt|json|js)$/, '');

            if(name in contents){
                throw new ReferenceError('Directory_ Two or more files/directories with the name "'+name+'" exist in the sub-path');
            }

            if(Files.isDirectory(p)){
                contents[name] = new Directory(_SD_PATH.relativize(p), false);
            } else {
                contents[name] = new File(_SD_PATH.relativize(p));
            }
        }
    } else {
        if(createIfNotExists && Files.notExists(path)){
            Files.createDirectories(path);
        }
    }
};

Directory.prototype.isDirectory = true;

Directory.prototype.getPath = function(){
    return this.path;
};

Directory.prototype.getName = function(){
    return this.path.fileName;
};

Directory.prototype.exists = function(){
    return Files.exists(this.path);
};

Directory.prototype.create = function(){
    if(Files.exists(this.path)){
        return false;
    }

    Files.createDirectories(this.path);

    return true;
};

Directory.prototype.load = function(removeUnnecessary){
    if(this._isWorking){
        throw new Error("Directory.load_ cannot load the directory, it is working; "+this.path);
    }
    this._isWorking = true;

    if(!Files.isDirectory(this.path)){
        throw new ReferenceError("Directory.load_ cannot load the directory, it doesn't exists in storage; "+this.path);
    }

    const list = this.path.toFile().list(), contents = this.contents;

    let name, type, str;
    for(let p of list){
        p = this.path.resolve(p), name = new String(p.fileName).replace(/\.(txt|json|js)$/, '');

        if(name in contents){
            contents[name].load(removeUnnecessary && Files.isDirectory(p));
        } else {
            if(Files.isDirectory(p)){
                contents[name] = new Directory(_SD_PATH.relativize(p), false);
            } else {
                contents[name] = new File(_SD_PATH.relativize(p));
            }
        }
    }

    const keys = Object.keys(contents);
    if(removeUnnecessary && keys.length !== list.length){
        for(let name of keys){
            if(list.indexOf(name) === -1){
                contents[name].delete();
                delete contents[name];
            }
        }
    }

    this._isWorking = false;
};

Directory.prototype.save = function(removeUnnecessary){
    if(this._isWorking){
        throw new Error("Directory.save_ cannot save the directory, it is working; "+this.path);
    }
    this._isWorking = true;

    if(Files.notExists(this.path)){
        Files.createDirectories(this.path);
    }

    const contents = this.contents;

    for(let path in contents){
        contents[path].save(removeUnnecessary);
    }

    const list = this.path.toFile().list();
    if(removeUnnecessary && list.length !== Object.keys(contents).length){
        for(let file of list){
            file = this.path.resolve(file);

            if(!(new String(file.fileName).replace(/\.(txt|json|js)$/, '') in contents)){
                if(Files.isDirectory(file)){
                    deleteDir(file);
                } else {
                    Files.delete(file);
                }
            }
        }
    }

    this._isWorking = false;
};

Directory.prototype.organize = function(){
    if(this._isWorking){
        throw new Error("Directory.organize_ cannot organize the paths below, it is working; "+this.path);
    }
    this._isWorking = true;

    const contents = this.contents;

    for(let content in contents){
        content = contents[content];

        if(!this.path.equals(content.path.parent)){
            content.path = this.path.resolve(content.path.fileName);

            if(content instanceof Directory){
                content.organize();
            }
        }
    }

    this._isWorking = false;
};

Directory.prototype.has = function(path){
    path = Paths.get(path);
    let content = new String(path.getName(0));

    if(content in this.contents){
        const count = path.getNameCount();

        if(count === 1){
            return true;
        }

        content = this.contents[content];
        if(content instanceof File){
            return false;
        }

        return content.has(path.subpath(1, count));
    }

    return false;
};

Directory.prototype.read = function(path){
    if(this._isWorking){
        throw new Error("Directory.read_ cannot read the content, it is working; "+this.path);
    }

    if(path === undefined || path === null){
        return null;
    }

    path = Paths.get(path);
    let content = new String(path.getName(0));

    if(content in this.contents){
        content = this.contents[content];

        const count = path.getNameCount();
        if(count > 1){
            if(content instanceof Directory){
                return content.read(path.subpath(1, count));
            }

            throw new TypeError("Directory.read_ cannot read the path below '"+content.path.fileName+"(Is a file)");
        }

        if(content instanceof File){
            return content.read();
        }

        throw new TypeError("Directory.read_ cannot read the path, '"+content.path.fileName+"' is a directory");
    }

    return null;
};

Directory.prototype.write = function(path, content){
    if(this._isWorking){
        throw new Error("Directory.write_ cannot write the content, it is working; "+this.path);
    }

    if(path === undefined || path === null){
        throw new TypeError("Directory.write_ path for writing isn't inputed");
    }

    path = Paths.get(path);
    let curr = new String(path.getName(0));

    const count = path.getNameCount();

    if(curr in this.contents){
        curr = this.contents[curr];

        if(count === 1){
            if(curr instanceof File){
                return curr.write(content);
            }

            throw new TypeError("Directory.write_ cannot write to the path, '"+curr.path.fileName+"' is a directory");
        }

        if(curr instanceof Directory){
            return curr.write(path.subpath(1, count), content);
        }

        throw new TypeError("Directory.write_ cannot write to the path below '"+curr.path.fileName+"(Is a file)");
    }

    if(count === 1){
        const type = typeof content === 'object'? 'json': 'text';

        const file = this.makeFile(curr, type);
        this.contents[curr] = file;

        return file.content = content;
    }

    const dir = new Directory(_SD_PATH.relativize(this.path.resolve(curr)), false);
    this.contents[curr] = dir;

    return dir.write(path.subpath(1, count), content);
};

Directory.prototype.makeFile = function(name, type){
    type = type === 'json' ? 'json': 'text';
    const ext = type === 'json' ? '.json' : '.txt';

    if(name.endsWith(ext)){
        name = name.replace(new RegExp(ext+'$'), '');
    }

    if(name in this.contents){
        throw new ReferenceError("Directory.makeFile_ the content with name '"+name+"' already exsits");
    }

    return this.contents[name] = new File(_SD_PATH.relativize(this.path.resolve(name+ext)), type, false);
};

Directory.prototype.makeDir = function(name){
    if(name in this.contents){
        throw new ReferenceError("Directory.makeDir_ the content with name '"+name+"' already exsits");
    }

    return this.contents[name] = new Directory(_SD_PATH.relativize(this.path.resolve(name)), false);
};

Directory.prototype.delete = function(isSerious){
    if(this._isWorking){
        throw new Error("Directory.delete_ cannot delete the directory, it is working; "+this.path);
    }
    this._isWorking = true;

    if(isSerious === 'delete' && Files.exists(this.path)){
        return (this._isWorking = false) || deleteDir(this.path);
    }

    return this._isWorking = false;
};

Directory.prototype.add = function(content){
    if(content instanceof File && content instanceof Directory){
        throw new TypeError("Directory.add_ content must be a file of a directory");
    }

    const name = new String(content.path.fileName).replace(/\.(txt|json|js)$/, '');
    if(name in this.contents){
        throw new ReferenceError("Directory.add_ there is a content with same name");
    }

    if(!this.path.equals(content.path.parent)){
        content.path = this.path.resolve(content.path.fileName);

        if(content instanceof Directory){
            content.organize();
        }
    }

    return (this.contents[name] = content);
};

Directory.prototype.remove = function(path){
    if(this._isWorking){
        throw new Error("Directory.remove_ cannot remove such path '"+path+"', it is working; "+this.path);
    }

    path = Paths.get(path);
    let curr = new String(path.getName(0));

    if(curr in this.contents){
        const content = this.contents[curr];

        const count = path.getNameCount();
        if(count > 1){
            if(content instanceof Directory){
                return content.remove(path.subpath(1, count));
            }

            return false;
        }

        return delete this.contents[curr];
    }

    return false;
};

Directory.prototype.getContent = function(path){
    path = Paths.get(path);
    let count = path.getNameCount(), sub = path.getName(0);
    if(sub in this.contents){
        sub = this.contents[sub];

        if(count > 1){
            if(sub instanceof Directory){
                return sub.getContent(path.subpath(1, count));
            }

            throw new TypeError("Directory.getContent_ '"+sub.getName()+"'is not a directory: "+this.getName());
        }

        return sub;
    }

    throw new ReferenceError("Directory.getContent_ '"+path.toString()+"' doesn't exists in: "+this.getName());
};

Directory.prototype.list = function(){
    return Object.keys(this.contents).map(v => this.contents[v]);
};

return Directory;
})();
