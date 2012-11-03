var CObject = Class({
    base: CSuperObj,

    construct: function(O){
        if( isSet(O) ) {
            this.name = O.name || this.name;

            if( isTPoint(O.center) ) { // Установить center, globalCenter, localCenter
                this.x = O.center.x;
                this.y = O.center.y;
                this.globalCenter = { x: O.center.x, y: O.center.y };
                this.localCenter = { x: O.center.x, y: O.center.y };

            }

            if( isTNumber(O.x) ) {
                this.x = O.x;
            }

            if( isTNumber(O.y) ) {
                this.y = O.y;
            }

            if( isTPoint(O.rotateCenter) ) { // Установить rotateCenter, localRotateCenter
                this.rotateCenter = {x: O.rotateCenter.x, y: O.rotateCenter.y};
                this.localRotateCenter = {x: O.rotateCenter.x, y: O.rotateCenter.y};

            }
            if( isTNumberPos(O.angel) ) { // Установить angel, localAngel, globalAngel
                this.globalAngel = O.angel;
                this.localAngel = O.angel;
                this.angel = O.angel;
            }

            if( isTArray(O.collection) ) {
                this.collection = [];
                for (var i in O.collection)
                {
                    if( isTArmShape(O.collection[i]) || isTArmObject(O.collection[i]) ) {
                        this.add( O.collection[i] );
                    }
                }
            }

            if( isTArray(O.skeleton) ) {
                // _init
                var tmpSegments = [];
                var obj = O.skeleton;
                for(var i in obj) {
                    var x0 = obj[i].x0;
                    var y0 = obj[i].y0;
                    var x1 = obj[i].x1;
                    var y1 = obj[i].y1;
                    tmpSegments.push( {p0: [x0,y0,1], p1: [x1,y1,1]} );
                }
                this.nativeSegments = tmpSegments;
                this.segments = tmpSegments;
                /*
                // _setFunction
                this.functions = []; // что бы вынести function из prototype

                for(var i in this.nativeSegments) {
                    var obj = this.nativeSegments;
                    if( isTNumberPos(obj[i]['p0'][0]) && isTNumberPos(obj[i]['p0'][1]) && isTNumberPos(obj[i]['p1'][0]) && isTNumberPos(obj[i]['p1'][1]) ) {
                        var x0 = obj[i]['p0'][0];
                        var y0 = obj[i]['p0'][1];
                        var x1 = obj[i]['p1'][0];
                        var y1 = obj[i]['p1'][1];
                        var k = ((x1-x0) != 0) ? (y1-y0)/(x1-x0) : (y1-y0)/0.001;
                        var b = y0 - k*x0;

                        var segment = {};
                        segment.k = k;
                        segment.b = b;

                        segment.x0 = x0;
                        segment.x1 = x1;
                        this.functions.push( segment );
                    }
                }
                */

                this.functions = []; // что бы вынести function из prototype

                var obj = this.nativeSegments;
                for(var i in obj) {
                    var A = obj[i].p0[1] - obj[i].p1[1];
                    var B = (obj[i].p1[0] - obj[i].p0[0])+0.00001;
                    var C = obj[i].p0[0]*obj[i].p1[1] - obj[i].p1[0]*obj[i].p0[1];
                    var x0 = obj[i].p0[0];
                    var x1 = obj[i].p1[0];
                    this.functions.push( {A:A, B:B, C:C, x0:x0, x1:x1} );
                }
                // _translateTo

                var newPoint = this.globalCenter;

                var tmpSegments = [];
                for(var i in this.nativeSegments) {
                    var obj = this.nativeSegments[i];
                    var x0 = obj['p0'][0] + newPoint.x;
                    var y0 = obj['p0'][1] + newPoint.y;
                    var x1 = obj['p1'][0] + newPoint.x;
                    var y1 = obj['p1'][1] + newPoint.y;
                    tmpSegments.push( {p0: [x0,y0,1], p1: [x1,y1,1]} );
                }
                this.segments = tmpSegments;

                //this.center = { x: newPoint.x, y: newPoint.y };
                //this.skeleton = new CSkeleton({segments: O.skeleton, center: this.center, rotateCenter: this.rotateCenter, angel: this.angel});
            }
            if( isTObject(O.vars)) {
                for (var m in O.vars)
                {
                    var vars = O.vars;
                    this[m] = vars[m];
                    var getter = function(O) {
                        var key = m;
                        var value = vars[m];
                        switch( type( value ) ) {
                            case 'String' : {
                                return function() {
                                    return TString( this[key] );
                                }
                            }
                            case 'Number' : {
                                return function() {
                                    return TNumber( this[key] );
                                }
                            }
                            case 'Boolean' : {
                                return function() {
                                    return TBool( this[key] );
                                }
                            }
                            case 'Array' : {
                                return function() {
                                    return TArray( this[key] );
                                }
                            }
                            case 'Date' : {
                                return function() {
                                    return TDate( this[key] );
                                }
                            }
                            default: {
                                return function() {
                                    return this[key];
                                }
                            }

                        }
                    }(m);

                    var setter = function(O) {
                        var key = m;
                        var value = vars[m];
                        switch( type( value ) ) {
                            case 'String' : {
                                return function(O) {
                                    this[key] = TString(O);
                                }
                            }
                            case 'Number' : {
                                return function(O) {
                                    this[key] = TNumber(O);
                                }
                            }
                            case 'Boolean' : {
                                return function(O) {
                                    this[key] = TBool(O);
                                }
                            }
                            case 'Array' : {
                                return function(O) {
                                    this[key] = TArray(O);
                                }
                            }
                            case 'Date' : {
                                return function(O) {
                                    this[key] = TDate(O);
                                }
                            }
                            default: {
                                return function(O) {
                                    this[key] = O;
                                }
                            }
                        }
                    }(m);

                    setter(vars[m]);
                    getter(vars[m]);
                }
            };

            if( isTFunc(O.begin) ) {this.begin = O.begin};
            if( isTFunc(O.update) ) {this.update = O.update};

            if( isTObject(O.events) ) {
                for (var i in O.events)
                {
                    if( isTFunc(O.events[i]) ) {
                        this.events = this.events || {};
                        this.events[i] = O.events[i];
                    }
                }
            };

        }
    },
    vars: {
        collection: [],
        skeleton: {},

        segments: [],
        nativeSegments: [],
        functions: [],

        name: 'undefined',
        type: 'object'

    },
    methods:{
        add: function(O) {
            if( isTArmObject(O) || isTArmShape(O) ){
                O.context = this.context;
                O.x += this.x;
                O.Y += this.y;
                O.globalCenter.x = O.localCenter.x + this.globalCenter.x;
                O.globalCenter.y = O.localCenter.y + this.globalCenter.y;

                O.rotateCenter = {x: this.rotateCenter.x, y: this.rotateCenter.y};
                O.localRotateCenter = {x: this.rotateCenter.x, y: this.rotateCenter.y};

                O.globalAngel = O.localAngel + this.globalAngel;
                O.angel = O.globalAngel;

                this.collection.push(O);
                if( isSet(O.name) ) {
                    this[ O.name ] = O;
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

            for(var i in this.collection) {
                var obj = this.collection[i];
                obj._clean.call(obj,stage);
            }
        },

        _updateSkeleton: function(stage) {
            for(var i in this.collection) {
                var obj = this.collection[i];

                this.globalCenter = {x: this.x, y: this.y};

                this.globalAngel = this.angel;

                this.rotateCenter = { x: this.localRotateCenter.x + this.x, y: this.localRotateCenter.y + this.y};

                obj.x = this.x + obj.localCenter.x;
                obj.y = this.y + obj.localCenter.y;
                obj.globalCenter = {x: obj.x, y: obj.y};

                obj.rotateCenter = this.rotateCenter;

                obj.globalAngel = this.angel + obj.localAngel;
                obj.angel = obj.globalAngel;
            }
            /*
            // _setFunction
            this.functions = []; // что бы вынести function из prototype

            for(var i in this.nativeSegments) {
                var obj = this.nativeSegments;
                if( isTNumberPos(obj[i]['p0'][0]) && isTNumberPos(obj[i]['p0'][1]) && isTNumberPos(obj[i]['p1'][0]) && isTNumberPos(obj[i]['p1'][1]) ) {
                    var x0 = obj[i]['p0'][0];
                    var y0 = obj[i]['p0'][1];
                    var x1 = obj[i]['p1'][0];
                    var y1 = obj[i]['p1'][1];
                    var k = ((x1-x0) != 0) ? (y1-y0)/(x1-x0) : (y1-y0)/0.001;
                    var b = y0 - k*x0;

                    var segment = {};
                    segment.k = k;
                    segment.b = b;

                    segment.x0 = x0;
                    segment.x1 = x1;
                    this.functions.push( segment );
                }
            }*/
            this.functions = []; // что бы вынести function из prototype

            var obj = this.segments;
            for(var i in obj) {
                var A = obj[i].p0[1] - obj[i].p1[1];
                var B = (obj[i].p1[0] - obj[i].p0[0])+0.00001;
                var C = obj[i].p0[0]*obj[i].p1[1] - obj[i].p1[0]*obj[i].p0[1];
                var x0 = obj[i].p0[0];
                var x1 = obj[i].p1[0];
                this.functions.push( {A:A, B:B, C:C, x0:x0, x1:x1} );
            }

            // _translateTo

            var newPoint = this.globalCenter;

            var tmpSegments = [];
            for(var i in this.nativeSegments) {
                var obj = this.nativeSegments[i];
                var x0 = obj['p0'][0] + newPoint.x;
                var y0 = obj['p0'][1] + newPoint.y;
                var x1 = obj['p1'][0] + newPoint.x;
                var y1 = obj['p1'][1] + newPoint.y;
                tmpSegments.push( {p0: [x0,y0,1], p1: [x1,y1,1]} );
            }
            this.segments = tmpSegments;

        },

        _update: function(stage) {

            if( isTFunc(this.update) ) {
                this.update.call(this,stage);
            }

            this._updateSkeleton.call(this,stage);

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

            var skeleton = this;
            stage.context.beginPath();
            for(var i in skeleton.segments) {
                stage.context.moveTo(skeleton.segments[i].p0[0], skeleton.segments[i].p0[1]);
                stage.context.lineTo(skeleton.segments[i].p1[0], skeleton.segments[i].p1[1])
                stage.context.lineWidth = 1;
                stage.context.strokeStyle = "#0f0";
            }
            //stage.context.closePath();

            //stage.context.beginPath();
            stage.context.moveTo(this.rotateCenter.x, this.rotateCenter.y);
            stage.context.arc(this.rotateCenter.x, this.rotateCenter.y, 2, Math.PI * 2, false);
            this.context.stroke();
            this.context.fillStyle = "#a00";
            this.context.fill();
            stage.context.closePath();

            stage.context.beginPath();
            stage.context.moveTo(this.globalCenter.x, this.globalCenter.y);
            stage.context.arc(this.globalCenter.x, this.globalCenter.y, 2, Math.PI * 2, false);

            this.context.fillStyle = "#abc";
            stage.context.font = "bold 14px 'sans-serif'";
            stage.context.fillText(this.name, this.globalCenter.x + 10, this.globalCenter.y);

            this.context.stroke();
            this.context.fillStyle = "#abc";
            this.context.fill();
            stage.context.closePath();

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
            //this.__intersection.call(this,stage);

            for(var i in this.collection)
            {
                if(typeof this.collection[i]._event == 'function')
                {
                    this.collection[i]._event.call(this.collection[i], stage);
                }
            }

        },

        _onkeydown: function(e, stage) {
            if( isTFunc(this.events.onkeydown) ){
                this.events.onkeydown.call(this, e, stage);
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



