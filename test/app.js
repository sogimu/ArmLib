window.onload = function(O){
	
	var stage = new $Stage({container: 'container'});
	var rect = new $Rect({x: 24, y: 24});
	
	//var obj = new $Object();
	
    stage.add( rect );

    stage.run();
	
	
	console.log(stage);
}