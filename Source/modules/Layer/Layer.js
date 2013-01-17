(function Layer(armlib,lib){
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

	var Layer = lib.Class({
        Extends: armlib.class.Object,
        Initialize: function(O) {
            if( O.container ) {
                var container = document.getElementById(O.container);
                var canvas = document.createElement('canvas');
                canvas.width = O.width;
                canvas.height = O.height;
                canvas.style.id = O.name;
                container.appendChild( canvas );
                this.context = canvas.getContext('2d');
            } else {
                throw Error('The container is not found! Choose right id of container, please!');
            }
        },
        Static: {
            width: 500,
            height: 500
        },
        Methods: {

        }
    });
    armlib.class.Layer = Layer;
})(armlib,gizmo);
