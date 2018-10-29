/**
 * Created by HUI on 2017-03-25.
 */


/**
 *dt函数库
 * @type {{post: dt.post, trim: dt.trim, isNullOrEmpty: dt.isNullOrEmpty, isNotNullAndEmpty: dt.isNotNullAndEmpty, back: dt.back, getQueryString: dt.getQueryString, log: dt.log, replaceBr: dt.replaceBr}}
 * @author XT
 */
var dt= {
    /**
     *ajax的封装（post）
     * @param funcName  请求的方法名
     * @param argsData 入参
     * @param successFunc 成功的回调函数
     * @param errorFunc 失败的回调函数
     */
    post:function(funcName,argsData,successFunc,errorFunc){
        var UA=navigator.userAgent;
        var TOKEN="dreamtouch";
        var DT_API=API_URL;
        var argsIn={
            "apicode": funcName,
            "args": argsData,
            "deviceinfo":UA,
            "token":TOKEN
        };
        $.ajax({
            type: 'post',
            url: DT_API,
            data: JSON.stringify(argsIn),
            crossDomain: true == !(document.all),
            contentType:"application/json",//改变默认请求格式，node需要，.net不需要
            dataType: 'json',
            success: function (data) {
                //开发阶段，ajax获取的结果console出来
                dt.log(data);
                successFunc(data);
            },
            error:function(err){
                // TODO:此处增加一些 400 500等错误的提示
                errorFunc(err);
            }
        });
    },

    /**
     * trim函数表示去除 字符串前后 的空格
     * u3000 空格  u00A0 不间断空格
     * @param str
     * @returns {XML|void|string}
     */
    trim: function (str) {
        return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "");
    },

    /**
     * 判断是否为空
     * 先判断是否为undefined，在判断是否为null，最后判断如果是字符串的话，是否是“”
     * 满足以上任何一种则返回true，其余情况返回false
     * @param obj
     * @returns {boolean}
     */
    isNullOrEmpty: function (obj) {
        if (obj === undefined) {
            return true;
        } else if (obj === null) {
            return true;
        } else if (typeof obj === "string") {
            if (this.trim(obj) ==="") {
                return true;
            }
        }
        return false;
    },

    /**
     * 判断是否为【不为null 且不为 空】
     * @param obj
     * @returns {boolean}  false表示 为空或为null，返回true表示 不为空且不为null
     */
    isNotNullAndEmpty:function(obj){
        //false表示 为空或为null
        //返回true表示 不为空且不为null
        var result=false;
        if(!dt.isNullOrEmpty(obj))
        {
            result=true;
        }
        return result;
    },
    /**
     * 返回上一页
     */
    back: function () {
        history.back();
    },

    /**
     * 获取地址栏参数的方法
     * @example http://www.test.com?name=zhangsan&age=15，获取age为：dt.getQueryString("age")
     * @param name 参数名
     * @returns {*} 返回参数值或者null
     */
    getQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!==null)return  decodeURIComponent(r[2]); return null;
    },

    log:function (str) {

        //TODO：通过环境来控制输出，发布时切换环境或者注释console
        // if(DT_ENVIRONMENT!=enumEnvironment.PROD)
        // {
        console.log(str);
        // }
    },
    replaceBr:function (str) {
        return str.replace(/\r\n/g, "<br>");
    }
};


/**
 * 格式化输入字符串
 * @example 用法: "hello{0}".format('world')；返回'hello world'
 * @returns {string}
 * @author XT
 */
String.prototype.format= function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,function(s,i){
        return args[i];
    });
};


/**
 *时间戳转换为指定格式的时间
 * @param dateStr 14030588040000
 * @param dateRule 'yyyy-MM-dd hh:mm:ss'
 * @author XT
 */
var unixDateFormat = function (dateStr, dateRule) {
    var newDate = new Date();
    newDate.setTime(dateStr);
    return newDate.format(dateRule);
};

/**
 * 时间戳转换的函数
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};


/**
 * 显示Toast提示信息（无需引用css）
 * @param message
 * @param callback
 * @param mil
 */
var showMessage=function(message,callback,mil){
    mil=mil||1500;
    $("body").append("<div class=\"remind-message-container\"><div class=\"remind-message\"><label class=\"reminder\"  id=\"show-massage\">"+message+"</label></div></div>");
    $(".remind-message-container").css({"width":"100%","height":"30px","z-index":"101","position":"fixed","bottom":"20%","left":"0"});
    $(".remind-message").css({"height":"100%","border-radius":"7px","text-align":"center","background":"rgba(0,0,0,0.8)","display":"table","margin":"0 auto"});
    $(".reminder").css({"padding":" 2px 8px","border-radius":"3px","-moz-border-radius":"3px","-webkit-border-radius":"3px","color":"white","height":"30px","line-height":"30px","font-size":"14px"});
    setTimeout(function () {
        $(".remind-message-container").remove();
        if(callback&&typeof(callback)==="function"){
            callback();
        }
    }, mil);
};
/**
 * 显示转圈圈,无需引用css
 */
var showLoading=function(){
    var loadingImgBase64="data:image/gif;base64,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"
    var loadingHtml="<div class=\"loading-content\"><div class=\"loading-show\"><img src=\""+loadingImgBase64+"\" class=\"loading-img\"></div></div>";
    $("body").append(loadingHtml);
    $(".loading-content").css({"top":"0","left":"0","width":"100%","height":"100%","position":"fixed","z-index":"999999","background-color":"rgba(0,0,0,.2)"});
    $(".loading-show").css({"width":"60px","height":"60px","line-height":"60px","text-align":"center","background-color":"rgba(0,0,0,.7)","z-index":"1001","border-radius":"5px","position":"fixed","left":"50%","top":"50%","margin":"-30px 0 0 -30px"});
    $(".loading-img").css({"text-align":"center","margin":"15px auto","width":"30px"});

};

//隐藏转圈圈的动画（删除了整个元素）
var hideLoading=function(){
    $(".loading-content").remove();
};


/**
 * 将请求地址后加时间戳
 * @param url 原始地址
 * @author XT
 * @return 加了时间戳后缀的新地址
 * @date 2017年4月5日
 */
var addUnixToUrl=function (url) {

    var finalUrl=url;

    var timestamp=Date.parse(new Date());
    if(url.indexOf("?") > 0 ){
        finalUrl=finalUrl+"&t="+timestamp;
    }
    else
    {
        finalUrl=finalUrl+"?t="+timestamp;
    }
    return finalUrl;
};
