'use strict';
module.exports = (function(){

let next = 0;
const queue = {}, thread = {};

const 

function init(){
    for(let i = 0; i < (MAX_VIEW_THREAD_COUNT || 1); i++){
        queue[i] = new LinkedBlockingQueue();

        if(i === 0){
            const q1 = queue[i];
            thread[i] = new Thread({run: function(){
                let v;
                while(true){
                    v = q1.take();
                    
                }
            }});
        }
    }
}


})();