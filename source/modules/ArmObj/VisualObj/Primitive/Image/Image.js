(function image(armlib,lib){
    /**
     * Описывает класс Image. Данный класс описывает объект "изображение".
	 *
     * @constructor
     * @param {object} O
     * @param {string} O.name          Имя объекта
     * @param {number} O.zindex        z-индекс объекта относительно объекта родителя
     * @param {bool}   O.synch         Тип обекта, бывает синхронным и асинхронным, true или false, соответственно
     * @param {number} O.x             X
     * @param {number} O.y		       Y
     * @param {number} O.width         Ширина изображения
     * @param {number} O.height        Высота изображения
     * @param {object} O.centralPoint  Точка вокруг которой происходит поворот
     * @param {number} O.angle         Угол поворота
     * @param {object} O.scale         Масштабирование по x и y. Например: {x: 2, y: 3}
     * @param {string} O.fill          Цвет закраски, может быть как цветом ("#FFaa00"), так и градиентом
     * @param {string} O.stroke        Цвет линии, может быть как цветом ("#FFaa00"), так и градиентом
     * @this {armlib.class.Image}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var image = lib.Class({
        Extend: armlib._class.Primitive,
        Initialize: function(O) {
			this._setName(O.name || this.name);
            this.src = O.src || this.src;
			this.zindex = O.zindex || this.zindex;
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.centralPoint = O.centralPoint || this.centralPoint;        
            this.width = O.width || this.width;
            this.height = O.height || this.height
            this.angle = O.angle || this.angle;
            this.scale = O.scale || this.scale;
            this.fill = O.fill || this.fill;
            this.stroke = O.stroke || this.stroke;
			return this;
        },
        Statics: {
            _type: ['Image','Primitive','ArmObject'],
            _name: "Image "+100*Math.random(),
            _loaded: false,
            _src: null,
            _image: null,
        },
        Methods: {
            _load: function() {
                this.image = new Image();
                this.image.src = this.src;
                var self = this;
                this.image.onload = function() {
                        self._setLoaded();
                        self.__onLoad.call(self);
                };
                return this;
            },
            _draw: function() {
                    // if(this._hasChanges) {
                    //     this.updateDrawingRectPos();
                    //     this.saveDrawingRectImage();
                    // }

                    this._context.save();
                        //this._context.translate(this.globalX, this.globalY);

                        this._context.beginPath();
                        //if(this._preDraw) {this._preDraw(this._context, this._layer,armlib,lib)};
                        //this._context.fillStyle = this.fill;
                        //this._context.strokeStyle = this.stroke;

                        /*this._context.translate(this.centralPoint.x, this.centralPoint.y);
                        this._context.rotate(this.globalAngle);
                        this._context.translate(-this.centralPoint.x, -this.centralPoint.y);*/
                        
                        // var angelRad = this.angle;
                        // var m = this.centralPoint.x;
                        // var n = this.centralPoint.y;

                        // var MTrans = new gizmo.Matrix([
                        //     [Math.cos(angelRad),Math.sin(angelRad),0],
                        //     [-Math.sin(angelRad),Math.cos(angelRad),0],
                        //     [-m*(Math.cos(angelRad)-1)+n*Math.sin(angelRad),-m*Math.sin(angelRad)-n*(Math.cos(angelRad)-1),1]
                        // ]);

                        // var points = new gizmo.Matrix([[this.x,this.y,1],[this.x+this.width,this.y,1],[this.x+this.width,this.y+this.height,1],[this.x,this.y+this.height,1]]);
                        // var mainPoint = points.x(MTrans).elements;


                        //this._context.translate(this.centralPoint.x, this.centralPoint.y);

                        var params = this.ParamsTransformMatrix; 
                        this._context.transform(params.a, params.b, params.c, params.d, params.e, params.f);

                        //this._context.translate(-this.centralPoint.x, -this.centralPoint.y);


                        this._context.drawImage(this.image, this.x, this.y ,this.width,this.height);

                        //if(this._onDraw) {this._onDraw(this._context, this._layer,armlib,lib)};
                        this._context.closePath();
                        //this._context.fill();
                        //this._context.stroke();
                    this._context.restore();
                    //var rect = this._drawRect.drawingRectPos;

                        // bg._context.beginPath();
                        //     bg._context.strokeStyle = "#FF0000";
                        //     bg._context.rect(rect.p0.x,rect.p0.y,rect.p1.x,rect.p1.y);
                        // bg._context.closePath();
                        // bg._context.stroke();
                        // var ser = '';
                        this.setHaveNotChanges();
            },

            _hasPoint: function(point) {
                if((point.x >= this.x && point.x <= this.x+this.width) && (point.y >= this.y && point.y <= this.y+this.height)) {
                    return true;
                } else {
                    return false;
                }
            },

            // Setters/Getters

            // image
            set image(image) {
                this._image = image;
            },
            get image() {
                return this._image;
            },

            // src
            set src(url) {
                this._src = url;
            },
            get src() {
                return this._src;
            },
        }
    });
    armlib.Image = image;
})(armlib,gizmo);
