/**
 * Created with JetBrains WebStorm.
 * User: Sogimu
 * Date: 06.07.12
 * Time: 18:20
 * To change this template use File | Settings | File Templates.
 */

window.onload = function(){

    var stage = new Stage({container: 'container',width: '500',height: '500'});
    //stage.add(s);
    //stage.remove(s);
    //stage.run()
    //var canvas = document.getElementById('myCanvas');
    //var context = canvas.getContext('2d');

    var rect1 = new Rect({x: 12,y: 23, stroke: 1, zIndex: 0});
    var rect2 = new Rect({x: 50,y: 13, stroke: '#adw', zIndex: 1});

    //rect1.setContext( context );

    var obj = new Arm.CObject({x: 10, y: 10, collection: [rect1, rect2],update: function() {}});
    //log(obj);
    stage.add( obj );
    stage.run();
};