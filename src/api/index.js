// var _baseUrl='http://musicapi.duapp.com/api.php'
var _baseUrl='src/api/songList.json'

export default{
    getPlayListByWhere(cat,order,offset,total,limit){
        //cat范围，order类型，offset偏移量，total是否到底了，limit每次加载数量
        return _baseUrl+'?type=toplayList&cat='+cat+'&offset'+offset+'$limit'+limit+'$order'+order
    }
}