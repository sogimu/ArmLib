var CRect = Class({
    base: CShape,
    construct: function(O){
        if(typeof(O) != 'undefined') {
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.stroke = O.stroke || this.stroke;
            this.fill = O.fill || this.fill;
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
        fill: 'gray',
        event: {},
        shapeType: 'rect'
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
        setFill: function(O) {
            this.fill = O;
        },
        getFill: function() {
            return fill;
        },
        _clean: function() {
            var lineWidth = this.lineWidth;
            this.context.clearRect(this.x-(0.5*lineWidth)-1,this.y-(0.5*lineWidth)-1,this.width+(1*lineWidth)+2,this.height+(1*lineWidth)+2);
        },
        _draw: function() {
            //this._clean()
            this.context.beginPath();
            this.context.rect(this.x, this.y, this.width, this.height);
            this.context.fillStyle = this.fill;
            this.context.fill();
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = this.stroke;
            this.context.stroke();
        }
    }
});
