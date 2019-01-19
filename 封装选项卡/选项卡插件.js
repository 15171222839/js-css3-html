(function(){
  $.fn.Tab = function(op){
    //如果用户没有传入参数，就是用默认参数
    var par = {
      trigger:"click",
      effect:"false",//动画效果
      autoplay:false,
      delay:1000,
      speed:500,
      titcell:".hd",
      tittag:"a",
      maincell:".bd",
      maintag:".con",
      currentclass:"on",
      defaultIndex:0
    }
    //拓展方法
    $.extend(par,op)
    var autoIndex = 0;
    var titcell = $(par.titcell);
    var tittag = $(par.tittag);
    var maincell = $(par.maincell);
    var maintag = $(par.maintag)
    //获取内容单个对象的宽度和高度
    var mainW = maintag.eq(0).outerWidth()
    var mainH = maintag.eq(0).outerHeight()
    var titH = titcell.eq(0).outerHeight()
    var mainL = maintag.length;
    //初始默认显示第几个
    tittag.eq(par.defaultIndex).addClass(par.currentclass).siblings().removeClass(par.currentclass)
    //根据用户的effect，来给内容区达标单添加样式
    if(par.effect == "fade"){
      maintag.css("position","absolute")
      maintag.eq(par.defaultIndex).show().siblings().hide()
    }
    if(par.effect == "left"){
      maincell.parent().css({"position":"relative","overflow":"hidden"})
      maincell.width(mainW * mainL).css({"position":"absolute","left":-par.defaultIndex * mainW})
      maintag.css("float","left")
    }
    if(par.effect == "top"){
      maincell.parent().css({"position":"relative","overflow":"hidden"})
      titcell.css({"position":"relative","z-index":99})
      maincell.css({"position":"absolute","top":-par.defaultIndex * mainH + titH})
      maintag.css("float","none")  
    }
    //给每个标题绑定事件
    tittag.each(function(i){
      tittag.eq(i).on(par.trigger,function(){
        tittag.eq(i).addClass(par.currentclass).siblings().removeClass(par.currentclass)
        if(par.effect == "fade"){
          maintag.eq(i).fadeIn().siblings().fadeOut()
        }
        if(par.effect == "left"){
          maincell.stop().animate({"left":-i * mainW},par.speed)
        }
        if(par.effect == "top"){
          maincell.stop().animate({"top":-i * mainH + titH},par.speed)
        }
      })
    })
    //是否需要自动播放
    if(par.autoplay){
      var move = function(){
        if(par.effect == "click"){
          tittag.eq(autoIndex).click()
        }else{
          tittag.eq(autoIndex).mouseover()
        }
        autoIndex++;
        if(autoIndex == mainL){
          autoIndex =0
        }
      }
      setInterval(move,par.delay);
    }
  }
})(jQuery)