CShape = Class({
    base: CSuperObj,
    construct: function(){
    },
    vars: {
        shapes: [],
        parent: 'no',
        stroke: 'black',
        lineWidth: 1,
        type: 'shape'
    },

    methods:{
        setStroke: function(O) {
            this.stroke = O;
        },
        getStroke: function() {
            return this.stroke;
        },
        setLineWidth: function(O) {
            this.lineWidth = O;
        },
        getLineWidth: function() {
            return this.lineWidth;
        }/*,

        _event: function() {
            console.log(this)
            if(typeof(this.intersection) == 'function') {this.intersection()};
            if(typeof(this.mouse_move) == 'function') {this.mouse_move()};
        }*/

    }
});
