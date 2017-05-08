/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId]) {
/******/            return installedModules[moduleId].exports;
/******/        }
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // identity function for calling harmony imports with the correct context
/******/    __webpack_require__.i = function(value) { return value; };
/******/
/******/    // define getter function for harmony exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, {
/******/                configurable: false,
/******/                enumerable: true,
/******/                get: getter
/******/            });
/******/        }
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * ファーストオーダー一覧画面
 * */
var KitchenView = (function () {
    function KitchenView() {
    }
    KitchenView.prototype.start = function () {
        var _this = this;
        this.el = document.getElementById("kitchen-view");
        this.orderWindow = document.getElementById("order-window");
        this.orderCloseBtn = document.getElementById("btn-close-order");
        this.el.className = "show";
        this.btnOrderHandler = function (event) {
            _this.openOrder(event);
        };
        this.orderCloseBtn.addEventListener("click", function () {
            _this.orderWindow.className = "";
        });
        this.setEvent();
    };
    KitchenView.prototype.update = function (data) {
        console.log(data);
    };
    KitchenView.prototype.setEvent = function () {
        var btnOrder = document.getElementsByClassName("btn-order");
        for (var i = 0; i < btnOrder.length; i++) {
            btnOrder[i].addEventListener("click", this.btnOrderHandler);
        }
    };
    KitchenView.prototype.openOrder = function (event) {
        console.log(event.target.dataset.itemdata);
        this.orderWindow.className = "show";
    };
    return KitchenView;
}());
module.exports = KitchenView;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * 予約確認画面
 * */
