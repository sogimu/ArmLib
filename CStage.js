var CStage = Class({
    construct: function(O){
        if(typeof(O.fps) != 'undefined') {this.fps = O.fps}
        if(typeof(O.width) != 'undefined') {this.width = O.width}
        if(typeof(O.height) != 'undefined') {this.height = O.height}
        if(typeof(O.container) != 'undefined') {
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
        context: {},
        events: {},
        fps: 10,
        intervalId: null,
        width: 500,
        height: 500
    },

    methods:{

        add: function(O) {
            if(typeof O == 'object' && (O.type == 'shape' || O.type == 'object')){
                O.context = this.context;
                this.collection.push(O);
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
        _event: function(stage) {
            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(typeof obj._event == 'function')
                {
                    obj._event.call(obj, stage);
                }
            }

        },

        _begin: function(stage) {
            for(var i in this.collection)
            {
                if(typeof this.collection[i]._begin == 'function')
                {
                    this.collection[i]._begin.call(this.collection[i],stage);
                }
            }

        },
        _clean: function(stage) {
            this.context.clearRect(0,0,stage.width,stage.height);
            //obj._clean.call(obj,stage);

        },
        _process: function() {
            this._clean.call(this,this);
            this._update.call(this,this);
            this._draw.call(this,this);
            this._event.call(this,this);
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

        _init: function() {
            var self = this;
            document.onkeydown = function(e) {
                self._onkeydown(e);
            }
        },

        _onkeydown: function(e) {
            for(var i in this.collection)
            {
                var obj = this.collection[i];
                if(typeof obj._onkeydown == 'function')
                {
                    obj._onkeydown.call(obj, e, this);
                }
            }

        },

        set collection(O) {
            this._collection = O;
        },
        get collection() {
            return this._collection;
        }
    }
});