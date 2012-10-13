var CLine = Class({
    base: CShape,
    construct: function(O){
        if(typeof(O) != 'undefined') {
            this.x0 = O.x0 || this.x;
            this.y0 = O.y0 || this.y;
            this.x1 = O.x1 || this.x+100;
            this.y1 = O.y1 || this.y+100;
            this.stroke = O.stroke || this.stroke;
            this.context = O.context || this.context;
            this.name = O.name || this.name;
            if(typeof(O.lineWidth) != 'undefined' && O.lineWidth > 0) {this.lineWidth = O.lineWidth;}
        }
    },
    vars: {
        x0: 10,
        y0: 10,
        x1: 100,
        y1: 100,

        shapeType: 'line'
    },

    methods:{
        _clean: function(stage) {
            //var lineWidth = this.lineWidth;
            //this.context.clearRect(this.x-(0.5*lineWidth)-1,this.y-(0.5*lineWidth)-1,this.width+(1*lineWidth)+2,this.height+(1*lineWidth)+2);
        },
        _draw: function(stage) {
            this.context.beginPath();
            this.context.moveTo(this.x0, this.y0);
            this.context.lineTo(this.x1, this.y1)
            this.context.closePath();
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = this.stroke;
            this.context.stroke();
        }
    }
});
