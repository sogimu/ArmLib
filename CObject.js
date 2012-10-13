var CObject = Class({
    base: CSuperObj,

    construct: function(O){
        if( isSet(O) ) {

            if( isTObject(O.vars)) {
                for (var m in O.vars)
                {
                    this[m] = O.vars[m];
                }
            };

            if( isTFunc(O.begin) ) {this.begin = O.begin};
            if( isTFunc(O.update) ) {this.update = O.update};

            this.collection = {};
            if( isTArray(O.collection) && (O.collection.length >= 1) ) {
                for (var i in O.collection)
                {
                    if(O.collection[i].type == 'shape' || O.collection[i].type == 'object') {
                        this.add( O.collection[i] );
                    }
                }
            }

            if( isSet(O.skeleton) && isSet(O.skeleton.segments) && isSet(O.skeleton.center) ) {
                this._skeleton.segments = O.skeleton.segments;
                this._skeleton._segments = O.skeleton.segments;
                this._skeleton.center = O.skeleton.center || {x:this.skeleton.segments[0].x0,y:sthis.skeleton.segments[0].y0};
                this._skeleton._center = this._skeleton.center;
                this._skeleton.functions = [];

                for(var i in this._skeleton.segments) {
                    var obj = this._skeleton.segments;
                    if(obj[i].x0>=0 && obj[i].y0>=0 && obj[i].x1>=0 && obj[i].y1>=0) {
                        var x0 = obj[i].x0;
                        var y0 = obj[i].y0;
                        var x1 = obj[i].x1;
                        var y1 = obj[i].y1;
                        var k = (y1-y0)/(x1-x0);
                        var b = y0 - k*x0;

                        var segment = {};
                        segment.k = k;
                        segment.b = b;

                        segment.x0 = x0;
                        segment.x1 = x1;
                        this._skeleton.functions.push( segment );
                    }
                }
            }

            if( isTObject(O.events) ) {
                for (var i in O.events)
                {
                    if(typeof O.events[i] == 'function') {
                        this[i] = O.events[i];
                    }
                }
            };

        }
    },
    vars: {
        collection: {},
        skeleton: {},

        type: 'object',
        count: -1
    },
    methods:{
        add: function(O) {
            if( isTArmObject(O) || isTArmShape(O) ){
                O.context = this.context;
                if( isSet(O.name) ) {
                    this.count++;
                    this.collection[ this.count ] = O;
                    this[ O.name ] = O;
                } else {
                    this.count++;
                    this.collection[ this.count ] = O;
                }
            } else {
                throw Error('Object: add() -> Incorrect object!');
            }
        },
        remove: function(O) {
            try{
                if( isTArmObject(O) || isTArmShape(O) ){
                    for(var i in this.collection){
                        if(this.collection[i] == O){
                            delete this.collection[i];
                        }
                    }
                } else {
                    throw Error('Object: remove(O) -> O is not shape or object!');
                }
            }
            catch(e){
                console.log(e);
            }
        },

        set collection(O) {
            if( isTObject(O) ) {
                this._collection = O;
                for(var i in O){
                    if(O[i].type == 'shape' || O[i].type == 'object') {
                        this.add( O[i] );
                    } else {
                        throw Error('Object: set collection(O) -> O is not shape or object!')
                    }
                }
            } else {
                throw Error('Object: set collection(O) -> is not js\'object!');
            }
        },
        get collection() {
            return isTObject(this._collection);
        },

        set context(O) {
            this._context = O;
            for(var i in this.collection) {
                this.collection[i].context = O;
            }
        },
        get context() {
            return this._context;
        },

        _begin: function(stage) {

            if(typeof this.begin == 'function') {
                this.begin.call(this,stage);
            }

            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(typeof obj.begin == 'function' && obj != this ) {
                    obj.begin.call(obj,stage);
                }
            }
        },

        _clean: function(stage) {
            var obj = this.collection[i];
            for(var i in this.collection) {
                obj._clean.call(obj,stage);
            }
        },

        _updateSkeleton: function(stage) {
            var segments = this.skeleton.segments;
            var _segments = this.skeleton._segments;
            var center = this.skeleton.center;
            var _center = this.skeleton._center;

            var skeleton = {};
            skeleton.segments = [];
            skeleton._segments = _segments;
            skeleton.center = this.skeleton.center;
            skeleton._center = _center;
            skeleton.functions = [];

            for(var i in segments)
            {
                var segment = {};
                segment.x0 = _segments[i].x0 + this.x;
                segment.y0 = _segments[i].y0 + this.y;
                segment.x1 = _segments[i].x1 + this.x;
                segment.y1 = _segments[i].y1 + this.y;
                skeleton.segments.push( segment );

                var func = {};
                    func.k = (segment.y1-segment.y0)/(segment.x1-segment.x0);
                    func.b = segment.y0 - func.k*segment.x0;

                    func.x0 = segment.x0;
                    func.x1 = segment.x1;

                skeleton.functions.push( func );

            }
            skeleton.center = {x:skeleton._center.x + this.x, y:skeleton._center.y + this.y};

            this.skeleton = skeleton;

            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(obj._updateSkeleton) {
                    obj._updateSkeleton.call(obj,stage);
                }
            }

        },

        _update: function(stage) {
            if( isTFunc(this.update) ) {
                this.update.call(this,stage);
            }

            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(obj.update) {
                    obj.update.call(obj,stage);
                }
            }

        },

        _draw: function(stage) {
            for(var i in this.collection) {
                var obj = this.collection[i];
                obj._draw.call(obj,stage);
            }

        },

        _info: function(stage) {

            var skeleton = this.skeleton;
            stage.context.beginPath();
            for(var i in skeleton.segments) {
                stage.context.moveTo(skeleton.segments[i].x0, skeleton.segments[i].y0);
                stage.context.lineTo(skeleton.segments[i].x1, skeleton.segments[i].y1)
                stage.context.lineWidth = 1;
                stage.context.strokeStyle = "#0f0";
            }
            stage.context.closePath();
            stage.context.moveTo(skeleton.center.x, skeleton.center.y);
            stage.context.arc(skeleton.center.x, skeleton.center.y, 2, Math.PI * 2, false);

            this.context.stroke();
            this.context.fillStyle = "#a00";
            this.context.fill();

            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(typeof obj._info == 'function')
                {
                    obj._info.call(obj,this);
                }
            }

        },

        _event: function(stage) {
            this.__intersection.call(this,stage);

            for(var i in this.collection)
            {
                if(typeof this.collection[i]._event == 'function')
                {
                    this.collection[i]._event.call(this.collection[i], stage);
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

        _onkeydown: function(e, stage) {
            if(typeof this.onkeydown == 'function'){
                this.onkeydown.call(this, e, stage);
            }

            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(typeof obj._onkeydown == 'function')
                {
                    var obj = this.collection[i];
                    obj._onkeydown.call(obj, e, stage);
                }
            }

        }

    }
});



