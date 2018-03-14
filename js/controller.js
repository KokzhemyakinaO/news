	angular
		.module('App')
		.controller("Ctrl", function($scope, $filter, $http, valuesService, $routeParams){
            valuesService.loadData(function (data) {
                $scope.allNews = data.news;
                $scope.allAuthors = data.authors;
            });

            valuesService.getNewsById($routeParams.id, function (data) {
                $scope.oneNews = data;
            });

            valuesService.getAuthorsById($routeParams.id, function (data) {
                $scope.oneAuthors = data;
            });

            $scope.showPopUpMsg = false;
            $scope.openPopUp = function() {
                $scope.showPopUpMsg = true;
            };
	})


    .directive('popUp', function(valuesService){
        return {
            restrict: 'E',
            scope: false,
            template: `<div id="popUpMsg-bg" ng-show="showPopUpMsg">
			<div id="popUpMsg">
                <form name="addForm" id="addForm"><fieldset> 
                    <img src="images/fileclose.png" class="close" ng-click="closePopUp()"> 
                    <table> 
                    <tr> 
                        <td>Author</td> 
                        <td><input type="text" ng-model="news.author" required name="auth" value="" /></td> 
                    </tr><tr> 
                        <td>Tittle</td> 
                        <td><input type="text" ng-model="news.tittle" required name="tittle" value="" /></td> 
                    </tr><tr> 
                        <td>Short description</td> 
                        <td><textarea class="col-xs-12" ng-model="news.shortdescr" required name="short" ng-init="countsh=0"></textarea> 
                        <p class="count">{{countsh}}</p> 
                        </td> 
                    </tr><tr> 
                        <td>Full description</td> 
                        <td><textarea class="col-xs-12 full" ng-model="news.fulldescr" required name="full" ng-init="countfull=0"> </textarea> 
                        <p class="count">{{countfull}}</p> 
                        </td> 
                    </tr><tr> 
                        <td>Image</td> 
                        <td><input ng-model="news.pic" type="file" pop-up value="news.png"/></td> 
                    </tr> 
                    </table> 
                    </fieldset> 
                    <button type="submit" ng-click="addnews(news, addForm)">Add news</button> 
                </form>
			</div> 
			</div>`,
            controller: function($scope) {
                $scope.addnews = function(news, addForm){
                    if(addForm.$valid){
                        if(!$scope.news.pic) {
                            $scope.news.pic = "news.png";
                        }
                        for(var i in $scope.allAuthors) {
                            if($scope.allAuthors[i].surname === $scope.news.author){
                                $scope.news.author = i;
                            }
                        }
                        $scope.news.date = new Date();

                        var obj = {"tittle": $scope.news.tittle,
                            "pic": $scope.news.pic,
                            "author": $scope.news.author,
                            "shortdescr": $scope.news.shortdescr,
                            "fulldescr": $scope.news.fulldescr,
                            "date": $scope.news.date
                        };

                        valuesService.insertData(obj);

                        $scope.showPopUpMsg = false;
                    }

                    setTimeout(function () {
                        jQuery('#addForm')[0].reset();
                        $scope.countfull = 0;
                        $scope.countsh = 0;
                    }, 1000)

                };

                $scope.closePopUp = function(){
                    $scope.showPopUpMsg = false;
                }
            },
            link: function ($scope, element, attrs) {
                element.on('change', function  (evt) {
                    if(evt.target.className == "ng-pristine ng-valid") {
                            $scope.news.pic = evt.target.files[0].name;
                    }
                });

                element.on('keyup', function  (evt) {
                    if(evt.target.name == "short") {
                        $scope.countsh = evt.target.textLength;
                    }
                    if(evt.target.name == "full") {
                        $scope.countfull = evt.target.textLength;
                    }
                });
            }
        }
    });