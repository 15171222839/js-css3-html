(function($){
  //jquery插件方法
  $.fn.aTab = function(op){
    //如果用户没有传入参数，就使用默认的参数
    var par = {
      //事件
      trigger:"click",
      //动画效果
      effect:"fade",
      //autoplay是否自动播放：
      autoplay:false,
      //自动播放的间隔 ：
      delay:1000,
      //效果的时间
      speed:500,
      //选项卡标题的包裹class：
      titcell:".hd",
      //选项卡标题的单个对象class
      tittag:"a",
      //选项卡内容的包裹class
      maincell:".bd",
      //选项卡内容的单个对象class
      maintag:".con",
      //选项卡选中的样式class
      currentclass:"on",
      //默认显示第几个
      defaultIndex:0
    }
    //使用jquery的扩展方法，扩展jquery对象
    //$.extend(setting,option)
    //1.用于合并对象setting和对象option并将合并后的值返回给setting
    //2.不改变setting类型 
    $.extend(par,op)
    //当前显示的第几个
    var autoIndex = 0;
    //获取所有的jquery对象
    var titcell = $(par.titcell)
    var tittag = $(par.tittag)
    var maincell = $(par.maincell)
    var maintag = $(par.maintag)
    //获取内容单个对象的宽度和高度
    var mainW = maintag.eq(0).outerWidth()
    var mainH = maintag.eq(0).outerHeight()

    var titH = titcell.outerHeight()
    //获取单个内容对象的长度
    var mainL = maintag.length;

    //初始默认显示第几个
    tittag.eq(par.defaultIndex).addClass(par.currentclass).siblings().removeClass(par.currentclass);
    

    //根据用户传的effect，来给内容区的单个对象加样式
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
      maintag.css("float","none");
    }

    //给每个标题对象绑定事件
    tittag.each(function(i){
      tittag.eq(i).on(par.trigger,function(){
        //切换标题的样式
        tittag.eq(i).addClass(par.currentclass).siblings().removeClass(par.currentclass)
        //如果说用户传的fade
        if(par.effect == "fade"){
          maintag.eq(i).fadeIn().siblings().fadeOut();
        }
        //如果用户传的是left
        if(par.effect == "left"){
          maincell.stop().animate({"left":-i * mainW},par.speed)
        }
        //如果用户传的是top
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
        autoIndex++
        if(autoIndex == mainL){
          autoIndex = 0
        }
      }
      setInterval(move,par.delay);
    }

  }
})(jQuery)