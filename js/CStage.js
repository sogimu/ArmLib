CStage = Class({
    construct: function(O){
        this.collection = [];
        this.context = {};
        this.fps = 1;
        this.intervalId = null;

        var container = document.getElementById( O.container )
        var canvas = document.createElement('canvas');
        canvas.width = this.width = O.width;
        canvas.height = this.height = O.height;

        canvas.style.id = '2k2nd';
        container.appendChild( canvas );
        this.context = canvas.getContext('2d');
        if(typeof(O.fps) == 'number') {this.fps = O.fps}

    },
	vars:{
		collection: [],
		context: {},
        fps: 1,
        intervalId: null,
        width: 100,
        height: 100
		},
    methods:{
        add: function(O) {
            O.setContext( this.context );
            this.collection.push(O);
        },
        _draw: function() {
            this.context.clearRect(0,0,this.width,this.height);
            for(var i in this.collection) {
                this.collection[i]._draw();
                console.log('Stage: _draw')
            }
        },
        _update: function() {
            for(var i in this.collection) {
                if(typeof this.collection[i]._update == 'function'){
                    this.collection[i]._update();
                    console.log('Stage: _update');
                } else {
                    console.log('Stage: is\'t update function.')
                }
            }

        },
        _process: function() {
            this._update();
            this._draw();
        },

        run: function() {
            var self = this;
            this.intervalId = setInterval( function() {self._process.call(self)}, 1000/this.fps );
            if ( this.intervalId ) {
                console.log("Stage, run()");
            } else {
                console.log("Error: Stage, run()");
            }
        },
        stop: function() {
            if ( clearInterval( this.intervalId ) ) {
                console.log("Stage, stop()");
            } else {
                console.log("Error: Stage, stop()");
            }
        }
    }
});