(function(Fly) {
  "use strict";

  function Bird(options) {
    this.img = options.img;
    this.imgW = this.img.width / 3;
    this.imgH = this.img.height;
    //观察者模式，用来存放所有观察者
    this.listeners = [];
    this.speed = 0;
    this.frameIndex = 0;
    this.a = 0.0005;
    this.x = 100;
    this.y = 100;
    this.maxSpeed = 0.3;
    this.angle = 0;
  };
  Bird.prototype = {
    constructor: Bird,
    //绘制小鸟
    draw: function(drawCtx) {
      var ctx = drawCtx.ctx;
      this.updata(drawCtx.delta);
      //判断速度，并做一定处理
      if (this.speed >= this.maxSpeed) {
        this.speed = this.maxSpeed;
      } else if (this.speed <= -this.maxSpeed) {
        this.speed = -this.maxSpeed;
      }
      //计算旋转角度
      this.angle = this.speed / this.maxSpeed * 45;
      //保存画布原始状态
      ctx.save();
      //平移坐标轴
      ctx.translate(this.x, this.y);
      //旋转坐标轴
      ctx.rotate(Fly.toRadian(this.angle));
      //绘制小鸟
      ctx.drawImage(this.img, this.frameIndex * this.imgW, 0, this.imgW, this.imgH, -this.imgW / 2, -this.imgH / 2, this.imgW, this.imgH);
      //恢复到初始状态
      ctx.restore();
      //对裁剪原图的哪一部分做一个判断，this.frameIndex在0,1,2之间循环
      this.frameIndex++;
      this.frameIndex %= 3;

      //监控小鸟目标
      if (this.isBirdDie(drawCtx)) return;

    },
    //更新速度和小鸟y轴距离
    updata: function(delta) {
      this.y += this.speed * delta + this.a * Math.pow(delta, 2) / 2;
      this.speed += delta * this.a;
    },
    isBirdDie: function(drawCtx) {
      //传入上下文对象，初始化需要使用变量
      var flage = false,
        cv = drawCtx.cv,
        ctx = drawCtx.ctx,
        landImg = drawCtx.Imglist["land"],
        maxY = cv.height - landImg.height;
      //监控目标小鸟是否死亡，触发所有观察者的事件
      if (this.y <= 0 || this.y > maxY || ctx.isPointInPath(this.x, this.y)) {
        flage = true;
        this.trigger();
      }
      return flage;
    },
    //添加观察者
    addlistners: function(callback) {
      this.listeners.push(callback);
    },
    //触发观察者的事件
    trigger: function() {
      this.listeners.forEach(function(value) {
        value();
      })
    },
    //改变小鸟速度
    changeSpeed: function(speed) {
      this.speed = speed;
    }
  }

  Fly.getBird = function(options) {
    return new Bird(options);
  }


}(Fly));