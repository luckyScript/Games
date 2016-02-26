/**
 * Created by Kay on 2/26/16.
 */
function Snake() {
    this.x = null;
    this.y = null;
    this.DIRECTION = null;
    this.len = null;
    this.DIRECTIONARR = ["LEFT","RIGHT","UP","DOWN"];
    this.body = [[this.x,this.y]];
    this.map = new Map();
}
Snake.prototype = {
    init: function() {
        this.x = parseInt(Math.random()*(this.map.width/20-3))*20+10;
        this.y = parseInt(Math.random()*(this.map.height/20-3))*20+10;
        this.DIRECTION = this.DIRECTIONARR[parseInt(Math.random()*3)];
        this.len = parseInt(Math.random()*3+2);
        this.body = [[this.x,this.y]];
        switch (this.DIRECTION) {
            case "LEFT":
                for(var i = 1;i < this.len;i++) {
                    this.body.push([this.x+20*i,this.y]);
                }
                break;
            case "RIGHT":
                for(i = 1;i < this.len;i++) {
                    this.body.push([this.x-20*i,this.y]);
                }
                break;
            case "UP":
                for(i = 1;i < this.len;i++) {
                    this.body.push([this.x,this.y+20*i]);
                }
                break;
            case "DOWN":
                for(i = 1;i < this.len;i++) {
                    this.body.push([this.x,this.y-20*i]);
                }
                break;
            default:
                console.log("error! unknown direction")
        }
    },
    move: function(eatFlag) {
        //console.log("it is move!");

        var newX,newY;
        switch (this.DIRECTION) {
            case "LEFT":
                newX = this.body[0][0]-20;
                newY = this.body[0][1];
                break;
            case "RIGHT":
                newX = this.body[0][0]+20;
                newY = this.body[0][1];
                break;
            case "UP":
                newX = this.body[0][0];
                newY = this.body[0][1]-20;
                break;
            case "DOWN":
                newX = this.body[0][0];
                newY = this.body[0][1]+20;
                break;
            default:
                console.log("error! unknown direction")
        }
        this.body.unshift([newX,newY]);
        this.x = newX;
        this.y = newY;
        if(eatFlag) {
            this.len+=1;
            console.log("吃到了,长一点.");
        }else{
            this.body.pop();
        }
        //console.log(this.body[0]+" ");
    },
    keyWatch:function() {
        var that = this;
        document.onkeydown = function(event) {
            event = event||window.event;
            if (event.keyCode == 40) {
                event.preventDefault();
                if (that.body[0][0] == that.body[1][0]){
                    return false;
                }else{
                    that.DIRECTION = "DOWN";
                }
            }else if(event.keyCode == 37) {
                event.preventDefault();
                if (that.body[0][1] == that.body[1][1]){
                    return false;
                }else {
                    that.DIRECTION = "LEFT";
                }
            }else if(event.keyCode == 38) {
                event.preventDefault();
                if (that.body[0][0] == that.body[1][0]){
                    return false;
                }else {
                    that.DIRECTION = "UP";
                }
            }else if(event.keyCode == 39) {
                event.preventDefault();
                if (that.body[0][1] == that.body[1][1]){
                    return false;
                }else {
                    that.DIRECTION = "RIGHT";
                }
            }
        }
    }
};