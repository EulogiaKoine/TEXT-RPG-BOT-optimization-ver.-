'use strict';
module.exports = (function(){

const float = (obj, dividor, prefix, result) => {
    if(prefix === undefined) prefix = '';
    if(result === undefined) result = {};

    let key;
    for(let i in obj){
        key = prefix + i;
        if(typeof obj[i] === 'object'){
            float(obj[i], result, dividor, key + dividor);
        } else {
            result[key] = obj[i];
        }
    }

    return result;
};

const consturct = (table, dividor, result) => {
    if(typeof table === 'object'){
        if(dividor === undefined) dividor = '/';
        if(result === undefined) result = {};

        for(let i in table){
            if(i.indexOf(dividor))
        }
    }

    throw new TypeError("table must be an object");
}

function Table(obj, schema){
    if(typeof schema === 'object'){

    } else {
        
    }
}
})();