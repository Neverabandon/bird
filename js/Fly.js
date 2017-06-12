(function() {
  "use strict";

  function Fly() {};
  //创建一个canvas标签，并将其放到id为id的元素中
  Fly.createCV = function(id) {
    var cv = document.createElement("canvas");
    var dv = document.getElementById(id) || document.body;
    cv.width = window.innerWidth;
    cv.height = 600;
    dv.appendChild(cv);
    return cv;
  };
  //将角度转化成弧度
  Fly.toRadian = function(angle) {
    return angle / 180 * Math.PI;
  };

  //用来判断图片是否都加载完成，完成后执行回调函数
  Fly.loadImages = function(Imgsrc, callback) {
    var count = 0,
      Imglist = {},
      len = Imgsrc.length;
    // for (var i = 0; i < len; i++) {
    //   var img = new Image();
    //   var str = Imgsrc[i];
    //   img.src = "./../flappyBird/imgs/" + str + ".png";
    //   Imglist[str] = img;
    //   img.onload = function() {
    //     count++;
    //     if (count >= len) {
    //       callback(Imglist);
    //     }
    //   }
    // }

    //用数组的方法来代替for循环
    Imgsrc.forEach(function(str) {
      var img = new Image();
      img.src = "./../flappyBird/imgs/" + str + ".png";
      Imglist[str] = img;
      img.onload = function() {
        count++;
        if (count >= len) {
          callback(Imglist);
        }
      }
    });
  };

  this.Fly = Fly;
}.call(this));