CSuperObj = Class({

    construct: function(){
    },
	vars:{
		context: null,
        x: 0,
        y: 0
    },
    methods:{
        setX: function(O) {
            this.x = O;
        },
        setY: function(O) {
            this.y = O;
        },
        getX: function() {
            return this.x;
        },
        getY: function() {
            return this.y;
        },
		setContext: function(O) {
			this.context = O;
		},
		getContext: function() {
			return this.context;
		},
        clone: function(){

            var history = [];

            var clone = function(obj){
                if(obj == null || typeof(obj) != 'object'){
                    return obj;
                } else {
                    var flag = false;
                    for(var i in history){
                        if(history[i] == obj) {
                            flag = true;
                            break;
                        }
                    }
                    if(flag) {
                        return obj;
                    }
                    history.push(obj);

                    if(typeof obj.constructor == 'function') {
                        var temp = new obj.constructor();
                        for(var key in obj)
                        {
                            if(obj.hasOwnProperty(key)) {
                                if(key == 'context') {
                                    temp[key] = obj[key];
                                } else {
                                    temp[key] = clone(obj[key]);
                                }
                            }
                        }
                    } else {
                        var temp = obj;
                    }

                    return temp;
                }
            }


            return clone(this);
        }
}
});
