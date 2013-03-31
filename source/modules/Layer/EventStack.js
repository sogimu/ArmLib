(function primitive(armlib,lib){
    /**
     * Описывает вспомогательный класс EventStack. Данный класс реализует стек событий мыши и клавиатуры для класса Layer
     *
     * @constructor
     * @this {armlib._class.Shape}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var EventStack = lib.Class({
        Statics: {
            _stack: []
        },
        Methods: {
            push: function(reg) {
                try {
                    this._stack.push(reg)
                    return true;
                }
                catch(e) {
                    return false;
                }
            },

            pop: function() {
                var event = this._stack.pop();
                if(event != undefined) {
                    return event;
                } else {
                    return false;
                }
            }

        }
    });
    armlib._class.EventStack = EventStack;
})(armlib,gizmo);
