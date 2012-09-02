CStage = Class({
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

    },
    vars: {
        collection: [],
        context: {},
        fps: 10,
        intervalId: null,
        width: 500,
        height: 500
    },

    methods:{
        add: function(O) {
            O.setContext( this.context );
            this.collection.push(O);
        },
        _draw: function() {
            for(var i in this.collection)
            {
                this.collection[i]._draw();
                //console.log('Stage: _draw')
            }
        },
        _update: function() {
            for(var i in this.collection) {
                if(typeof this.collection[i]._update == 'function')
                {
                    this.collection[i]._update();
                }
            }

        },
        _event: function() {
            for(var i in this.collection) {
                if(typeof this.collection[i]._event == 'function')
                {
                    this.collection[i]._event();
                }
            }

        },
        _begin: function() {
            for(var i in this.collection)
            {
                if(typeof this.collection[i]._begin == 'function')
                {
                    this.collection[i]._begin();
                }
            }

        },
        _clean: function() {
            for(var i in this.collection)
            {
                if(typeof this.collection[i]._clean == 'function')
                {
                    this.collection[i]._clean();
                }
            }

        },
        _process: function() {
            if(this.collection[0]!='undefined'){
            this._clean();
            this._update();
            this._draw();
            this._event();
            }
        },

        run: function() {
            this._begin();

            var self = this;
            this.intervalId = setInterval( function() {self._process.call(self)}, 1000/this.fps );
            if ( this.intervalId ){
                console.log("Stage, run()");
            } else {
                throw Error("Stage, can't run!");
            }
        },
        stop: function() {
            if ( clearInterval( this.intervalId ) ) {
                console.log("Stage, stop()");
            } else {
                throw Error("Stage, can't stop!");
            }
        }
    }
});