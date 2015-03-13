/**
 * @name: camera.js
 * @author: zhanxin.lin < pizner@gmail.com >
 * @create: 2014.02
 * @desc: Just for Remote Camera
 */
var medicalApp = angular.module('medicalApp',['ngResource'], function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }).config(function($routeProvider) {
        $routeProvider.when("/", {
            controller: medicalApp.loginCtrl,
            template: document.getElementById('loginView').text
        }).when("/login", {
            controller: medicalApp.cameraCtrl,
            template: document.getElementById('loginView').text
        })/*.when("/menu", {
            controller: medicalApp.menuCtrl,
            template: document.getElementById('menuView').text
        }).when("/photos", {
            controller: medicalApp.watchPhotosCtrl,
            template: document.getElementById('photosView').text
        }).when("/address", {
            controller: medicalApp.ipAddressCtrl,
            template: document.getElementById('ipAddressView').text
        }).when("/system", {
            controller: medicalApp.systemCtrl,
            template: document.getElementById('systemView').text
        }).when("/about", {
            controller: medicalApp.aboutCtrl,
            template: document.getElementById('aboutView').text
        }).otherwise({
            redirectTo: "/"
    })*/
});


// loginCtrl
medicalApp.controller('loginCtrl', function($scope, $resource, $location) {
    if(connected) {
        return $location.path("/menu");
    }

    $scope.doLogin = function() {
        var values = {
            email: $scope.email,
            password: $scope.password
        }
        $resource('/api/login').save(values, function(data) {
            if(data.stat === 'ok') {
                loginSuccess();
            } else if(data.stat === 'fail') {
                loginError(data.msg);
            } else {
                loginError('Unknow error!');
            }
        }, function() {
            loginFail('Request error!');
        });

        loginSuccess = function() {
            connected = true;
            $location.path("/menu");
        }

        loginError = function(msg) {
            $scope.errorMsg = msg;
            $scope.errorClass = "login-error-show";
        }

    }
});
