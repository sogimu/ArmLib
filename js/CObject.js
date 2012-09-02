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
        __intersection: function() {
            for(var i in this.collection)
            {
                var XL1 = this.collection[i].x - this.collection[i].lineWidth;
                var XR1 = this.collection[i].x + this.collection[i].width + this.collection[i].lineWidth;
                var YL1 = this.collection[i].y - this.collection[i].lineWidth;
                var YR1 = this.collection[i].y + this.collection[i].height + this.collection[i].lineWidth;
                for(var j in this.collection)
                {
                    if(this.collection[j] != this.collection[i]){
                        var XL2 = this.collection[j].x - this.collection[j].lineWidth;
                        var XR2 = this.collection[j].x + this.collection[j].width + this.collection[j].lineWidth;
                        var YL2 = this.collection[j].y - this.collection[j].lineWidth;
                        var YR2 = this.collection[j].y + this.collection[j].height + this.collection[i].lineWidth;

                        if(((XL2 >= XL1) && (XR2 <= XR1))||((XL2 >= XL1) && (XR2 >= XR1) && (XL2 <= XR1))||((XL2 <= XL1) && (XR2 <= XR1) && (XR2 >= XL1))||((XL2 <= XL1) && (XR2 >= XR1))){
                            if(((YL2 >= YL1) && (YR2 <= YR1))||((YL2 >= YL1) && (YR2 >= YR1) && (YL2 <= YR1))||((YL2 <= YL1) && (YR2 <= YR1) && (YR2 >= YL1))||((YL2 <= YL1) && (YR2 >= YR1))){
                                var arg = [this.collection[i],this.collection[j]];
                                if(typeof(this.intersection) == 'function') {this.intersection.call(this,arg[0]||{}, arg[1]||{});}
                            }
                        }
                    }
                }
            }
        },
        __mouse_move: function() {

        },
        _event: function() {
            this.__intersection();
            this.__mouse_move();

            for(var i in this.collection) {
                if(typeof this.collection[i]._event == 'function')
                {
                    this.collection[i]._event();
                }
            }

        }

    }
});
