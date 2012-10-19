var CObject = Class({
    base: CSuperObj,

    construct: function(O){
        if( isSet(O) ) {

            if( isTPoint(O.center) ) {
                this.x = O.center.x;
                this.y = O.center.y;
                this.globalCenter = O.center;
                this.localCenter = O.center;

            }

            if( isTNumber(O.x) ) {
                this.x = O.x;
            }

            if( isTNumber(O.y) ) {
                this.y = O.y;
            }

            if( isTPoint(O.rotateCenter) ) {
                this.rotateCenter = {x: O.rotateCenter.x, y: O.rotateCenter.y};
                this.localRotateCenter = {x: O.rotateCenter.x, y: O.rotateCenter.y};

            }
            if( isTNumberPos(O.angel) ) {
                this.globalAngel = O.angel;
                this.localAngel = O.angel;
                this.angel = O.angel;
            }

            if( isTArray(O.collection) ) {
                for (var i in O.collection)
                {
                    if( isTArmShape(O.collection[i]) || isTArmObject(O.collection[i]) ) {
                        this.add( O.collection[i] );
                    }
                }
            }

            if( isTArray(O.skeleton) ) {
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
                    //newClass.prototype.__defineGetter__(m, getter);
                    //newClass.prototype.__defineSetter__(m, setter);
                }
            };

            if( isTFunc(O.begin) ) {this.begin = O.begin};
            if( isTFunc(O.update) ) {this.update = O.update};

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
        collection: [],
        skeleton: {},
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

            var skeleton = this.skeleton;
            /*stage.context.beginPath();
            for(var i in skeleton.segments) {
                stage.context.moveTo(skeleton.segments[i].p0[0], skeleton.segments[i].p0[1]);
                stage.context.lineTo(skeleton.segments[i].p1[0], skeleton.segments[i].p1[1])
                stage.context.lineWidth = 1;
                stage.context.strokeStyle = "#0f0";
            }
            stage.context.closePath();
            */
            stage.context.beginPath();
            stage.context.moveTo(this.rotateCenter.x, this.rotateCenter.y);
            stage.context.arc(this.rotateCenter.x, this.rotateCenter.y, 2, Math.PI * 2, false);
            this.context.stroke();
            this.context.fillStyle = "#a00";
            this.context.fill();
            stage.context.closePath();

            stage.context.beginPath();
            stage.context.moveTo(this.globalCenter.x, this.globalCenter.y);
            stage.context.arc(this.globalCenter.x, this.globalCenter.y, 2, Math.PI * 2, false);
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



