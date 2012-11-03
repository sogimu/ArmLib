/**
 * Created with JetBrains WebStorm.
 * User: Sogimu
 * Date: 04.11.12
 * Time: 0:37
 * To change this template use File | Settings | File Templates.
 */
var items = [];
for(var i=0; i<15; i++) {
    for(var j=0; j<3; j++) {
        var item = new CObject({
            name: 'timber'+i+":"+j,
            collection: [ new CImage({x: -15, y: -8,width: 30, height: 15, angel: 0, src: 'image/item.png'})],
            skeleton: [ {x0:-15,y0:-8,x1:12,y1:-8},{x0:12,y0:-8,x1:12,y1:7},{x0:12,y0:7,x1:-12,y1:7},{x0:-12,y0:7,x1:-12,y1:-8} ],
            center: {x: (i*30)+40, y: (j*70)+27},
            rotateCenter: {x: 0, y: 0},
            angel: 0,

            vars: {
                width: 0,
                height: 0
            },
            begin: function(stage) {
                this.width = this.collection[0].width;
                this.height = this.collection[0].height;
            },
            update: function(stage) {
            }
        });
        items.push( item );
    }
}
