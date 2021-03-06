(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
			.state('do', {
                url: '/',
                templateUrl: 'do/index.html',
                controller: 'do.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'DevOps' }
            })
			.state('ml', {
                url: '/',
                templateUrl: 'ml/index.html',
                controller: 'do.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'Machine Learning' }
            })
			
			.state('ds', {
                url: '/',
                templateUrl: 'ds/index.html',
                controller: 'do.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'Data Science' }
            })
			.state('ba', {
                url: '/',
                templateUrl: 'ba/index.html',
                controller: 'do.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'Businee Analysis' }
            })
			
			
			
			
			
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();