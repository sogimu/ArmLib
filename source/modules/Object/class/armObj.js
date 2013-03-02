(function armObj(armlib,lib){
    /**
     * Описывает общие свойства и методы объект движка (Объект-контейнер(Object) и примитивы(Shape)).
     *
     * @this {armlib._class.armObj}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var armObj = lib.Class({
		Extend: armlib._class.superObj,
        Initialize: function(O, layer, armlib) {},
        Statics: {
			            
        },
        Methods: { // Call-back functions of ArmLib object

        }
    });

    armlib._class.armObj = armObj;

}(armlib,gizmo));
