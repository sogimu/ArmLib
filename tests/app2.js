window.onload = function() {
    (function(armlib,lib) {

        armlib.bindWithTag({container: 'container'});
		
        l = new armlib.Layer({
            name: "l",
            fps: 30,
            zindex: 1,
            width: 500,
            height: 500
        })
        .setFunc("onMouseMove", function(e) {
            
            
            if(isClicked) {
                rect.x = e.layerX-clickedPoint.x;
                rect.y = e.layerY-clickedPoint.y;
            }

        });

        isClicked = false;
        clickedPoint = {x:0,y:0};

        rect = new armlib.Rect({
            name: "rect1",
            
            width: 100,
            height: 100,
            fill: "#00aa00",
            stroke: "#000000"

        })
        .setFunc("onLoad", function() {
            l.addChild(this);
            l.run();
        })
        .setFunc("onMouseUp", function(e) {
            isClicked = false;
        })
        .setFunc("onMouseDown", function(e) {
            isClicked = true;
            clickedPoint = {x:e.layerX-this.x,y:e.layerY-this.y};
        })
        .Load();
        
        
    })(armlib,gizmo);

}