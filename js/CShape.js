CShape = Class({
    base: CSuperObj,
    construct: function(){
    },
    vars: {
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
        }
    }
});
