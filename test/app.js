window.onload = function(){

    var stage = new CStage({container: 'container',width: '500',height: '500',fps: 15});

    var image = new Image();
    image.src = 'image/apple.png';
    var apple = new CImage({x: 0,y: 0, width: 50, height: 60, angel: 0, image: image});
    var rect = new CRect({x: 100,y: 0, width: 100, height: 100, angel: 0});
    var circle = new CCircle({x: 100,y: 100, radius: 50});

    var obj1 = new CObject({
        collection: [ apple, rect ],
        vars: {
            name: 'obj1',
            x: 10,
            y: 10
        },
        update: function(stage) {
            this.collection[0].x = this.x+=2;
            this.collection[0].y = this.y+=1;
            this.collection[1].x+=1;
            this.collection[1].y+=2;
            this.collection[1].angel+=2;
            this.collection[0].angel+=2;
        }
    });

    stage.add( obj1 );

    stage.run();


    console.log()


    document.onkeydown = function(e) {
        var code = e.keyCode;
        switch( code ){
            case 40: {
                if(snake.angel + 15 <= 360){
                    snake.angel+=snake.angInc;
                } else {
                    snake.angel = 0;
                }
                snake.spX = snake.movInc * Math.cos(snake.angel/57.17);
                snake.spY = snake.movInc * Math.sin(snake.angel/57.17);
                break};

            case 38: {
                if(snake.angel - 15 >= 0){
                    snake.angel-=snake.angInc;
                } else {
                    snake.angel = 360;
                }
                snake.spX = snake.movInc * Math.cos(snake.angel/57.17);
                snake.spY = snake.movInc * Math.sin(snake.angel/57.17);
                break};
        }
    }



}