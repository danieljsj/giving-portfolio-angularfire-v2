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

	
	var categorizedGivingChartHiddens = { // really this should probably be its own service or something
		configTemplateMerge: function(copiedData, externalSelectPointById) {}
	}

    this.GivingChart = {

    	getHcConfig: function(chartInfo, externalSelectOrg){

    		// note: better to use return array.map(fn(point) ... return)
    		var hcSeriesData = this.getHcData(chartInfo);
    		
    		return givingChartHiddens
    			.configTemplateMerge(hcSeriesData, externalSelectOrg);
    	},
    	getHcData: function(chartInfo){
    		return chartInfo.points.map(function(point){
    			return {
    				id: 	U.fetchFromObject( chartInfo.idSelector		, point ),
    				y: 		U.fetchFromObject( chartInfo.valueSelector	, point ), 
    				name: 	U.fetchFromObject( chartInfo.nameSelector	, point )
    			}
    		})
    	}

    }

    this.CategorizedGivingChart = {
    	Config: function(){},
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
  }]);
