var image = new Image();
image.src = 'image/apple.jpg';
var head = new CImage({x: 25,y: 25, width: 65, height: 50, stroke: '#aaa', image: image});


var apple = new CObject({
    collection: [ /*new CImage({x: 25,y: 25, width: 65, height: 50, stroke: '#aaa', image: image})*/new CCircle({x: 25,y: 25, radius: 15, fill: 'green', name: 'shape1'}), new CCircle({x: 25,y: 25, radius: 10, name: 'shape2'}) ],
    vars: {
        x: 25,
        y: 25,
        width: 65,
        height: 50,
        name: 'apple',
        newPoint: function(stage) {
      //      this.x = this.width + stage.width * Math.random();
       //     this.y = this.height + stage.height * Math.random();
        //    this.collection[0].width = this.width;
        //    this.collection[0].height = this.height;
            this.collection[0].x = this.x;
            this.collection[0].y = this.y;
        }
    },
    begin: function(stage) {
        /*this.x = this.width + stage.width * Math.random();
        this.y = this.height + stage.height * Math.random();
        this.collection[0].width = this.width;
        this.collection[0].height = this.height;*/
        this.collection[0].x = this.x;
        this.collection[0].y = this.y;
    },
    update: function(stage) {
    }
});
