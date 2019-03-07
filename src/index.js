"use strict";
/**主类 */
var Main = /** @class */ (function () {
    function Main() {
        this.bindEl = [["#zn_simple_m", "zn"], ["#jp_tag_m", "jp"]];
    }
    Main.prototype.initLanguage = function () {
        var _this = this;
        Config.getConfig("navlanguage.json");
        $(window).bind("MsgEvent.navlanguage.json", function (evt, data) {
            _this.lConfig = data;
            _this.changeLanguage();
            $(window).unbind("MsgEvent.navlanguage.json");
        });
        var w = $(window).width() ? $(window).width() : 0;
        if (w > 765) {
            $("#zn_simple").click(function () {
                _this.changeLanguage("zn");
            });
            $("#jp_tag").click(function () {
                _this.changeLanguage("jp");
            });
        }
        else {
            this.mobileCheck();
        }
        $("#mapContainer").height($("#mapContainer").width() * 0.6);
        $("#mMessage").width($("#mSubject").width());
        //窗口大小改变时
        $(window).resize(function () {
            $("#mMessage").width($("#mSubject").width());
            $("#mapContainer").height($("#mapContainer").width() * 0.6);
        });
    };
    Main.prototype.changeLanguage = function (type) {
        if (type === void 0) { type = "jp"; }
        if (!this.lConfig)
            return;
        for (var i in this.lConfig) {
            $("#" + i + ",#m_" + i).text(this.lConfig[i][type]);
        }
        console.log(type);
    };
    Main.prototype.mobileCheck = function () {
        var _this = this;
        var w = $(window).width();
        if (typeof (w) == "undefined")
            w = 0;
        if (w <= 767) {
            var _loop_1 = function (i) {
                $(i[0]).unbind();
                $(i[0]).click(function () {
                    _this.changeLanguage(i[1]);
                });
            };
            for (var _i = 0, _a = this.bindEl; _i < _a.length; _i++) {
                var i = _a[_i];
                _loop_1(i);
            }
        }
    };
    return Main;
}());
/**加载配置文件 */
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.getConfig = function (cName) {
        var str = "./excel/config/client/";
        $.getJSON(str + cName, function (data) {
            if (!data) {
                console.log(cName + " config is miss or error");
            }
            else {
                $(window).trigger("MsgEvent." + cName, data);
            }
        });
    };
    return Config;
}());
/**预加载 */
(function ($) {
})(jQuery);
$(document).ready(function () {
    // loadJScript();
});
var main = new Main();
var map;
main.initLanguage();
function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDxBRg8C8V7GoqUPGUTcmyeOgAoT4gDIBE&callback=initialize";
    document.body.appendChild(script);
    console.log("script add");
}
function initialize() {
    // let mapProp = {
    //     center: new google.maps.LatLng(35.659341, 139.334319),
    //     zoom: 7,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    var map = new google.maps.Map(document.getElementById("mapContainer"), {
        center: { lat: 35.659341, lng: 139.334319 },
        zoom: 15
    });
    // let gps = [35.659341, 139.334319];
    // let resultL = [0, 0];
    // AMap.convertFrom(gps, 'gps', (s, r) => {
    //     if (r.info === "ok") {
    //         resultL = [r.locations[0].lat, r.locations[0].lng];
    //         console.log(resultL);
    //     }
    // });
    // let map = new AMap.Map("mapContainer", {
    //     zoom: 15,
    //     center: resultL,
    //     resizeEnable: true,
    // });
}
// google.maps.event.addDomListener(window, 'load', initialize);
/**下载 */
$("#btn1").click(function () {
    window.location.href = "/downloadFile/enrollment.pdf";
});
$("#btn2").click(function () {
    window.location.href = "/downloadFile/desc.pdf";
});
// $("#downloadF").click(()=>{
// })
