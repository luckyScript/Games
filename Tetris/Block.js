/**
 * Created by Kay on 2/26/16.
 */
function Block() {
    this.pattern = null;
    this.patternArr = ["I","J","L","O","S","T","Z"];
    this.tetriminos = {
        "I":"red",
        "J":"magenta",
        "L":"yellow",
        "O":"cyan",
        "S":"blue",
        "T":"grey",
        "Z":"lime"
    };
    this.body = [[],[],[],[]];
    this.map = new Map();
    this.rotatePoint = [];
}
Block.prototype = {
    init: function() {
        this.pattern = this.patternArr[parseInt(Math.random()*7)];
        switch (this.pattern) {
            case "I":
                this.body = [[225,25],[275,25],[325,25],[375,25]];
                break;
            case "J":
                this.body = [[225,25],[275,25],[325,25],[325,75]];
                break;
            case "L":
                this.body = [[225,25],[275,25],[325,25],[225,75]];
                break;
            case "O":
                this.body = [[275,25],[325,25],[275,75],[325,75]];
                break;
            case "S":
                this.body = [[275,25],[325,25],[275,75],[225,75]];
                break;
            case "T":
                this.body = [[225,25],[275,25],[325,25],[275,75]];
                break;
            case "Z":
                this.body = [[275,25],[325,25],[375,75],[325,75]];
                break;
            default:
                console.log("unknown pattern!!!");
        }
    },
    move: function() {
        var that = this;
        var testLeft = false,
            testRight = false;
        for(var i = 0;i < 4;i++) {
            this.body[i][1]+=50;
            if(this.body[i][0] <= 74 ) {
                testLeft = true;
            }else if(this.body[i][0] >= this.map.width-74) {
                testRight = true;
            }
        }
        console.log(this.body[1][0]);
        document.onkeydown = function(event) {
            event = event||window.event;
            if (event.keyCode == 40) {
                event.preventDefault();//DOWN

            }else if(event.keyCode == 37) {
                event.preventDefault();//LEFT
                if(!testLeft) {
                    for(i = 0;i < 4;i++) {
                        that.body[i][0]-=50;
                    }
                }
            }else if(event.keyCode == 38) {
                event.preventDefault();//UP
                that.rotate();
            }else if(event.keyCode == 39) {
                event.preventDefault();//RIGHT
                if(!testRight) {
                    for(i = 0;i < 4;i++) {
                        that.body[i][0]+=50;
                    }
                }
            }
        }

    },
    rotate: function() {
        switch (this.pattern) {
            case "I":
                this.rotatePoint = [this.body[1][0],this.body[0][1]];
                break;
            case "J":
                this.rotatePoint = [this.body[1][0],this.body[0][1]];
                break;
            case "L":
                this.rotatePoint = [this.body[1][0],this.body[0][1]];
                break;
            case "O":
                return;
                //this.rotatePoint = [(this.body[1][0]+this.body[2][0])/2,this.body[0][1]];
                //break;
            case "S":
                this.rotatePoint = [this.body[0][0],this.body[0][1]];
                break;
            case "T":
                this.rotatePoint = [this.body[1][0],this.body[1][1]];
                break;
            case "Z":
                this.rotatePoint = [this.body[1][0],this.body[1][1]];
                break;
            default:
                console.log("unknown pattern!!!");
        }
        for(var i = 0;i < 4;i++) {
            var oldX = this.body[i][0];
            this.body[i][0] = this.rotatePoint[0] - this.rotatePoint[1] + this.body[i][1];
            this.body[i][1] = this.rotatePoint[1] + this.rotatePoint[0] - oldX;
        }
    }
};
