/**
 * Created with JetBrains WebStorm.
 * User: Sogimu
 * Date: 06.07.12
 * Time: 18:20
 * To change this template use File | Settings | File Templates.
 */

window.onload = function(){

    //var stage = new Arm.Stage({container: 'container',width: '500',height: '500'});
    //stage.add(s);
    //stage.remove(s);
    //stage.run()	
	
    var rect1 = new Rect({x: 12,y: 23, stroke: '#ref', zIndex: 0});
    var rect2 = new Rect({x: 10,y: 13, stroke: '#adw', zIndex: 1});
    console.log(rect1.clone())
    console.log( rect1 );        
    console.log( rect2 );
};