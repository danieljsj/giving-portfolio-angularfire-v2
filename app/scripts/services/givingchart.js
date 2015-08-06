'use strict';

/**
 * @ngdoc service
 * @name angularfire2App.givingChart
 * @description
 * # givingChart
 * Service in the angularfire2App.
 */
angular.module('angularfire2App')
  .service('givingChart', ['gpObjectUtils', function (gpObjectUtils) {

  	var U = gpObjectUtils;

	var configTemplateMerge = function(COPIED_DATA, EXTERNAL_SELECT_POINT_BY_ID, RESIZE_CHART) {
		// we say 'ById' here because (external)id is all that the highchart will know. The main func can select by obj. identity, but highcharts doesn't know/care.
		return {
			chart: {
				renderTo: 'giving-chart',
				type: 'pie',
				backgroundColor: null,
				events: {
					load: RESIZE_CHART
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						distance: -30,
						color: 'white',
						// align: 'center', // nope; this is not text-align, it's alignment relative to the point.
						format: '<b>{point.name}</b><br/>{point.percentage:.1f} %',
						style: {
							// color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							// textAlign: "center" // nope; looks like it only accepts a few different params, and this ain't one. i'll try actual css.
						}
					},
					center: ["50%","50%"],
					size: "100%"
				}
			},
			exporting: {
				enabled: false
			},
			tooltip: {
				pointFormat: '<h5 fail>{series.name}:</h5><br/><b>{point.y}</b> parts<br/><b>{point.percentage:.1f}%</percentage></b> of giving.'
			},
			series: [
				{
					name: "Giving",
					data: COPIED_DATA,    // used to be: get data () { return $scope.organizations; },
					id: "giving-data",
					point: {
						events: {
							select: function(){
								EXTERNAL_SELECT_POINT_BY_ID(this.id);
							},
							unselect: function(){
								// externalSelectPointById(false); 
								// nope; this is firing AFTER the selection event, unselecting whatever was newly selected!
							}
						}
					}
				}
			],
			title: {
				text: ""
			},
			credits: {
				enabled: false
			},
			loading: false,
			size: {}
		};
	};


    function resize() {

    	var chart = $("#giving-chart");
	    
	    var width = chart.parent().width();
	    var height = width;
		var doAnimation = false;
	    
	    chart.highcharts().setSize(height, width, doAnimation);
    }

	$(window).resize(resize);




    return {

    	getHcConfig: function(chartInfo, externalSelectOrg){

    		// note: better to use return array.map(fn(point) ... return)
    		var hcSeriesData = this.getHcData(chartInfo);
    		
    		return configTemplateMerge(hcSeriesData, externalSelectOrg, resize);
    	},
    	getHcData: function(chartInfo){
    		return chartInfo.points.map(function(point){
    			return {
    				id: 	U.fetchFromObject( chartInfo.idSelector		, point ),
    				y: 		U.fetchFromObject( chartInfo.valueSelector	, point ), 
    				name: 	U.fetchFromObject( chartInfo.nameSelector	, point )
    					.replace(/\s+/g, "<br/>")
    			}
    		})
    	}

    }
















  }]);





    // this.CategorizedGivingChart = {
    // 	Config: function(){},
    // }
    // // AngularJS will instantiate a singleton by calling "new" on this function
    



	// var categorizedGivingChartHiddens = { // really this should probably be its own service or something
	// 	configTemplateMerge: function(copiedData, externalSelectPointById) {}
	// }