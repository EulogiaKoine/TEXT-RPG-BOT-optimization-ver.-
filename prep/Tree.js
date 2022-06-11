'use strict';

module.exports = (function(){

function TreeNode(key, value, parent){
    this.key = new String(key);
    this.value = value || key;
    this.parent = parent || null;
    this.children = [];
}

Object.defineProperty(TreeNode.prototype, 'isRoot', {
    get: {
        function(){
            return this.parent === null;
        }
    },
    enumerable: true
});

Object.defineProperty(TreeNode.prototype, 'isLeaf', {
    get: {
        function(){
            return this.children.length === 0;
        }
    },
    enumerable: true
});

Object.defineProperty(TreeNode.prototype, 'path', {
    get: {
        function(){
            if(this.parent){
                return this.parent.path + '/' + this.key;
            }
            return this.key;
        }
    },
    enumerable: true
});

TreeNode.prototype.preOrderTraversal = function(result){
    if(!result) result = [];
    result.push(this);

    if(0 in this.children){
        for(let child of this.children){
            child.preOrderTraversal(result);
        }
    }

    return result;
};

TreeNode.prototype.postOrderTraversal = function(result){
    if(!result) result = [];

    if(0 in this.children){
        for(let child of this.children){
            child.preOrderTraversal(result);
        }
    }

    result.push(this);
    return result;
};

TreeNode.prototype.insert = function(parentNodeKey, key, value){
    if(!value) value = key;
    parentNodekey = new String(parentNodekey);

    for(let node of this.preOrderTraversal()){
        if(node.key === parentNodeKey){
            node.children.push(new TreeNode(key, value, node));
            return true;
        }
    }

    return false;
};

TreeNode.prototype.remove = function(key){
    let filtered;
    key = new String(key);

    for(let node of this.preOrderTraversal()){
        filtered = node.children.filter(v => v.key !== key);
        if(filtered.length !== node.children.length){
            node.children = filtered;
            return true;
        }
    }

    return false;
};

TreeNode.prototype.find = function(key){
    for(let node of this.preOrderTraversal()){
        if(node.key === key){
            return node;
        }
    }
};

//replacer: function(node)
TreeNode.toString = function(node, replacer, indent){
    if(node instanceof TreeNode){
        let obj = {};
        
    }

    throw new TypeError("TreeNode.toString_ 1st arg. must be a tree node");
}


//빠른 탐색을 위하여.
function TreeObserver(treeNode){
    this.pn = treeNode;
}

TreeObserver.prototype.select = function(path){
    path = path.split('/');
    
}

})();