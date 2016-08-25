// 引入fs文件处理模块
var fs = require("fs");

// 测试用的HTML页文件夹地址和文件名称
var src = 'import';
var filename = ['header.html','import.html','index.html'];

var fnImportExample = function(src, filename) {
    // 读取HTML页面数据
    // 使用API文档中的fs.readFile(filename, [options], callback)
    fs.readFile(src + '/' + filename, {
        // 需要指定编码方式，否则返回原生buffer
        encoding: 'utf8'
    }, function(err, data) {
        // 下面要做的事情就是把
        // <link rel="import" href="header.html">
        // 这段HTML替换成href文件中的内容
        // 可以求助万能的正则
        var dataReplace = data.replace(/<link\srel="import"\shref="(.*)">/gi, function(matchs, m1) {
            // m1就是匹配的路径地址了
            // 然后就可以读文件了
            return fs.readFileSync(src + '/' + m1, {
                encoding: 'utf8'
            });
        });

        // 由于我们要把文件放在更上一级目录，因此，一些相对地址要处理下
        // 在本例子中，就比较简单，对../进行替换
        dataReplace = dataReplace.replace(/"\.\.\//g, '"');

        // 于是生成新的HTML文件
        // 文档找一找，发现了fs.writeFile(filename, data, [options], callback)
        fs.writeFile(filename, dataReplace, {
            encoding: 'utf8'
        }, function(err) {
            if (err) throw err;
            console.log(filename + '生成成功！');
        });
    });
};

// 默认先执行一次
function run(){
    for (var i = 1; i < filename.length; i++) {
    fnImportExample(src, filename[i]);
    };
};
run();
//fnImportExample(src, filename);

// 监控header文件，变更后重新生成
var b = filename[0];
fs.watch(src + '/' + b, function(event, b) {
    if (event == 'change') {
        console.log(src + '/' + b + '发生了改变');
        run();
    }
});

// 监控import文件，变更后重新生成
var a = 1;
var b = filename[a];
fs.watch(src + '/' + b, function(event, b) {
    if (event == 'change') {
        console.log(src + '/' + b + '发生了改变，重新生成...');
        fnImportExample(src, b);
    }
});

// 监控index文件，变更后重新生成
var a = 2;
var b = filename[a];
fs.watch(src + '/' + b, function(event, b) {
    if (event == 'change') {
        console.log(src + '/' + b + '发生了改变，重新生成...');
        fnImportExample(src, b);
    }
});



