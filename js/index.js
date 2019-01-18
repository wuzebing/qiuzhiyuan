var indexManager = {
    init:function(){
        this.getAnnouncementList();
        this.getAllArticleInDevice();
    },

    getAllArticleInDevice:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getAllArticleInDevice',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = "";
                    for(var i=0;i<data.length;i++){
                        var obj = data[i];

                        str = str + '<li>'
                            +'<a href="list-pic.html?id='+obj.articleId+'"><img alt="'+obj.title+'" src="http://'+location.host+'/'+obj.pictureUrl+'"/></a>'
                        +'<span>'+obj.title+'</span>'
                        +'</li>'
                        +' <li>';
                    }
                    $("#poduction-list").html(str);
                    _this.animationList();
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    getAnnouncementList:function(){
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getAnnouncementList? pageNum=1&pageSize=20',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = "";
                    for(var i=0;i<data.list.length;i++){
                        var obj = data.list[i];
                        str = str + '<li><a href="detail.html?id='+obj.articleId+'">'+obj.title+'</a><span>'+new Date(obj.updateTime).format('yyyy-MM-dd')+'</span></li>';
                    }
                    $("#notice-ul").append(str);
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    animationList:function(){
        $(".scrollleft").imgscroll({
            speed: 40,    //图片滚动速度
            amount: 0,    //图片滚动过渡时间
            width: 1,     //图片滚动步数
            dir: "left"   // "left" 或 "up" 向左或向上滚动
        });

        $(".tabbox .tab a").mouseover(function () {
            $(this).addClass('on').siblings().removeClass('on');
            var index = $(this).index();
            number = index;
            $('.tabbox .content .tb').hide();
            $('.tabbox .content .tb:eq(' + index + ')').show();
        });

        var auto = 1;  //等于1则自动切换，其他任意数字则不自动切换
        if (auto == 1) {
            var number = 0;
            var maxNumber = $('.tabbox .tab a').length;

            function autotab() {
                number++;
                number == maxNumber ? number = 0 : number;
                $('.tabbox .tab a:eq(' + number + ')').addClass('on').siblings().removeClass('on');
                $('.tabbox .content .tb:eq(' + number + ')').show().siblings().hide();
            }

            var tabChange = setInterval(autotab, 3000);
            //鼠标悬停暂停切换
            $('.tabbox').mouseover(function () {
                clearInterval(tabChange);
            });
            $('.tabbox').mouseout(function () {
                tabChange = setInterval(autotab, 3000);
            });
        }
    }

};

$(function () {
    indexManager.init();
    //图片滚动 调用方法 imgscroll({speed: 30,amount: 1,dir: "up"});
    $.fn.imgscroll = function (o) {
        var defaults = {
            speed: 40,
            amount: 0,
            width: 1,
            dir: "left"
        };
        o = $.extend(defaults, o);

        return this.each(function () {
            var _li = $("li", this);
            _li.parent().parent().css({overflow: "hidden", position: "relative"}); //div
            _li.parent().css({
                margin: "0",
                padding: "0",
                overflow: "hidden",
                position: "relative",
                "list-style": "none"
            }); //ul
            _li.css({position: "relative", overflow: "hidden"}); //li
            if (o.dir == "left") _li.css({float: "left"});

            //初始大小
            var _li_size = 0;
            for (var i = 0; i < _li.size(); i++)
                _li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);

            //循环所需要的元素
            if (o.dir == "left") _li.parent().css({width: (_li_size * 3) + "px"});
            _li.parent().empty().append(_li.clone()).append(_li.clone()).append(_li.clone());
            _li = $("li", this);

            //滚动
            var _li_scroll = 0;

            function goto() {
                _li_scroll += o.width;
                if (_li_scroll > _li_size) {
                    _li_scroll = 0;
                    _li.parent().css(o.dir == "left" ? {left: -_li_scroll} : {top: -_li_scroll});
                    _li_scroll += o.width;
                }
                _li.parent().animate(o.dir == "left" ? {left: -_li_scroll} : {top: -_li_scroll}, o.amount);
            }

            //开始
            var move = setInterval(function () {
                goto();
            }, o.speed);
            _li.parent().hover(function () {
                clearInterval(move);
            }, function () {
                clearInterval(move);
                move = setInterval(function () {
                    goto();
                }, o.speed);
            });
        });
    };
//友情链接下拉框跳转弹出新窗口
    function frlink(selObj) {
        window.open(selObj.options[selObj.selectedIndex].value);
    }
});