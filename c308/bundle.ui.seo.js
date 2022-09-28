function saveCookie(n, t, i, r) {
    var u = new Date(),
        f;
    u.setTime(u.getTime());
    i && (i = i * 864e5);
    f = new Date(u.getTime() + i);
    document.cookie = n + "=" + escape(t) + (i ? ";expires=" + f.toUTCString() : "") + ";path=" + r + ";samesite=lax";
}
function getCookie(n) {
    var i = document.cookie.indexOf(n + "="),
        r = i + n.length + 1,
        t;
    return !i && n != document.cookie.substring(0, n.length) ? null : i == -1 ? null : ((t = document.cookie.indexOf(";", r)), t == -1 && (t = document.cookie.length), unescape(document.cookie.substring(r, t)));
}
function readCookie(n) {
    var t = RegExp("" + n + "[^;]+").exec(document.cookie);
    return decodeURIComponent(!t ? "" : t.toString().replace(/^[^=]+./, ""));
}
function deleteCookie(n) {
    document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function queryString(n) {
    if (((hu = window.location.search.substring(1)), (r = ""), hu != "")) {
        for (gy = hu.split("&"), i = 0; i < gy.length; i++) (ft = gy[i].split("=")), ft[0] == n && (r = ft[1]);
        return r;
    }
    return "";
}
function parseQueryString(n, t) {
    if (((r = ""), n != "")) {
        for (gy = n.split("&"), i = 0; i < gy.length; i++) (ft = gy[i].split("=")), ft[0] == t && (r = ft[1]);
        return r;
    }
    return "";
}
function queryStringMvc(n) {
    var i = new RegExp("\\/" + n + "\\.(.+?)\\/", "i"),
        t = i.exec(window.location.href);
    return t ? t[1] : "";
}
function regExMatch(n, t, i) {
    var r = n.exec(t);
    return r ? r[i] : "";
}
function getFormVal(n) {
    var t = encodeURIComponent($.trim($("#" + n).val()));
    return t == "undefined" ? "" : t;
}
function getCurrentUrl(n) {
    if (arguments.length > 0 && n) return window.location.pathname;
    var i = window.location,
        t = window.location.port;
    return i.protocol + "//" + i.hostname + (t != "" && t != "80" && t != "443" ? ":" + t : "") + i.pathname;
}
function getCheckVal(n) {
    var t = $("#" + n);
    return t.is(":checked") ? encodeURIComponent(t.val()) : "";
}
function getCheckValGroup(n) {
    var t = "";
    return (
        $("input[name='" + n + "']:checked").each(function () {
            t += t ? "," + $(this).val() : $(this).val();
        }),
            t
    );
}
function getRadioVal(n) {
    return encodeURIComponent($("input[name='" + n + "']:checked").val());
}
function disableButton(n, t) {
    var i = $("#" + n);
    i.attr("data-orig-text", i.html());
    i.html(t);
    i.attr("disabled", "disabled").addClass("disabled");
}
function reenableButton(n) {
    var t = $("#" + n);
    t.html(t.attr("data-orig-text"));
    t.removeAttr("data-orig-text").removeAttr("disabled").removeClass("disabled");
}
function getSecToken() {
    return encodeURIComponent($("input[name=__RequestVerificationToken]").val());
}
function getSecTokenRaw() {
    return $("input[name=__RequestVerificationToken]").val();
}
function serializeSecToken(n) {
    return n == !0 ? "__RequestVerificationToken=" + getSecToken() : "&__RequestVerificationToken=" + getSecToken();
}
function handleResponseError(n) {
    isAdmin = window.location.toString().indexOf("/admin") > -1 ? !0 : !1;
    n.errType ? (window.location = (isAdmin ? "/admin" : "") + "/error/?err=" + n.errType) : n.redirect && (window.location = n.redirect);
}
function formObj() {
    this.onStart = function () {
        disableButton(this.button, this.disabledText);
    };
    this.reenableForm = function () {
        reenableButton(this.button);
    };
    this.clearFields = function () {
        $("#" + this.button)
            .closest("form")
            .find("input")
            .each(function () {
                var n = $(this),
                    t;
                n.val("");
                n.attr("type") == "password" && ((t = $("#" + n.attr("id") + "-temp")), t.length > 0 && (n.hide(), t.show()));
            });
    };
    this.onSuccess = function () {
        var n = this.resp;
        return (
            n.errType ? (window.location = (this.isAdmin ? "/admin" : "") + "/error/?err=" + n.errType) : n.redirect ? (window.location = n.redirect) : this.callback(n),
                n.IsValid ? (this.formRedirects || this.reenableForm(), unhideCode(this.button), (!n.Data || (n.Data && !n.Data.overrideReset == !0)) && resetAction(this.button)) : this.reenableForm(),
                !1
        );
    };
    this.initForm = function (n) {
        var t = this;
        $("#" + t.button).click(function () {
            if ((!$(this).is(":visible") && t.checkButtonVisibility) || (n && !confirm(n))) return !1;
            try {
                return (
                    removeFeedback(),
                        t.onStart(),
                        $.ajax({
                            type: "POST",
                            cache: !1,
                            dataType: "json",
                            url: t.service,
                            data: t.data() + serializeSecToken(),
                            timeout: t.timeout,
                            success: function (n) {
                                t.resp = n;
                                t.onSuccess();
                            },
                            error: function () {
                                alert("An error occurred");
                                t.reenableForm();
                            },
                        }),
                        !1
                );
            } catch (i) {
                return t.reenableForm(), !1;
            }
        });
    };
}
function showPopover(n, t, i, r) {
    var u = $("#" + n),
        f,
        o,
        e;
    i && !u.is(":visible") && (u = $("#" + i));
    r && !u.is(":visible") && (u = $("#" + r));
    f = u.data("popover");
    f
        ? (f.$tip.find(".content p").html(t), f.$tip.show())
        : (u.popover({ content: t, trigger: "manual" }), u.popover("show"), window.pageYOffset > 0 && ((o = u.data("popover").$tip), (e = parseInt(o.css("top").replace("px", ""))), (e = e - window.pageYOffset), o.css("top", e + "px")));
}
function showAlert(n, t, i, r) {
    i || (i = "alert-error");
    t || (t = "fas fa-times-circle mr-2");
    r || (r = "alert");
    $("#" + r).after('<div class="alert ' + i + '"><i class="' + t + '"></i>&nbsp;' + n + "</div>");
    window.location = "#";
}
function showValidationError(n, t, i) {
    var r, u, f;
    arguments.length === 3 ? ((u = $("#" + i + "")), n == "service" && u.find("#btn-services-dropdown").length && (n = "btn-services-dropdown"), (r = u.find("#" + n + ""))) : (r = $("#" + n + ""));
    document.location.href.indexOf("/admin/") > -1
        ? (r.closest(".control-group").addClass("error"), t && (r.after('<span class="help-inline">' + t + "</span>"), (f = r.closest(".controls")), f.children(".code").hide()))
        : (r.closest(".form-group").addClass("has-error"),
        r.is("input") &&
        (r.is("input[type=hidden],input[type=checkbox]") ||
            (r.closest(".form-group").length && (r.closest(".form-group").addClass("has-feedback"), r.after("<span class='fal fa-exclamation-circle form-control-feedback' aria-hidden='true'></span>")))));
}
function fieldInvalid(n, t) {
    var i = n.closest(".form-group");
    t || i.hasClass("has-error")
        ? t && (i.removeClass("has-error has-feedback"), i.find(".form-control-feedback").remove())
        : (i.addClass("has-error has-feedback"), n.after("<span class='fal fa-exclamation-circle form-control-feedback' aria-hidden='true'></span>"));
}
function hideValidationError(n) {
    var t = $("#" + n + "");
    document.location.href.indexOf("/admin/") > -1 && (t.closest(".control-group").removeClass("error"), t.next(".help-inline").remove(), t.closest(".controls").children(".code").show());
}
function showValidationErrorField(n) {
    var t = $("#" + n + "");
    t.addClass("error");
}
function showUploaderValidationError(n) {
    var t = $(".uploadify-button-text");
    t.text(n);
    t.css("color", "#B94A48");
    t.closest(".control-group").addClass("error");
}
function showEditorValidationError(n, t) {
    t || (t = $(".sun-editor"));
    t.css("border", "1px solid #B94A48");
    t.closest(".control-group").addClass("error");
    n && t.after('<span class="help-inline">' + n + "</span>");
}
function showDateTimeValidationError(n, t) {
    var i = $("#" + n + "");
    i.length && (i.css("border", "1px solid #B94A48"), i.closest(".control-group").addClass("error"), t && i.closest(".form-group").append('<span class="help-inline">' + t + "</span>"));
}
function unhideCode(n) {
    $("#" + n)
        .closest("form")
        .find(".code")
        .show();
}
function resetAction(n) {
    $("#" + n)
        .closest("form")
        .find("input[id$='action']")
        .val("edit");
}
function removeFeedback() {
    $(".uploadify-button-text").css("color", "#333333");
    $(".sun-editor").css("border", "1px solid #DDDDDD");
    $(".error").removeClass("error");
    $(".has-error").removeClass("has-error");
    $(".has-feedback").removeClass("has-feedback");
    $(".form-control-feedback").remove();
    $(".help-inline:not([class*='no-clear'])").remove();
    $(".help-block:not([class*='no-clear'])").remove();
    $(".alert:not([class*='no-clear'])").hide();
}
function getSafeHtml(n) {
    var t = $("#" + n).val();
    return (t = encodeURIComponent(t)), t.replace(/%/g, "~");
}
function convertSafeHtml(n) {
    return (n = encodeURIComponent(n)), n.replace(/%/g, "~");
}
function decodeSafeHtml(n) {
    return (n = n.replace(/~/g, "%")), decodeURIComponent(n);
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function trim(n, t) {
    while (n.substring(0, 1) == t) n = n.substring(1);
    while (n.substring(n.length - 1) == t) n = n.substring(0, n.length - 1);
    return n;
}
function isHTML5UploadEnabled() {
    return typeof FormData != "undefined";
}
function initUpload(n, t, i) {
    var r = n ? $(n) : $(".file-upload");
    r.length > 0 &&
    r.each(function (n, r) {
        function ut() {
            var n;
            return (
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    async: !1,
                    url: "/ws/file/upload-token/",
                    data: serializeSecToken(),
                    success: function (t) {
                        t.Ok ? (n = t.token) : handleResponseError(t);
                    },
                    error: function () {
                        alert("An error occurred");
                    },
                }),
                    n
            );
        }
        function h(n) {
            if ((nt++, p)) {
                var t = Math.random().toString(36).substring(2);
                v.append('<div id="Err_' + t + '" class="alert alert-error" style="margin-bottom: 5px; line-height: 150%">' + n + "</div>");
                setTimeout(function () {
                    v.find("#Err_" + t).fadeOut("fast", function () {
                        $(this).remove();
                    });
                }, 5e3);
            } else alert(n);
        }
        var u = $(r),
            c = u.attr("id"),
            nt,
            s,
            a;
        c || ((c = "file-upload-" + n), u.attr("id", c));
        var ft = u.closest("form"),
            tt = u.attr("id") + "-queue",
            v = ft.find(".file-upload-queue").attr("id", tt),
            p = v.length > 0 ? !0 : !1,
            k = u.attr("id") + "-thumbnail",
            e = u.attr("id") + "-file",
            o = $("#" + k).length ? $("#" + k) : u.parent().find(".file-upload-thumbnail").attr("id", k),
            it = o.length > 0 ? !0 : !1,
            w = u.attr("data-size-limit"),
            d = parseInt(u.attr("data-file-limit")),
            b = u.attr("data-button-class"),
            y = u.attr("data-button-text"),
            rt = u.attr("data-uploader-path"),
            et = u.attr("data-filetype-desc"),
            g = u.attr("data-filetype-exts"),
            f = u.attr("data-redirect"),
            ot = u.attr("data-no-reenable"),
            l;
        if ((o.length && o.attr("src") == "" && o.hide(), u.hide(), (nt = 0), isHTML5UploadEnabled())) {
            s = $(".uploader-btn[for='" + c + "']");
            s.length === 0 && (u.after("<label for='" + c + "' class='uploader-btn " + b + "'>" + y + "</label>"), (s = $(".uploader-btn[for='" + c + "']")));
            d > 1 && u.attr("multiple", "multiple");
            g && u.attr("accept", g.replace(/\*/g, "").replace(/\;/g, ","));
            a = function () {
                var n = !1;
                return i && typeof i == "function" && ((n = i()), n || s.removeClass("disabled")), n && (s.text(y), s.addClass("disabled")), n;
            };
            function n() {
                s.text(y);
                a() || s.removeClass("disabled");
            }
            a();
            u.on("change", function (i) {
                var c, r, p;
                if (!a()) {
                    c = i.target.files;
                    s.addClass("disabled");
                    s.text("Uploading...");
                    r = "";
                    u[0].hasAttribute("data-filetype-exts") &&
                    (r = u
                        .attr("data-filetype-exts")
                        .replace(/\*/g, "")
                        .split(";")
                        .filter((n) => n));
                    var b = 0,
                        v = 0,
                        y = 0;
                    $.each(c, function (n, i) {
                        var k, d;
                        if (!a()) {
                            var f = c[b++],
                                s = new FormData(),
                                p = 0;
                            r !== "undefined" && r !== "" && r.length > 0 && ((k = f.name.substr(f.name.lastIndexOf("."))), (p = $.inArray(k, r)));
                            p >= 0
                                ? w === "" || f.size < w * 1048576
                                    ? ((d = ut(function () {})),
                                        s.append("token", d),
                                        s.append("fileId", e),
                                        s.append("Filename", f.name),
                                        s.append("Filedata", i),
                                        y++,
                                        $.ajax({
                                            url: rt,
                                            enctype: "multipart/form-data",
                                            type: "POST",
                                            data: s,
                                            cache: !1,
                                            processData: !1,
                                            contentType: !1,
                                            success: function (n) {
                                                typeof n.error == "undefined"
                                                    ? (t && typeof t == "function"
                                                        ? t(u, f, n)
                                                        : ((l = f.name),
                                                            n === "error"
                                                                ? h("An error occurred processing " + f.name)
                                                                : n === "size-error"
                                                                    ? h("Incorrect file size(W X H) used.")
                                                                    : it
                                                                        ? (o.attr("src", u.attr("data-thumbnail-url") + n), o.attr("data-filename", n), o.show())
                                                                        : e &&
                                                                        ($("#" + e).attr("data-filename", n), $("#" + e).is("a") && ($("#" + e).attr("href", u.attr("data-thumbnail-url") + n), $("#" + e).show(), $("#" + e + "-delete").show()))),
                                                        a())
                                                    : h("An error occurred processing " + f.name);
                                                v++;
                                            },
                                            error: function () {
                                                h("An error occurred processing " + f.name);
                                            },
                                        }))
                                    : alert(f.name + " Exceeds file size limit " + w + " MB.")
                                : alert(f.name + " not allowed. Please use following file types: " + r);
                        }
                    });
                    p = setInterval(function () {
                        y === v && (clearInterval(p), f && f !== "" ? (f.indexOf("{lastFile}") > -1 && (f = l ? f.replace("{lastFile}", encodeURIComponent(l)) : ""), (window.location = f)) : n());
                    }, 1e3);
                    u.val("");
                }
            });
        } else {
            function n() {
                u.uploadify("settings", "buttonText", y);
                u.uploadify("settings", "buttonClass", b);
                u.uploadify("disable", !1);
            }
            u.uploadify({
                buttonClass: b,
                width: 190,
                height: 34,
                buttonText: y,
                progressData: "percentage",
                swf: "/js/lib/uploadify.swf",
                uploader: rt,
                queueID: p ? tt : !1,
                auto: !0,
                fileTypeDesc: et,
                fileTypeExts: g,
                queueSizeLimit: d,
                multi: d > 1 ? !0 : !1,
                fileSizeLimit: w + "MB",
                removeTimeout: 1,
                successTimeout: 180,
                overrideEvents: ["onDialogClose"],
                itemTemplate: p
                    ? '<div id="${fileID}" class="alert alert-success" style="margin-bottom: 5px; line-height: 150%"><button type="button" class="close" onclick="$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">&#215;</button><span class="fileName">${fileName} (${fileSize})</span><span class="data"></span></div>'
                    : null,
                onFallback: function () {
                    h("You need Flash installed to upload files");
                },
                onUploadSuccess: function (n, i) {
                    t && typeof t == "function"
                        ? t(u, n, i)
                        : ((l = n.name),
                            i === "error"
                                ? h("An error occurred processing " + n.name)
                                : it
                                    ? (o.attr("src", u.attr("data-thumbnail-url") + i), o.attr("data-filename", i), o.show(), u.trigger("uploaded", i))
                                    : e && ($("#" + e).data("data-filename", i), u.trigger("uploaded", i)));
                },
                onUploadStart: function () {
                    var n = !1,
                        t;
                    i && typeof i == "function" && (n = i());
                    n ||
                    ((t = ut()),
                        u.uploadify("settings", "formData", { token: t, fileId: e }),
                        u.uploadify("settings", "buttonText", "Uploading..."),
                        u.uploadify("settings", "buttonClass", b + " disabled"),
                        u.uploadify("disable", !0));
                },
                onQueueComplete: function () {
                    ot != "true" && n();
                    i && typeof i == "function" && i() && u.uploadify("disable", !0);
                },
                onDialogClose: function (t) {
                    if ((t.filesErrored > 0 && h(t.errorMsg), p && f))
                        var i = setInterval(function () {
                            var t = v.find("div[id^='SWFUpload']").length,
                                r = v.find("div[id^='Err_']").length;
                            t == 0 && r == 0 && (clearInterval(i), f.indexOf("{lastFile}") > -1 && (f = l ? f.replace("{lastFile}", encodeURIComponent(l)) : ""), f != "" && nt == 0 ? (window.location = f) : n());
                        }, 100);
                    return !1;
                },
                onSWFReady: function () {
                    i && typeof i == "function" && i() && u.uploadify("disable", !0);
                },
            });
        }
    });
}
function getCombinedAlert(n) {
    var t = "";
    for (var i in n.ErrFields) t += (t == "" ? "* " : "\n* ") + n.ErrFields[i].replace(/^\*/, "");
    return t;
}
function isIE() {
    var u,
        t = -1,
        n = window.navigator.userAgent,
        i = n.indexOf("MSIE "),
        f = n.indexOf("Trident/"),
        r;
    return i > 0 ? (t = parseInt(n.substring(i + 5, n.indexOf(".", i)), 10)) : f > 0 && ((r = n.indexOf("rv:")), (t = parseInt(n.substring(r + 3, n.indexOf(".", r)), 10))), t > -1 ? t : u;
}
function googleAutoComplete(n, t, i, r) {
    var u = n.find(t),
        f;
    u &&
    ((f = getGoogleMapsAPIKey()),
    (i === undefined || i === null || i === "") && (i = "address"),
    (r === undefined || r === null || r === "") && (r = ""),
        $.getScript("https://maps.googleapis.com/maps/api/js?key=" + f + "&libraries=places", function () {
            var n = new window.google.maps.places.Autocomplete(u.get(0), { types: [i] }),
                f;
            n.setComponentRestrictions({ country: ["us", "ca"] });
            n.addListener("place_changed", function () {
                var t = n.getPlace();
                u.val(t.formatted_address);
                u.attr("data-place-id", t.place_id);
                populateAddressHiddenFields(t.formatted_address, t.place_id, i, r);
            });
            f = function () {
                $(t).attr("autocomplete") === "off" ? $(t).attr("autocomplete", "none") : setTimeout(f, 100);
            };
            f();
            $(window).load(function () {
                $(t).attr("autocomplete", "none");
            });
            u.on("focusout", function () {
                var n = $(this).val(),
                    t = $(this).attr("data-place-id");
                populateAddressHiddenFields(n, t, i, r);
            });
        }));
}
function parseGoogleAddress(n) {
    var i = n ? n.address_components : null,
        u = n ? (n.partial_match === !0 ? !0 : !1) : !1,
        t,
        r;
    if (
        ((this.address1 = ""),
            (this.address2 = ""),
            (this.city = ""),
            (this.longcity = ""),
            (this.neighborhood = ""),
            (this.state = ""),
            (this.county = ""),
            (this.township = ""),
            (this.zip = ""),
            (this.country = ""),
            (this.latitude = ""),
            (this.longitude = ""),
            (this.formatted_address = ""),
        i && u === !1)
    ) {
        for (t = 0; t < i.length; t++)
            (r = i[t].types[0]),
                r === "street_number"
                    ? (this.address1 = i[t].short_name)
                    : r === "route"
                        ? (this.address1 += " " + i[t].short_name)
                        : r === "locality"
                            ? ((this.city = i[t].short_name), (this.longcity = i[t].long_name))
                            : r === "administrative_area_level_1"
                                ? (this.state = i[t].short_name)
                                : r === "administrative_area_level_2"
                                    ? (this.county = i[t].short_name)
                                    : r === "administrative_area_level_3"
                                        ? (this.township = i[t].short_name)
                                        : r === "postal_code"
                                            ? (this.zip = i[t].short_name)
                                            : r === "country"
                                                ? ((this.country = i[t].short_name), this.country === "US" && (this.country = "USA"))
                                                : r === "subpremise"
                                                    ? (this.address2 = i[t].short_name)
                                                    : r === "neighborhood" && (this.neighborhood = i[t].short_name);
        this.city === "" && (this.neighborhood !== "" ? (this.city = this.neighborhood) : this.township !== "" && (this.city = this.township));
        this.formatted_address = n.formatted_address;
        this.latitude = n.geometry.location.lat();
        this.longitude = n.geometry.location.lng();
    }
}
function bestMatchedGoogleAddress(n) {
    var t = n.length > 0 ? n[0] : null;
    return (
        n.length > 1 &&
        $.each(n, function (i) {
            var r = [];
            return (
                n[i].address_components.findIndex(function (n) {
                    n.types.indexOf("street_number") > -1
                        ? r.push("street_number")
                        : n.types.indexOf("route") > -1
                            ? r.push("route")
                            : n.types.indexOf("locality") > -1
                                ? r.push("locality")
                                : n.types.indexOf("administrative_area_level_1") > -1
                                    ? r.push("administrative_area_level_1")
                                    : n.types.indexOf("postal_code") > -1
                                        ? r.push("postal_code")
                                        : n.types.indexOf("country") > -1 && r.push("country");
                }),
                    r.includes("street_number") && r.includes("route") && r.includes("locality") && r.includes("administrative_area_level_1") && r.includes("postal_code") && r.includes("country") ? ((t = n[i]), !1) : void 0
            );
        }),
            t
    );
}
function populateAddressHiddenFields(n, t, i, r, u) {
    var f, e;
    if (
        ((i === undefined || i === null || i === "") && (i = "address"),
        (r === undefined || r === null || r === "") && (r = ""),
        (t === undefined || t === null) && (t = ""),
            (f = function (n) {
                n === "address"
                    ? ($("#g-" + r + "address1").val(""),
                        $("#g-" + r + "address2").val(""),
                        $("#g-" + r + "city").val(""),
                        $("#g-" + r + "state").val(""),
                        $("#g-" + r + "zip").val(""),
                        $("#g-" + r + "country").val(""),
                        $("#g-" + r + "latitude").val(""),
                        $("#g-" + r + "longitude").val(""),
                    $("#g-" + r + "neighborhood").length && $("#g-" + r + "neighborhood").val(""),
                    $("#g-" + r + "fromcity").length && $("#g-" + r + "fromcity").val(""),
                    $("#g-" + r + "fromstate").length && $("#g-" + r + "fromstate").val(""),
                    $("#g-" + r + "fromzip").length && $("#g-" + r + "fromzip").val(""),
                    $("#g-" + r + "county").length && $("#g-" + r + "county").val(""))
                    : n === "(regions)" && ($("#g-" + r + "tocity").val(""), $("#g-" + r + "tostate").val(""), $("#g-" + r + "tozip").val(""), $("#g-" + r + "tocountry").val(""));
            }),
        n === "")
    ) {
        f(i);
        return;
    }
    if (t === "") {
        if (u !== undefined) {
            u();
            return;
        }
        return;
    }
    e = new window.google.maps.Geocoder();
    e.geocode({ placeId: t }, function (t, e) {
        var c, s, l, o, h;
        e === "OK"
            ? i === "(regions)"
                ? ((c = t.length > 0 ? t[0] : null),
                    (s = new parseGoogleAddress(c)),
                    s.formatted_address !== ""
                        ? ((h = !0),
                            n.toLowerCase().includes(s.city.toLowerCase()) ? $(`#g-${r}tocity`).val(s.city) : n.toLowerCase().includes(s.longcity.toLowerCase()) ? $(`#g-${r}tocity`).val(s.city) : (h = !1),
                            n.toLowerCase().includes(s.state.toLowerCase()) ? $(`#g-${r}tostate`).val(s.state) : (h = !1),
                            n.toLowerCase().includes(s.zip) ? $(`#g-${r}tozip`).val(s.zip) : (h = !1),
                            n.toLowerCase().includes(s.country.toLowerCase()) ? $(`#g-${r}tocountry`).val(s.country) : (h = !1),
                        h || f(i))
                        : f(i))
                : ((l = bestMatchedGoogleAddress(t)),
                    (o = new parseGoogleAddress(l)),
                    o.formatted_address !== ""
                        ? ((h = !0),
                            $(`#g-${r}address1`).val(o.address1),
                            $(`#g-${r}address2`).val(o.address2),
                            $(`#g-${r}city`).val(o.city),
                            $(`#g-${r}neighborhood`).val(o.neighborhood),
                            n.toLowerCase().includes(o.state.toLowerCase()) ? $(`#g-${r}state`).val(o.state) : (h = !1),
                            n.toLowerCase().includes(o.zip.toLowerCase()) ? $(`#g-${r}zip`).val(o.zip) : (h = !1),
                            n.toLowerCase().includes(o.country.toLowerCase()) ? $(`#g-${r}country`).val(o.country) : (h = !1),
                            $(`#g-${r}latitude`).val(o.latitude),
                            $(`#g-${r}longitude`).val(o.longitude),
                            $(`#g-${r}fromcity`).val(o.city),
                            $(`#g-${r}fromstate`).val(o.state),
                            $(`#g-${r}fromzip`).val(o.zip),
                            $(`#g-${r}county`).val(o.county),
                        h || f(i))
                        : f(i))
            : f(i);
        u !== undefined && u();
    });
}
function checkWebNotificationPermission() {
    "Notification" in window && Notification.permission !== "denied" && Notification.requestPermission();
}
function checkIfWebNotificationExists(n) {
    var t = !1;
    return (
        $.lstWebNotification &&
        (t =
            $.lstWebNotification
                .map(function (n) {
                    return n.id;
                })
                .indexOf(n) > -1),
            t
    );
}
function removeWebNotificationFromList(n) {
    if ($.lstWebNotification) {
        var t = $.lstWebNotification
            .map(function (n) {
                return n.id;
            })
            .indexOf(n);
        $.lstWebNotification.splice(t, 1);
    }
}
function closeWebNotification(n) {
    checkIfWebNotificationExists(n) &&
    $.lstWebNotification &&
    $.each(lstWebNotification, function (t, i) {
        i.id == n && i.notification.close();
    });
}
function showWebNotification(n, t, i, r, u, f) {
    function o(n, t, i, r, u) {
        if (((e = !0), !checkIfWebNotificationExists(n))) {
            var o = new Notification(t, { body: i, icon: r, requireInteraction: !0, tag: n });
            u &&
            typeof u == "function" &&
            (o.onclick = function () {
                u();
            });
            f &&
            setTimeout(function () {
                o.close();
            }, f);
            $.lstWebNotification || ($.lstWebNotification = []);
            $.lstWebNotification.push({ id: n, notification: o });
            o.onclose = function () {
                removeWebNotificationFromList(n);
            };
        }
    }
    var e = !1;
    return (
        "Notification" in window
            ? Notification.permission === "granted"
                ? o(n, t, i, r, u)
                : Notification.permission !== "denied" &&
                Notification.requestPermission().then(function (f) {
                    f === "granted" && o(n, t, i, r, u);
                })
            : (e = !1),
            e
    );
}
function getGoogleMapsAPIKey() {
    var n = "";
    return (
        $.ajax({
            type: "POST",
            cache: !1,
            dataType: "json",
            async: !1,
            url: "/ws/googlemaps-apikey/",
            data: serializeSecToken(),
            success: function (t) {
                n = t;
            },
        }),
            n
    );
}
function UpdateQueryString(n, t, i) {
    var u, r, f;
    return (
        i || (i = window.location.href),
            (u = new RegExp("([?&])" + n + "=.*?(&|#|$)(.*)", "gi")),
            u.test(i)
                ? typeof t != "undefined" && t !== null
                    ? i.replace(u, "$1" + n + "=" + t + "$2$3")
                    : ((r = i.split("#")), (i = r[0].replace(u, "$1$3").replace(/(&|\?)$/, "")), typeof r[1] != "undefined" && r[1] !== null && (i += "#" + r[1]), i)
                : typeof t != "undefined" && t !== null
                    ? ((f = i.indexOf("?") !== -1 ? "&" : "?"), (r = i.split("#")), (i = r[0] + f + n + "=" + t), typeof r[1] != "undefined" && r[1] !== null && (i += "#" + r[1]), i)
                    : i
    );
}
function addParameterToURL(n) {
    return (_url = location.href), (_url += (_url.split("?")[1] ? "&" : "?") + n);
}
function GenerateGUID() {
    var n = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var i = (n + Math.random() * 16) % 16 | 0;
        return (n = Math.floor(n / 16)), (t == "x" ? i : (i & 3) | 8).toString(16);
    });
}
function getUrlParameter(n) {
    const u = window.location.search.substring(1),
        r = u.split("&");
    for (var t, i = 0; i < r.length; i++) if (((t = r[i].split("=")), t[0] === n)) return t[1] === undefined ? !0 : decodeURIComponent(t[1]);
    return null;
}
function initCharCounter() {
    $.each($(".char-counter"), function (n, t) {
        var r = $(t),
            u = r.attr("data-input-id"),
            f = r.attr("data-count"),
            i;
        if (u !== "" && f !== "" && ((i = $("#" + u)), i.length)) {
            i.attr("maxlength", f);
            r.html(i.val().length);
            i.on("keyup", function () {
                r.html($(this).val().length);
            });
        }
    });
}
function initValidateFields() {
    var n = $('input[name="form"]');
    n.length &&
    $.each(n, function (n, t) {
        $.post("/ws/form-check-validation/", { formName: t.value }, function (n) {
            if (n) {
                var i = $(t.closest("form"));
                if (!i.length) return !1;
                i.on("focusout validate", ":input", function (n) {
                    var r = $(this);
                    setTimeout(function () {
                        var u, f, o, e;
                        if (r.attr("type") === "file" && n.type === "focusout") return !1;
                        u = new FormData();
                        $.each(i.serializeArray(), function (n, t) {
                            u.append(t.name, t.value);
                        });
                        i.find("input[type='file']").length &&
                        ((f = i.find("input[type='file']")),
                            $.each($(f)[0].files, function (n, t) {
                                u.append($(f)[0].name, t);
                            }),
                            (o = $.map($(f)[0].files, function (n) {
                                return n.name;
                            }).join(",")),
                            u.append("filename", o));
                        $(".form-selected-service:checked").length &&
                        ((e = []),
                            $.each($(".form-selected-service:checked"), function () {
                                e.push($(this).val());
                            }),
                            u.append("service", e));
                        u.append("fieldName", r.attr("name"));
                        u.append("formName", t.value);
                        $.ajax({
                            type: "POST",
                            cache: !1,
                            dataType: "json",
                            url: "/ws/form-validate-field/",
                            data: u,
                            processData: !1,
                            contentType: !1,
                            success: function (n) {
                                fieldInvalid(r, n);
                            },
                        });
                    }, 450);
                });
            }
        });
    });
}
function initRatings() {
    $(".rating-selector").each(function (n) {
        var t = $(this).attr("id"),
            i;
        t = t ? t + "-value" : "rating-hidden-" + (n + 1);
        $("#" + t).length <= 0 &&
        ((i = 0),
            $(this)
                .find("a")
                .each(function () {
                    $(this).hasClass("yes-value") && i++;
                }),
            $(this).append('<input id="' + t + '" name="' + t + '" type="hidden" value="' + i + '"/>'));
        $(this)
            .find("a")
            .each(function () {
                $(this).on("click", function () {
                    $(this).siblings("a").removeClass("yes-value");
                    $(this).nextAll("a").addClass("yes-value");
                    $(this).addClass("yes-value");
                    var n = 5 - $(this).index();
                    $("#" + t).val(n);
                });
            });
        $(this).on("mouseenter", function () {
            $(this).find("a").removeClass("yes-value");
        });
        $(this).on("mouseleave", function () {
            var n = $("#" + t).val();
            $(this)
                .find("a")
                .each(function (t, i) {
                    t >= 5 - n && n != 0 && $(i).addClass("yes-value");
                });
        });
    });
}
function initLazy() {
    if ($(".lazyload").length) {
        $(window).on("scroll", function () {
            n();
        });
        n();
        function n() {
            var n = $(window).scrollTop() + $(window).height();
            $(".lazyload").each(function () {
                var t = $(this).offset().top,
                    i = $(this).attr("data-src");
                n > t && $(this).removeClass("lazyload").attr("src", i).removeAttr("data-src");
            });
        }
    }
}
function initMultiSelection() {
    $(".services-dropdown-menu input").on("change", function () {
        var n = [];
        $(".form-selected-service:checked").each(function () {
            n.push("<span class='badge'>" + $(this).val() + "</span>");
        });
        n.length ? $("#btn-services-dropdown div").html(n) : $("#btn-services-dropdown div").html("Project Type");
    });
    $(".services-dropdown-menu input").trigger("change");
    $(".services-dropdown-menu").on("click", function (n) {
        n.stopPropagation();
    });
}
jQuery.fn.extend({
    addToList: function (n, t) {
        return this.filter(":input")
            .val(function (i, r) {
                if (n == "" || n == null || n == undefined) return r;
                if (r == "") return n;
                var u = r.split(t);
                return u.push(n), u.join(t);
            })
            .end();
    },
    removeFromList: function (n, t) {
        return this.filter(":input")
            .val(function (i, r) {
                return n == "" || n == null || n == undefined
                    ? r
                    : $.grep(r.split(t), function (t) {
                        return t != n;
                    }).join(t);
            })
            .end();
    },
});
var submitText = "<i class='far fa-circle-notch fa-spin'></i> Submitting...",
    trackOutboundLink = function (n, t, i) {
        typeof ga != "undefined" && ga("send", "event", n, t, i);
    };
String.prototype.format = function () {
    var n = arguments;
    return this.replace(/{(\d+)}/g, function (t, i) {
        return typeof n[i] != "undefined" ? n[i] : t;
    });
};
$(function () {
    function n() {
        var t = getCookie("_lp"),
            n;
        t == null && ((t = document.location.href), saveCookie("_lp", document.location.href, 30, "/"));
        n = getCookie("_rp");
        n == null && ((n = document.referrer), saveCookie("_rp", document.referrer, 30, "/"));
    }
    function t() {
        function n() {
            $(document).off("mousemove");
            $(document).off("touchstart");
            $.post("/wp-admin/admin-ajax.php", {
                action:'get_lazy_scripts',
                currentPath: window.location.pathname,
            }).done(function (n) {
                n && $("body").append(n);
            });
        }
        $(document).on("mousemove", n);
        $(document).on("touchstart", n);
    }
    n();
    t();
});
