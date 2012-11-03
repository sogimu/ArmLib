window.onload = function(O){

    stats = new Stats();
    stats.setMode( 0 );
    document.body.appendChild( stats.domElement );

    stage = new CStage({container: 'container',width: 500,height: 500, fps: 70});

    var field = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, angel: 0, center: {x:50,y:50}, src: 'image/BACKGROUNDS_MAIN_1.png'});
    stage.add( field );

    for(var i in items)
        stage.add( items[i] );

    stage.add( timberr );
    stage.add( ball );

    stage.run();
    //stage.info();
}