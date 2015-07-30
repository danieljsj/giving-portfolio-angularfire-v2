


/ paradigm \ separation of concerns \ division of labor: /

	angular`s job is to receive, manipulate, and save data.

	the charts all do 2 things:
		display data 
			(format not yet explicitly known)
			(data put in by )
		allow user to select an organization by click/touch on slice 
			(requires access to $scope)



/ services: /

	givingChart
		private 
			configTemplate (data is empty array)

		public
			paradigm 1: give it the big object
				create/construct($scope)
				refresh()
					click: select matching $scope.orgs
			paradigm 2: give it minimal data
				create/construct(data, $scope.selectOrgById / externalSelector) //good; it doesn't need to know things about scope, and really, scope doesn't need to know about it.
				refresh(data) //dece; it doesn't need to know about the scope; the scope does need to know about it. hmm. inverted dependence; neither should need to know about either. maybe there should be a middleman
					click: fire externalSelector on point.externalId.

	portfolioCatgorizedPie / givingDrilldownDonutChart



/ usage: /

$scope.orgs = gpOrgsManager.getOrgs();

// FLAT:
// 
// Chart Info Setup
// - flat
$scope.givingChartInfo = new gpChartInterfaces.FlatChart.Info(
	$scope.orgs, '$id', 'portion'
);

// Chart Config
// - flat
$scope.givingChartConfig = new gpHighcharts.GivingChart.Config(
	$scope.givingChartInfo,
	$scope.orgs.selectOrg
);


// // Chart Setup
$scope.givingChart = new Highcharts.Chart($scope.givingChartConfig);

$scope.givingChart.controls = new gpChartInterfaces.PieChart.Controls(
	new gpHighCharts.PieChart.Controls();
); /* $scope.givingChart.controls.bind($scope.givingChart); // <=maybe */

// interfce



$scope.$watch(
	'orgs', 
	function (newVal, oldVal) { 
		$scope.givingChart.series[0].setData(
			new gpChartInterfaces.FlatChartInfo(
				$scope.orgs, '$id', 'portion'
			);
		);
	}, 
	true // deep watch; http://stackoverflow.com/a/14713978
);



// // TAXONOMIZED:
// 
// // Chart Info Setup
// $scope.currentTaxonomy = 'locality';
// $scope.categorizedGivingChartInfo = new gpChartInterfaces.CategorizedChartInfo(
// 	$scope.orgs, '$id', 'portion', 'categorizations.'+$scope.currentTaxonomy
// );
// // Chart Config Setup
// $scope.categorizedGivingChartConfig = new gpHighcharts.CategorizedGivingChart(
// 	$scope.categorizedGivingChartInfo,
// 	$scope.orgs.selectOrg
// );
// // Chart Setup
// $scope.categorizedGivingChart = new Highcharts.Chart($scope.categorizedGivingChartConfig);

// will neede something for deselect / deselect all... 

/ service:  gpOrgsManager /

gpOrgsManager{
	getOrgs() ... if we have the orgs, return them. if we do not, load them, then return them.
	loadOrgs(query) // query may be implied, hardcoded, who knows.
}

controller: gpBasicPortfolio .... $scope, Ref, $firebaseArray, $timeout, gpChartInterfaces,

outputted objects should look like this:

	orgsCollection{
		...
		firebasestuff{},
		...
		normalize {
			set portions to total 100, rounded by greatest remainder
		},
		newOrgAtts: {...},
		addOrg(){
			this.$add(newOrgAtts);
		}, // needed as a values-adding wrapper for $add
		getOrg(orgOrId){
			if id, loop and return one with matching id. if org-esque ob, return it
		},
		selectOrg(orgOrId){
			this.selectedOrg = getOrg(orgOrId);
		},
		incrementOrgPortion(org, delta){
			org.portion += delta;
			// anything else? i don't think so, because our deep-watch will trigger an update for the chart. and yes, we even want the chart to update with each keystroke in the name field, because that 
		}
	}
	org{
		...
		// incrementPortion(delta){ this.portion += delta; }  no... we can't trust the array elements to have functions.
		// save(){ this.parentCollection.$saveOrg(this); } // or we could just bind everything all the time for more convenient code...
		// select(){ this.parentCollection.selectOrg(this); } nope. we can't trust the array elements to have functions. cuz firebase makes them on the fly.
	}
	// not sure whether to do it by setting this as protoype... do the things already have prototypes?
	// if there's already a prototype thing... no, we don't want to go make all firebasearrays have org info! 
	// so looks like for now we'll just be adding the properties, direct, and looping. can play with optimizing later if desired.

so the gpOrgsManager needs to strap all that good stuff on... WAIT... when!?



/ service: gpChartInterfaces /

FlatChartInfo:
	accepts, saves, returns ob with:
		points
		valueSelectorString
		idSelectorString

CategorizedChartInfo
	accepts, saves, returns ob with:
		points
		valueSelectorString
		idSelectorString
		categorySelectorString


highchartDeselectAllPoints: function(){
	for (var i = this.series.length - 1; i >= 0; i--) {
		for (var j = this.series[i].length - 1; j >= 0; j--) {
			this.series[i].data[j].select(false); // if the this's arent being the givingChart, we can do a .bind(givingChart)
		};
	};
},
// highchartShiftSelection: function(shift){

// }



var deselectChartPoints;

$scope.givingChart.deselectAll = gpChartInterfaces.highchartDeselectAllPoints;

ng-click="givingChart.deselectAll"



/ service: gpObjectUtils /

function fetchFromObject(obj, selector) {

	// null case
    if ( typeof obj === 'undefined' ) {
        return false;
    }

    // dot-notation case
    var _index = selector.indexOf('.')
    if(_index > -1) {
    	var deeperObj = obj[selector.substring(0, _index)];
    	var newSelector = selector.substr(_index + 1);
        return fetchFromObject(deeperObj, newSelector);
    }
    
    // string case (must appear after dot-notation case, which triggers the recursion!)
	if ( typeof selector === 'string' ) {
        return obj[selector];
    }

    // array case
    if ( typeof selector === 'array' ) {
    	if ( selector.length === 1 ) {
    		return obj[selector[0]];
    	}
    	else {
    		deeperObj = obj[selector[0]];
    		selector.splice(0,1);
    		newSelector = selector;
    		return fetchFromObject( deeperObj, newSelector );
    	}
    }
}



/ service: gpChartsConfigs /

	lots of fun


