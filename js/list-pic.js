/**
 * Created by Administrator on 2019/1/18.
 */
/**
 * Created by Administrator on 2019/1/18.
 */
var listPicManager = {

    id: null,

    articleId:null,

    pageNum:1,

    pageSize:12,

    total:0,

    init:function(){
        this.id = getQueryString('id');
        this.articleId = getQueryString('articleId');
        this.getDeviceList();
        if(this.id != null){
            if(this.articleId != null){
                this.getArticleById();
            }else{
                this.getArticleByMenuId(this.id);
            }
        }else{
            this.getAllArticleInDevice();
        }
    },
    formatArticleInfo:function(){
        $("#title-pic").html("设备详情");
    },

    formatListInfo:function(){
        $("#title-pic").html("设备列表");
    },
    getArticleById:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleById?id='+this.articleId,
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    $("#pic-list").html('<li><div class="pic-title-content">'
                           +'<div class="pic-title-img"><img src="http://'+location.host+'/'+data.pictureUrl+'"/></div>'
                            +'<div class="pic-title-title"><span>'+data.title+'</span><p>'+data.summary+'</p></div>'
                        +'</div><div class="pic-content">'+(data.content.replace(/src=\"/g,'src="http://'+location.host))+'</div></li>');
                    _this.formatArticleInfo();
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
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
                        str = str + '<li class="pic">'
                            +'<div class="img-box">'
                            +'<a href="list-pic.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'
                            +'<img src="http://'+location.host+'/'+obj.pictureUrl+'">'
                            +'</a>'
                            +'</div>'
                            +'<h3><a href="list-pic.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'+obj.title+'</a></h3>'
                            +'</li>';
                    }
                    $("#pic-list").html(str);
                    _this.total = data.count;
                    _this.formatListInfo();
                    _this.createPage();
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    getArticleByMenuId:function(id){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleByMenuId?menuId='+id+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize,
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = "";
                    for(var i=0;i<data.list.length;i++){
                        var obj = data.list[i];
                        str = str + '<li class="pic">'
                           +'<div class="img-box">'
                            +'<a href="list-pic.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'
                            +'<img src="http://'+location.host+'/'+obj.pictureUrl+'">'
                            +'</a>'
                            +'</div>'
                            +'<h3><a href="list-pic.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'+obj.title+'</a></h3>'
                            +'</li>';
                    }
                    $("#pic-list").append(str);
                    _this.total = data.count;
                    _this.formatListInfo();
                    _this.createPage();
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    getDeviceList:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getDeviceList',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = "";
                    var id = "";
                    str = '<li class="'+(_this.id == null?'active':'')+'" style="background-image: none;"><a href="list-pic.html">全部</a></li>';
                    for(var i=0;i<data.length;i++){
                        var obj = data[i];
                        str = str + '<li class="'+(_this.id == obj.folderId?'active':'')+'"><a href="list-pic.html?id='+obj.folderId+'">'+obj.name+'</a></li>';
                    }
                    $("#list-pic-ul").append(str);
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    createPage:function(){
        // var _this = this;
        // $(".tcdPageCode").createPage({
        //     pageCount:_this.total,
        //     current:_this.pageNum,
        //     backFn:function(p){
        //        debugger;
        //     }
        // });
    }
};
listPicManager.init();
