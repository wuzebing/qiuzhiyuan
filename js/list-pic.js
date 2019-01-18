/**
 * Created by Administrator on 2019/1/18.
 */
/**
 * Created by Administrator on 2019/1/18.
 */
var listPicManager = {

    id: null,

    pageNum:1,

    pageSize:12,

    total:0,

    init:function(){
        this.getDeviceList();
        this.id = getQueryString('id');
        if(this.id != null){
            this.getArticleByMenuId(this.id);
        }else{
            this.getAllArticleInDevice();
        }
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
                            +'<a href="detail-pic.html?id='+obj.articleId+'">'
                            +'<img src="http://'+location.host+'/'+obj.pictureUrl+'">'
                            +'</a>'
                            +'</div>'
                            +'<h3><a href="detail-pic.html?id='+obj.articleId+'">'+obj.title+'</a></h3>'
                            +'</li>';
                    }
                    $("#pic-list").html(str);
                    _this.total = data.count;
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
                            +'<a href="detail-pic.html?id='+obj.articleId+'">'
                            +'<img src="http://'+location.host+'/'+obj.pictureUrl+'">'
                            +'</a>'
                            +'</div>'
                            +'<h3><a href="detail-pic.html?id='+obj.articleId+'">'+obj.title+'</a></h3>'
                            +'</li>';
                    }
                    $("#pic-list").append(str);
                    _this.total = data.count;
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
