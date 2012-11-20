window.onload = function(O){

    stats = new Stats();
    stats.setMode( 0 );
    //document.body.appendChild( stats.domElement );

    stage = new CStage({container: 'container',width: screen.width - 35,height: screen.height-130, fps: 200});

    var field = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, angel: 0, center: {x:50,y:50}, src: 'image/BACKGROUNDS_MAIN_1.png'});
    stage.add( field );

    for(var i in items)
        stage.add( items[i] );

    stage.add( timberr );
    stage.add( ball );
    stage.add( standings )

    stage.run();
    //stage.info();
}