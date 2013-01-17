window.framework = window.gizmo;

(function ArmLib(lib){
    /**
     * Создает экземпляр ArmLib и сохраняет ссылку на него в глобальной перменной ArmLib.
     *
     * @constructor
     * @param {object} O
     * @this {ArmLib}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var ArmLib = lib.Class({
        initialize: function(O){
            this.loadType = O.loadType;
            this.list = O.list;
        },
        Static: {
            loadType: 'synch', // synch or asynch
            loadedFlag: false, // Flag which show load-state of object
            _list: {}, // List of child-objects
            drawList: {}, // List of sorted child-objects,

            low: 0,
            hight: 0,

            class: {}
        },
        Methods: {
            run: function() {},
            stop: function() {},
            draw: function() {}, // Function which update view of object
            begin: function(O, layer, armlib) {}, // Constructor for object
            update: function(layer, armlib) {}, // Functions which update object
            onLoad: function(layer, armlib, lib) {},
            onKeyPress: function(e) {}, // Function for event of keyboard
            onKeyDown: function(e) {},
            onKeyUp: function(e) {},
            onMouseClick: function(e) {}, // Functions for event of mouse
            onMouseMove: function(e) {},
            onMouseDown: function(e) {},
            onMouseUp: function(e) {},
            sortByZindex: function() { // sort: Quicksort
                var i = this.low;
                var j = this.high;
                var A = this.drawList;
                var x = A[Math.round((low+high)/2)];  // x - опорный элемент посредине между low и high
                do {
                    while(A[i] < x) ++i;  // поиск элемента для переноса в старшую часть
                    while(A[j] > x) --j;  // поиск элемента для переноса в младшую часть
                    if(i <= j){
                        // обмен элементов местами:
                        var temp = A[i];
                        A[i] = A[j];
                        A[j] = temp;
                        // переход к следующим элементам:
                        i++; j--;
                    }
                } while(i < j);
                if(low < j) qSort(A, low, j);
                if(i < high) qSort(A, i, high);
                this.drawList = A;
            },
            addLayer: function(O) { // add new child-object and let sort drawList by z-index
                O.context = this.context;
                this.list[O.name] = O;
                this.drawList[O.name] = O;
                this.low = (O.zindex < this.low)?O.zindex:this.low;
                this.hight = (O.zindex > this.hight)?O.zindex:this.hight;
                this.sortByZindex();
            },
            removeLayer: function(O) {

            },


            // Setters/Getters
            set list(O) {
                this._list = O;
                this.drawList = O;
                this.sortByZindex();
            },
            get list() {
                return this._list;
            }

        }
    });

    window.armlib = new ArmLib({
        loadType: 'synch'
    });
}(framework));