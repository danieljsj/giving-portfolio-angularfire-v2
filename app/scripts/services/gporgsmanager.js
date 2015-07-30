'use strict';

/**
 * @ngdoc service
 * @name angularfire2App.gpOrgsManager
 * @description
 * # gpOrgsManager
 * Service in the angularfire2App.
 */
angular.module('angularfire2App')
  .service('gpOrgsManager', ['Ref', '$firebaseArray', function (Ref, $firebaseArray) {
    // AngularJS will instantiate a singleton by calling "new" on this function


	var orgsFuncs = {

		normalize: function() {
			// TODO: set portions to total 100, rounded by greatest remainder
		},

		addOrg: function(){
			var newOrg = {portion:0, name:''};
			
			this.$add(newOrg);
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
			console.log(this);
			this.selectedOrg = this.getOrg(orgOrId);
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
		// , highchartShiftSelection: function(shift){}
	}

    this.getOrgs = function(saveToScopeOrgsThenInit){
    	
    	// console.log($firebaseArray); // yup
    	var query = Ref.child('organizations').limitToLast(100);

    	//https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-loaded
		var orgs = $firebaseArray(query);
		orgs.$loaded()
		  .then(function(loadedOrgs) {
		    if (loadedOrgs === orgs ){
				for (var funcName in orgsFuncs){
					orgs[funcName] = orgsFuncs[funcName].bind(orgs);
				}		    	
		    	// angular.extend(orgs,OrgsCollectionFuncs); // "this", I believe, was pointing to the "var OrgsCollectionFuncs = {}" object; so not going to do the extending here.
		    	saveToScopeOrgsThenInit(orgs);
		    }
		  })
		  .catch(function(error) {
		    console.log("Error:", error);
		  });
		}

    	// orgsFbArray.$loaded().catch(function(err) { console.error(err); });
    	
    	// not even sure I need that ..
    	// 
    	// 
  //   	orgsFbArray.$loaded( // $   // $loaded() 	Returns a promise which resolves after the initial records have been downloaded from our database. This is only called once and should be used with care. See Extending the Services for more ways to hook into server events. 
  //   		asOrgsCollection.bind(orgsFbArray) // if I don't mind letting my controller know about the service, I can just have the controller do the $loaded(asOrgsCollection) thing
  //   	).catch(function(err) {
		//    console.error(err);
		// });
    


  }]);
