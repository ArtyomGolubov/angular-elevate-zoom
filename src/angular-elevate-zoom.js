/*
 *	 Angular Elevated Zoom jquery wrapper (angular-elevate-zoom)
 *	 Elevated Zoom jQuery plugin wrapper for Angular.js, by AppFeel.
 *
 *	 Version: 1.0.0
 * 	 License: MIT
 */

(function () {
    'use strict';

    var module = angular.module('angular-elevate-zoom', []);

    module.provider('ElevateZoomConfig', function () {
        this.zoomConfig = {};

        this.setZoomConfig = function setZoomConfig(zoomConfig) {
            this.zoomConfig = zoomConfig;
        }

        this.$get = function () {
            return this;
        };
    });

    module.directive('ezZoom', ['ElevateZoomSvc', function (ElevateZoomSvc) {
        return {
            restrict: 'AC',
            scope: {
                ezZoomConfig: "="
            },
            link: function ($scope, $elem, $attrs) {
                $attrs.$observe('ezZoomImage', function (interpolatedValue) {
                    if (interpolatedValue) {
                        ElevateZoomSvc.attach($elem, interpolatedValue, $scope.zoomConfig);
                    } else {
                        ElevateZoomSvc.remove($elem);
                    }
                });
            }
        };
    }]);

    module.factory('ElevateZoomSvc', ['ElevateZoomConfig', function (ElevateZoomConfig) {
        return {
            attach: function (zoomImageDOM, dataZoomImage, zoomConfig) {
                var zoomImage = $(zoomImageDOM),
                    zoomContainerSelector = '.zoomContainer';

                zoomImage.data('zoom-image', dataZoomImage);
                zoomImage.elevateZoom(zoomConfig || ElevateZoomConfig.zoomConfig);
            },
            remove: function (zoomImageDOM) {
                var zoomImage = $(zoomImageDOM);

                $("#" + zoomImage.attr("id") + "-zoomContainer").remove();
                zoomImage.removeData('elevateZoom');
                zoomImage.removeData('zoomImage');
            }
        }
    }]);
}());