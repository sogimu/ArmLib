CObject = Class({
    base: CSuperObj,

    construct: function(O){
        if(typeof(O) != 'undefined') {

            var vars = O.vars || {};
            for (var m in vars)
            {
                this[m] = vars[m];
            }
            this._begin = O.begin || function() {};
            this._update = O.update || function() {};

            if(typeof(O.collection) == 'object') {
                this.setCollection(O.collection);
                for(var i in O.collection)
                {
                    O.collection[i].parent = this;
                }
            }
            var event = O.event || {};
            for (var m in event)
            {
                this[m] = event[m];
            }

        } else {
            throw Error('Is\'t arguments for object!');
        }
    },
    vars: {
        collection: [],
        type: 'object'
    },
    methods:{
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
                this.collection[i]._draw();
            }
        },
        _clean: function() {
            for(var i in this.collection) {
                this.collection[i]._clean();
            }
        },
        _update: function() {
            if(typeof this.update == 'function'){
                this._update();
            }

            for(var i in this.collection) {
                if(typeof this.collection[i]._update == 'function'){
                    this.collection[i]._update();
                }
            }

        },
        _event: function() {
            if(typeof(this.intersection) == 'function') {this.intersection()};
            if(typeof(this.mouse_move) == 'function') {this.mouse_move()};

            for(var i in this.collection) {
                if(typeof this.collection[i]._event == 'function')
                {
                    this.collection[i]._event();
                }
            }

        }

    }
});
