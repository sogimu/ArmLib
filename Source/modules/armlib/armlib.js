window.framework = window.gizmo;

(function ArmLib(lib){
    /**
     * Создает экземпляр ArmLib и сохраняет ссылку на него в глобальной перменной armlib.
     *
     * @constructor
     * @param {object} O
     * @this {armlib}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var ArmLib = new lib.Class({
        initialize: function(O){
            if (this.instance) {
                return this.instance;
            }
            this.instance = this;

        },
        Static: {
            instance: {}
        },
        Methods: {

        }
    });

    window.armlib = new ArmLib({});
}(framework));