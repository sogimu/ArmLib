var CObject = Class({
    base: CSuperObj,

    construct: function(O){
        if(typeof(O) != 'undefined') {

            if(typeof O.vars == 'object') {
                for (var m in O.vars)
                {
                    this[m] = O.vars[m];
                }
            };

            if(typeof O.begin == 'function'){this.__begin = O.begin};
            if(typeof O.update == 'function'){this.__update = O.update};

            this.collection = [];
            if( (typeof O.collection == 'object') && (O.collection instanceof Array) && (O.collection.length >= 1) ) {
                for (var i in O.collection)
                {
                    if(O.collection[i].type == 'shape' || O.collection[i].type == 'object') {
                        this.add( O.collection[i] );
                    }
                }
            }

            if(typeof O.events == 'object') {
                for (var i in O.events)
                {
                    if(typeof O.events[i] == 'function') {
                        this[m] = O.events[m];
                    }
                }
            };

        }
    },
    vars: {
        collection: [],
        type: 'object'
    },
    methods:{
        add: function(O) {
            if(typeof O == 'object' && (O.type == 'shape' || O.type == 'object')){
                O.setContext( this.context );
                this.collection.push(O);
            } else {
                throw Error('Object: add() -> Incorrect object!');
            }
        },
        remove: function(O) {
            if(typeof O == 'object' && (O.type == 'shape' || O.type == 'object')){
                for(var i in this.collection){
                    if(this.collection[i] == O){
                        delete this.collection[i];
                    }
                }
            }
        },
        removeLast: function() {
            return this.collection.pop();
        },
        setCollection: function(O) {
            //try{
                if(typeof O == 'object') {
                    for(var i in O){
                        if(O[i].type == 'shape' || O[i].type == 'object') {
                            this.add( O[i] );
                        }/* else {
                            throw Error('Object: setCollection() -> unligal object!')
                        }*/
                    }
                }/* else {
                    throw Error('Object: setCollection() -> unligal object!');
                }*/
            /*}
            catch(e){
                //console.log(e);
            }*/
            //this.collection = O;
        },
        getCollection: function() {
            return this.collection;
        },
        setContext: function(O) {
            this.context = O;
            for(var i in this.collection) {
                this.collection[i].setContext(O);
            }
        },

        _draw: function(stage) {
            for(var i in this.collection) {
                this.collection[i]._draw.call(this.collection[i],stage);
            }
        },
        _clean: function(stage) {
            for(var i in this.collection) {
                this.collection[i]._clean.call(this.collection[i],stage);
            }
        },
        _update: function(stage) {
            if(typeof this.__update == 'function') {
                this.__update.call(this,stage);
            }

            for(var i in this.collection) {
                if(typeof this.collection[i]._update == 'function') {
                    this.collection[i]._update.call(this.collection[i],stage);
                }
            }

        },
        _begin: function(stage) {
            if(typeof this.__begin == 'function') {
                this.__begin.call(this,stage);
            }

            for(var i in this.collection)
            {
                if(typeof this.collection[i]._begin == 'function') {
                    this.collection[i]._begin.call(this.collection[i],stage);
                }
            }
        },
        __intersection: function(stage) {
            var rect_intersection = function(shape1, shape2){
                var XL1 = shape1.x - shape1.lineWidth;
                var XR1 = shape1.x + shape1.width + shape1.lineWidth;
                var YL1 = shape1.y - shape1.lineWidth;
                var YR1 = shape1.y + shape1.height + shape1.lineWidth;

                var XL2 = shape2.x - shape2.lineWidth;
                var XR2 = shape2.x + shape2.width + shape2.lineWidth;
                var YL2 = shape2.y - shape2.lineWidth;
                var YR2 = shape2.y + shape2.height + shape2.lineWidth;

                if(((XL2 >= XL1) && (XR2 <= XR1))||((XL2 >= XL1) && (XR2 >= XR1) && (XL2 <= XR1))||((XL2 <= XL1) && (XR2 <= XR1) && (XR2 >= XL1))||((XL2 <= XL1) && (XR2 >= XR1))){
                    if(((YL2 >= YL1) && (YR2 <= YR1))||((YL2 >= YL1) && (YR2 >= YR1) && (YL2 <= YR1))||((YL2 <= YL1) && (YR2 <= YR1) && (YR2 >= YL1))||((YL2 <= YL1) && (YR2 >= YR1))){
                        return true;
                    }
                }
                return false;
            }
            var circle_intersection = function(shape1, shape2){
                var X1 = shape1.x;
                var Y1 = shape1.y;
                var radius1 = shape1.radius;

                var X2 = shape2.x;
                var Y2 = shape2.y;
                var radius2 = shape2.radius;

                var distance = Math.sqrt(Math.pow(X1-X2,2)+Math.pow(Y1-Y2,2));
                if(distance <= radius1+radius2){
                    return true;
                } else {
                    return false;
                }
            }
            var object_intersection = function(obj1, obj2){
                for(var i in obj1.collection) {
                    var shape1 = obj1.collection[i];
                    for(var j in obj2.collection) {
                        var shape2 = obj2.collection[j];
                        if(shape1 != shape2) {
                            if(shape1.shapeType == 'rect' && shape2.shapeType == 'rect' && FLAG == false){
                                return rect_intersection(shape1,shape2) || false;
                            }
                            if(shape1.shapeType == 'circle' && shape2.shapeType == 'circle' && FLAG == false){
                                return circle_intersection(shape1,shape2) || false;
                            }
                            if(shape1.type == 'object' && shape2.type == 'object' && FLAG == false){
                                return object_intersection(shape1,shape2) || false;
                            }
                            return false;
                        }
                    }
                }
            }

            for(var i in this.collection)
            {
                var shape1 = this.collection[i];
                for(var j in this.collection)
                {
                    var shape2 = this.collection[j];
                    if(shape2 != shape1){

                        var FLAG = false;
                        if(shape1.shapeType == 'rect' && shape2.shapeType == 'rect' && FLAG == false){
                            FLAG = rect_intersection(shape1,shape2) || false;
                        }
                        if(shape1.shapeType == 'circle' && shape2.shapeType == 'circle' && FLAG == false){
                            FLAG = circle_intersection(shape1,shape2) || false;
                        }
                        if(shape1.type == 'object' && shape2.type == 'object' && FLAG == false){
                            FLAG = object_intersection(shape1,shape2) || false;
                        }

                        if(FLAG && typeof(this.intersection) == 'function'){
                            this.intersection.call(this,shape1, shape2, stage);
                        }
                    }
                }
            }
        },
        __mouse_move: function(stage) {
        },
        _event: function(stage) {
            this.__intersection.call(this,stage);
            this.__mouse_move.call(this,stage);

            for(var i in this.collection) {
                if(typeof this.collection[i]._event == 'function')
                {
                    this.collection[i]._event.call(this.collection[i], stage);
                }
            }

        }

    }
});
