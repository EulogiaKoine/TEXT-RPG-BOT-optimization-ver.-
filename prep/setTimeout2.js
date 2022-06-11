'use strict';

importClass(java.lang.Thread);
importClass(java.util.concurrent.LinkedBlockingQueue);

module.exports = function(){

let currentId = 0;
const list = {};
const now = Date.now;

const SQ = new LinkedBlockingQueue();
const Stack_func = function(){
    let f;
    while(true){
        try{
            f = SQ.take();
            f.args ? f.fn.apply(undefined, f.args) : f.fn();
        } catch(e) {
            Log.e(e);
        }
    }
};
const Stack = new Thread({run: Stack_func});
Stack.start();

const WQ = new LinkedBlockingQueue();
const Waiting_func = function(){
    let f;
    while(true){
        try{
            f = WQ.take();

            if(f.end <= now()){
                SQ.put(f);

                if(f.repeat){
                    f.end += f.long;
                    WQ.put(f);
                } else {
                    delete list[f.id];
                }
            } else {
                WQ.put(f);
            }
        } catch(e) {
            Log.e(e);
        }
    }
};
const Waiting = new Thread({run: Waiting_func});
Waiting.start();

function st2(fn, time, args){
    if(typeof fn !== 'function'){
        throw new TypeError("setTimeout2_ 1st argument, 'function' must be a function");
    }

    if(!(args === undefined || args instanceof Array)){
        throw new TypeError("setTimeout2_ 3rd argument, 'arguments' must be an array");
    }

    let id = ++currentId;
    const f = {
        fn: fn,
        end: (typeof time === 'number') ? (now() + (time >> 0)) : 0,
        args: args,
        id: id
    };

    list[id] = f;
    WQ.put(f);
    return id;
}
const setTimeout2 = st2.bind(undefined);

function si2(fn, time, args){
    if(typeof fn !== 'function'){
        throw new TypeError("setTimeout2_ 1st argument, 'function' must be a function");
    }

    if(!(args === undefined || args instanceof Array)){
        throw new TypeError("setInterval2_ 3rd argument, 'arguments' must be an array");
    }

    time = (typeof time === 'number')? (time >> 0): 1000;
    if(time <= 0){
        throw new TypeError("setInterval2_ 2nd argument, 'time' must be more than 0");
    }

    let id = ++currentId;
    const f = {
        fn: fn,
        id: id,
        args: args,
        end: now() + time,
        long: time,
        repeat: true
    };

    list[id] = f;
    WQ.put(f);
    return id;
}
const setInterval2 = si2.bind(undefined);

function ct(id){
    if(!list[id]){
        throw new ReferenceError("clearTime_ id '" + id + "' doesn't exists");
    }

    while(!WQ.remove(list[id])){}
    delete list[id];
}
const clearTime = ct.bind(undefined);

function asc(fn){
    if(typeof fn !== 'function'){
        throw new TypeError("async_ 1st argument, 'func' must be a function");
    }

    SQ.put({
        fn: fn,
        args: Array.from(arguments).splice(1)
    });
}
const as = asc.bind(undefined);


return {
    "setTimeout": setTimeout2,
    "setInterval": setInterval2,
    "clearTime": clearTime,
    "Stack": {
        "queue": SQ,
        "func": Stack_func,
        "thread": Stack
    },
    "Waiting": {
        "queue": WQ,
        "func": Waiting_func,
        "thread": Waiting
    },
    "exec": as
};
}();
