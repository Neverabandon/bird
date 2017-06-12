(function(Fly) {
  "use strict";

  function Land(options) {
    this.img = options.img;
    this.imgW = this.img.width;
    this.imgH = this.img.height;
    this.x = options.x || 0;
    this.y = options.y;
    this.speed = -0.1;
  };
  Land.prototype = {
    constuctor: Land,
    //绘制地面
    draw: function(drawCtx) {
      var ctx = drawCtx.ctx,
        delta = drawCtx.delta;
      ctx.drawImage(this.img, this.x, this.y, this.imgW, this.imgH);
      //判断第一个地面是否已经离开屏幕，是就是将其绘制到所有地面的最后
      this.x += this.speed * delta;
      if (this.x <= -this.imgW) {
        this.x += this.imgW * 6;
      }
    },
  }

  Fly.getLand = function(options) {
    return new Land(options);
  }

}(Fly));