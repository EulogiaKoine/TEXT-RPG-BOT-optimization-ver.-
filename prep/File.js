'use strict'

importClass(java.nio.file.Paths);
importClass(java.nio.file.Files);
const jvStr = java.lang.String;

const _SD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const TYPES = ['text', 'json', 'module'];
const DEFAULT_FUNC = (function(){}).bind(undefined);

module.exports = (function(){

function File(path, type, createIfNotExists){
    if(path.startsWith(_SD)){
        path = Paths.get(_SD).relativize(Paths.get(path));
    }
    this.path = path = Paths.get(_SD).resolve(path);

    if(!type){
        const p = path.toString();
        type = p.slice(p.search(/\.(txt|json|js)$/));
        switch(type){
            case '.json':
                type = 'json';
                break;
            case '.js':
                type = 'module';
                break;
            default:
                type = 'text';
        }
    }

    Object.defineProperty(this, 'type', {
        value: (type = TYPES.indexOf(type) === -1? 'text': type),
        writable: false,
        enumerable: true,
        configurable: true
    });

    if(Files.exists(path)){
        switch(type){
            case 'json':
                this.content = JSON.parse(new jvStr(Files.readAllBytes(path)));
                break;
            case 'module':
                this.content = require(path);
                break;
            default:
                this.content = new String(new jvStr(Files.readAllBytes(path)));
        }
    } else {
        switch(type){
            case 'json':
                this.content = {};
                break;
            case 'module':
                this.content = DEFAULT_FUNC;
                break;
            default:
                this.content = '';
        }

        if(createIfNotExists && Files.notExists(path)){
            Files.createDirectories(path.getParent());
            this.save();
        }
    }
}

File.prototype.isDirectory = false;

File.prototype.getPath = function(){
    return Paths.get(this.path);
};

File.prototype.getName = function(){
    return new String(this.path.fileName).replace(/\.(txt|js|json)$/, '');
};

File.prototype.getType = function(){
    return this.type;
};

File.prototype.exists = function(){
    return Files.exists(this.path);
};

File.prototype.create = function(){
    if(Files.exists(this.path)){
        return false;
    }

    Files.createDirectories(this.path.getParent());
    Files.createFile(this.path);

    return true;
};

File.prototype.load = function(readOnly){
    let content;

    switch(this.type){
        case 'text':
            content = new String(new jvStr(Files.readAllBytes(this.path)));
            break;
        case 'json':
            content = JSON.parse(new jvStr(Files.readAllBytes(this.path)));
            break;
        case 'module':
            content = require(this.path);
    }

    if(readOnly){
        return content;
    }

    return (this.content = content);
};

File.prototype.save = function(){
    let content;

    switch(this.type){
        case 'text':
            content = new String(this.content);
            break;
        case 'json':
            content = JSON.stringify(this.content);
            break;
        default:
            return false;
    }

    Files.write(this.path, new jvStr(content).getBytes());
    return true;
};

File.prototype.read = function(){
    return this.content;
};

File.prototype.write = function(content){
    switch(this.type){
        case 'text':
            return this.content = content;

        case 'json':
            if(typeof content !== 'object'){
                throw new TypeError("File.write_ must write an object, the type is json");
            }
            return this.content = content;
        
        case 'module':
            throw new TypeError("File.write_ cannot change the content, the type is module");
    }
};

File.prototype.delete = function(){
    if(this.type === 'module'){
        throw new TypeError("File.delete_ cannot delete the file, the type is module");
    }

    return Files.deleteIfExists(this.path);
};

return File;
})();