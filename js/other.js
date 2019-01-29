/**
 * Created by Administrator on 2019/1/18.
 */
/**
 * Created by Administrator on 2019/1/18.
 */
var otherManager = {

    key: null,

    init:function(){
        this.key = getQueryString('key');
        this.getMenuList();
        
    },
    
    getMenuList:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getRootList',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    for(let i=0;i<data.length;i++){
                        debugger;
                        if(data[i].ename == _this.key){
                            $("#pic-list").html(data[i].content)
                            $("#other-title").html(data[i].name)
                        }
                    }
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
otherManager.init();
