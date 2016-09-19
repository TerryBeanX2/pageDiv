!(function (g) {
    var pageDiv = function (nowNum, option, callback) {
        this.option = {
            perNum: 5,
            totalNum: 20,
            parent: "body",
            activePage: nowNum ? nowNum : 1,
            nowFirstNum: 0,
            reload: true,
            classNames: {
                ul: "a-",
                firstPage: "b-",
                prePage: "c-",
                ellipsisPre: "d-",
                ellipsis: "e-",
                nextPage: "f-",
                lastPage: "g-",
                pageNumber: "h-"
            }
        };
        this.callback = callback;
        this.extend(this.option, option);
        this.fixClassName();
        this.initPageNum();
        this.createDom();
        this.initEvent();
        this.active();
    };

    pageDiv.prototype = {
        fixClassName: function () {
            window.pageDivObjNum = window.pageDivObjNum ? ++window.pageDivObjNum : 1;
            this.pageDivObjNum = window.pageDivObjNum;
            for (var i in this.option.classNames) {
                this.option.classNames[i] = this.option.classNames[i] + this.pageDivObjNum;
            }
        },
        initPageNum: function () {
            if (this.option.reload) {
                var data = JSON.parse(sessionStorage.getItem('page' + this.pageDivObjNum));
                if (data) {
                    this.option.activePage = data.pageNum;
                    this.option.nowFirstNum = data.nowFirstNum;
                }
            }
            if (this.option.nowFirstNum == 0) {
                this.option.nowFirstNum = this.option.activePage > this.option.totalNum - this.option.perNum ? this.option.totalNum - this.option.perNum + 1 : this.option.activePage;
            }
        },
        extend: function (target, obj) {
            for (var i in obj) {
                target[i] = obj[i];
            }
        },
        hasClass: function (obj, cla) {
            var re = new RegExp("(^|\\s)" + cla + "(\\s|$)");
            return re.test(obj.className);
        },
        addClass: function (obj, cla) {
            if (this.hasClass(obj, cla)) {
                return;
            }

            var newclass = obj.className.split(' ');
            newclass.push(cla);
            obj.className = newclass.join(' ');
        },
        removeClass: function (obj, cla) {
            if (!this.hasClass(obj, cla)) {
                return;
            }
            var re = new RegExp("(^|\\s)" + cla + "(\\s|$)", 'g');
            obj.className = obj.className.replace(re, ' ');
        },
        initEvent: function () {
            var _this = this;
            var addEvent = function (eventType) {
                document.body.addEventListener(eventType, _this, false);
            };
            addEvent("click");
        },
        findTarget: function (e) {
            var thisTarget = e.target;
            while (thisTarget.parentNode && !this.hasClass(thisTarget.parentNode, "pageBtnWrap")) {
                thisTarget = thisTarget.parentNode;
            }
            if (thisTarget.parentNode) return thisTarget;
            else return false;
        },
        createDom: function () {
            this.wrap = document.querySelector(this.option.parent);
            this.ul = document.createElement('ul');
            this.ul.className = this.option.classNames.ul + ' pageBtnWrap';
            this.wrap.appendChild(this.ul);
            this.refreshDom();
            var style = document.createElement('style');
            style.innerHTML = '.pageBtnWrap{border-radius: 4px;text-align:center;overflow:hidden;font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;} .pageBtnWrap>li{display:inline;padding: 0;margin: 0;list-style: none;border: 0;text-decoration: none;} .pageBtnWrap>li>a{font-size:12px;position: relative;float: left;padding: 6px 12px;margin-left: -1px;line-height:1.5;color: #337ab7;text-decoration: none;background-color: #fff;border: 1px solid #ddd;}   .pageBtnWrap>li>a:hover{ z-index: 3;color: #23527c;background-color: #eee;border-color: #ddd;} .pageBtnWrap>.active>a,.pageBtnWrap>.active>a:hover{z-index: 3;color: #fff;cursor: default;background-color: #337ab7;border-color: #337ab7;} .pageBtnWrap>li:last-child>a{border-top-right-radius: 3px;border-bottom-right-radius: 3px;} .pageBtnWrap>li:first-child>a{border-top-left-radius: 3px;border-bottom-left-radius: 3px;margin-left:0} .lastBgEEE>a{cursor: default !important;background-color: #eee !important;} .pageBtnWrap>.' + this.option.classNames.ellipsisPre + '>a:hover,.pageBtnWrap>.' + this.option.classNames.ellipsis + '>a:hover{cursor:default;background-color:#fff} .' + this.option.classNames.pageNumber + '>a{width:40px;box-sizing:border-box;}';
            document.getElementsByTagName('head')[0].appendChild(style);
        },
        refreshDom: function () {
            this.ul.innerHTML = '';
            var html = '';
            html += '<li class="' + this.option.classNames.firstPage + '"><a href="#" ><span >首页</span></a></li>';
            html += '<li class="' + this.option.classNames.prePage + '"><a href="#" ><span>&laquo;</span></a></li>';
            html += '<li class="' + this.option.classNames.ellipsisPre + '" style="display: none"><a href="#">...</a></li>';
            var i = this.option.nowFirstNum;
            if (i > this.option.totalNum - this.option.totalNum % this.option.perNum) {
                i = this.option.totalNum - this.option.perNum + 1
            }
            for (var l = i + this.option.perNum; i < l; i++) {
                if (i > this.option.totalNum) break;
                html += '<li data-page="' + i + '" class="' + this.option.classNames.pageNumber + '"><a href="#">' + i + '</a></li>'
            }
            this.option.nowFirstNum = i - this.option.perNum;
            html += '<li class="' + this.option.classNames.ellipsis + '" style="display: none"><a href="#">...</a></li>';
            html += '<li class="' + this.option.classNames.nextPage + '"><a href="#" ><span>&raquo;</span></a></li>';
            html += '<li class="' + this.option.classNames.lastPage + '"><a href="#"><span>尾页</span></a></li>';
            this.ul.innerHTML = html;
        },
        active: function () {
            this.option.activePage == 1 ? this.changeStyle(this.option.classNames.firstPage, 'lastBgEEE') : this.delStyle(this.option.classNames.firstPage, 'lastBgEEE');
            this.option.activePage == this.option.totalNum ? this.changeStyle(this.option.classNames.lastPage, 'lastBgEEE') : this.delStyle(this.option.classNames.lastPage, 'lastBgEEE');
            if (this.option.nowFirstNum == 1) {
                this.changeStyle(this.option.classNames.prePage, 'lastBgEEE');
                this.hide(document.querySelector('.' + this.option.classNames.ellipsisPre));
            } else {
                this.delStyle(this.option.classNames.prePage, 'lastBgEEE');
                this.show(document.querySelector('.' + this.option.classNames.ellipsisPre));
            }
            if (this.option.nowFirstNum == this.option.totalNum - this.option.perNum + 1) {
                this.hide(document.querySelector('.' + this.option.classNames.ellipsis));
                this.changeStyle(this.option.classNames.nextPage, 'lastBgEEE');
            } else {
                this.delStyle(this.option.classNames.nextPage, 'lastBgEEE');
                this.show(document.querySelector('.' + this.option.classNames.ellipsis));
            }
            var arr = document.getElementsByClassName(this.option.classNames.pageNumber);
            for (var i = 0, l = arr.length; i < l; i++) {
                if (arr[i].dataset.page == this.option.activePage) {
                    this.addClass(arr[i], 'active');
                }
            }
        },
        show: function (obj) {
            if (obj.dataset.display) {
                obj.style.display = obj.dataset.display;
            } else {
                obj.style.display = this.wrap.getElementsByTagName('li')[0].style.display;
            }
        },
        hide: function (obj) {
            if (obj.style.display != 'none') {
                obj.dataset.display = obj.style.display;
            }
            obj.style.display = 'none';
        },
        changeStyle: function (cla, actCla) {
            this.addClass(document.querySelector('.' + cla), actCla);
        },
        delStyle: function (cla, actCla) {
            this.removeClass(document.querySelector('.' + cla), actCla);
        },
        changePage: function (num, bool) {
            if (this.option.reload) {
                sessionStorage.setItem('page' + this.pageDivObjNum, JSON.stringify({
                    pageNum: num,
                    nowFirstNum: this.option.nowFirstNum
                }));
            }
            this.option.activePage = num;
            if (this.callback && typeof this.callback == 'function') this.callback(num);
            var arr = this.ul.childNodes;
            for (var i = 0; i < arr.length; i++) {
                this.removeClass(arr[i], 'active');
            }
            if (!bool) {
                this.refreshDom();
            }
            this.active();
        },
        _click: function (e) {
            var num = 0;
            var target = this.findTarget(e);
            if (target) {
                if (this.hasClass(target, this.option.classNames.firstPage)) {
                    this.option.nowFirstNum = 1;
                    num = 1;
                    this.changePage(num);
                } else if (this.hasClass(target, this.option.classNames.lastPage)) {
                    this.option.nowFirstNum = this.option.totalNum - this.option.perNum + 1;
                    num = this.option.totalNum;
                    this.changePage(num);
                } else if (this.hasClass(target, this.option.classNames.prePage)) {
                    if (this.option.nowFirstNum == 1) return;
                    this.option.activePage = this.option.activePage - this.option.perNum;
                    this.option.activePage = this.option.activePage < 1 ? 1 : this.option.activePage;
                    num = this.option.activePage;
                    this.option.nowFirstNum -= this.option.perNum;
                    if (this.option.nowFirstNum <= 0) this.option.nowFirstNum = 1;
                    this.changePage(num);
                } else if (this.hasClass(target, this.option.classNames.nextPage)) {
                    if (this.option.nowFirstNum == this.option.totalNum - this.option.perNum + 1) return;
                    this.option.activePage = this.option.activePage + this.option.perNum;
                    this.option.activePage = this.option.activePage > this.option.totalNum ? this.option.totalNum : this.option.activePage;
                    num = this.option.activePage;
                    this.option.nowFirstNum += this.option.perNum;
                    if (this.option.nowFirstNum > this.option.totalNum - this.option.perNum) this.option.nowFirstNum = this.option.totalNum - this.option.perNum + 1;
                    this.changePage(num);
                } else if (this.hasClass(target, this.option.classNames.pageNumber)) {
                    num = Number(this.findTarget(e).childNodes[0].innerHTML);
                    this.changePage(num, true);
                } else {
                    return false;
                }
            }
        },
        handleEvent: function (e) {
            var eventFun = "_" + e.type;
            if (typeof this[eventFun] == "function") this[eventFun](e);
        }
    };

    Object.defineProperty(g, "pageDiv", {
        configurable: true,
        enumerable: true,
        value: pageDiv
    });

})(this);

