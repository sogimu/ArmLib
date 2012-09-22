window.onload = function(){

    var stage = new CStage({container: 'container',width: '500',height: '500',fps: 5});

    var image1 = new Image();
    image1.src = 'image/apple.png';

    var image2 = new Image();
    image2.src = 'image/gras.jpg';

    //var apple = new CImage({x: 0,y: 0, width: 50, height: 60, angel: 0, image: image1});
    var gras = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, angel: 0, image: image2});
    var rect = new CRect({x: 100,y: 0, width: 100, height: 100, angel: 0});
    var circle = new CCircle({x: 100,y: 100, radius: 50});

    var game = new CObject({
        collection: [ gras, apple, snake ],
        vars: {
            name: 'game'
        },
        events: {
            intersection: function(shape1, shape2, stage) {
                console.log(shape1);
                if((shape1.name == 'snake' && shape2.name == 'apple') || (shape2.name == 'snake' && shape1.name == 'apple')) {
                    apple.newPoint(stage);
                    snake.addSegment(stage);
                }
            }
        }
    });







    var head = new CCircle({x: 25,y: 25, radius: 15, fill: 'green'});
    var head1 = head.clone();
    head1.x = 232;


    stage.add( head );
    stage.add( head1 );
    stage.add( game )

    stage.run();

}