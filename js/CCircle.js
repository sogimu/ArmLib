CCircle = Class({
    base: CShape,
    construct: function(O){
        if(typeof(O) != 'undefined') {
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.stroke = O.stroke || this.stroke;
            this.fill = O.fill || this.fill;
            this.context = O.context || this.context;
            this.name = O.name || this.name;
            if(typeof(O.radius) != 'undefined' && O.radius > 0) {this.radius = O.radius}
            if(typeof(O.lineWidth) != 'undefined' && O.lineWidth > 0) {this.setLineWidth(O.lineWidth);}

            var event = O.event || {};
            for (var m in event)
            {
                if(typeof event[m] == 'function')
                {
                    this[m] = event[m];
                }
            }

        }
    },
    vars: {
        radius: 100,
        fill: 'gray',
        event: {}
    },

    methods:{
        setRidius: function(O) {
            this.radius = O;
        },
        getRidius: function() {
            return this.radius;
        },
        setFill: function(O) {
            this.fill = O;
        },
        getFill: function() {
            return fill;
        },
        _clean: function() {
            var lineWidth = this.lineWidth;
            this.context.clearRect(this.x-this.radius,this.y-this.radius,this.x+this.radius,this.y+this.radius);
        },
        _draw: function() {
            //this._clean()

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
