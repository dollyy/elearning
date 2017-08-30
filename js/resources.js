var typeone=0,typetow=0,level=0,page=2,len,pageNum,stres,ndres,leres,args=[],name;  //args保存地址栏参数,name是参数的键

$(function(){
    getQueryStringArgs();
    //file:///C:/Users/%E6%9D%A8%E6%99%A8/Desktop/ELearning/ELearning/web/resources.html?Type_one=前端开发
    //file:///C:/Users/%E6%9D%A8%E6%99%A8/Desktop/ELearning/ELearning/web/resources.html?Type_two=Html5
    /*页面初次加载时获取全部的信息*/
    $.ajax({
       //type:"post",
       //url:"",
       //data:{name:args[name]},
       //dataType:"json",
       success:function(data){
           var data={
              "userImg":"5",
              "Type_one":["前端开发","后端开发","移动开发"],
              "Type_two":["HTML/CSS","JavaScript","Html5","CSS3"],
              "Course_level":["初级","中级","高级"],
              //一页20个   二级分类，课程名称，课程简介，等级
              "course":[["Html5","Canvas玩转图像处理","canvas系列第三课，学会编写图像算法，一起玩转图像处理吧","高级"],["CSS3","Canvas","canvas系列第三课，学会编写图像算法","初级"],["HTML/CSS","玩转图像处理","学会编写图像算法，一起玩转图像处理吧","中级"],["1","1","1","1"],["2","2","2","2"],["3","3","3","3"],["4","4","4","4"],["5","5","5","5"],["6","6","6","6"],["7","7","7","7"],["8","8","8","8"],["9","9","9","9"],["0","0","0","0"],["4","4","4","4"],["5","5","5","5"],["6","6","6","6"],["7","7","7","7"],["8","8","8","8"],["9","9","9","9"],["0","0","0","0"],],
              "pages":["4"],
           };
            //用户头像
            $("#usericon").attr("src","images/usericon/user"+data.userImg+".jpg");
           /*为 分页 赋值*/
           for(var i=data.pages;i>0;i--){
                $(".pages span").eq(1).after($("<span class='page'>"+i+"</span>"));
           }
           len=parseInt($(".pages span").length);
           pageNum=$(".pages span");
           //为 1 添加背景
           $(".pages span").eq(2).addClass("pagescir");
           //如果只有1页那么 下一页 和 尾页 也变暗
           if(len == 5){
                $(".pages span").eq(len-2).css({"color":"#ccc","cursor":"auto"});
                $(".pages span").eq(len-1).css({"color":"#ccc","cursor":"auto"});
           }
           //鼠标进入 页码 出现背景
           $(".pages span").mouseover(function(){
               if($(this).index()>1 && $(this).index()<len-2){
                    $(this).addClass("pagehover");
               }
           }).mouseleave(function(){
              $(this).removeClass("pagehover");
                    $(this).css({"transition":"background 0.2s ease-in","border-radius":"50%"});
           });
           //绑定页码的click事件
           $(".pages span").each(function(){
               $(this).on("click",pagesevent);
           });
           
           /*为 方向 赋值*/
           var onelen=data.Type_one.length;
           for(var i=0;i<onelen;i++){
                $(".stres").append($("<span>"+data.Type_one[i]+"</span>"));
                //为该方向加上背景
                if(name == "Type_one"){
                    if(args[name] == data.Type_one[i]){
                        var chindex=$(".stres span").index();
                        $(".stres span").eq(chindex).addClass("cli").siblings().removeClass("cli");
                        typeone=chindex;
                    }
                }
           }
           //给 方向 绑定事件
           $(".stres span").each(function(){
              $(this).on("click",one);
           });
           
           /*为 分类 赋值*/
           var towlen=data.Type_two.length;
           for(var i=0;i<towlen;i++){
                $(".ndres").append($("<span>"+data.Type_two[i]+"</span>"));
                //为该分类加上背景
                if(name == "Type_two"){
                    if(args[name] == data.Type_two[i]){
                        var chindex=$(".ndres span").index();
                        $(".ndres span").eq(chindex).addClass("cli").siblings().removeClass("cli");
                        typetow=chindex;
                    }
                }
           }
           //给 分类 绑定事件
           $(".ndres span").each(function(){
              $(this).on("click",tow); 
           });
           
           /*为 等级 赋值*/
           var levlen=data.Course_level.length;
           for(var i=0;i<levlen;i++){
                $(".leres").append($("<span>"+data.Course_level[i]+"</span>"));
           }
           //给 等级 绑定事件
           $(".leres span").each(function(){
              $(this).on("click",lev); 
           });
           
           /*为 具体课程 赋值*/
           var coulength=data.course.length;
           for(var i=0;i<coulength;i++){
               $(".courses").append($("<div class='course'><a href='#'><div class='rescon_top'><div><span>"+data.course[i][0]+"</span><span class='iconfont icon-aixin'></span></div></div><div class='rescon_bot'><div class='tit'>"+data.course[i][1]+"</div><div>"+data.course[i][2]+"</div><div>"+data.course[i][3]+"</div></div></a></div>"));
           }
          //为 具体课程 绑定事件
          chcourse();
          
       },
       error:function(){
           alert("resource error");
       }
    });
    
    /*方向 分类 等级的全部加上选中的背景*/
    $(".stres span").eq(0).addClass("cli");
    $(".ndres span").eq(0).addClass("cli");
    $(".leres span").eq(0).addClass("cli");

});

