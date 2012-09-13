window.onload = function(){

    var stage = new CStage({container: 'container',width: '1000',height: '500',fps: 15});

    var game = new CObject({
        collection: [ apple, snake ],
        vars: {
            name: 'game'
        },
        events: {
            intersection: function(shape1, shape2, stage) {
                if((shape1.name == 'snake' && shape2.name == 'apple') || (shape2.name == 'snake' && shape1.name == 'apple')) {
                    apple.newPoint(stage);
                    snake.addSegment(stage);
                }
            }
        }
    });

    var image = new Image();
    image.src = 'image/gras.jpg';
    var gras = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, stroke: '#aaa', image: image});

    stage.add( gras );
    stage.add( game );

    stage.run();


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