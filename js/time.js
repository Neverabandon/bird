(function(Fly) {
  "use strict";

  function Time(options) {};
  Time.prototype = {
      constructor: Time,
      draw: function(drawCtx) {
        var ctx = drawCtx.ctx,
          duration = drawCtx.durationTime;
        var mao = duration % 1000,
          s = parseInt(duration / 1000) % 60,
          m = parseInt(duration / 1000 / 60) % 60,
          h = parseInt(duration / 1000 / 60 / 60) % 24;
        mao = mao < 10 ? "00" + mao : mao;
        mao = mao < 100 && mao > 10 ? "0" + mao : mao;
        console.log(mao)
        ctx.fillStyle = 'cyan';
        ctx.font = '30px 楷体';
        ctx.fillText("亲，游戏已进行了" + h + "小时" + m + "分" + s + "秒" + mao + "毫秒", 350, 30);
      }
    }
    //单例模式
  Fly.getTime = function() {
    return new Time();
  }
}(Fly));