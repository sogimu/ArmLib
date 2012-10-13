var CCircle = Class({
    base: CShape,
    construct: function(O){
        if(typeof(O) != 'undefined') {
            if(typeof O.x == 'number') {this.x = O.x;}
            if(typeof O.y == 'number') {this.y = O.y;}
            if(typeof O.stroke == 'string') {this.x = O.stroke;}
            if(typeof O.fill == 'string') {this.fill = O.fill;}
            if(typeof O.name != 'undefined') {this.name = O.name;}
            if(typeof O.context != 'undefined') {this.x = O.stroke;}
            if(typeof(O.radius) != 'undefined' && O.radius > 0) {this.radius = O.radius}
            if(typeof(O.lineWidth) != 'undefined' && O.lineWidth > 0) {this.lineWidth = O.lineWidth;}
        }
    },
    vars: {
        radius: 100,
        fill: 'gray',
        shapeType: 'circle'
    },

    methods:{
        _clean: function(stage) {
            var lineWidth = this.lineWidth;
            this.context.clearRect(this.x-this.radius-this.lineWidth,this.y-this.radius-this.lineWidth,this.x+this.radius+this.lineWidth,this.y+this.radius+this.lineWidth);
        },

        _draw: function(stage) {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.context.closePath();
            this.context.fillStyle = this.fill;
            this.context.fill();
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = this.stroke;
            this.context.stroke();
        }
    }
});
