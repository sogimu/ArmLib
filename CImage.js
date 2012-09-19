CImage = Class({
    base: CShape,
    construct: function(O){
        if(typeof(O) != 'undefined') {
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.angle = O.angle || this.angle;
            this.stroke = O.stroke || this.stroke;
            this.image = O.image || this.image;
            this.context = O.context || this.context;
            this.name = O.name || this.name;
            if(typeof(O.width) != 'undefined' && O.width > 0) {this.setWidth(O.width)}
            if(typeof(O.height) != 'undefined' && O.height > 0) {this.setHeight(O.height)}
            if(typeof(O.lineWidth) != 'undefined' && O.lineWidth > 0) {this.setLineWidth(O.lineWidth);}
        }
    },
    vars: {
        width: 100,
        height: 100,
        angle: 0,
        shapeType: 'image'
    },

    methods:{
        setWidth: function(O) {
            this.width = O;
        },
        setHeight: function(O) {
            this.height = O;
        },
        getWidth: function() {
            return this.width;
        },
        getHeight: function() {
            return this.height;
        },
        setImage: function(O) {
            this.image = O;
        },
        getImage: function() {
            return this.image;
        },
        _clean: function() {
            var lineWidth = this.lineWidth;
            this.context.clearRect(this.x-(0.5*lineWidth)-1,this.y-(0.5*lineWidth)-1,this.width+(1*lineWidth)+2,this.height+(1*lineWidth)+2);
        },
        _draw: function() {
            this.context.save();
            this.context.translate(this.x + this.image.width / 2, this.y + this.image.height / 2);
            this.context.rotate(this.angle);
            this.context.translate(-(this.x + this.image.width / 2), -(this.y + this.image.height / 2));
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
            this.context.restore();
            //this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
});
