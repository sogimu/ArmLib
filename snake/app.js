window.onload = function(){

    var stage = new CStage({container: 'container',width: '1000',height: '500',fps: 5});

    var game = new CObject({
        collection: [ apple, snake/*, monitor*/ ],
        vars: {
            name: 'game'
        },
        events: {
            intersection: function(shape1, shape2, stage) {
                console.log('game! intersect');
                apple.newPoint(stage);
                snake.addSegment(stage);
            }
        }
    });

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