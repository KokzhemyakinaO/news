var App = angular.module("App",["ngRoute"])
    .config(function($routeProvider){

        $routeProvider.when('/allnews',
        {
            templateUrl:'views/allNews.html',
            controller:'Ctrl'
        });
        $routeProvider.when('/news/:id',
        {
            templateUrl:'views/selectNews.html',
            controller:'Ctrl'
        });
        $routeProvider.when('/author/:id',
            {
                templateUrl:'views/selectAuthor.html',
                controller:'Ctrl'
            });
        $routeProvider.otherwise({redirectTo: '/allnews'});

});