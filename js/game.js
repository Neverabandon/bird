(function(Fly) {
  "use strict";

  function Game(id) {
    this._initgame(id);
  }
  Game.prototype = {
    constructor: Game,
    //将Game对象的属性设置，放到原型对象的一个函数中，
    // 在构造函数中调用这个函数，起到初始化游戏对象的作用
    _initgame: function(id) {
      this.cv = Fly.createCV(id);
      this.ctx = this.cv.getContext('2d');
      this.Imgsrc = ["birds", "sky", "land", "pipe1", "pipe2"];
      this.list = [];
      this.hero = null;
      this.isRunning = false;

      this.durationTime = 0;
      this.lastTime = new Date();
      this.currentTime = 0;
    },
    //开始游戏
    start: function() {
      var _this = this;

      Fly.loadImages(this.Imgsrc, function(Imglist) {
          //初始化
          _this.initroles(Imglist);
          //渲染
          _this.render(Imglist);
        })
        //绑定事件
      _this.bindEvent();
    },
    //初始化各个对象

    initroles: function(Imglist) {
      //讲一些会多次使用到的数据用变量储存
      var i = 0,
        _this = this,
        imgSky = Imglist.sky,
        imgLand = Imglist.land,
        imgBird = Imglist.birds,
        pipeDown = Imglist.pipe1,
        pipeUp = Imglist.pipe2;

      //将小鸟对象放到数组中
      this.hero = Fly.getBird({
        ctx: this.ctx,
        img: imgBird
      })

      //将天空对象放到数组中
      for (i = 0; i < 3; i++) {
        this.list.push(
          Fly.getSky({
            ctx: this.ctx,
            img: Imglist.sky,
            x: imgSky.width * i
          })
        )
      }
      //将水管对象放到数组中
      for (i = 0; i < 10; i++) {
        this.list.push(
          Fly.getPipe({
            ctx: this.ctx,
            imgDown: pipeDown,
            imgUp: pipeUp,
            x: pipeUp.width * 3 * i + 300
          })
        )
      }
      //将地面对象放到对象中
      for (i = 0; i < 6; i++) {
        this.list.push(
          Fly.getLand({
            ctx: this.ctx,
            img: imgLand,
            x: imgLand.width * i,
            y: this.cv.height - imgLand.height
          })
        )
      }
      //将时间对象放到数组中
      this.list.push(
          Fly.getTime()
        )
        //放入一个观察者
      this.hero.addlistners(function() {
        _this.stop();
      })


    },
    render: function(Imglist) {
      var _this = this;
      //创建上下文对象
      var drawCtx = {
          cv: this.cv,
          Imglist: Imglist,
          ctx: this.ctx
        }
        //开始游戏
      _this.isRunning = true;
      (function render() {
        //时间的处理过程
        _this.currentTime = new Date();
        _this.delta = _this.currentTime - _this.lastTime;
        _this.lastTime = _this.currentTime;
        _this.durationTime += _this.delta;

        //将间隔时间放到上下文对象中
        drawCtx.delta = _this.delta;
        drawCtx.durationTime = _this.durationTime;

        //清除画布和开启新路径，路径是用来判断小鸟是否碰到水管
        _this.ctx.clearRect(0, 0, _this.cv.width, _this.cv.height);
        _this.ctx.beginPath();

        //绘制天空、水管和地面
        _this.list.forEach(function(value) {
          value.draw(drawCtx);
        });

        //绘制小鸟
        _this.hero.draw(drawCtx);

        //绘制时间

        //判断是否继续执行动画
        if (_this.isRunning) {
          requestAnimationFrame(render);
        }
      }())
    },
    //停止游戏
    stop: function() {
      //游戏进行的判断条件，isRunning为true游戏进行，为false就停止游戏
      this.isRunning = false;
    },
    //点击事件
    bindEvent: function() {
      var _this = this;
      this.cv.addEventListener("click", function() {
        //调用小鸟对象中的changeSpeed方法
        _this.hero.changeSpeed(-0.3);
      })
    }
  }


  //单例模式，在一个页面中值允许创建一个游戏对象
  var gameinstance = null;
  Fly.getGame = function(id) {
    if (gameinstance === null) {
      gameinstance = new Game(id);
      return gameinstance;
    }
  }

}(Fly));