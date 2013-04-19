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
            this.globalAlpha = O.globalAlpha || this.globalAlpha;
            this.stroke = O.stroke || this.stroke;
			return this;
        },
        Statics: {
            _type: ['Image','Primitive','ArmObject'],
            _name: "Image "+100*Math.random(),

            _width: 10,
            _height: 10,

            _src: null,
            _image: null,
            _loaded: false,
            
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
                this._context.save();
                    this._context.beginPath();
                        this._context.globalAlpha = this.globalAlpha;
                        var params = this.ParamsTransformMatrix; 
                        this._context.setTransform(params.a, params.b, params.c, params.d, params.e, params.f);

                        this._context.drawImage(this.image, this.x, this.y ,this.width,this.height);

                    this._context.closePath();
                this._context.restore();

                this.setHaveNotChanges();
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
