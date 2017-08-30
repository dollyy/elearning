var l_name,l_pwd;
var codemsg=['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
$(function(){
    
    //获取注册时所需要的一级分类
    $.ajax({
       type:"post",
       url:"",
       dataType:"",
       success:function(data){
           
       },
       error:function(){
           alert("error");
       }
    });
    
    //验证码
    getCodes();
    //切换验证码
    $(".change").click(function(){
        $("#codeMsg").html("");
        getCodes();
    });
    
    /*点击关闭*/
    $(".icon-cha").click(function(){
        $(".bg, .login").hide();
        $(".bg, .register").hide();
        $("#u1").html("");
        $("#p1").html("");
        $("#u2").html("");
        $("#p2").html("");
        $("#p3").html("");
        $("#l_name").val("");
        $("#l_pwd").val("");
        $("#r_name").val("");
        $("#r_pwd").val("");
        $("#r_pwdt").val("");
    });
    
    /*点击登陆*/
    $("#login").click(function(){
        $(".bg, .login").show();
    });

    /*点击去注册*/
    $(".goreg").click(function(){
        $(".login").hide();
        $(".register").show();
    });
    
    /*点击注册*/
    $("#register").click(function(){
        $(".bg, .register").show();
    });
    
    /*点击去登陆*/
    $(".golog").click(function(){
        $(".register").hide();
        $(".login").show();
    });
    
    /*登陆下的用户名改变*/
    $("#l_name").blur(function(){
        l_name=$("#l_name").val();
        if(l_name.length == 0){
            $("#u1").html("请输入用户名");
        }else{
            $("#u1").html("");
            $.ajax({
               type:"post",
               url:"http://192.168.1.147:8080/E-learning/user_checklogin.action?userName="+l_name,
               dataType:"text",
               success:function(data){
                    switch(data){
                        case "0":
                            $("#u1").html("用户名未激活或不存在");
                            $("#l_name").val("");
                            break;
                    } 
               },
               error:function(){
                   alert(error);
               }
            });
        }
    })
    
    /*登陆下的密码改变*/
    $("#l_pwd").blur(function(){
        l_pwd=$("#l_pwd").val();
        if(l_pwd.length == 0){
            $("#p1").html("请输入密码");
        }else{
            $("#p1").html("");
        }
    })
    
    
    /*点击登录按钮*/
    $(".l_button").click(function(){
        l_name=$("#l_name").val();
        if(l_name.length == 0){
            $("#u1").html("用户名不得为空");
        }
        l_pwd=$("#l_pwd").val();
        if(l_pwd.length == 0){
            $("#p1").html("密码不得为空");
        }
        var isAuto=$("#autolog").is(":checked");    //是否自动登录
        if(l_name.length > 0 && l_pwd.length > 0){
            $.ajax({
                type:"post",
                url:"http://192.168.1.147:8080/E-learning/user_login.action?userName="+l_name+"&userPwd="+l_pwd+"&isAuto="+isAuto,
                dataType:"text",
                success:function(data){
                    switch(data){
                        case "-1":		//密码错误
                            $("#p1").html("密码错误");
                            $("#l_pwd").val("");
                            break;
                        default:		//登陆成功
                            $(".bg").css("display","none");
                            $(".login").css("display","none");
                            $(".clicks").css("display","none"); $("#usericon").attr("src","images/usericon/user"+data+".jpg");
                            $("#usericon").css("display","inline");
                    }
                },
                error:function(){
                    alert("login error");
                }
            });
        }
    });
    
    /*注册下的用户名改变*/
    $("#r_name").blur(function(){
        var $username=$("#r_name").val();
        /*var $mail=/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;*/
        var $mail=/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        //var $phone=/^[1][358][0-9]{9}$/;
        if($username.length == 0){
            $("#u2").html("请输入用户名");
        }else{
            if(!$mail.test($username)){
                $("#u2").html("用户名格式错误");
            }else{
                $("#u2").html("");
                //用户名符合格式 判断是否已经注册过
                $.ajax({
                   type:"post",
                   url:"http://192.168.1.147:8080/E-learning/user_CheckUserName.action?userName="+$username,
                   dataType:"text",
                   success:function(data){
                       //alert(data);
                       switch(data){
                           case "1":$("#u2").html("用户名已存在");break;
                       }
                   },
                   error:function(data){
                       alert("error");
                   }
                });
            }
        }
    })
    
    /*注册下的密码改变*/
    $("#r_pwd").blur(function(){
        var $password=$("#r_pwd").val();
        var $passwordt=$("#r_pwdt").val();
        var $pwd_format=/^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/;
        if($password.length == 0){
            $("#p2").html("请输入密码");
        }else{
            if($password.length < 6){
                $("#p2").html("密码不得少于6位");
            }else if($password.length > 17){
                $("#p2").html("密码不得多于16位");
            }else{
                if(!$pwd_format.test($password)){
                    $("#p2").html("密码格式错误");
                }else{
                    $("#p2").html("");
                    if($password == $passwordt){
                        $("#p2").html("");
                        $("#p3").html("");
                    }else{
                        $("#p3").html("两次密码不一致");
                    }
                }
            }
            
        }
    })
    
    /*注册下的再次输入密码改变*/
    $("#r_pwdt").blur(function(){
        var password=$("#r_pwd").val();
        var passwordt=$("#r_pwdt").val();
        if(passwordt.length == 0){
            $("#p3").html("请再次输入密码");
        }else{
            if(password == passwordt){
                $("#p3").html("");
            }else{
                $("#p3").html("两次密码不一致");
            }
        }
    })
    
    /*注册下的兴趣改变*/
    var hobbych=false;
    var hobbys=$(".hobb");
    $(".hs").click(function(){
        for(var i=0;i<hobbys.length;i++){
            if($(hobbys[i]).is(":checked")){
                hobbych=true;
                break;
            }else{
                hobbych=false;
            }
        }
        if(hobbych){
            $("#h1").html("");
        }else{
            $("#h1").html("请选择感兴趣的方向");
        }
    });
    
    /*注册下的验证码改变*/
    $("#r_code").blur(function(){
        var code=$("#r_code").val();
        if(code.length == 0){
            $("#c1").html("请输入验证码");
        }else{
            $("#c1").html("");
        }
    });
    
    /*点击注册按钮*/
    $(".r_button").click(function(){
        /*判断用户名*/
        var username=$("#r_name").val();
        if(username.length == 0){
            $("#u2").html("用户名不得为空");
        }
        /*判断密码*/
        var password=$("#r_pwd").val();
        if(password.length == 0){
            $("#p2").html("密码不得为空");
        }
        /*判断确认密码*/
        var password=$("#r_pwdt").val();
        if(password.length == 0){
            $("#p3").html("请确认密码");
        }
        /*判断兴趣*/
        var hobbyflag=true;
        for(var i=0;i<hobbys.length;i++){
            if($(hobbys[i]).is(":checked")){
                hobbyflag=false;
            }
        }
        if(hobbyflag){
            $("#h1").html("请选择感兴趣的方向");
        }
        /*判断验证码*/
        var inputcode=$("#r_code").val();
        if(inputcode.length == 0){
            $("#c1").html("验证码不得为空");
        }
        var h="";
        for(var i=0;i<hobbys.length;i++){
            if($(hobbys[i]).is(":checked")){
                h+=$(hobbys[i]).val()+"|";
            }
        }
        h=h.substring(0,h.lastIndexOf("|"));
        if(username.length > 0 && password.length > 0){
            if(yzm==$("#r_code").val()){
                $.ajax({
                    type:"post",
                    url:"http://192.168.1.147:8080/E-learning/user_register.action",
                    data:{"userName":username,"userPwd":password,"userHobby":h,"collectNum":0},
                    dataType:"json",
                    beforeSend:function(){
                        alert(username+","+password+","+h);
                    },
                    success:function(data){
                        alert("前往邮箱激活");
                    },
                    error:function(){
                        alert("error");
                    }
                });
            }else{
                $("#c1").html("验证码错误");
                $("#r_code").val("");
            }
        }
    })
    
});
var code="",flag,yzm;
function getCodes(){
    var codes=[];
    yzm="";
    for(var i=0;i<4;i++){
        flag=false;
        getOne();
        if(codes.length > 0){
            for(var j=0;j<codes.length;j++){
                if(code == codes[j]){
                    console.log("the same");
                    flag=true;			//获取到的随机数和之前获取到的一样
                    break;
                }
            }
            if(flag){
                getOne();
                i--;		//如果获取到了相同的随机数把i减1，不然获取到的验证码会少以为
            }else{
                yzm+=codemsg[code];
                codes[i]=code;
            }
        }else{			//获取验证码第一位不需要判断是否一样
            yzm+=codemsg[code];
            codes[i]=code;
        }
    }
    $("#codeMsg").html(yzm);
}
function getOne(){
    code=Math.floor(Math.random()*codemsg.length);
}