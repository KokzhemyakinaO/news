angular
	.module('App')
	.service('valuesService', function($http, $q, $timeout) {

        this.loadData = function(callback) {
            if(this.data) {
                callback(this.data);
            } else {
                $timeout(function () {
                    $http.get('js/newsData.json').success(function (data) {
                        this.data = data;
                        callback(this.data);
                    }.bind(this));
                }, 2000);
            }
        };

        this.getNewsById = function(id, callback) {
            if(!id) {
                callback({});
                return;
            }
            id = parseInt(id);
            if(this.data && this.data.news) {
                callback(this.data.news[id]);
            } else {
                $timeout(function () {
                    $http.get('js/newsData.json').success(function (data) {
                        this.data = data;
                        callback(this.data.news[id]);
                    }.bind(this));
                }, 1000);
            }
        };

        this.getAuthorsById = function(id, callback) {
            if(!id) {
                callback({});
                return;
            }
            id = parseInt(id);
            if(this.data && this.data.authors) {
                callback(this.data.authors[id]);
            } else {
                $timeout(function () {
                    $http.get('js/newsData.json').success(function (data) {
                        this.data = data;
                        callback(this.data.authors[id]);
                    }.bind(this));
                }, 1000);
            }
        };

        this.insertData = function (obj) {
            this.data.news.push(obj);
        };

	});





