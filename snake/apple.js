var image = new Image();
image.src = 'image/apple.png';

var apple = new CObject({
    collection: [ new CCircle({x: 25,y: 25, radius: 15}), new CImage({x: 25,y: 25, width: 40, height: 48, stroke: '#aaa', image: image})/*new CCircle({x: 25,y: 25, radius: 15, fill: 'green', name: 'shape1'}), new CCircle({x: 25,y: 25, radius: 10, name: 'shape2'})*/ ],
    vars: {
        x: 25,
        y: 25,
        width: 65,
        height: 50,
        radius: 25,
        name: 'apple',
        newPoint: function(stage) {
            this.x = this.radius + (stage.width - 2*this.radius) * Math.random();
            this.y = this.radius + (stage.height - 2*this.radius) * Math.random();
            this.collection[0].x = this.x + 25;
            this.collection[0].y = this.y + 25;

            //this.x = -this.width + stage.width * Math.random();
            //this.y = -this.height + stage.height * Math.random();
            this.collection[1].x = this.x;
            this.collection[1].y = this.y;
        }
    },
    begin: function(stage) {
        this.x = this.radius + (stage.width - 2*this.radius) * Math.random();
        this.y = this.radius + (stage.height - 2*this.radius) * Math.random();
        this.collection[0].x = this.x + 25;
        this.collection[0].y = this.y + 25;
        this.collection[1].x = this.x;
        this.collection[1].y = this.y;
        /*
        this.x = -this.width + stage.width * Math.random();
        this.y = -this.height + stage.height * Math.random();
        this.collection[0].x = this.x;
        this.collection[0].y = this.y;
        */
    },
    update: function(stage) {
    }
});
