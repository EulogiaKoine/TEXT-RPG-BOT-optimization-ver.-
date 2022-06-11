'use strict';
module.exports = (function(){

function Channel(){
    this.queue = new java.util.concurrent.LinkedBlockingQueue();
    this.thread = null;
    this.func = null;
};

Channel.prototype.set = function(fn){
    if(typeof fn === 'function'){
        this.fn = fn;
    } else {
        throw new TypeError("Channel.set_ arg. must be a function");
    }
};

Channel.prototype.init = function(){
    if(this.thread.alive){
        throw new Error('Channel.init_ its thread is still alive; it must be extincted');
    }

    if(typeof this.func === 'function'){
        this.thread = new java.lang.Thread({
            run: this.func
        });
    
        this.thread.start();  
    } else {
        throw new TypeError('')
    }
};

Channel.prototype.extinct = function(){
    this.thread.interrupt();
};

Channel.prototype.req = function(value){
    this.queue.put(value);
};


return Channel;
})();