var ReserveView = (function () {
    function ReserveView(func1) {
        this.postVacant = func1;
    }
    ReserveView.prototype.start = function (menuList) {
        var _this = this;
        this.menuList = menuList;
        this.el = document.getElementById("reserve-view");
        this.reserveList = document.getElementById("reserve-list");
        this.orderWindow = document.getElementById("order-window");
        this.el.className = "show";
        this.btnOkHandler = function (event) {
            var id = event.target.dataset.id;
            var flg = event.target.dataset.flg;
            if (flg === "1") {
                console.log("予約OK : ");
                _this.postVacant(id, true);
            }
            else {
                console.log("予約NG : ");
                _this.postVacant(id, false);
            }
            // this.setParam(id, "status", value);
            // this.update();
        };
        this.btnOrderHandler = function (event) {
            _this.openOrder(event);
        };
        this.orderWindowCloseHandler = function () {
            _this.orderWindow.className = "";
        };
        this.unlock();
        this.setEvent();
    };
    /**
     * 来店表示のみ更新
     * @param id
     */
    ReserveView.prototype.setComming = function (id) {
        console.log("###################");
        this.setParam(id, "comingFlg", true);
        console.log(this.data);
        this.update();
    };
    ReserveView.prototype.update = function (data) {
        if (data) {
            this.data = data;
        }
        // リストを初期化
        this.resetEvent();
        this.reserveList.innerHTML = "";
        // 予約承認待ち
        var len = this.data.vacantConfList.length;
        for (var i = 0; i < len; i++) {
            var template = this.generateItemTemplate(this.data.vacantConfList[i]);
            // console.log(template);
            this.reserveList.innerHTML += template;
        }
        // 来店待ち
        len = this.data.vacantList.length;
        for (var i = 0; i < len; i++) {
            var template = this.generateItemTemplate(this.data.vacantList[i]);
            // console.log(template);
            this.reserveList.innerHTML += template;
        }
        // イベント再設定
        this.setEvent();
    };
    /**
     * 描画の更新をロック
     */
    ReserveView.prototype.lock = function () {
        this.isLock = true;
    };
    /**
     * 描画の更新のロックを解除
     */
    ReserveView.prototype.unlock = function () {
        this.isLock = false;
    };
    /**
     * イベントを設定
     */
    ReserveView.prototype.setEvent = function () {
        var btnOrder = document.getElementsByClassName("btn-order");
        for (var i = 0; i < btnOrder.length; i++) {
            btnOrder[i].addEventListener("click", this.btnOrderHandler);
        }
        var btnOk = document.getElementsByClassName("btn-ok");
        var btnNg = document.getElementsByClassName("btn-ng");
        for (var i = 0; i < btnOk.length; i++) {
            btnOk[i].addEventListener("click", this.btnOkHandler);
            btnNg[i].addEventListener("click", this.btnOkHandler);
        }
        this.orderCloseBtn = document.getElementById("btn-close-order");
        this.orderCloseBtn.addEventListener("click", this.orderWindowCloseHandler);
    };
    /**
     * イベントをリセット
     */
    ReserveView.prototype.resetEvent = function () {
        var btnOrder = document.getElementsByClassName("btn-order");
        for (var i = 0; i < btnOrder.length; i++) {
            btnOrder[i].removeEventListener("click", this.btnOrderHandler);
        }
        var btnOk = document.getElementsByClassName("btn-ok");
        var btnNg = document.getElementsByClassName("btn-ng");
        for (var i = 0; i < btnOk.length; i++) {
            btnOk[i].removeEventListener("click", this.btnOkHandler);
            btnNg[i].removeEventListener("click", this.btnOkHandler);
        }
        this.orderCloseBtn = document.getElementById("btn-close-order");
        this.orderCloseBtn.removeEventListener("click", this.orderWindowCloseHandler);
    };
    ReserveView.prototype.openOrder = function (event) {
        var id = event.target.dataset.id;
        var data = this.getOrderData(id);
        console.log(data);
        var template = this.generateOrderWindowInnerTemplate(data);
        this.orderWindow.innerHTML = template;
        this.resetEvent();
        this.setEvent();
        this.orderWindow.className = "show";
    };
    /**
     * 注文データを取得
     * @param id
     * @returns {any}
     */
    ReserveView.prototype.getOrderData = function (id) {
        var len = this.data.vacantList.length;
        for (var i = 0; i < len; i++) {
            if (this.data.vacantList[i].id === Number(id)) {
                var orderList = this.data.vacantList[i].orderList;
                var data = this.getOrderList(orderList);
                return data;
            }
        }
        return null;
    };
    ReserveView.prototype.getOrderList = function (orderList) {
        var data = [];
        var lenI = orderList.length;
        for (var i = 0; i < lenI; i++) {
            var lenJ = this.menuList.length;
            for (var j = 0; j < lenJ; j++) {
                if (this.menuList[j].id === orderList[i].menuId) {
                    data.push({
                        name: this.menuList[j].name,
                        cnt: orderList[i].cnt
                    });
                }
            }
        }
        return data;
    };
    /**
     * idをもとにデータを設定
     * @param id
     * @param key
     * @param value
     */
    ReserveView.prototype.setParam = function (id, key, value) {
        console.log("vacantList");
        console.log(this.data.vacantList);
        var len = this.data.vacantList.length;
        for (var i = 0; i < len; i++) {
            // console.log(this.data.vacantList[i].id);
            // console.log(id);
            if (this.data.vacantList[i].id === Number(id)) {
                console.log("########### " + key + " : " + id);
                this.data.vacantList[i][key] = value;
                break;
            }
        }
    };
    /**
     * リストのアイテムのテンプレートを生成
     * @param data
     * @returns {string}
     */
    ReserveView.prototype.generateItemTemplate = function (data) {
        var template = "";
        if (data.commingFlg) {
            template += "<li class='item comming'>";
        }
        else {
            template += "<li class='item'>";
        }
        template += "<div class='text'>" +
            "<p class='name'>" + data.name + "様</p>" +
            "<div>" +
            "<p class='people'>予約人数：2名</p>" +
            "<p class='date'>予約時間：2017年5月4日(木) 17:20</p>";
        // "<p class='table'>席：" + data.table + "</p>" +
        // 予約承認済み
        if (data.orderList) {
            if (data.commingFlg) {
                template +=
                    "</div>" +
                        "</div>" +
                        "<div class='btns'>" +
                        "<div class='alert alert-danger' role='alert'>" +
                        "<strong>お客様がご来店しました</strong>" +
                        "</div>" +
                        "<button type='button' class='btn btn-warning btn-order' data-id='" + data.id + "'>オーダーを確認</button>" +
                        "</div>";
            }
            else {
                template +=
                    "</div>" +
                        "</div>" +
                        "<div class='btns'>" +
                        "<div class='alert alert-info' role='alert'>" +
                        "<strong>予約を受け付けました</strong>" +
                        "</div>" +
                        "<button type='button' class='btn btn-warning btn-order' data-id='" + data.id + "'>オーダーを確認</button>" +
                        "</div>";
            }
        }
        else {
            template +=
                "</div>" +
                    "</div>" +
                    "<div class='btns'>" +
                    "<button type='button' class='btn btn-primary btn-ok' data-id='" + data.id + "' data-flg='1'>予約OK</button>" +
                    "<button type='button' class='btn btn-secondary btn-ng' data-id='" + data.id + "' data-flg='0'>予約NG</button>" +
                    "</div>";
        }
        template += "</li>";
        return template;
    };
    /**
     * 表示用日付の文字列を生成
     * @param date
     * @returns {string}
     */
    ReserveView.prototype.generateDate = function (date) {
        var str = "";
        str += date.getFullYear() + "年";
        str += date.getMonth() + 1 + "月";
        str += date.getDate() + "日";
        str += "(" + this.getDay(date.getDate()) + ") ";
        str += date.getHours() + ":";
        str += date.getMinutes();
        return str;
    };
    ReserveView.prototype.getDay = function (day) {
        var str = "";
        switch (day) {
            case 0:
                str = "日";
                break;
            case 1:
                str = "月";
                break;
            case 2:
                str = "火";
                break;
            case 3:
                str = "水";
                break;
            case 4:
                str = "木";
                break;
            case 5:
                str = "金";
                break;
            case 5:
                str = "土";
                break;
        }
        return str;
    };
    /**
     * オーダー確認ウィンドウ内のテンプレート生成
     * @param data
     * @returns {string}
     */
    ReserveView.prototype.generateOrderWindowInnerTemplate = function (data) {
        var template = "<div class='inner'>" +
            "<table class='table table-striped'>" +
            "<thead>" +
            "<tr>" +
            "<th>商品名</th>" +
            "<th>数量</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";
        for (var i = 0; i < data.length; i++) {
            template += "<tr>" +
                "<td>" + data[i].name + "</td>" +
                "<td>1</td>" +
                "</tr>";
        }
        template += "</tbody>" +
            "</table>" +
            "<button id='btn-close-order' type='button' class='btn btn-secondary'>閉じる</button>" +
            "</div>";
        return template;
    };
    return ReserveView;
}());
module.exports = ReserveView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var ReserveView = __webpack_require__(1);
var KitchenView = __webpack_require__(0);
var App = (function () {
    function App() {
        var _this = this;
        // private API_URL:string = "http://54.249.14.213/";
        this.API_URL = "/";
        this.milkcocoa = new MilkCocoa("leadii5pbr0b.mlkcca.com");
        this.ds = this.milkcocoa.dataStore("yoro");
        this.commingDs = this.milkcocoa.dataStore("comming");
        this.isLock = false;
        /*
                // 来店！
                this.ds.on("push", (pushed:any) => {
                    this.isLock = true;
                    // this.cameLed();
        
                    this.reserveView.setComming("3");
                });
                */
        /*
                this.ds.push({
                    state: 0
                });
        */
        this.commingFlg = [];
        this.mode = this.getUrlVars("mode");
        console.log("mode : " + this.mode);
        // オーダー一覧
        if (this.mode === "kitchen") {
            var kitchenView = new KitchenView();
            kitchenView.start();
        }
        else {
            var postVacantFunc = function (id, value) {
                _this.postVacant(id, value);
            };
            this.reserveView = new ReserveView(postVacantFunc);
        }
        this.getMenuList();
    }
    /**
     * URLからパラメーターを取得
     * @param key
     * @returns {any}
     */
    App.prototype.getUrlVars = function (key) {
        var params;
        var temp_params = window.location.search.substring(1).split("&");
        for (var i = 0; i < temp_params.length; i++) {
            params = temp_params[i].split("=");
            if (key === params[0]) {
                return params[1];
            }
        }
        return null;
    };
    App.prototype.getMenuList = function () {
        var _this = this;
        $.ajax({
            url: this.API_URL + "sendMenuList",
            // url: this.API_URL + "reqMenuList.json",
            dataType: "json",
            type: "get"
        })
            .then(
        // 1つめは通信成功時のコールバック
        function (json) {
            console.log("reqMenuList 読み込み成功");
            _this.menuList = json.data.menu;
            console.log(_this.menuList);
            _this.getUpdate(function () {
                _this.show();
            });
        }, 
        // 2つめは通信失敗時のコールバック
        function () {
            console.log("reqMenuList 読み込み失敗");
        });
    };
    App.prototype.getUpdate = function (func) {
        var _this = this;
        $.ajax({
            url: this.API_URL + "reqUpdate?q=" + new Date().getTime(),
            // url: this.API_URL + "reqUpdate.json?q=" + new Date().getTime(),
            dataType: "json",
            type: "get"
        })
            .then(
        // 1つめは通信成功時のコールバック
        function (json) {
            console.log("reqUpdate 読み込み成功");
            // this.menuList = json.data.menu;
            _this.updateData = json.data;
            // console.log(this.updateData);
            if (func) {
                func();
            }
        }, 
        // 2つめは通信失敗時のコールバック
        function () {
            console.log("reqMenuList 読み込み失敗");
        });
    };
    App.prototype.postVacant = function (id, value) {
        console.log("postVacant : id " + id + " : ret " + value);
        $.ajax({
            url: this.API_URL + "resVacant",
            dataType: "json",
            type: "get",
            data: {
                resId: id,
                ret: value
            }
        })
            .then(
        // 1つめは通信成功時のコールバック
        function (json) {
            console.log("postVacant 送信成功");
        }, 
        // 2つめは通信失敗時のコールバック
        function () {
            console.log("postVacant 送信失敗");
        });
    };
    App.prototype.show = function () {
        var _this = this;
        this.updateDataStr = JSON.stringify(this.updateData);
        this.beforeVacantConfListLastId;
        var index = this.updateData.vacantConfList.length - 1;
        this.beforeVacantConfListLastId = this.updateData.vacantConfList[index].id;
        var len = this.updateData.vacantList.length;
        for (var i = 0; i < len; i++) {
            this.commingFlg[this.updateData.vacantList[i].id] = this.updateData.vacantList[i].commingFlg;
        }
        // console.log(this.updateDataStr);
        // オーダー一覧
        if (this.mode === "kitchen") {
        }
        else {
            this.reserveView.start(this.menuList);
            this.reserveView.update(this.updateData);
        }
        setInterval(function () {
            _this.loop();
        }, 1 * 1000);
    };
    App.prototype.loop = function () {
        var _this = this;
        if (this.isLock) {
            return;
        }
        // オーダー一覧
        if (this.mode === "kitchen") {
        }
        else {
            this.getUpdate(function () {
                var str = JSON.stringify(_this.updateData);
                ;
                // データに更新があれば
                if (str !== _this.updateDataStr) {
                    console.log("更新！！！！！！！！！！！！");
                    _this.reserveView.update(_this.updateData);
                    _this.updateDataStr = str;
                    var index = _this.updateData.vacantConfList.length - 1;
                    if (_this.updateData.vacantConfList[index].id > _this.beforeVacantConfListLastId) {
                        console.log("新規予約きたーーー！");
                        _this.beforeVacantConfListLastId = _this.updateData.vacantConfList[index].id;
                        _this.reserveLed();
                    }
                    var isComming = false;
                    var len = _this.updateData.vacantList.length;
                    for (var i = 0; i < len; i++) {
                        if (_this.commingFlg[_this.updateData.vacantList[i].id] !== _this.updateData.vacantList[i].commingFlg) {
                            isComming = true;
                            _this.commingFlg[_this.updateData.vacantList[i].id] = _this.updateData.vacantList[i].commingFlg;
                        }
                    }
                    // 新規で来店した
                    if (isComming) {
                        _this.cameLed();
                    }
                }
                else {
                }
            });
        }
    };
    /**
     * 予約時の点灯
     */
    App.prototype.reserveLed = function () {
        this.ds.push({
            state: 0
        });
    };
    /**
     * 来店時の点灯
     */
    App.prototype.cameLed = function () {
        console.log("いらっしゃいませーーーー！");
        this.ds.push({
            state: 1
        });
    };
    return App;
}());
window.addEventListener("load", function () {
    new App();
});


/***/ })
/******/ ]);