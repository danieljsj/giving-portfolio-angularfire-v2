'use strict';

/**
 * @ngdoc function
 * @name angularfire2App.controller:PortfoliobasicCtrl
 * @description
 * # PortfoliobasicCtrl
 * Controller of the angularfire2App
 */

angular.module('angularfire2App')
  .controller('PortfoliobasicCtrl', function ($scope, gpOrgsManager, gpChartInterfaces, gpHighcharts) {

  	// note - the controller is angular and knows we are using angular, and knows how angular works.
  	// the controller knows that we are using highcharts, but except for a brief exception - ".series[0].setData(...)" (in refreshChart), does not know how highcharts works.
    // the controller knows that we're using angularfire, and knows how it works. ($loaded, $watch)... ... gpOrgsManager also knows we're using angularfire; that's it's whole thing.


    function saveToScopeOrgsThenInit(orgs){
    	$scope.orgs = orgs;
    	init();
    }

    gpOrgsManager.getOrgs(saveToScopeOrgsThenInit);
	
	// $scope.orgs.$loaded(function(){
	// 	setTimeout(init,0); // re-queue the init so the init in gpOrgsManager can finish first? // hackish, something better should solve this...
	// }).catch(alert);
	// loaded only fires once... complicated but perhaps worthwhile to figure out how to wait / async. ... I really have to wonder what's happening when... or is it blocking?
	

	function init(){
			// Chart Info Setup
			$scope.givingChartInfo = getGivingChartInfo();

			// Chart Config
			$scope.givingChartConfig = gpHighcharts.GivingChart.getConfig(
				$scope.givingChartInfo,
				$scope.orgs.selectOrg
			);

			// Chart Setup
			$scope.givingChart = new Highcharts.Chart($scope.givingChartConfig);

			// // Chart Controls
			// $scope.givingChart.gpControls = new gpChartInterfaces.Controls(
			// 	new gpHighCharts.Controls();
			// ); /* $scope.givingChart.controls.bind($scope.givingChart); // <=maybe */

			// Chart Updates
			$scope.$watch('orgs', pushOrgsChanges, true); // deep watch; http://stackoverflow.com/a/14713978
	}

	function getGivingChartInfo(){
		return new gpChartInterfaces.FlatChart.Info(
			$scope.orgs, '$id', 'portion', 'name'
		);0
	}

	function pushOrgsChanges(newOrgs, oldOrgs){

		$scope.givingChart.series[0].setData(getOrgsChartInfo());

		gpOrgsManager.saveOrgsChanges(newOrgs, oldOrgs);

	}

  });
