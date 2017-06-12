(function(Fly) {
  "use strict";

  function Sky(options) {
    this.ctx = options.ctx;
    this.img = options.img;
    this.imgW = this.img.width;
    this.imgH = this.img.height;
    this.x = options.x || 0;
    this.y = 0;
    this.speed = -0.1;
  };
  Sky.prototype = {
    constuctor: Sky,
    //绘制天空
    draw: function(drawCtx) {
      var ctx = drawCtx.ctx,
        delta = drawCtx.delta;
      ctx.drawImage(this.img, this.x, this.y, this.imgW, this.imgH);
      //判断第一个天空是否已经离开屏幕，是就将其绘制到所有天空的最后
      this.x += this.speed * delta;
      if (this.x <= -this.imgW) {
        this.x += 3 * this.imgW;
      }
    },
  }

  Fly.getSky = function(options) {
    return new Sky(options);
  }
}(Fly));