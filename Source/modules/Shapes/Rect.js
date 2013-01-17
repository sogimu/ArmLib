(function Rect(armlib,lib){
    /**
     * Описывает класс Layer. Данный класс описывает работу с отдельным обектом canvas как работу со "слоем" на
     * котором могут находиться объекты.
     *
     * @constructor
     * @param {object} O
     * @param {string} O.name      Имя слоя.
     * @param {string} O.container id DOM-элемента, являющегося хранилищем для слоя.
     * @param {number} O.width     Ширина слоя.
     * @param {number} O.height    Высота слоя.
     * @this {armlib.class.Layer}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var Rect = lib.Class({
        Extends: armlib.class.Object,
        Initialize: function(O) {
            this.name = O.name;
            this.zindex = O.zindex;
            this.x = O.x;
            this.y = O.y;
            this.width = O.width;
            this.height = O.height;
            this.centralPoint = O.centralPoint,
            this.angle = O.angle,
            this.scale = O.scale,
            this.fill = O.fill;
            this.stroke = O.stroke;
        },
        Static: {
            x: null,
            y: null,
            width: null,
            height: null,
            centralPoint: null,
            angle: null,
            scale: null,
            fill: null,
            stroke: null
        },
        Methods: {
            draw: function() {
                this.context.save();
                    this.context.fillStyle = this.fill;
                    this.context.strokeStyle = this.stroke;
                    this.context.beginPath();
                        this.context.translate(this.centralPoint.x, this.centralPoint.y);
                        this.context.rotate(this.angle);
                        this.context.translate(-1*(this.centralPoint.x), -1*(this.centralPoint.y));
                        this.context.scale(this.scale.x, this.scale.y);

                        //this.context.translate(this.x, this.y);
                        this.context.rect(this.x,this.y,this.width,this.height);
                    this.context.closePath();
                    this.context.fill();
                    this.context.stroke();
                this.context.restore();
            }
        }
    });
    armlib.class.Rect = Rect;
})(armlib,gizmo);
