$(function(){
    //添加笔记时为黑色的遮罩赋高度
    $(".notebg").css({"height":$(document).height()});
    
    $(".cata2").parent().addClass("color2");
    $(".cata3").parent().addClass("color2");
    var cata1=1,cata2=0,cata3=0;
    
    /*目录点击事件、鼠标事件*/
    $(".cata1").click(function(){
        cata1=1;
        cata2=0;
        cata3=0;
        $(".course").show().siblings().hide();
        $(this).parent().removeClass("color2");
        $(this).parent().removeClass("color3");
        $(this).parent().addClass("color").siblings().removeClass("color");
        $(this).parent().removeClass("color3").siblings().addClass("color2");
    }).mouseenter(function(){
        if(cata1 == 0){
            $(this).parent().addClass("color3");
        }
    }).mouseleave(function(){
        if(cata1 == 0){
            $(this).parent().removeClass("color3");
            $(this).parent().addClass("color2");
        }
    });
    
    $(".cata2").click(function(){
        cata1=0;
        cata2=1;
        cata3=0;
        $(".question").show().siblings().hide();
        $(this).parent().removeClass("color2");
        $(this).parent().removeClass("color3");
        $(this).parent().addClass("color").siblings().removeClass("color");
        $(this).parent().removeClass("color3").siblings().addClass("color2");
    }).mouseenter(function(){
        if(cata2 == 0){
            $(this).parent().addClass("color3");
        }
    }).mouseleave(function(){
        if(cata2 == 0){
            $(this).parent().removeClass("color3");
            $(this).parent().addClass("color2");
        }
    });
    
    $(".cata3").click(function(){
        cata1=0;
        cata2=0;
        cata3=1;
        $(".note").show().siblings().hide();
        $(this).parent().removeClass("color2");
        $(this).parent().removeClass("color3");
        $(this).parent().addClass("color").siblings().removeClass("color");
        $(this).parent().removeClass("color3").siblings().addClass("color2");
    }).mouseenter(function(){
        if(cata3 == 0){
            $(this).parent().addClass("color3");
        }
    }).mouseleave(function(){
        if(cata3 == 0){
            $(this).parent().removeClass("color3");
            $(this).parent().addClass("color2");
        }
    });
    
    
    var flag1=1;
    var flag2=0;
    $(".course_cata1").mouseenter(function(){
        $(this).addClass("addclass");
    }).mouseleave(function(){
        if(flag1 == 0){
            $(this).removeClass("addclass");
        }
    })    
    
    $(".course_cata2").mouseenter(function(){
        $(this).addClass("addclass");
    }).mouseleave(function(){
        if(flag2 == 0){
            $(this).removeClass("addclass");
        }
    })
    
    $(".course_cata1").click(function(){
        $(".cata1_").show().siblings().hide();
        flag1=1;
        flag2=0;
        $(".course_cata2").removeClass("addclass");
    })
    $(".course_cata2").click(function(){
        $(".cata2_").show().siblings().hide();
        flag2=1;
        flag1=0;
        $(".course_cata1").removeClass("addclass");
    })
    
    
    var flag3=1;
    var flag4=0;
    $(".q_q").mouseenter(function(){
        $(this).addClass("addclass");
    }).mouseleave(function(){
        if(flag3 == 0){
            $(this).removeClass("addclass");
        }
    })    
    
    $(".q_f").mouseenter(function(){
        $(this).addClass("addclass");
    }).mouseleave(function(){
        if(flag4 == 0){
            $(this).removeClass("addclass");
        }
    })
    
    $(".q_q").click(function(){
        $(".con1").show().siblings().hide();
        flag3=1;
        flag4=0;
        $(".q_f").removeClass("addclass");
    })
    $(".q_f").click(function(){
        $(".con2").show().siblings().hide();
        flag3=0;
        flag4=1;
        $(".q_q").removeClass("addclass");
    })
    
    $(".ope").mouseover(function(){
        opeflag=false;
        $(this).css({"display":"block"});
    }).mouseleave(function(){
        opeflag=true;
        $(this).css({"display":"none"});
    });

    
    /*返回顶部*/
    $(".backToTop").click(function(){
       $("body,html").animate({scrollTop:0},300); 
    });
    
    $(window).scroll(function(){
       if($(document).scrollTop()>80){
           $(".backToTop").slideDown();
       }else{
           $(".backToTop").slideUp();
       }
    });
    
    //页面初始化的请求
    $.ajax({
       //type:"post",
       //url:"",
       //dataType:"json",
       success:function(data){
           var data={
             "userName":"123",      //用户名
             "userImg":"5",         //用户头像
             //最近学习  课程名，已经学了x%，学习到哪一小节，笔记数目，问答数目
             "recstu":[["Canvas玩转图像处理","8","2-4Canvas基础 使用滑杆交互","1","2"],["1","2","3","4","5"],["6","7","8","9","0"],["a","b","c","d","e"]],  
           };
           //用户名
           $(".username").html(data.userName);
           //用户头像
           $("#usericon").attr("src","images/usericon/user"+data.userImg+".jpg");
           $(".usericon").attr("src","images/usericon/max_user"+data.userImg+".jpg");
           //最近学习
           var stulen=data.recstu.length;
           for(var i=0;i<stulen;i++){
              $(".cata1_").append("<div class='courses'><div class='course_pic'></div><div class='courses_'><div class='course_tit'>"+data.recstu[i][0]+"</div><div class='course_mess'><span>已学 <span>"+data.recstu[i][1]+"</span> %</span><span>学习至<span>"+data.recstu[i][2]+"</span></span></div><div class='course_note'><span>笔记<span>"+data.recstu[i][3]+"</span></span><span>问答<span>"+data.recstu[i][4]+"</span></span></div></div><div class='course_con'><a href='#'>继续学习</a></div></div>");
           }
       },
       error:function(){
           alert("person init error");
       }
    });
    
    /*点击我的收藏*/
    $(".course_cata2").click(function(){
        $.ajax({
            //type:"post",
            //url:"",
            //dataType:"json",
            success:function(data){
                var data={
                    //我的收藏  课程名，笔记数目，问答数目
                    "collection":[["a","b","c"],["d","e","f"],["h","i","j"],["k","l","m"],["n","o","p"]],
                };
                //我的收藏
                var collen=data.collection.length;
                for(var i=0;i<collen;i++){
                    $(".cata2_").append("<div class='courses'><div class='course_pic'></div><div class='courses_'><div class='course_tit'>"+data.collection[i][0]+"</div><div class='course_note'><span>笔记<span>"+data.collection[i][1]+"</span></span><span>问答<span>"+data.collection[i][2]+"</span></span></div></div><div class='course_con'><a href='#'>继续学习</a></div></div>");
                }
            },
            error:function(){
                alert("course_cata2 error");
            }
        });
    });
    
    /*点击提问*/
    $(".cata2").click(function(){
        $.ajax({
           //type:"post",
           //url:"",
           //dataType:"json",
           success:function(){
               var data={
                 //我的提问  课程名，问题题目，（回答，赞同数目）x2 --> 最新的两条
                 "question":[["a","b","c","1","2","3"],["d","e","f","1","2","3"],["h","i","j","1","2","3"],["k","l","m","1","2","3"],["n","o","p","1","2","3"]],
               };
               //提问
               var quelen=data.question.length;
               for(var i=0;i<quelen;i++){
                   $(".con1").append("<div class='q1'><div class='q1_res'>"+data.question[i][0]+"</div><div class='q1_tit'>"+data.question[i][1]+"</div><div class='q1_a1'><span>"+data.question[i][2]+"</span><span>"+data.question[i][3]+"</span></div><div class='q1_a1'><span>"+data.question[i][4]+"</span><span>"+data.question[i][5]+"</span></div></div>");
               }
           },
           error:function(){
               alert("cata2 error");
           }
        });
    });
    
    /*点击我的回答*/
    $(".q_f").click(function(){
        $.ajax({
           //type:"post",
           //url:"",
           //dataType:"json",
           success:function(){
               var data={
                 //我的回答  课程名，问题题目，我的回答，赞同数目
                 "answer":[["a","b","c","1"],["d","e","f","1"],["h","i","j","1"],["k","l","m","1"],["n","o","p","1"]],
               };
               //我的回答
               var anslen=data.answer.length;
               for(var i=0;i<anslen;i++){
                   $(".con2").append("<div class='con2_a1'><div class='q1_res'><span>"+data.answer[i][0]+"</span></div><div class='q1_tit'><span>"+data.answer[i][1]+"</span><span class='iconfont icon-xiajiantou'></span></div><div class='ope'><span>删除</span><span>修改</span></div><div class='q1_a1'><span>"+data.answer[i][2]+"</span><span>"+data.answer[i][3]+"</span></div></div>");
               }
                var opeflag=true;
                /*提问->我的回答->显示隐藏修改+删除*/
                $(".q1_tit>span").mouseover(function(){
                    if($(this).index()==1){
                        var ope=$(this).parent().next();
                        ope.css({"display":"block",});
                    }
                }).mouseleave(function(){
                    if(opeflag){
                        $(".ope").css({"display":"none"});
                    }
                });
           },
           error:function(){
               alert("q_f error");
           }
        });
    });
    
    /*点击笔记*/
    $(".cata3").click(function(){
        $.ajax({
           //type:"post",
           //url:"",
           //dataType:"json",
           success:function(){
               var data={
                 //我的笔记  笔记的题目，笔记的内容
                 "note":[["a","b"],["c","d"],["e","f"]],
               };
               //我的笔记
               var notelen=data.note.length;
               for(var i=0;i<notelen;i++){
                   $(".notes").append("<div class='note1'><div class='note_tit'>"+data.note[i][0]+"</div><div class='note_con'>"+data.note[i][1]+"</div></div>");
               }
           },
           error:function(){
               alert("cata3 error");
           }
        });
    });
    
    /*添加笔记*/
    $(".add").click(function(){
       $(".notebg").show();
       $(".addNote").show();
    });
    
    var tit,con;
    /*提交笔记*/
    $(".addsub").click(function(){
        tit=$(".addtit").val();
        con=$(".addcon").val();
        if(tit == ""){
            $(".titwarn").html("笔记题目不得为空");
        }
        if(con == ""){
            $(".conwarn").html("笔记内容不得为空");
        }
        if(tit != "" && con != ""){
            alert(tit+con);
            //??????????????/笔记提交要发送ajax请求吗
            $.ajax({
                type:"post",
                url:"",
            });
        }
    });
    
    /*关闭笔记*/
    $(".addclose").click(function(){
       $(".notebg").hide();
       $(".addNote").hide();
       $(".addtit").val("");
       $(".addcon").val("");
    });
    
    /*笔记题目改变*/
    $(".addtit").blur(function(){
        tit=$(this).val();
        if(tit.length > 0){
            $(".titwarn").html("");
        }
    });
    
    /*笔记内容改变*/
    $(".addcon").blur(function(){
        con=$(this).val();
        if(con.length > 0){
            $(".conwarn").html("");
        }
    });
    
});