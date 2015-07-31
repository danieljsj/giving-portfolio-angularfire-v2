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
							distance: -30,
							color: 'white',
							// align: 'center', // nope; this is not text-align, it's alignment relative to the point.
							format: '<b>{point.name}</b><br/>{point.percentage:.1f} %',
							style: {
								// color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								// textAlign: "center" // nope; looks like it only accepts a few different params, and this ain't one. i'll try actual css.
							}
						},
						// center: ["50%","50%"],
						// size: "100%"
					}
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
    			.configTemplateMerge(hcSeriesData, externalSelectOrg);
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
    


    // TESTING:
    

    $(function () {
    $('#testHC').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                }
            }
        },
        series: [{
            name: "Brands",
            colorByPoint: true,
            data: [{
                name: "Microsoft Internet Explorer",
                y: 56.33
            }, {
                name: "Chrome",
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: "Firefox",
                y: 10.38
            }, {
                name: "Safari",
                y: 4.77
            }, {
                name: "Opera",
                y: 0.91
            }, {
                name: "Proprietary or Undetectable",
                y: 0.2
            }]
        }]
    });
});
    




















  }]);
