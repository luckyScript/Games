/**
 * Created by Kay on 2/26/16.
 */
function Game() {
    this.block = new Block();
    this.map = new Map();
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.end = false;
    this.bottomBlock = [];
}
Game.prototype = {
    drawMap: function() {
        this.canvas.width = this.map.width;
        this.canvas.height = this.map.height;
        this.ctx.beginPath();
        this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = "#008792";
        this.ctx.closePath();
        this.ctx.fill();
    },
    drawBlock: function() {
        this.ctx.beginPath();
        for(var i = 0;i < 4;i++) {
            this.ctx.rect(this.block.body[i][0]-25,this.block.body[i][1]-25,49,49);
        }
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = this.block.tetriminos[this.block.pattern];
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.beginPath();
        for(i = 0;i < this.bottomBlock.length;i++) {
            this.ctx.rect(this.bottomBlock[i][0]-25,this.bottomBlock[i][1]-25,49,49);
        }
        this.ctx.fillStyle = "green";
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    },
    updateGame: function() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.testBorder();
        this.drawMap();
        this.drawBlock();
    },
    testBorder: function() {
        var test = false;
        var testBlock = [];
        for(var count = 0;count < this.bottomBlock.length;count++) {
            testBlock.push([this.bottomBlock[count][0],this.bottomBlock[count][1]-50]);
            for(var i = 0;i < 4;i++) {
                if(this.block.body[i][0] == testBlock[count][0] && this.block.body[i][1] == testBlock[count][1]) {
                    test = true;
                }

            }
        }
        if(this.block.body[3][1] == (this.map.height-25)) {
            test = true;
        }
        if(test) {
            for( i = 0;i < 4;i++) {
                this.bottomBlock.push(this.block.body[i]);
            }
            this.block.init();
        }else {
            this.block.move();
        }
    }
};