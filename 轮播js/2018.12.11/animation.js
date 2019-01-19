// 匀速运动、匀加速、匀减速
/*
obj:运动的元素  类型:Object
target：目标的距离 类型：Number
direction:运动的方向 ，取值：'v','h'(默认)  类型：String
speed:运动的速度 类型：Number
mode：运动的类型  'normal'（匀速默认）、'up'(匀加速)、'down'(匀减速)
func：回调函数 *
*/

function uniformMove(obj,target,direction,speed,mode,func){
  clearInterval(obj.timer);
  //如果用户没有传参数，把运动的方向和类型设置默认值
  direction = direction || "h";
  mode = mode ||  "normal";
  speed = speed || 10;
  //给运动的元素添加一个定时器属性
  obj.timer = setInterval(function(){
    //根据参数中的运动方向来判断到底是获取offsetTop还是offsetLeft
    var offset = (direction === 'v') ? obj.offsetTop : obj.offsetLeft;
    var dir = (direction === 'v') ? "top" : "left";

    if(Math.abs(target-offset) < Math.abs(speed)){
      clearInterval(obj.timer);
      obj.style[dir] = target + "px";
      //判断是否有回调函数，如果有就运行
      if(func){
        func();
      }
    }else{
      obj.style[dir] = offset + speed + "px";
    }
    //a速度的变化量
    var a = speed / (target / speed);
    if(mode == 'up'){
      speed += a
    }else if(mode == 'down'){
      speed -=a;
    }
  },20);
}


//缓冲运动
/*
obj:元素 类型：Object
target：目标距离  类型：Number
direction:运动的方向 取值：'v','h'(默认)  类型：String
speed:运动的速度，类型：Number  值越小速度越快，值越大速度越慢
func*:回调函数
*/
function bufferMove(obj,target,direction,speed,func){
  clearInterval(obj.timer);
  direction = direction || 'h';
  speed = speed || 8;
  //计算速度，应该距离终点越近，速度越慢
  var nSpeed;
  obj.timer = setInterval(function(){
    //根据参数中的运动方向来判断到底是获取offsetTop还是offsetLeft
    var offset = (direction === 'v') ? obj.offsetTop : obj.offsetLeft;
    var dir = (direction === 'v') ? "top" : "left";
    // 值5-10
    nSpeed = (target - offset) / speed
    nSpeed = (nSpeed > 0) ? Math.ceil(nSpeed) : Math.floor(nSpeed);
    if(offset > target){
      obj.style[dir] = target + "px"
      clearInterval(obj.timer);
      if(func){
        func();
      }
    }else{
      obj.style[dir] = offset + nSpeed + "px";
    }

  },20)
}

//弹性运动
/*
obj:目标元素 类型：Object
attr:要改变的属性  类型：String
target:目标距离  类型：Number
speed:速度  类型：Number
*/
function flexMove(obj,attr,target,speed){
  clearInterval(obj.timer);
  speed = speed || 8;
  var nSpeed = 0;
  obj.timer = setInterval(function(){
    nSpeed += (target - parseInt(getStyle(obj,attr))) / speed;
    // 摩擦系数
    nSpeed *= 0.7;
    if(Math.abs(target - parseInt(getStyle(obj,attr))) < 1 && Math.abs(nSpeed) < 1){
      clearInterval(obj.timer);
      obj.style[attr] = target + "px"
    }else{
      obj.style[attr] = parseInt(getStyle(obj,attr)) + nSpeed + "px"
    }
  },20)
  console.log(parseInt(getStyle(obj,attr)))
}

//碰撞及重力运动
/*
obj 目标对象
parentObj obj的父级
speedX x轴变化的速度
speedY y轴变化的速度
isGravity 是否添加重力，true，false
*/

function knockMove(obj,parentObj,speedX,speedY,isGravity){
  clearInterval(obj.timer);
  var w = parentObj.clientWidth - obj.offsetWidth;
  var h = parentObj.clientHeight - obj.offsetHeight;
  speedX = speedX || 2;
  speedY = speedY || 3;

  obj.timer = setInterval(function(){
    if(isGravity){
      speedY += 6;
    }
    var l = obj.offsetLeft + speedX;
    var t = obj.offsetTop + speedY;
    if(l<=0){
      l = 0;
      speedX *= -1
    }else if(l >= w){
      l = w
      speedX *= -1
    }
    if(t <= 0){
      t = 0;
      speedY *= -1;
    }else if(t >= h){
      t = h
      speedY *= -1;
    }
    if(isGravity){
      if(obj.offsetTop == t){
        clearInterval(obj.timer);
      }
    }
    obj.style.left = l + "px";
    obj.style.top = t + "px";
  },30)
}

//获取计算后的样式
function getStyle(obj,attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr]
  }else{
    return getComputedStyle(obj)[attr]
  }
}