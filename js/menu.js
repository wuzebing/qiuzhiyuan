var menuManager = {
    init:function(){
        this.getMenuLis();
    },

    getHref:function(ename){
        if(ename == 'gssbsl'){//设备实力
            return 'list-pic.html';
        }
        if(ename == 'gonggao'){//公司公告
            return 'detail.html';
        }
        if(ename == 'rysl'){
            return 'people.html';
        }

        return 'other.html?key='+ename;
    },

    getMenuLis:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getRootList',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = '<li class="'+(location.href.indexOf("index.html")>-1?"active":"")+'"><a href="index.html">首页</a></li>';
                    for(var i=0;i<data.length;i++){
                        var obj = data[i];
                        var href = _this.getHref(obj.ename);
                        str = str + '<li class="'+(location.href.indexOf(href)>-1?"active":"")+'"><a href="'+href+'">'+obj.name+'</a></li>';
                    }
                    $("#menu-box-ul").html(str);
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },


};
menuManager.init();