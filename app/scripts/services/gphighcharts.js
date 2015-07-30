'use strict';

/**
 * @ngdoc service
 * @name angularfire2App.gpHighcharts
 * @description
 * # gpHighcharts
 * Service in the angularfire2App.
 */
angular.module('angularfire2App')
  .service('gpHighcharts', ['gpObjectUtils', function (gpObjectUtils) {

  	var U = gpObjectUtils;
	
	var categorizedGivingChartHiddens = { // really this should probably be its own service or something
		configTemplateMerge: function(copiedData, externalSelectPointById) {}
	}

	var givingChartHiddens = {
		configTemplateMerge: function(copiedData, externalSelectPointById) {
		// we say 'ById' here because (external)id is all that the highchart will know. The main func can select by obj. identity, but highcharts doesn't know/care.
			return {
				chart: {
					renderTo: 'giving-chart',
					type: 'pie'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							style: {
								color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
						},
						center: ["50%","50%"],
						size: "75%"
					}
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				series: [
					{
						name: "Giving",
						data: copiedData,    // used to be: get data () { return $scope.organizations; },
						id: "giving-data",
						point: {
							events: {
								select: function(){
									externalSelectPointById(this.id);
								},
								unselect: function(){
									externalSelectPointById(false);
								}
							}
						}
					}
				],
				title: {
					text: "My Giving Portfolio"
				},
				credits: {
					enabled: false
				},
				loading: false,
				size: {}
			};
		}
	};


    this.GivingChart = {

    	getConfig: function(chartInfo, externalSelectOrg){

    		var copiedData = [];

    		for (var i = 0; i < chartInfo.points.length; i++) {
    			copiedData.push({
    				id: 	U.fetchFromObject( chartInfo.idSelector		, chartInfo.points[i] ),
    				y: 		U.fetchFromObject( chartInfo.valueSelector	, chartInfo.points[i] ), 
    				name: 	U.fetchFromObject( chartInfo.nameSelector	, chartInfo.points[i] ) // TODO!  // NOTE TO ME: THIS IS WAY THE POOP TOO MUCH WORK JUST TO GET FIREBASE NOT TO SAVE THE SELECTED AND SLICED VALUE, AM I RIGHT?! I MEAN, IT'S KINDA NICE TO HAVE DATA FLOW ONLY ONE WAY, AND THE CHART CAN'T MANIPULATE THE ORIGINAL DATA... BUT... SHEESH! NOT SURE THIS IS WORTH IT!
    			});
    		}
    		return givingChartHiddens
    			.configTemplateMerge(copiedData, externalSelectOrg);
    	},

    }

    this.CategorizedGivingChart = {
    	Config: function(){},
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
  }]);
