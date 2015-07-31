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
		configTemplateMerge: function(copiedData, externalSelectPointById, resize) {
		// we say 'ById' here because (external)id is all that the highchart will know. The main func can select by obj. identity, but highcharts doesn't know/care.
			return {
				chart: {
					renderTo: 'giving-chart',
					type: 'pie',
					backgroundColor: null,
					events: {
						load: resize
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
						data: copiedData,    // used to be: get data () { return $scope.organizations; },
						id: "giving-data",
						point: {
							events: {
								select: function(){
									externalSelectPointById(this.id);
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
    			.configTemplateMerge(hcSeriesData, externalSelectOrg, resizeHighchart);
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

    this.CategorizedGivingChart = {
    	Config: function(){},
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
    


    // figure out where to put this!!!

    function resizeHighchart() {

    	var chart = $("#giving-chart");
	    
	    var width = chart.parent().width();
	    var height = width;
		var doAnimation = false;
	    
	    chart.highcharts().setSize(height, width, doAnimation);
    }

	$(window).resize(resizeHighchart);
	$("#giving-chart").load(function(){alert("giving-chart loaded");resizeHighchart()} );
	$(window).resize(function(){alert("window resized");resizeHighchart()} );
	



















  }]);
