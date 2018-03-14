angular
	.module('App')
	.service('valuesService', function($http, $q, $timeout) {

        this.loadData = function(callback) {
            $timeout(function () {
                if(this.data) {
                    callback(this.data);
                } else {
                        $http.get('js/newsData.json').success(function (data) {
                            this.data = data;
                            callback(this.data);
                        }.bind(this));
                }
            }, 2000);
        };

        this.getNewsById = function(id, callback) {
            $timeout(function () {
                if(!id) {
                    callback(null);
                    return;
                }
                id = parseInt(id);
                if(this.data && this.data.news) {
                    callback(this.data.news[id]);
                } else {
                        $http.get('js/newsData.json').success(function (data) {
                            this.data = data;
                            callback(this.data.news[id]);
                        }.bind(this));
                }
            }, 2000);
        };

        this.getAuthorsById = function(id, callback) {
            $timeout(function () {
                if(!id) {
                    callback({});
                    return;
                }
                id = parseInt(id);
                if(this.data && this.data.authors) {
                    callback(this.data.authors[id]);
                } else {
                        $http.get('js/newsData.json').success(function (data) {
                            this.data = data;
                            callback(this.data.authors[id]);
                        }.bind(this));
                }
            }, 10);
        };

        this.createNews = function (obj) {
            $timeout(function () {
                this.data.news.push(obj);
            }, 500);
        };

	});





