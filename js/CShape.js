CShape = Class({
    base: CSuperObj,
    construct: function(){
    },
    vars:{
        x: 0,
        y: 0,
        stroke: '#aaa',
        lineWidth: 1
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
