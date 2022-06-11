'use strict'
module.exports = function(root){
    importClass(java.nio.file.Paths);
    root = Paths.get(root);

    const manager = {
        root: root
    };

    manager.getRoot = (function(){
        return root;
    }).bind(manager);

    manager.get = (function(path){
        return root.resolve(path);
    }).bind(manager),

    manager.getString = (function(path){
        return root.resolve(path).toString();
    }).bind(manager);

    manager.require = (function(path){
        return require(this.getString(path.endsWith('.js')? path: path + '.js'));
    }).bind(manager);

    manager.read = (function(path){
        return FileStream.read(root.resolve(path));
    }).bind(manager);

    manager.readJson = (function(path){
        return JSON.parse(FileStream.read(
            this.getString(path.endsWith('.json')? path: path + '.json')
        ));
    }).bind(manager);

    manager.writeJson = (function(path, content, indent){
        return FileStream.write(
            this.getString(path.endsWith('.json')? path: path + '.json'),
            JSON.stringify(content, null, indent)
        );
    }).bind(manager);

    return manager;
};