//----------------------js----------------------
/*获取地址栏参数*/
function getQueryStringArgs(){
    //取得查询字符串并去掉开头的问号--->第一个是问号
    var qs=(location.search.length > 0 ? location.search.substring(1) : "");
    //取得每一项
    var items=qs.length ? qs.split("&") : [];
    var item,value;
    //逐个讲每一项添加到args对象中
    for(var i=0;i<items.length;i++){
        item=items[i].split("=");
        name=decodeURIComponent(item[0]);
        value=decodeURIComponent(item[1]);
        if(name.length){
            args[name]=value;
        }
    }
    return args;
}
    

/*改变rescon的课程*/
var sendStr="";
function changcourse(aaa){
    //alert(stres+","+ndres+","+leres);
/*    if("全部" == stres){      //全部    全部|中级
        if("全部" == leres){
            sendStr=stres;
        }else{
            sendStr=stres+"|"+leres;
        }
    }else{
        if("全部" == ndres){  //前端开发|全部|全部  移动开发|全部|初级
            sendStr=stres;
        }else{                //前端开发|Html5|全部  移动开发|Html5|初级
            sendStr=ndres;
        }
        if("全部" != leres){
            sendStr+="|"+leres;
        }
    }*/
    alert(aaa);
    $.ajax({
       //type:"post",
       //url:"",
/*       data:["data":sendStr],
       dataType:"json",*/
       success:function(data){
           var data={
               //该方向该分类该等级下所有课程的前20个   二级分类，课程名称，课程简介，等级
              "course":[["1","a","!","/"],
                       ["2","b","@","."],
                       ["3","c","#",","]],
              "pages":["3"],    //该方向该分类该等级下课程的页码数
           };
           
           $(".courses").empty();
           
           var coulen=data.course.length;
           /*为 具体课程 赋值*/
           for(var i=0;i<coulen;i++){
               $(".courses").append($("<div class='course'><a href='#'><div class='rescon_top'><div><span>"+data.course[i][0]+"</span><span class='iconfont icon-aixin'></span></div></div><div class='rescon_bot'><div>"+data.course[i][1]+"</div><div>"+data.course[i][2]+"</div><div>"+data.course[i][3]+"</div></div></a></div>"));
           }
           
           //为 具体课程 绑定事件
           chcourse();
       },
       error:function(){
           alert("changcourse error");
       }
    });
}


/*改变 方向*/
function one(){
    $(this).addClass("cli").siblings().removeClass("cli");
    //alert(typeone+","+$(this).index());
    if(typeone != $(this).index()){   //点击不同的方向才切换
        typeone=$(this).index();
        sendStr=$($(".stres").children()[typeone]).html();
        changcourse(sendStr);
        $(".ndres span").eq(0).addClass("cli").siblings().removeClass("cli");
        $(".leres span").eq(0).addClass("cli").siblings().removeClass("cli");
        typetwo=0;
        level=0;
    }
}
    
/*改变 分类*/
function tow(){
    $(this).addClass("cli").siblings().removeClass("cli");
    if(typetow != $(this).index()){   //点击不同的分类才切换
        typetow=$(this).index();
        stres=$($(".stres").children()[typeone]).html();
        ndres=$($(".ndres").children()[typetow]).html();
        leres=$($(".leres").children()[level]).html();
        //alert(ndres);
        if("全部" == ndres){
            sendStr=stres;
        }else{
            sendStr=ndres;
        }
        if("全部" != leres){
            sendStr+="|"+leres;
        }
        changcourse(sendStr);
    }
}
           
