/**
 * @license
 * Copyright 2010 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function MarkerClusterer(n, t, i) {
    var r, u;
    this.extend(MarkerClusterer, google.maps.OverlayView);
    this.map_ = n;
    this.markers_ = [];
    this.clusters_ = [];
    this.sizes = [53, 56, 66, 78, 90];
    this.styles_ = [];
    this.ready_ = !1;
    r = i || {};
    this.gridSize_ = r.gridSize || 60;
    this.minClusterSize_ = r.minimumClusterSize || 2;
    this.maxZoom_ = r.maxZoom || null;
    this.styles_ = r.styles || [];
    this.imagePath_ = r.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_;
    this.imageExtension_ = r.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_;
    this.zoomOnClick_ = !0;
    r.zoomOnClick != undefined && (this.zoomOnClick_ = r.zoomOnClick);
    this.averageCenter_ = !1;
    r.averageCenter != undefined && (this.averageCenter_ = r.averageCenter);
    this.setupStyles_();
    this.setMap(n);
    this.prevZoom_ = this.map_.getZoom();
    u = this;
    google.maps.event.addListener(this.map_, "zoom_changed", function () {
        var n = u.map_.getZoom();
        u.prevZoom_ != n && ((u.prevZoom_ = n), u.resetViewport());
    });
    google.maps.event.addListener(this.map_, "idle", function () {
        u.redraw();
    });
    t && t.length && this.addMarkers(t, !1);
}
function Cluster(n) {
    this.markerClusterer_ = n;
    this.map_ = n.getMap();
    this.gridSize_ = n.getGridSize();
    this.minClusterSize_ = n.getMinClusterSize();
    this.averageCenter_ = n.isAverageCenter();
    this.center_ = null;
    this.markers_ = [];
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, n.getStyles(), n.getGridSize());
}
function ClusterIcon(n, t, i) {
    n.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);
    this.styles_ = t;
    this.padding_ = i || 0;
    this.cluster_ = n;
    this.center_ = null;
    this.map_ = n.getMap();
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = !1;
    this.setMap(this.map_);
}
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "../images/m";
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png";
MarkerClusterer.prototype.extend = function (n, t) {
    return function (n) {
        for (var t in n.prototype) this.prototype[t] = n.prototype[t];
        return this;
    }.apply(n, [t]);
};
MarkerClusterer.prototype.onAdd = function () {
    this.setReady_(!0);
};
MarkerClusterer.prototype.draw = function () {};
MarkerClusterer.prototype.setupStyles_ = function () {
    if (!this.styles_.length) for (var n = 0, t; (t = this.sizes[n]); n++) this.styles_.push({ url: this.imagePath_ + (n + 1) + "." + this.imageExtension_, height: t, width: t });
};
MarkerClusterer.prototype.fitMapToMarkers = function () {
    for (var r = this.getMarkers(), n = new google.maps.LatLngBounds(), t = 0, i; (i = r[t]); t++) n.extend(i.getPosition());
    this.map_.fitBounds(n);
};
MarkerClusterer.prototype.setStyles = function (n) {
    this.styles_ = n;
};
MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
};
MarkerClusterer.prototype.isZoomOnClick = function () {
    return this.zoomOnClick_;
};
MarkerClusterer.prototype.isAverageCenter = function () {
    return this.averageCenter_;
};
MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
};
MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
};
MarkerClusterer.prototype.setMaxZoom = function (n) {
    this.maxZoom_ = n;
};
MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_;
};
MarkerClusterer.prototype.calculator_ = function (n, t) {
    for (var i = 0, u = n.length, r = u; r !== 0; ) (r = parseInt(r / 10, 10)), i++;
    return (i = Math.min(i, t)), { text: u, index: i };
};
MarkerClusterer.prototype.setCalculator = function (n) {
    this.calculator_ = n;
};
MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
};
MarkerClusterer.prototype.addMarkers = function (n, t) {
    for (var i = 0, r; (r = n[i]); i++) this.pushMarkerTo_(r);
    t || this.redraw();
};
MarkerClusterer.prototype.pushMarkerTo_ = function (n) {
    if (((n.isAdded = !1), n.draggable)) {
        var t = this;
        google.maps.event.addListener(n, "dragend", function () {
            n.isAdded = !1;
            t.repaint();
        });
    }
    this.markers_.push(n);
};
MarkerClusterer.prototype.addMarker = function (n, t) {
    this.pushMarkerTo_(n);
    t || this.redraw();
};
MarkerClusterer.prototype.removeMarker_ = function (n) {
    var t = -1,
        i,
        r;
    if (this.markers_.indexOf) t = this.markers_.indexOf(n);
    else
        for (i = 0; (r = this.markers_[i]); i++)
            if (r == n) {
                t = i;
                break;
            }
    return t == -1 ? !1 : (n.setMap(null), this.markers_.splice(t, 1), !0);
};
MarkerClusterer.prototype.removeMarker = function (n, t) {
    var i = this.removeMarker_(n);
    return !t && i ? (this.resetViewport(), this.redraw(), !0) : !1;
};
MarkerClusterer.prototype.removeMarkers = function (n, t) {
    for (var f, i = !1, r = 0, u; (u = n[r]); r++) (f = this.removeMarker_(u)), (i = i || f);
    if (!t && i) return this.resetViewport(), this.redraw(), !0;
};
MarkerClusterer.prototype.setReady_ = function (n) {
    this.ready_ || ((this.ready_ = n), this.createClusters_());
};
MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
};
MarkerClusterer.prototype.getMap = function () {
    return this.map_;
};
MarkerClusterer.prototype.setMap = function (n) {
    this.map_ = n;
};
MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
};
MarkerClusterer.prototype.setGridSize = function (n) {
    this.gridSize_ = n;
};
MarkerClusterer.prototype.getMinClusterSize = function () {
    return this.minClusterSize_;
};
MarkerClusterer.prototype.setMinClusterSize = function (n) {
    this.minClusterSize_ = n;
};
MarkerClusterer.prototype.getExtendedBounds = function (n) {
    var t = this.getProjection(),
        e = new google.maps.LatLng(n.getNorthEast().lat(), n.getNorthEast().lng()),
        o = new google.maps.LatLng(n.getSouthWest().lat(), n.getSouthWest().lng()),
        r = t.fromLatLngToDivPixel(e),
        i,
        u,
        f;
    return (r.x += this.gridSize_), (r.y -= this.gridSize_), (i = t.fromLatLngToDivPixel(o)), (i.x -= this.gridSize_), (i.y += this.gridSize_), (u = t.fromDivPixelToLatLng(r)), (f = t.fromDivPixelToLatLng(i)), n.extend(u), n.extend(f), n;
};
MarkerClusterer.prototype.isMarkerInBounds_ = function (n, t) {
    return t.contains(n.getPosition());
};
MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport(!0);
    this.markers_ = [];
};
MarkerClusterer.prototype.resetViewport = function (n) {
    for (var r, i, t = 0; (r = this.clusters_[t]); t++) r.remove();
    for (t = 0; (i = this.markers_[t]); t++) (i.isAdded = !1), n && i.setMap(null);
    this.clusters_ = [];
};
MarkerClusterer.prototype.repaint = function () {
    var n = this.clusters_.slice();
    this.clusters_.length = 0;
    this.resetViewport();
    this.redraw();
    window.setTimeout(function () {
        for (var t = 0, i; (i = n[t]); t++) i.remove();
    }, 0);
};
MarkerClusterer.prototype.redraw = function () {
    this.createClusters_();
};
MarkerClusterer.prototype.distanceBetweenPoints_ = function (n, t) {
    if (!n || !t) return 0;
    var i = ((t.lat() - n.lat()) * Math.PI) / 180,
        r = ((t.lng() - n.lng()) * Math.PI) / 180,
        u = Math.sin(i / 2) * Math.sin(i / 2) + Math.cos((n.lat() * Math.PI) / 180) * Math.cos((t.lat() * Math.PI) / 180) * Math.sin(r / 2) * Math.sin(r / 2),
        f = 2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u));
    return 6371 * f;
};
MarkerClusterer.prototype.addToClosestCluster_ = function (n) {
    for (var r, u, t, f = 4e4, i = null, o = n.getPosition(), e = 0; (t = this.clusters_[e]); e++) (r = t.getCenter()), r && ((u = this.distanceBetweenPoints_(r, n.getPosition())), u < f && ((f = u), (i = t)));
    i && i.isMarkerInClusterBounds(n) ? i.addMarker(n) : ((t = new Cluster(this)), t.addMarker(n), this.clusters_.push(t));
};
MarkerClusterer.prototype.createClusters_ = function () {
    var i, r, t, n;
    if (this.ready_)
        for (i = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast()), r = this.getExtendedBounds(i), t = 0; (n = this.markers_[t]); t++)
            !n.isAdded && this.isMarkerInBounds_(n, r) && this.addToClosestCluster_(n);
};
Cluster.prototype.isMarkerAlreadyAdded = function (n) {
    if (this.markers_.indexOf) return this.markers_.indexOf(n) != -1;
    for (var t = 0, i; (i = this.markers_[t]); t++) if (i == n) return !0;
    return !1;
};
Cluster.prototype.addMarker = function (n) {
    var t, r;
    if (this.isMarkerAlreadyAdded(n)) return !1;
    if (this.center_) {
        if (this.averageCenter_) {
            var i = this.markers_.length + 1,
                u = (this.center_.lat() * (i - 1) + n.getPosition().lat()) / i,
                f = (this.center_.lng() * (i - 1) + n.getPosition().lng()) / i;
            this.center_ = new google.maps.LatLng(u, f);
            this.calculateBounds_();
        }
    } else (this.center_ = n.getPosition()), this.calculateBounds_();
    if (((n.isAdded = !0), this.markers_.push(n), (t = this.markers_.length), t < this.minClusterSize_ && n.getMap() != this.map_ && n.setMap(this.map_), t == this.minClusterSize_)) for (r = 0; r < t; r++) this.markers_[r].setMap(null);
    return t >= this.minClusterSize_ && n.setMap(null), this.updateIcon(), !0;
};
Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
};
Cluster.prototype.getBounds = function () {
    for (var n = new google.maps.LatLngBounds(this.center_, this.center_), r = this.getMarkers(), t = 0, i; (i = r[t]); t++) n.extend(i.getPosition());
    return n;
};
Cluster.prototype.remove = function () {
    this.clusterIcon_.remove();
    this.markers_.length = 0;
    delete this.markers_;
};
Cluster.prototype.getSize = function () {
    return this.markers_.length;
};
Cluster.prototype.getMarkers = function () {
    return this.markers_;
};
Cluster.prototype.getCenter = function () {
    return this.center_;
};
Cluster.prototype.calculateBounds_ = function () {
    var n = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(n);
};
Cluster.prototype.isMarkerInClusterBounds = function (n) {
    return this.bounds_.contains(n.getPosition());
};
Cluster.prototype.getMap = function () {
    return this.map_;
};
Cluster.prototype.updateIcon = function () {
    var f = this.map_.getZoom(),
        t = this.markerClusterer_.getMaxZoom(),
        n,
        i,
        r,
        u;
    if (t && f > t) {
        for (n = 0; (i = this.markers_[n]); n++) i.setMap(this.map_);
        return;
    }
    if (this.markers_.length < this.minClusterSize_) {
        this.clusterIcon_.hide();
        return;
    }
    r = this.markerClusterer_.getStyles().length;
    u = this.markerClusterer_.getCalculator()(this.markers_, r);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.setSums(u);
    this.clusterIcon_.show();
};
ClusterIcon.prototype.triggerClusterClick = function (n) {
    var t = this.cluster_.getMarkerClusterer();
    google.maps.event.trigger(t, "clusterclick", this.cluster_, n);
    t.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds());
};
ClusterIcon.prototype.onAdd = function () {
    var t, i, r, n;
    this.div_ = document.createElement("DIV");
    this.visible_ && ((t = this.getPosFromLatLng_(this.center_)), (this.div_.style.cssText = this.createCss(t)), (this.div_.innerHTML = this.sums_.text));
    i = this.getPanes();
    i.overlayMouseTarget.appendChild(this.div_);
    r = this;
    n = !1;
    google.maps.event.addDomListener(this.div_, "click", function (t) {
        n || r.triggerClusterClick(t);
    });
    google.maps.event.addDomListener(this.div_, "mousedown", function () {
        n = !1;
    });
    google.maps.event.addDomListener(this.div_, "mousemove", function () {
        n = !0;
    });
};
ClusterIcon.prototype.getPosFromLatLng_ = function (n) {
    var t = this.getProjection().fromLatLngToDivPixel(n);
    return typeof this.iconAnchor_ == "object" && this.iconAnchor_.length === 2 ? ((t.x -= this.iconAnchor_[0]), (t.y -= this.iconAnchor_[1])) : ((t.x -= parseInt(this.width_ / 2, 10)), (t.y -= parseInt(this.height_ / 2, 10))), t;
};
ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
        var n = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = n.y + "px";
        this.div_.style.left = n.x + "px";
    }
};
ClusterIcon.prototype.hide = function () {
    this.div_ && (this.div_.style.display = "none");
    this.visible_ = !1;
};
ClusterIcon.prototype.show = function () {
    if (this.div_) {
        var n = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(n);
        this.div_.style.display = "";
    }
    this.visible_ = !0;
};
ClusterIcon.prototype.remove = function () {
    this.setMap(null);
};
ClusterIcon.prototype.onRemove = function () {
    this.div_ && this.div_.parentNode && (this.hide(), this.div_.parentNode.removeChild(this.div_), (this.div_ = null));
};
ClusterIcon.prototype.setSums = function (n) {
    this.sums_ = n;
    this.text_ = n.text;
    this.index_ = n.index;
    this.div_ && (this.div_.innerHTML = n.text);
    this.useStyle();
};
ClusterIcon.prototype.useStyle = function () {
    var t = Math.max(0, this.sums_.index - 1),
        n;
    t = Math.min(this.styles_.length - 1, t);
    n = this.styles_[t];
    this.url_ = n.url;
    this.height_ = n.height;
    this.width_ = n.width;
    this.textColor_ = n.textColor;
    this.anchor_ = n.anchor;
    this.textSize_ = n.textSize;
    this.backgroundPosition_ = n.backgroundPosition;
    this.iconAnchor_ = n.iconAnchor;
};
ClusterIcon.prototype.setCenter = function (n) {
    this.center_ = n;
};
ClusterIcon.prototype.createCss = function (n) {
    var t = [],
        i,
        r,
        u;
    return (
        t.push("background-image:url(" + this.url_ + ");"),
            (i = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0"),
            t.push("background-position:" + i + ";"),
            typeof this.anchor_ == "object"
                ? (typeof this.anchor_[0] == "number" && this.anchor_[0] > 0 && this.anchor_[0] < this.height_
                    ? t.push("height:" + (this.height_ - this.anchor_[0]) + "px; padding-top:" + this.anchor_[0] + "px;")
                    : typeof this.anchor_[0] == "number" && this.anchor_[0] < 0 && -this.anchor_[0] < this.height_
                        ? t.push("height:" + this.height_ + "px; line-height:" + (this.height_ + this.anchor_[0]) + "px;")
                        : t.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px;"),
                    typeof this.anchor_[1] == "number" && this.anchor_[1] > 0 && this.anchor_[1] < this.width_
                        ? t.push("width:" + (this.width_ - this.anchor_[1]) + "px; padding-left:" + this.anchor_[1] + "px;")
                        : t.push("width:" + this.width_ + "px; text-align:center;"))
                : t.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px; width:" + this.width_ + "px; text-align:center;"),
            (r = this.textColor_ ? this.textColor_ : "black"),
            (u = this.textSize_ ? this.textSize_ : 11),
            t.push("cursor:pointer; top:" + n.y + "px; left:" + n.x + "px; color:" + r + "; position:absolute; font-size:" + u + "px; font-family:Arial,sans-serif; font-weight:bold"),
            t.join("")
    );
};
window.MarkerClusterer = MarkerClusterer;
MarkerClusterer.prototype.addMarker = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype.clearMarkers = MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype.fitMapToMarkers = MarkerClusterer.prototype.fitMapToMarkers;
MarkerClusterer.prototype.getCalculator = MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype.getGridSize = MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype.getExtendedBounds = MarkerClusterer.prototype.getExtendedBounds;
MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype.getTotalClusters = MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype.getTotalMarkers = MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype.removeMarker = MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype.removeMarkers = MarkerClusterer.prototype.removeMarkers;
MarkerClusterer.prototype.resetViewport = MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint;
MarkerClusterer.prototype.setCalculator = MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype.setGridSize = MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom;
MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw;
Cluster.prototype.getCenter = Cluster.prototype.getCenter;
Cluster.prototype.getSize = Cluster.prototype.getSize;
Cluster.prototype.getMarkers = Cluster.prototype.getMarkers;
ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype.draw = ClusterIcon.prototype.draw;
ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove;
$(function () {
    function h() {
        var i = $("input[name=project-type]:checked").val(),
            r = $("#project-filter-city").val(),
            t = "";
        $("#project-filter-employee").length && (t = $("#project-filter-employee").val());
        var u = $("#project-filter-destinations").val(),
            f = $("#input-checkbox-map-photos").is(":checked"),
            n = "?map=";
        n += i !== "" ? "&projectType=" + i : "";
        n += r !== "" ? "&city=" + r : "";
        n += t !== "" ? "&employee=" + t : "";
        n += u ? "&destinations=" + u : "";
        n += f ? "&photosOnly=" + f : "";
        history.replaceState(null, null, n);
    }
    function y(t) {
        return function (u) {
            var f, o;
            u.cancelBubble = !0;
            u.returnValue = !1;
            u.stopPropagation && (u.stopPropagation(), u.preventDefault());
            i == null && (i = this.icon.url);
            r != null && ((f = { url: i, size: new window.google.maps.Size(n, n), scaledSize: new window.google.maps.Size(n, n) }), r.setIcon(f), (i = this.icon.url));
            r = this;
            o = { url: i, size: new window.google.maps.Size(e, e), scaledSize: new window.google.maps.Size(e, e) };
            this.setIcon(o);
            $.ajax({
                type: "POST",
                cache: !1,
                url: "/ws/getprojectdetails/?projectId=" + t.ProjectId,
                error: function (n) {
                    alert(n);
                },
                success: function (u) {
                    $("#map-pin-detail-review").remove();
                    var f = $("<div>", { id: "map-pin-detail-review" }).addClass("map-pin-detail"),
                        e = $("<div id='map-detail-inner' class='inner'><a href='#' id='map-pin-details-close' class='close btn pull-right' title='close'><i class='fal fa-times'></i></a></div>").append(u),
                        o = f.append(e);
                    $("#mapclusterer").after(o);
                    $("#project-assets-gallery").attr("data-galleryid", t.ProjectId);
                    $("#map-pin-details-close").on("click", function (t) {
                        if ((t.preventDefault(), r != null)) {
                            var u = { url: i, size: new window.google.maps.Size(n, n), scaledSize: new window.google.maps.Size(n, n) };
                            r.setIcon(u);
                        }
                        $(this).closest("#map-pin-detail-review").remove();
                    });
                    $(".past-project-page .project-details .set-height").length &&
                    $(".past-project-page .project-details .set-height").each(function () {
                        $(this).height() > 80 && $(this).parent().addClass("expand-me");
                    });
                },
            });
        };
    }
    function p(n) {
        f = new MarkerClusterer(t, n, { imagePath: "/img/past-projects/m", maxZoom: 15 });
    }
    function o() {
        var i = $("input[name=project-type]:checked").val(),
            e = $("#project-filter-city").val().toUpperCase(),
            r = "",
            f,
            o,
            t;
        $("#project-filter-employee").length && (r = $("#project-filter-employee").val());
        f = $("#project-filter-destinations").val();
        o = $("#input-checkbox-map-photos").is(":checked");
        s = [];
        t = JSON.parse(JSON.stringify(c));
        t = t.filter(function (n) {
            var t = n.DisplayProjectTypes.split(",");
            return (
                (i === "Other" ? !t.some((n) => u.includes(n)) : !0) &&
                (i !== "Other" && i !== "" ? t.includes(i) : !0) &&
                (e !== "" ? n.City.toUpperCase() + ", " + n.State.toUpperCase() === e : !0) &&
                (r !== "" ? n.RepId === r : !0) &&
                (f === "to" ? n.IsMoveTo : !0) &&
                (f === "from" ? !n.IsMoveTo : !0) &&
                (o ? n.HasAsset === !0 : !0)
            );
        });
        t.forEach(function (i) {
            var u = t.filter(function (n) {
                    return n.Latitude === i.Latitude && n.Longitude === i.Longitude;
                }),
                o,
                h,
                r,
                p,
                f,
                w,
                e;
            if (u.length > 1)
                for (o = u.length, h = 360 / o, r = 0; r < u.length; r++) {
                    var b = 90 + h * r,
                        c = (b * Math.PI) / 180,
                        v = 6e-5;
                    u[r].Latitude = u[r].Latitude + Math.sin(c) * v;
                    u[r].Longitude = u[r].Longitude + Math.cos(c) * v;
                }
            p = new window.google.maps.LatLng(i.Latitude, i.Longitude);
            f = l;
            i.IsMoveTo === !1 && (f = a);
            w = { url: f, size: new window.google.maps.Size(n, n), scaledSize: new window.google.maps.Size(n, n) };
            e = new window.google.maps.Marker({ position: p, icon: w });
            window.google.maps.event.addListener(e, "click", y(i));
            s.push(e);
        });
        p(s);
    }
    function w() {
        var i = $("#input-search-projects-map"),
            n = new window.google.maps.places.Autocomplete(i.get(0));
        n.setComponentRestrictions({ country: "us" });
        n.addListener("place_changed", function () {
            var r = n.getPlace(),
                u;
            if ((i.val(r.formatted_address), (u = new window.google.maps.LatLngBounds()), !r.geometry || !r.geometry.location)) {
                console.log("Returned place contains no geometry");
                return;
            }
            r.geometry.viewport ? u.union(r.geometry.viewport) : u.extend(r.geometry.location);
            t.fitBounds(u);
        });
    }
    function b() {
        window.google.maps.event.addListener(t, "click", function () {
            t.setOptions({ scrollwheel: !0 });
        });
        window.google.maps.event.addListener(t, "zoom_changed", function () {
            t.setOptions({ scrollwheel: !0 });
        });
        window.google.maps.event.addListener(t, "drag", function () {
            t.setOptions({ scrollwheel: !0 });
        });
    }
    function k() {
        // var n = getGoogleMapsAPIKey();
        var n = '';
        $.ajax({
            type: "POST",
            cache: !1,
            dataType: "json",
            url: "/wp-admin/admin-ajax.php",
            data: {
                action:'get_gmap_data',
                data: ''
            },
            success: function (i) {
                c = i.projects;
                $.getScript("https://maps.googleapis.com/maps/api/js?libraries=places&key=" + n, function () {
                    var n = new window.google.maps.LatLng(i.lat, i.lng),
                        r = i.pastProjectZoomLevel;
                    t = new window.google.maps.Map(document.getElementById("mapclusterer"), {
                        minZoom: 4,
                        zoom: r,
                        center: n,
                        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                        streetViewControl: !1,
                        mapTypeControl: !1,
                        scrollwheel: !1,
                        styles: v,
                    });
                    o();
                    b();
                });
            },
        });
    }
    function d() {
        if (u == null)
            $.ajax({
                type: "POST",
                cache: !1,
                dataType: "json",
                url: "/wp-admin/admin-ajax.php",
                data: {
                    action:'get_products',
                    data: ''
                },
                success: function (n) {
                    return (u = n);
                },
            });
        else return u;
        return null;
    }
    var c,
        f,
        l = "/img/past-projects/map-pin.png",
        a = "/img/past-projects/map-pin-active.png",
        r,
        i,
        t = null,
        n = 36,
        e = 48,
        s = [],
        v = [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
            { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
        ],
        u;
    $("#input-search-projects-map").one("focus", function () {
        w();
    });
    $(".select-filter").on("change", function () {
        f.clearMarkers();
        o();
        h();
    });
    $("#project-filter-map-photos").on("change", function () {
        f.clearMarkers();
        o();
        h();
    });
    $("input[type=radio][name=project-type]").on("change", function () {
        f.clearMarkers();
        o();
        h();
    });
    $(document).on("click", ".map-detail-review .btn-read-review-map", function (n) {
        return n.preventDefault(), $(this).addClass("hide").parent().find("div.map-review-body").removeClass("hide"), !1;
    });
    $("#input-search-projects-map").on("keyup", function () {
        var n = $("#input-search-projects-map").val();
        n ? $("#btn-search-clear").removeClass("d-none") : $("#btn-search-clear").addClass("d-none");
    });
    $("#btn-search-clear").on("click", function () {
        $("#input-search-projects-map").val("");
        $("#btn-search-clear").addClass("d-none");
    });
    $(".past-project-page .project-details .set-height").length &&
    $(".past-project-page .project-details .set-height").each(function () {
        $(this).height() > 80 && $(this).parent().addClass("expand-me");
    });
    d();
    k();
});
