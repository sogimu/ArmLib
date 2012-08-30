CRect = Class({
    base: CShape,
    construct: function(O){
        if(typeof(O) != 'undefined') {
            if(typeof(O.x) == 'number') {this.setX(O.x)} else {this.setX(0);}
            if(typeof(O.y) == 'number') {this.setY(O.y)} else {this.setY(0);}
            if(typeof(O.width) == 'number') {this.setWidth(O.width)} else {this.setWidth(100);}
            if(typeof(O.height) == 'number') {this.setHeight(O.height)} else {this.setHeight(100);}
            if(typeof(O.stroke) == 'string') {this.setStroke(O.stroke)} else {this.setStroke('black');}
            if(typeof(O.fill) == 'string') {this.setFill(O.fill)} else {this.setFill('gray');}
            if(typeof(O.context) != 'undefined') {this.setContext(O.context);}
        }
    },
    vars:{
        width: 10,
        height: 10,
        fill: '#abc'
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
        draw: function() {
            this.context.beginPath();
            this.context.rect(this.x, this.y, this.width, this.height);
            this.context.fillStyle = this.fill;
            this.context.fill();
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = this.stroke;
            this.context.stroke();
        },
        update: function() {
        }
    }
});
