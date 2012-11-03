var CStage = Class({
    construct: function(O){

        this.fps = O.fps || this.fps;
        this.width = O.width || this.width;
        this.height = O.height || this.height;

        if( O.container ) {
            var container = document.getElementById( O.container )
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.style.id = '2k2nd';
            container.appendChild( canvas );
            this.context = canvas.getContext('2d');
        } else {
            throw Error('The container is not found! Choose right name of container, please!');
        }
        this._init();
    },
    vars: {
        collection: [],
        collectionObjects: [],
        context: {},
        events: {},
        fps: 10,
        intervalId: null,
        finfo: false,
        width: 500,
        height: 500
    },

    methods:{

        add: function(O) {
            if(typeof O == 'object' && (O.type == 'shape' || O.type == 'object')){
                O.context = this.context;
                this.collection.push(O);
                // Добавить все объекты в collectionObjects
                this.addObjCollection(O);

            } else {
                throw Error('Stage: add(O) -> O is not shape or object!');
            }
        },
        remove: function(O){
            if(typeof O == 'object' && (O.type == 'shape' || O.type == 'object')){
                for(var i in this.collection){
                    if(this.collection[i] == O){
                        delete this.collection[i];
                    }
                }
            } else {
                throw Error('Stage: remove(O) -> O is not shape or object!');
            }
        },

        addObjCollection: function(O) {
            if( isTArmObject(O) ) {
                for(var i in O.collection) {
                    if( isTArmObject(O.collection) ) {
                        this.addObjCollection(O.collection);
                    }
                }
                this.collectionObjects.push(O);
            }
        },

        _init: function() {
            var self = this;
            document.onkeydown = function(e) {
                self._onkeydown(e);
            }
        },

        _begin: function(stage) {
            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(typeof obj._begin == 'function')
                {
                    obj._begin.call(obj,stage);
                }
            }

        },

        _clean: function(stage) {
            this.context.clearRect(0,0,stage.width,stage.height);
            //obj._clean.call(obj,stage);

        },
        _updateSkeleton: function(stage) {
            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(typeof obj._updateSkeleton == 'function')
                {
                    obj._updateSkeleton.call(obj,stage);
                }
            }
        },
        _update: function(stage) {
            for(var i in this.collection)
            {

                var obj = this.collection[i];
                if(typeof obj._update == 'function')
                {
                    obj._update.call(obj,stage);
                }
            }

        },

        _draw: function(stage) {

            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(typeof obj._draw == 'function')
                {
                    obj._draw.call(obj,stage);
                }
            }

        },

        _info: function(stage) {

            if(this.finfo == true) {
                for(var i in this.collection)
                {
                    var obj = this.collection[i];
                    if(typeof obj._info == 'function')
                    {
                        obj._info.call(obj,this);
                    }
                }
            }

        },

        _event: function(stage) {
            //console.log( this.collectionObjects[0].functions[0].B )

            for(var i in this.collectionObjects)
            {
                var objI = this.collectionObjects[i];
                if( isSet(objI.events) && isTFunc(objI.events.collision) ) {
                    for(var j in this.collectionObjects)
                    {
                        var objJ = this.collectionObjects[j];
                        if( objI != objJ ) {
                            // здесь фиксируются события
                            var res = this.__collision(objI,objJ);
                            if( res.flag == true ) {
                                objI.events.collision.call(objI, objJ, res.points , stage);
                            }

                        }
                    }
                }

            }

        },
        __collision: function(a,b) {
            function det (a,b,c,d) {
                return a * d - b * c;
            }

            function own (x, x0, x1) {
                if( ( (x0 < x1) && (x >= x0 && x <= x1) ) || ( (x0 > x1) && (x >= x1 && x <= x0) )/* || ( (x0 == x1) && (Math.round(x) == x0) )*/ ) {
                    return true;
                } else {
                    return false;
                }
            }
            function collision(a,b) {
                if( (b.x0 >= a.x0 && b.x0 <= a.x1) || (b.x1 >= a.x0 && b.x1 <= a.x1) || (a.x0 >= b.x0 && a.x0 <= b.x1) || (a.x1 >= b.x0 && a.x1 <= b.x1) ){
                    var EPS = 10E-9;
                    var zn = det (a.A, a.B, b.A, b.B);
                    if (Math.abs(zn) < EPS)
                        return {flag: false};
                    var x = - det (a.C, a.B, b.C, b.B) / zn;
                    if( own(x, a.x0, a.x1) && own(x, b.x0, b.x1) ) {
                        var y = - det (a.A, a.C, b.A, b.C) / zn;
                        var obj = {x: x, y:y, flag: true};
                        return obj;
                    } else {
                        return {flag: false};
                    }
                } else {
                    return {flag: false};
                }
            }
            var points = [];
            for(var i in a.functions) {
                for(var j in b.functions) {
                    var res = collision( a.functions[i],b.functions[j] );
                    if( res.flag ) {
                        points.push( {x: res.x, y: res.y} );
                    }
                }
            }

            if( points.length > 0 ) {
                return {flag: true, points: points};
            } else {
                return {flag: false};
            }
        },

        _onkeydown: function(e) {
            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if( isTFunc(obj._onkeydown) )
                {
                    obj._onkeydown.call(obj, e, this);
                }
            }

        },

        _process: function() {
			stats.begin();

            this._clean.call(this,this);
            //this._updateSkeleton.call(this,this);
            this._update.call(this,this);
            this._draw.call(this,this);
            this._info.call(this,this);
            this._event.call(this,this);

            stats.end();
        },

        run: function() {
            this._begin.call(this,this);

            var self = this;
            this.intervalId = setInterval( function() {self._process.call(self)}, 1000/this.fps );
            if ( this.intervalId ){
                console.log("Stage, run()");
            } else {
                throw Error("Stage, can't run!");
            }
        },

        stop: function() {
            try {
                clearInterval( this.intervalId )
                console.log("Stage, stop()");
            }
            catch(e) {
                console.log(e);
            }
        },
        info: function() {
            if(this.finfo == false) {
                this.finfo = true;
            } else {
                this.finfo = false;
            }
            console.log('Stage, info()');
            return null;
        }
    }
});