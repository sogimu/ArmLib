var image = new Image();
image.src = 'image/apple.png';

var apple = new CObject({
    collection: [ new CCircle({x: 25,y: 25, radius: 15}), new CImage({x: 25,y: 25, width: 40, height: 48, angle: 1, image: image}) ],
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
    }
});


