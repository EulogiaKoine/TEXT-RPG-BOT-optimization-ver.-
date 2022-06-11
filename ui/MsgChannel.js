'use strict';
module.exports = (function(){

const send = Api.replyRoom.bind(Api);

function MsgChannel(){
    Object.assign(this, new Channel());

    const queue = this.queue;
    Object.defineProperty(this, 'func', {
        value: function(){
            let m;
            while(true){
                m = queue.take();
    
                if(m.filter){
                    send(m.room, m.filter(m.msg), true);
                } else {
                    send(m.room, m.msg, true);
                }
            }
        },
        enumerable: true,
        writable: false,
        configurable: true
    });
}

MsgChannel.prototype.set = function(){
    throw new Error('cannot set a func of MsgChannel');
};

MsgChannel.prototype.req = function(m){
    if(m.room && m.msg){
        if(!m.filter || typeof m.filter === 'function'){
            this.queue.put(m);
        }
        throw new TypeError("MsgChannel.req_ arg's 'filter' property must be undefined or a function that returns String");
    } else {
        throw new Error("MsgChannel.req_ improper formal arg; it must include 'room' and 'msg' property");
    }
};

return MsgChannel;
})();