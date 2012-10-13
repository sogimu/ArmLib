CImage = Class({
    base: CShape,
    construct: function(O){
        if(typeof(O) != 'undefined') {
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.angel = O.angel || this.angel;
            this.center = O.center || this.center;
            this.stroke = O.stroke || this.stroke;
            this.image = O.image || this.image;
            this.context = O.context || this.context;
            this.name = O.name || this.name;
            if(typeof(O.width) != 'undefined' && O.width > 0) {this.width = O.width;}
            if(typeof(O.height) != 'undefined' && O.height > 0) {this.height = O.height;}
            if(typeof(O.lineWidth) != 'undefined' && O.lineWidth > 0) {this.lineWidth = O.lineWidth;}
        }
    },
    vars: {
        width: 100,
        height: 100,
        shapeType: 'image'
    },

    methods:{
        _clean: function(stage) {
            //var lineWidth = this.lineWidth;
            //this.context.clearRect(this.x-(0.5*lineWidth)-1,this.y-(0.5*lineWidth)-1,this.width+(1*lineWidth)+2,this.height+(1*lineWidth)+2);
        },

        _draw: function(stage) {
            this.context.save();
            this.context.translate(this.center.x, this.center.y);
            this.context.rotate(this.angel*Math.PI/180);
            this.context.translate(-(this.center.x), -(this.center.y));
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
            this.context.restore();
        }
    }
});
