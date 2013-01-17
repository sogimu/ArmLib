(function Object(armlib,lib){
    /**
     * Описывает класс минимального объекта.
     *
     * @this {armlib.class.Object}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var Object = lib.Class({
        Initialize: function(O, layer, armlib) {},
        Static: {
            name: 1000*Math.random(),
            context: null,
            loadType: 'synch', // synch or asynch
            loaded: false, // Flag which show load-state of object
            owner: null,
            zindex: 0,
            depend: false, // Flag display dependence of same data (image, music and etc)
            _list: {}, // List of child-objects
            drawList: [], // List of sorted child-objects,
        },
        Methods: { // Call-back functions of ArmLib object
            draw: function() {
                for(var i in this.drawList) {
                    this.drawList[i].draw();
                }
            }, // Function which update view of object
            begin: function(O, layer, armlib) {}, // Constructor for object
            update: function(layer, armlib) {
                for(var i in this.drawList) {
                    this.drawList[i].update();
                }
            }, // Functions which update object
            onLoad: function(layer, armlib, lib) {},
            onKeyPress: function(e) {}, // Function for event of keyboard
            onKeyDown: function(e) {},
            onKeyUp: function(e) {},
            onMouseClick: function(e) {}, // Functions for event of mouse
            onMouseMove: function(e) {},
            onMouseDown: function(e) {},
            onMouseUp: function(e) {},
            onShow: function(layer, armlib) {}, // Function for showing and hiding event
            onHide: function(layer, armlib) {},
            sortByZindex: function(A,low,high) { // sort: Quicksort
                var i = low;
                var j = high;
                var x = A[Math.round((low+high)/2)].zindex;  // x - опорный элемент посредине между low и high
                do {
                    while(A[i].zindex < x) ++i;  // поиск элемента для переноса в старшую часть
                    while(A[j].zindex > x) --j;  // поиск элемента для переноса в младшую часть
                    if(i <= j){
                        // обмен элементов местами:
                        var temp = A[i];
                        A[i] = A[j];
                        A[j] = temp;
                        // переход к следующим элементам:
                        i++; j--;
                    }
                } while(i < j);
                if(low < j) this.sortByZindex(A, low, j);
                if(i < high) this.sortByZindex(A, i, high);
                this.drawList = A;
            },
            addChild: function(O) { // add new child-object and let sort drawList by z-index
                O.context = this.context;
                this.list[O.name] = O;
                this.drawList.push(O);
                this.sortByZindex(this.drawList,0,this.drawList.length-1);
            },
            removeChild: function(O) {

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

    armlib.class.Object = Object;

}(armlib,gizmo));
