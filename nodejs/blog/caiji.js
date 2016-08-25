/** 功能:   数据采集* 创建人: Wilson* 时间:   2015-07-29*/
var request = require('request'),
    cheerio = require('cheerio'),
    URL_36KR = 'http://www.lbboke.com/?id=';  //36氪 
/* 开启数据采集器 */
var i = 0;
function a(){
    i++;
    URL_36KRi = URL_36KR + i;
}
//var URL_36KRi = URL_36KR + i;
function dataCollectorStartup() {
            dataRequest(URL_36KRi);
            //i++
    }
/* 数据请求 */
function dataRequest(dataUrl){
    //var dataUrl = dataUrl + i;
    console.log(dataUrl);
    request({
        url: dataUrl,
        method: 'GET'
    },
function(err, res, body) {
    if (err) {
        console.log(dataUrl)
        console.error('[ERROR]Collection' + err);
        return;
    }
    switch(dataUrl) {
        case URL_36KRi:dataParse36Kr(body);
        //i++;
    break;
    }
    });
    }
    /* 36kr 数据解析 */
    function dataParse36Kr(body){
        console.log('============================================================================================');
        console.log('======================================36kr==================================================');
        console.log('============================================================================================');
        console.log(body);
    var $ = cheerio.load(body);
    var articles = $('.post');
        //console.log($);
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var descDoms = $(article).find('.posttitle');
        if(descDoms.length == 0){
            continue;
        }
        var coverDom = $(article).children().first();
        var titleDom = $(descDoms).find('a');
        var timeDom = $(descDoms).find('.timeago');
        var titleVal =  titleDom.text();
        var urlVal = titleDom.attr('href');
        var timeVal = timeDom.text();
        var coverUrl = coverDom.attr('data-lazyload');
        //处理时间
        var timeDateSecs = new Date(timeVal).getTime() / 1000;
        if(urlVal != undefined){
            console.info('--------------------------------');
            console.info('标题：' + titleVal);
            console.info('地址：' + urlVal);
            console.info('时间：' + timeDateSecs);
            console.info('封面：' + coverUrl);
            console.info('--------------------------------');
        }
    };
}
//setInterval(a,2999);
//setInterval(dataCollectorStartup,3000);
a();
dataCollectorStartup();
