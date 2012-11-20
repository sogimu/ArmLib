var CText = Class({
    base: CShape,
    construct: function(O){
        if(typeof(O) != 'undefined') {
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.localCenter = {x: this.x, y: this.y};
            this.globalCenter = {x: this.x, y: this.y};

            this.localAngel = O.angel || this.localAngel;
            this.globalAngel = this.localAngel;

            this.rotateCenter = O.rotateCenter || this.rotateCenter;

            this.text = O.text || this.text;
            this.font = O.font || this.font;
            this.size = O.size || this.size;
            this.stroke = O.stroke || this.stroke;
            this.fill = O.fill || this.fill;
            this.context = O.context || this.context;
            this.name = O.name || this.name;
        }
    },
    vars: {
        x: 10,
        y: 10,
        text: 'text',
        font: '50px Tahoma',
        size: 75,
        textAlign: 'left',
        fill: 'gray',
        shapeType: 'text'
    },

    methods:{
        _clean: function(stage) {
        },
        _draw: function(stage) {
            this.context.save();
            this.context.translate(this.rotateCenter.x, this.rotateCenter.y);
            this.context.rotate(this.globalAngel*Math.PI/180);
            this.context.translate(-(this.rotateCenter.x), -(this.rotateCenter.y));
            this.context.strokeStyle = this.stroke;
            this.context.fillStyle = this.fill;
            this.context.font = this.size +"px '"+this.font+"'";
            this.context.fillText(this.text, this.x, this.y);

            this.context.restore();

        }
    }
});
