window.onload = function() {
    (function(armlib,lib) {
        l = new armlib.class.Layer({
            container: 'container',
            name: 'ground',
            width: 300,
            height: 300
        });
        l.addChild(new armlib.class.Rect({
            name: 'rect1',
            zindex: 2,
            x: 10,
            y: 10,
            width: 25,
            height: 25,
            centralPoint: {x:50,y:50},
            angle: 0.5,
            scale: {x:3,y:0.5},
            fill: '#00FF00',
            stroke: '#00aa00'
        })
        );
        l.addChild(new armlib.class.Rect({
            name: 'rect2',
            zindex: 2,
            x: 50,
            y: 10,
            width: 25,
            height: 25,
            centralPoint: {x:50,y:50},
            angle: 0.5,
            scale: {x:3,y:0.5},
            fill: '#00FF00',
            stroke: '#00aa00'
        })
        );

        r3 = new armlib.class.Image({
            name: 'rect3',
            src: './img/item.png',
            onLoad: function() {
                alert('onLoad');
            },
            zindex: 10,
            x: 50,
            y: 10,
            width: 75,
            height: 75,
            centralPoint: {x:0,y:0},
            angle: 0.3,
            scale: {x:1,y:1},
            fill: '#0000FF',
            stroke: '#00FF00'
        });

        l.addChild(r3);
        l.draw();

    })(armlib,gizmo);
}