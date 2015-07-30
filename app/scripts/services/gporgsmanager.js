'use strict';

/**
 * @ngdoc service
 * @name angularfire2App.gpOrgsManager
 * @description
 * # gpOrgsManager
 * Service in the angularfire2App.
 */
angular.module('angularfire2App')
  .service('gpOrgsManager', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getOrgs = function(){
    	
    	var query = Ref.child('organizations').limitToLast(100);
    	var orgsFbArray = $firebaseArray(query);

    	orgsFbArray.$loaded(
    		asOrgsCollection.bind(orgsFbArray) // if I don't mind letting my controller know about the service, I can just have the controller do the $loaded(asOrgsCollection) thing
    	).error(alert);

    };

    function asOrgsCollection(obj) {
    	angular.extend(obj,OrgsCollection);
    }
    
	var OrgsCollection = {

		newOrgAtts: {portion:0},

		normalize: function() {
			// TODO: set portions to total 100, rounded by greatest remainder
		},

		addOrg: function(){
			this.$add(this.newOrgAtts);
		}, // needed as a values-adding wrapper for $add

		getOrg: function(orgOrId){
			// TODO: if id, loop and return one with matching id. if org-esque ob, return it
			if ('string' == typeof(orgOrId)){
				for (var i = this.length - 1; i >= 0; i--) { // POSSIBLE PROBLEM: IT'S POSSIBLE THAT THE
					this[i]
				};
			}
		},
		selectOrg: function(orgOrId){
			this.selectedOrg = getOrg(orgOrId);
			// todo: what about when it's null?
		},
		incrementOrgPortion: function(org, delta){
			org.portion += delta;
			// anything else? i don't think so, because our deep-watch will trigger an update for the chart. and yes, we even want the chart to update with each keystroke in the name field, because that allows the highchart slice names to update realtime.
		},
		saveOrgsChanges: function(newOrgs, oldOrgs){ // this really needs to be in orgsmanager!
			for (var i = newOrgs.length - 1; i >= 0; i--) {
				if (! angular.equals( newOrgs[i], oldOrgs.getOrg( newOrgs[i].id ) ) ){
					newOrgs.$save(newOrgs[i]);
				}
			}
		},
		/// maybe this should be in gpHighcharts.controls?
		highchartDeselectAllPoints: function(){
			for (var i = this.series.length - 1; i >= 0; i--) {
				for (var j = this.series[i].length - 1; j >= 0; j--) {
					this.series[i].data[j].select(false); // if the this's arent being the givingChart, we can do a .bind(givingChart)
				};
			};
		}
		// , highchartShiftSelection: function(shift){

	}

  });