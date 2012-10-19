CImage = Class({
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
            this.image = O.image || this.image;
            if( isSet(O.src) && isTString(O.src) ) {
            (function(O,src) {
                var self = O;
                var image = new Image();
                image.src = src;
                image.onload = function() {
                    self.image = image;
                    self.onload = true;
                }
            })(this, O.src);

            }
            this.context = O.context || this.context;
            this.name = O.name || this.name;
            this.width = O.width;
            this.height = O.height;
        }
    },
    vars: {
        width: 100,
        height: 100,
        image: new Image(),
        onload: false,
        shapeType: 'image'
    },

    methods:{
        _clean: function(stage) {
            //var lineWidth = this.lineWidth;
            //this.context.clearRect(this.x-(0.5*lineWidth)-1,this.y-(0.5*lineWidth)-1,this.width+(1*lineWidth)+2,this.height+(1*lineWidth)+2);
        },

        _draw: function(stage) {
            if(this.onload == true) {
                this.context.save();
                this.context.translate(this.rotateCenter.x, this.rotateCenter.y);
                this.context.rotate(this.globalAngel*Math.PI/180);
                this.context.translate(-(this.rotateCenter.x), -(this.rotateCenter.y));
                this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
                this.context.restore();
            }
        }
    }
});
