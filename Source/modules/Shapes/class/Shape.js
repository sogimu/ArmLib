(function shape(armlib,lib){
    /**
     * Описывает вспомогательный класс Shape. Данный класс содержит основные методы и свойства всех примитивов
     *
     * @constructor
     * @this {armlib._class.Shape}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var Shape = lib.Class({
        Extend: armlib._class.superObj,
        Statics: {
            centralPoint: {x:0,y:0},
            angle: 0,
            scale: {x:1,y:1},
            fill: "#00FF00",
            stroke: "#00aa00",
            zindex: 0
        }
    });
    armlib._class.Shape = Shape;
})(armlib,gizmo);
