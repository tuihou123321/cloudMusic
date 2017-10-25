// var _baseUrl='http://musicapi.duapp.com/api.php'
var _baseUrl='src/api/songList.json'
var _baseUrl2='src/api/rage.json'
var _baseUrl3='src/api/playListDetail.json'

export default{
    getPlayListByWhere(cat,order,offset,total,limit){
        //cat范围，order类型，offset偏移量，total是否到底了，limit每次加载数量
        return _baseUrl+'?type=toplayList&cat='+cat+'&offset'+offset+'$limit'+limit+'$order'+order
    },
    getRage(cat,order,offset,total,limit){
        //cat范围，order类型，offset偏移量，total是否到底了，limit每次加载数量
        return _baseUrl2+'?type=toplayList&cat='+cat+'&offset'+offset+'$limit'+limit+'$order'+order
    },
    getPlayListDetail(cat,order,offset,total,limit){
        //cat范围，order类型，offset偏移量，total是否到底了，limit每次加载数量
        return _baseUrl3+'?type=toplayList&cat='+cat+'&offset'+offset+'$limit'+limit+'$order'+order
    }
}