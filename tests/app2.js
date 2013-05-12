window.onload = function() {
    (function(armlib,lib) {

        armlib.bindWithTag({container: 'container'});
		
        l = new armlib.Layer({
            name: "l",
            fps: 0,
            zindex: 1,
            width: 500,
            height: 500
        })
        .setFunc("onMouseMove", function(e) {
            

            if(isClicked) {
                rect.centralPoint.x = rect.x + rect.width/2;
                rect.centralPoint.y = rect.y + rect.height/2;
                
                rect.x = e.layerX-clickedPoint.x;
                rect.y = e.layerY-clickedPoint.y;
            }

        });

        isClicked = false;
        clickedPoint = {x:0,y:0};
        velocity = {x: 1.11, y: 1.31};

        rect = new armlib.Rect({
            name: "rect1",
            
            width: 100,
            height: 100,
            angle: 0,
            fill: "#00aa00",
            stroke: "#000000"

        })
        .setFunc("onLoad", function() {
            l.addChild(this);
            l.run();
        })
        .setFunc("onUpdate", function() {
            if(!isClicked) {
                this.centralPoint.x = this.x + this.width/2;
                this.centralPoint.y = this.y + this.height/2;
                this.angle += 0.01;
                this.x += velocity.x;
                this.y += velocity.y;
            }
            if(Math.min(this.Skeleton._transformedPoints[0].x,this.Skeleton._transformedPoints[1].x,this.Skeleton._transformedPoints[2].x,this.Skeleton._transformedPoints[3].x) <= 0) {
                velocity.x *= -1;
            }
            if(Math.max(this.Skeleton._transformedPoints[0].x,this.Skeleton._transformedPoints[1].x,this.Skeleton._transformedPoints[2].x,this.Skeleton._transformedPoints[3].x) >= l.width) {
                velocity.x *= -1;
            }
            if(Math.min(this.Skeleton._transformedPoints[0].y,this.Skeleton._transformedPoints[1].y,this.Skeleton._transformedPoints[2].y,this.Skeleton._transformedPoints[3].y) <= 0) {
                velocity.y *= -1;
            }
            if(Math.max(this.Skeleton._transformedPoints[0].y,this.Skeleton._transformedPoints[1].y,this.Skeleton._transformedPoints[2].y,this.Skeleton._transformedPoints[3].y) >= l.height) {
                velocity.y *= -1;
            }
                
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