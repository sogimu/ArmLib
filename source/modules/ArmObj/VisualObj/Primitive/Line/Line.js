
(function Line(armlib,lib){
    /**
     * Описывает класс Line. Данный класс описывает объект "линия".
     *
     * @constructor
     * @param {object} O
     * @param {string} O.name          Имя линии
     * @param {number} O.zindex        z-индекс объекта относительно объекта родителя
     * @param {bool}   O.synch         Тип обекта, бывает синхронным и асинхронным, true или false, соответственно
     * @param {number} O.x1            X первой точки
     * @param {number} O.y1            Y первой точки
     * @param {number} O.x2            X второй точки
     * @param {number} O.y2            Y второй точки
     * @param {object} O.centralPoint  Точка вокруг которой происходит поворот
     * @param {number} O.angle         Угол поворота
     * @param {object} O.scale         Масштабирование по x и y. Например: {x: 2, y: 3}
     * @param {string} O.stroke        Цвет закраски, может быть как цветом ("#FFaa00"), так и градиентом
     * @param {number} O.globalAlpha   Уровень прозрачности, можно изменять от 0..1     
     * @param {number} O.lineWidth     толщина контура    
     * @this {armlib.Line}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var Line = lib.Class({
        Extend: armlib._class.Primitive,
        Initialize: function(O) {
            this._setName(O.name || this.name);
            this.zindex = O.zindex || this.zindex;
            this.x = O.x1 || this.x;
            this.y = O.y1 || this.y;
            this.x2 = O.x2 || this.x2;
            this.y2 = O.y2 || this.y2;
            this.centralPoint = O.centralPoint || this.centralPoint;        
            this.angle = O.angle || this.angle;
            this.scale = O.scale || this.scale;
            this.globalAlpha = O.globalAlpha || this.globalAlpha;
            this.stroke = O.stroke || this.stroke;
            this.lineWidth = O.lineWidth || this.lineWidth;

            return this;
        },
        Statics: {
            _type: ['Line','Primitive','ArmObject'],
            _name: "Line "+100*Math.random(),

            _x2: 10,
            _y2: 10,
            _lineWidth: 1,

            _loaded: false,
            
        },
        Methods: {

            _load: function() {   
                var self = this;
                self._setLoaded();
                self.__onLoad.call(self);
                
                return this;
            },

            _draw: function() {
                this._context.save();
                    this._context.beginPath();
                        this._context.globalAlpha = this.globalAlpha;
                        this._context.strokeStyle = this.stroke;
                        this._context.fillStyle = this.fill;
                        this._context.lineWidth = this.lineWidth;

                        var params = this.ParamsTransformMatrix; 
                        this._context.setTransform(params.a, params.b, params.c, params.d, params.e, params.f);
                        this._context.moveTo(this.x, this.y);
                        this._context.lineTo(this.x2,this.y2);

                    this._context.closePath();
                    this._context.stroke();

                this._context.restore();

                this.setHaveNotChanges();
            },

            updateDrawingRectPos: function() {
                var MTrans = this.TransformMatrix;

                var points = new gizmo.Math.Matrix([[this.x,this.x2,this.x2,this.x],
                                                    [this.y,this.y,this.y2,this.y2],
                                                    [1,     1,     1,            1]]);
                
                var mainPoint = MTrans.x(points).elements;

                var x = Math.floor(Math.min(mainPoint[0][0],mainPoint[0][1],mainPoint[0][2],mainPoint[0][3])) -
                    this.lineWidth;
                var y = Math.floor(Math.min(mainPoint[1][0],mainPoint[1][1],mainPoint[1][2],mainPoint[1][3])) -
                    this.lineWidth;
                var width = Math.ceil(Math.max(mainPoint[0][0],mainPoint[0][1],mainPoint[0][2],mainPoint[0][3]) - x) +
                    this.lineWidth;
                var height = Math.ceil(Math.max(mainPoint[1][0],mainPoint[1][1],mainPoint[1][2],mainPoint[1][3]) - y) +
                    this.lineWidth;
                
                this._drawRect.drawingRectPos = {p0: {x: x    , y: y     },
                                                 p1: {x: width, y: height}}

            },

            // Setters/Getters

            // lineWidth
            set lineWidth(width) {
                this._lineWidth = width;
            },
            get lineWidth() {
                return this._lineWidth;
            },
            
            // x2
            set x2(x) {
                this._x2 = x;
            },
            get x2() {
                return this._x2;
            },

            // y2
            set y2(y) {
                this._y2 = y;
            },
            get y2() {
                return this._y2;
            },

        }
    });
    armlib.Line = Line;
})(armlib,gizmo);
