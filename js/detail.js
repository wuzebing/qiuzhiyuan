/**
 * Created by Administrator on 2019/1/18.
 */
var detailManager = {

    id: null,

    init:function(){
        this.id = getQueryString('id');
        this.getAnnouncementList();
        if(this.id != null){
            this.getArticleById(this.id);
        }
    },

    getArticleById:function(id){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleById?id='+id,
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    $("#notice-title").html(data.title);
                    $("#notice-summary").html(data.summary);
                    $("#notice-content").html(data.content);
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
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getAnnouncementList? pageNum=1&pageSize=20',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = "";
                    var id = "";
                    for(var i=0;i<data.list.length;i++){
                        var obj = data.list[i];
                        if(i==0) {
                            if(_this.id == null){
                                id = obj.articleId;
                            }else{
                                id = _this.id;
                            }

                        }
                        str = str + '<li class="'+(id == obj.articleId?'active':'')+'"><a href="detail.html?id='+obj.articleId+'">'+obj.title+'</a></li>';
                    }
                    $("#notice-ul").append(str);

                    if(_this.id == null){
                        _this.id = id;
                        _this.getArticleById(id);
                    }
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    }
};
detailManager.init();
