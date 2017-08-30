var forflag=true,args=[],name;  //args保存地址栏参数,name是参数的键
$(function(){
    /*显示章节*/
    $(".navcha").click(function(){
        $(".chapters").show().siblings().hide();
        $(this).addClass("color").siblings().removeClass("color");
    });
    /*显示问答*/
    $(".navq").click(function(){
        $(".QaA").show().siblings().hide();
        $(this).addClass("color").siblings().removeClass("color");
    });
    /*显示笔记*/
    $(".navnote").click(function(){
        $(".notes").show().siblings().hide();
        $(this).addClass("color").siblings().removeClass("color");
    });
    
    //解析地址栏参数
    getQueryStringArgs();
    //alert(args[name]);
    //页面初始化加载页面
    $.ajax({
        type:"post",
        //url:"",
        data:{"courseid":args[name]},
        //dataType:"json",
        success:function(data){
            /*ResHome-->1.页面初次加载的时候获取课程的信息*/
            var data={
                "userImg":"5",         //用户头像
                //课程名，级别，课程时长，综合评分，课程简介
                "course":["Canvas玩转图像处理","高级","1小时58分","9.7","简介：canvas为开发者们提供了激动人心的图像操作方法，让我们一起来看看，我们都能使用这些方法，如何使用canvas玩转图像处理吧！"],
                //该课程的章节信息    大章节，小章节，视频id
                "chapter":[["欢迎进入Canvas的图像世界","欢迎进入Canvas的图像世界|1"],["Canvas图像基础","Canvas基础 使用drawImage绘制图像|2","Canvas基础 玩转drawImage的参数|3","Canvas基础 在画布中心缩放图像|4","Canvas基础 使用滑杆交互|5"],["离屏Canvas","离屏Canvas为图片添加水印|6","Canvas与鼠标交互","离屏Canvas制作放大镜效果|7","离屏Canvas使用剪辑区域优化|8"],["使用Canvas进行像素级操作","getImageData 和 putImageDatdx|9","Canvas创属于自己的滤镜效果|10","Canvas更复杂的滤镜效果|11","Canvas创建ImageData，感受图像之美|12"]]
            };
            //用户头像
            $("#usericon").attr("src","images/usericon/user"+data.userImg+".jpg");
            $(".tit").html(data.course[0]);                 //为课程名赋值
            $(".msgLevel span").eq(1).html(data.course[1]); //为级别赋值
            $(".msgTime span").eq(1).html(data.course[2]);  //为课程时长赋值
            $(".msgScore span").eq(1).html(data.course[3]); //为评分赋值
            $(".condes").html(data.course[4]);              //为简介赋值
            //为章节赋值
            var chalen=data.chapter.length;
            for(var i=0;i<chalen;i++){
                var chalen2=parseInt(data.chapter[i].length)-1;
                $(".chapters").append("<div class='chapter'><span class='chapicon'></span><span class='chapConts'><div class='chaptit'><span>第"+(i+1)+"章</span><span>"+data.chapter[i][0]+"</span><span class='iconfont icon-shangjiantou1'></span></div><div class='chapcont"+i+"'>");
                for(var j=1;j<=chalen2;j++){
                    //如果直接写$(".chapcont")那么每次循环出来的小节内容都会给前面已有的.chapcont也加上，只能在后面加上一个i来区分了
                    var vedio=data.chapter[i][j].split("|");
                    $(".chapcont"+i).append("<a href='#' class='cont'><span>"+(i+1)+"-"+j+"</span><span src="+vedio[1]+">"+vedio[0]+"</span></a>");
                }
                $(".chapters").append("</div></span></div>");
            }
            //绑定点击事件
            $(".chaptit span").each(function(){
                $(this).on("click",togg);
            });
            $(".cont").each(function(){
                $(this).on("click",play);
            });
            
        },
        error:function(){
            alert("ResHome error");
        }
    });
    
    //点击问答
    $(".navq").click(function(){
        $.ajax({
           type:"post",
           //url:"",
           //dataType:"json",
           success:function(data){
               var data={
                //该课程的问题     提问者，提问者头像，提出的时间，提出的问题，最新的回答，回答的总数目
                "question":[["Willie_Jiang","1","2017-03-28","chrome不兼容","chrome底层决定的吧，用chrome的话需要打开存在服务器的网页才能使用getImageData()方法。用firefox、edge等就不用。","5"],["Willie","3","2017-03-29","不兼容","用firefox、edge等就不用。","2"],["Jiang","5","2017-03-30","chrome","用chrome的话需要打开存在服务器的网页才能使用getImageData()方法。","3"]],
               };
                /*为问答赋值*/
                var quelen=data.question.length;
                for(var i=0;i<quelen;i++){
                    $(".QaA").append("<div class='ques'><img src='images/usericon/user"+data.question[i][1]+".jpg'><div><div class='quser'><a href='#'>"+data.question[i][0]+"</a><span>"+data.question[i][2]+"</span></div><div class='qtit'>"+data.question[i][3]+"</div><div class='qans'><span>[最新回答]</span><span>"+data.question[i][4]+"</span></div><div class='qcount'>"+data.question[i][5]+"回答</div></div></div>");
                }
           },
           error:function(){
               alert("navq error");
           }
        });
    });
    
    //点击笔记
    $(".navnote").click(function(){
        $.ajax({
           type:"post",
           //url:"",
           //dataType:"json",
           success:function(data){
               var data={
                //该课程所有的笔记    写笔记的人，提问者头像，记笔记的时间，笔记内容，点赞的总人数
                "note":[["qq_锁_23348937","6","2017-3-5","var canvas=document.getElementById(\"canvas\")varcontext=canvas.getContext(\"2d\")//全局要双引号var slider=document.getElementById(\"scale-range\")var image=new Image()window.onload=function(){canvas.width=1152;canvas.height=768;var scale=slider.value;image.src=\"img-lg.jpg\";image.onload=function(){drawImagebyscale(scale);}};image.src=\"img-lg.jpg\";image.onload=function(){drawImagebyscale(scale);}};image.src=\"img-lg.jpg\";image.onload=function(){drawImagebyscale(scale);}};image.src=\"img-lg.jpg\";image.onload=function(){drawImagebyscale(scale);}};image.src=\"img-lg.jpg\";image.onload=function(){drawImagebyscale(scale);}};image.src=\"img-lg.jpg\";image.onload=function(){drawImagebyscale(scale);}};","3"],["锁","8","2017-3-3","var slider=document.getElementById(\"scale-range\")var image=new Image()window.onload=function(){canvas.width=1152;canvas.height=768;var scale=slider.value;image.onload=function(){drawImagebyscale(scale);}}}function drawImagebyscale(scale){var imageWidth=1152*scale;var imageHeight=768*scale;var dx=canvas.width/2-imageWidth/2;var dy=canvas.height/2-imageHeight/2;}","5"]],
               };
                /*为笔记赋值*/
                var notelen=data.note.length;
                for(var i=0;i<notelen;i++){
                    $(".notes").append("<div class='note'><img src='images/usericon/user"+data.note[i][1]+".jpg'><div><div class='noter'><a href='#'>"+data.note[i][0]+"</a><span>"+data.note[i][2]+"</span></div><div class='notecont'><span>"+data.note[i][3]+"</span><span id='noteTog'>[显示全文]</span><span id='notefor'><span class='iconfont icon-dianzan'></span><span id='fornum'>"+data.note[i][4]+"</span></span></div></div></div>");
                }
                //绑定点击事件
                $(".notecont>span").each(function(){
                    $(this).on("click",show);
                });
           },
           error:function(){
               //alert("navq error");
           }
        });
    });
    
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


/*章节toggle*/
function togg(){
    if($(this).index() == 2){
        var cli=$($(this).parent().parent().children()[1]);
        var curState=cli.css("display");
        if("block"==curState){
            $(this).css({"transform":"rotate(180deg)"});
            $(this).parent().css({"margin-bottom":"0"});
        }else{
            $(this).css({"transform":"rotate(360deg)","transition":"all 0.2s ease-in"});
            $(this).parent().css({"margin-bottom":"20px"});
        }
        cli.toggle();
    }
}

function play(){
    window.location.href="playVideo.html?vedioId="+$(this).find("span").eq(1).attr("src");
}

function show(){    
    /*收起评论和显示评论*/
    if($(this).index() == 1){
        if($(this).html().indexOf("显示") != -1){ //点击显示全文
            $(this).html("[收起全文]");
            $(this).prev().css({"overflow":"auto","height":"auto","overflow-x":"hidden"});
        }else{   //点击收起全文
            $(this).html("[显示全文]");
            $(this).prev().css({"overflow":"hidden","height":"100px"});
        }
    }
    /*点赞笔记和取消点赞*/
    if(forflag){
        $($(this).find("#fornum").prev()).css({"color":"#000"});
        var num=parseInt($($(this).find("#fornum")).html());
        $($(this).find("#fornum")).html(++num);
        $($(this).find("#fornum")).css({"color":"#000","transition":"all 0.3s ease-in"});
        forflag=false;
    }else{
        $($(this).find("#fornum").prev()).css({"color":"#666"});
        var num=parseInt($($(this).find("#fornum")).html());
        $($(this).find("#fornum")).html(--num);
        $($(this).find("#fornum")).css({"color":"#666"});
        forflag=true;
    }
}
