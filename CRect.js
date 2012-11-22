ArmLib.Shapes.$Rect = new Class({
    Extends: CShape,
    initialize: function(O){
        if(typeof(O) != 'undefined') {
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.angel = O.angel || this.angel;
            this.stroke = O.stroke || this.stroke;
            this.fill = O.fill || this.fill;
            this.context = O.context || this.context;
            this.name = O.name || this.name;
            if(typeof(O.width) != 'undefined' && O.width > 0) {this.width = O.width;}
            if(typeof(O.height) != 'undefined' && O.height > 0) {this.height = O.height;}
            if(typeof(O.lineWidth) != 'undefined' && O.lineWidth > 0) {this.lineWidth = O.lineWidth;}
        }
    },
	width: 100,
	height: 100,
	fill: 'gray',
	shapeType: 'rect',

        _clean: function(stage) {
            //var lineWidth = this.lineWidth;
            //this.context.clearRect(this.x-(0.5*lineWidth)-1,this.y-(0.5*lineWidth)-1,this.width+(1*lineWidth)+2,this.height+(1*lineWidth)+2);
        },
        _draw: function(stage) {
            this.context.save();
            this.context.translate(this.x + this.width / 2, this.y + this.height / 2);
            this.context.rotate( this.angel*Math.PI/180 );
            this.context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));

            this.context.beginPath();
            this.context.rect(this.x, this.y, this.width, this.height);
            this.context.closePath();
            this.context.fillStyle = this.fill;
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = this.stroke;

            this.context.fill();
            this.context.stroke();
            this.context.restore();

        }
});
