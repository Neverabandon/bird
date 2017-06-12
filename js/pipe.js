(function(Fly) {
  "use strict";

  function Pipe(options) {
    this.imgUp = options.imgUp;
    this.imgDown = options.imgDown;
    this.imgW = this.imgUp.width;
    this.imgH = this.imgUp.height;
    this.x = options.x;
    this.DownY = 0;
    this.UpY = 0;
    this.pipeSpace = 200;
    this.speed = -0.1;
    this._initPipeY();
  };
  Pipe.prototype = {
    constructor: Pipe,
    //绘制水管
    draw: function(drawCtx) {
      var delta = drawCtx.delta,
        ctx = drawCtx.ctx;
      //判断第一列上下水管是否离开屏幕，是就将此上下水管绘制到所有水管的最后
      this.x += delta * this.speed;
      if (this.x <= -this.imgW) {
        this.x += this.imgW * 3 * 10;
        this._initPipeY();
      }

      //绘制水管
      ctx.drawImage(this.imgDown, this.x, this.DownY, this.imgW, this.imgH);
      ctx.drawImage(this.imgUp, this.x, this.UpY, this.imgW, this.imgH);

      //保存画布中水管的路径
      this._initPath(drawCtx);
    },
    //随机生成上面的水管的高度，设置上下水管的y坐标
    _initPipeY: function() {
      var pipeTopheight = Math.random() * 100 + 100;
      this.UpY = pipeTopheight - this.imgH;
      this.DownY = pipeTopheight + this.pipeSpace;
    },
    //记录下水管的路径，用于做小鸟碰撞的判断
    _initPath: function(drawCtx) {
      var ctx = drawCtx.ctx;
      ctx.rect(this.x, this.DownY, this.imgW, this.imgH);
      ctx.rect(this.x, this.UpY, this.imgW, this.imgH);
    },
  }

  Fly.getPipe = function(options) {
    return new Pipe(options);
  }

}(Fly));