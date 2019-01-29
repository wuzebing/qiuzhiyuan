/**
 * Created by Administrator on 2019/1/18.
 */
/**
 * Created by Administrator on 2019/1/18.
 */
var peopleManager = {

    id: null,

    pageNum:1,

    pageSize:12,

    total:0,

    init:function(){
        this.id = getQueryString('id');
        if(this.id != null){
            this.getArticleById();
        }else{
            this.AllPeople();
        }
    },
    formatArticleInfo:function(){
        $("#title-pic").html("人员详情");
    },

    formatListInfo:function(){
        $("#title-pic").html("人员列表");
    },
    getArticleById:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleById?id='+this.id,
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

    AllPeople:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getPeopleList',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = "";
                    for(var i=0;i<data.list.length;i++){
                        var obj = data.list[i];
                        str = str + '<li class="pic" style="width:181px;">'
                            +'<div class="img-box" style="width:162px;">'
                            +'<a href="people.html?id='+obj.articleId+'">'
                            +'<img src="http://'+location.host+'/'+obj.pictureUrl+'" style="width:160px;">'
                            +'</a>'
                            +'</div>'
                            +'<h3><a href="people.html?id='+obj.articleId+'">'+obj.title+'</a></h3>'
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
peopleManager.init();
