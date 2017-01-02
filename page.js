/**
 * Created by lihuanyu on 2016/9/26.
 */

/**
 @Name: Page plugin for Baidu nuomi live sso
 @Author: skyadmin
 @License：MIT
 */

var Page = function (options) {
    var that = this;
    that.config = options || {};
    that.pageModel = {
        hasFirst: false,
        hasPre: false,
        pages: [1],
        hasNext: false,
        hasLast: false,
        currentPage: 1,
        lastPage: 1
    };
};

// 计算分页模型
Page.prototype.model = function () {
    var that = this;
    var conf = that.config;
    var model = {};
    var dict = {};

    conf.pages = conf.pages | 0;
    conf.curr = (conf.curr | 0) || 1;
    conf.groups = 'groups' in conf ? (conf.groups | 0) : 5;
    conf.first = 'first' in conf ? conf.first : '\u9996\u9875';
    conf.last = 'last' in conf ? conf.last : '\u5C3E\u9875';
    conf.prev = 'prev' in conf ? conf.prev : '\u4e0a\u4e00\u9875';
    conf.next = 'next' in conf ? conf.next : '\u4e0b\u4e00\u9875';
    conf.className = conf.className || 'nuomipage';

    if (conf.groups > conf.pages) {
        conf.groups = conf.pages;
    }

    model.currentPage = conf.curr;
    model.lastPage = conf.pages;

    if (conf.pages <= 1) {
        return model;
    }

    // 计算当前组
    dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0)) / (conf.groups === 0 ? 1 : conf.groups));

    // 当前页非首页，则输出上一页
    if (conf.curr > 1 && conf.prev) {
        model.hasPre = true;
    }

    // 当前组非首组，则输出首页
    if (dict.index > 1 && conf.first && conf.groups !== 0) {
        model.hasFirst = true;
    }

    // 输出当前页组
    dict.poor = Math.floor((conf.groups - 1) / 2);
    dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
    dict.end = dict.index > 1 ? (function () {
        var max = conf.curr + (conf.groups - dict.poor - 1);
        return max > conf.pages ? conf.pages : max;
    }()) : conf.groups;
    if (dict.end - dict.start < conf.groups - 1) { // 最后一组状态
        dict.start = dict.end - conf.groups + 1;
    }

    model.pages = [];
    for (; dict.start <= dict.end; dict.start++) {
        model.pages.push(dict.start);
    }

    // 总页数大于连续分页数，且当前组最大页小于总页，输出尾页
    if (conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0) {
        model.hasLast = true;
    }

    // 当前页不为尾页时，输出下一页
    dict.flow = !conf.prev && conf.groups === 0;
    if (conf.curr !== conf.pages && conf.next || dict.flow) {
        // view.push((function(){
        //     return (dict.flow && conf.curr === conf.pages)
        //         ? '<span class="'+ conf.className +'-nomore" title="\u5df2\u6ca1\u6709\u66f4\u591a">'+ conf.next +'</span>'
        //         : '<button class="'+ conf.className +'-next">'+ conf.next +'</button>';
        // }()));
        model.hasNext = true;
    }

    return model;
};

// 分页视图
// Page.prototype.view = function(){
//     var that = this, conf = that.config, view = [], dict = {};
//
//     conf.pages = conf.pages|0;
//     conf.curr = (conf.curr|0) || 1;
//     conf.groups = 'groups' in conf ? (conf.groups|0) : 5;
//     conf.first = 'first' in conf ? conf.first : '\u9996\u9875';
//     conf.last = 'last' in conf ? conf.last : '\u5C3E\u9875';
//     conf.prev = 'prev' in conf ? conf.prev : '\u4e0a\u4e00\u9875';
//     conf.next = 'next' in conf ? conf.next : '\u4e0b\u4e00\u9875';
//     conf.className = conf.className || 'nuomipage';
//
//     if(conf.groups > conf.pages){
//         conf.groups = conf.pages;
//     }
//
//     //计算当前组
//     dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0))/(conf.groups === 0 ? 1 : conf.groups));
//
//     //当前页非首页，则输出上一页
//     if(conf.curr > 1 && conf.prev){
//         view.push('<button class="'+ conf.className +'-prev">'+ conf.prev +'</button>');
//
//     }
//
//     //当前组非首组，则输出首页
//     if(dict.index > 1 && conf.first && conf.groups !== 0){
//         view.push('<button class="'+ conf.className +'-first" title="\u9996\u9875">'+ conf.first +'</button><span>\u2026</span>');
//     }
//
//     //输出当前页组
//     dict.poor = Math.floor((conf.groups-1)/2);
//     dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
//     dict.end = dict.index > 1 ? (function(){
//         var max = conf.curr + (conf.groups - dict.poor - 1);
//         return max > conf.pages ? conf.pages : max;
//     }()) : conf.groups;
//     if(dict.end - dict.start < conf.groups - 1){ //最后一组状态
//         dict.start = dict.end - conf.groups + 1;
//     }
//     for(; dict.start <= dict.end; dict.start++){
//         if(dict.start === conf.curr){
//             view.push('<span class="'+ conf.className +'-curr">'+ dict.start +'</span>');
//         } else {
//             view.push('<button>'+ dict.start +'</button>');
//         }
//     }
//
//     //总页数大于连续分页数，且当前组最大页小于总页，输出尾页
//     if(conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0){
//         view.push('<span>\u2026</span><button class="'+ conf.className +'-last" title="\u5c3e\u9875">'+ conf.last +'</button>');
//     }
//
//     //当前页不为尾页时，输出下一页
//     dict.flow = !conf.prev && conf.groups === 0;
//     if(conf.curr !== conf.pages && conf.next || dict.flow){
//         view.push((function(){
//             return (dict.flow && conf.curr === conf.pages)
//                 ? '<span class="'+ conf.className +'-nomore" title="\u5df2\u6ca1\u6709\u66f4\u591a">'+ conf.next +'</span>'
//                 : '<button class="'+ conf.className +'-next">'+ conf.next +'</button>';
//         }()));
//     }
//
//     if(conf.pages <= 1) return '';
//
//     return '<div class="'+ conf.className +'-main">'+ view.join('') + function(){
//             return conf.skip
//                 ? '<span class="'+ conf.className +'-total"><label>\u5230\u7b2c</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="'+ conf.className +'-skip"><label>\u9875</label>'
//             + '<button type="button" class="'+ conf.className +'-btn">\u786e\u5b9a</button></span>'
//                 : '';
//         }() +'</div>';
// };

// 渲染
Page.prototype.render = function () {
    return this.model();
};

module.exports = function (options) {
    return new Page(options).render();
};
