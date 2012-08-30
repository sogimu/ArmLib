CObject = Class({
    base: CSuperObj,

    construct: function(O){
        if(typeof(O) != 'undefined') {
            if(typeof(O.x) == 'number') {this.setX(O.x)} else {this.setX(0);}
            if(typeof(O.y) == 'number') {this.setY(O.y)} else {this.setY(0);}
            if(typeof(O.collection) == 'object') {this.setCollection(O.collection)}
            if(typeof(O.update) == 'function') {this.update = O.update}

        }
    },
	vars:{
		collection: [],
		objects: null
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
        setCollection: function(O) {
            this.collection = O;
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
        _draw: function() {
            for(var i in this.collection) {
                this.collection[i].draw();
                console.log('Object: draw')
            }
        },

        _update: function() {
            if(typeof this.update == 'function'){
                this.update();
            }

            for(var i in this.collection) {
                if(typeof this.collection[i]._update == 'function'){
                    this.collection[i]._update();
                    console.log('Object: _update');
                } else {
                    console.log('Object: is\'t _update function.')
                }
            }

        }
    }
});