/*改变 等级*/
function lev(){
    $(this).addClass("cli").siblings().removeClass("cli");
    if(level!=$(this).index()){     //点击不同的等级才切换
        level=$(this).index();
        stres=$($(".stres").children()[typeone]).html();
        ndres=$($(".ndres").children()[typetow]).html();
        leres=$($(".leres").children()[level]).html();
        if("全部" == ndres){
            sendStr=stres;
        }else{
            sendStr=ndres;
        }
        if("全部" != leres){
            sendStr+="|"+leres;
        }
        changcourse(sendStr);
    }
}

/*点击某一课程的时候*/
function chcourse(){
    $(".course").each(function(){
        $(this).find(".icon-aixin").on("click",addheart);
        $(this).click(function(){
            //alert($(this).find(".tit").html());
            window.location.href="ResHome.html?courseName="+$(this).find(".tit").html();
        });
    });
}

/*收藏改变爱心的颜色*/
function addheart(){
    if($(this).attr("class").indexOf("list") != -1){
        $(this).removeClass("list");
    }else{
        $(this).addClass("list");
    }
}

/*点击改变页数*/
function pagesevent(){
    alert(parseInt($(this).index())-1);
    $.ajax({
        //type:"post",
        //url:"",
        //data:{"page":parseInt($(this).index())-1},
        //dataType:"json",
        success:function(data){
            /*resource-->3.点击改变页数时获取当前方向分类等级下的第n页的课程*/
            var data={
                //一页20个 二级分类，课程名称，课程简介，等级
                "course":[["1","1","1","1"],["2","2","2","2"],["3","3","3","3"],["4","4","4","4"],["5","5","5","5"],["6","6","6","6"],["7","7","7","7"],["8","8","8","8"],["9","9","9","9"],["0","0","0","0"]],  
            };
            
            $(".courses").empty();
            var coulength=data.course.length;
            /*为 具体课程 赋值*/
            for(var i=0;i<coulength;i++){
                $(".courses").append($("<div class='course'><a href='#'><div class='rescon_top'><div><span>"+data.course[i][0]+"</span><span class='iconfont icon-aixin'></span></div></div><div class='rescon_bot'><div>"+data.course[i][1]+"</div><div>"+data.course[i][2]+"</div><div>"+data.course[i][3]+"</div></div></a></div>"));
            }
            //为 具体课程 绑定事件
            chcourse();
        },
        error:function(){
            alert(".pages span error");
        }
    });
    
    if($(this).index() == 0){               //点击 首页
        if(page > 2){
            page=2;
            ch1();
            ch3();
            $(".pages span").eq(2).addClass("pagescir").siblings().removeClass("pagescir");
        }
    }else if($(this).index() == 1){         //点击 上一页
        --page;
        if(page == 2){
            ch1();
            $(pageNum[page]).addClass("pagescir").siblings().removeClass("pagescir");
        }else if(page > 2){
            ch3();
            $(pageNum[page]).addClass("pagescir").siblings().removeClass("pagescir");
        }
    }else if($(this).index() == len-2){     //点击 下一页
        ++page;
        if(page == len-3){
            ch4();
            $(pageNum[page]).addClass("pagescir").siblings().removeClass("pagescir");
        }else if(page < len-3){
            ch3();
            ch2();
            $(pageNum[page]).addClass("pagescir").siblings().removeClass("pagescir");
        }
    }else if($(this).index() == len-1){     //点击 尾页
        if(page < 5){
            page=len-3;
            ch2();
            ch4();
            $(".pages span").eq(len-3).addClass("pagescir").siblings().removeClass("pagescir");
        }
    }else{
        $(this).addClass("pagescir").siblings().removeClass("pagescir");
        page=$(this).index();
        if($(this).prev().html() == "上一页"){
            ch1();
        }else{
            ch2();
        }
        if($(this).next().html() == "下一页"){
            ch4();
        }else{
            ch3();
        }
    }
}

//ch1
function ch1(){
    $(".pages span").eq(0).css({"color":"#ccc","cursor":"auto"});
    $(".pages span").eq(1).css({"color":"#ccc","cursor":"auto"});
}

//ch2
function ch2(){
    $(".pages span").eq(0).css({"color":"#666","cursor":"pointer"});
    $(".pages span").eq(1).css({"color":"#666","cursor":"pointer"});    
}

//ch3
function ch3(){
    $(".pages span").eq(len-2).css({"color":"#666","cursor":"pointer"});
    $(".pages span").eq(len-1).css({"color":"#666","cursor":"pointer"});
}

//ch4
function ch4(){
    $(".pages span").eq(len-2).css({"color":"#ccc","cursor":"auto"});
    $(".pages span").eq(len-1).css({"color":"#ccc","cursor":"auto"});
}