var CSuperObj = Class({

    construct: function(){
    },
	vars:{
		context: null,
        x: 0,
        y: 0,
        globalCenter: { x:0,y:0 },
        localCenter: { x:0,y:0 },
        center: { x:0,y:0 },

        angel: 0,
        globalAngel: 0,
        localAngel: 0,

        rotateCenter: { x:0,y:0 },
        localRotateCenter: { x:0,y:0 }

    },
    methods:{
        clone: function(){

            var history = [];

            var clone = function(obj){
                if(obj == null || typeof(obj) != 'object'){
                    return obj;
                } else {
                    var flag = false;
                    for(var i in history){
                        if(history[i] == obj) {
                            return obj;
                        }
                    }
                    history.push(obj);

                    if(typeof obj.constructor == 'function') {
                        var temp = new obj.constructor();
                        for(var key in obj)
                        {
                            if(obj.hasOwnProperty(key)) {
                                if(key == '_context') {
                                    temp[key] = obj[key];
                                } else {
                                    var getter = obj.__lookupGetter__(key),
                                        setter = obj.__lookupSetter__(key);

                                    if ( getter || setter ) {
                                        if ( getter ) temp.prototype.__defineGetter__(key, getter);
                                        if ( setter ) temp.prototype.__defineSetter__(key, setter);
                                    } else {
                                        temp[key] = clone(obj[key]);
                                    }
                                }
                            }
                        }
                    } else {
                        return obj;
                    }

                    delete temp.name;
                    return temp;
                }
            }


            return clone(this);
        }
}
});
