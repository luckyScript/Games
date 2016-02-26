/**
 * Created by Kay on 2/26/16.
 */
function Food() {
    this.x = null;
    this.y = null;
    this.image = document.querySelector('img');
    this.map = new Map();
}
Food.prototype  = {
    init: function() {
        this.x = parseInt(Math.random()*(this.map.width/20-1))*20+10;
        this.y = parseInt(Math.random()*(this.map.height/20-1))*20+10;
    }
};