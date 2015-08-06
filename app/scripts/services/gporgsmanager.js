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

			// this.$add({portion:0, name:''}).then(this.selectOrg);

			this.$add({portion:0, name:''}).then(function(ref) {
			  // var id = ref.key();
			  // console.log("added record with id: "); console.log( id );
			  // console.log("org's index in array: "); console.log( this.$indexFor(id) );
			  // // this.selectOrg(id);
			  // console.log("ref: "); console.log(ref);
			  this.selectOrg(ref);
			}.bind(this));

		},
		selectOrg: function(orgRep){
			var org = this.getOrg(orgRep)
			console.log("about to select this org: ", org); // todo: debug: sometimes no org selected? oddly, it selected only when I had this console.log up???
			this.selectedOrg = org;
			// $scope.givingChart.series[0] ... nonono... make it a method of the highchart
			this.saveOrgsChanges(this); // todo: save only the one org.
		},
		selectNext: function(){
			if ( ! this.selectedOrg ){
				this.selectOrg(this[0]);
			}
			else {
				this.selectOrg(this[this.indexOf(this.selectedOrg)+1]);
			}
		},
		selectPrev: function(){
			if ( ! this.selectedOrg ){
				this.selectOrg(this[this.length-1]);
			}
			else {
				this.selectOrg(this[this.indexOf(this.selectedOrg)-1]);
			}
		},		// not in use yet:
		// getSelectedOrgIndex: function(){
		// 	return this.$indexFor(this.selectedOrg.$id);
		// }
		getOrg: function(orgRep){
			var orgId = this.getOrgId(orgRep)
			// for (var i = this.length - 1; i >= 0; i--) { // POSSIBLE PROBLEM: IT'S POSSIBLE THAT THE
			// 	if(orgRep == this[i].$id){
			// 		return this[i];
			// 	}
			// };
			console.log("orgId returned to getOrg: ", orgId);
			return this.$getRecord(orgId);
		},
		getOrgId: function(orgRep){

			console.log('getting id for org with the following representation: ',orgRep);

			if ('number' === typeof orgRep)
				return this[orgRep].$id; // for performance, this could go up a level, into selectOrg, since this requires coverting index to id, which then will be used to get an index...

			if ('string' === typeof orgRep)
				return orgRep;

			if (orgRep.$id)
				return orgRep.$id;

			// TODO/QN/FAIL-LESSON: obs' prototypes aren't always visible if the ob is passed into another func??? compare to this.addOrg, and doc: https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-addnewdata ... WAIT, IT'S TOTALLY WORKING... I must have just typed something funny?
			if (orgRep.key) {
				console.log("found orgRep.key");
				return orgRep.key(); 
			}
			// if (orgRep.prototype.key){ // TypeError: Cannot read property 'key' of undefined
			// 	console.log("found orgRep.prototype.key");
			// 	return orgRep.key();
			// } 
			
			console.log(orgRep); throw Error("gpError: getOrgId does not support the layout of the incoming variable");
		},
		incrementOrgPortion: function(org, delta){
			// TODO: if ( 0 <= org.portion + delta ) {  
			org.portion += delta;
			// } else {
			// 	alert("Giving for an organization cannot be less than 0!")
			// }
			// anything else? i don't think so, because our deep-watch will trigger an update for the chart. and yes, we even want the chart to update with each keystroke in the name field, because that allows the highchart slice names to update realtime.
		},
		getOrgGivingCoefficient: function(org){
			var totalPortions = 0;
			for (var i = this.length - 1; i >= 0; i--) {
				totalPortions += this[i].portion;
			};
			return ( org.portion / totalPortions );
		},
		saveOrgsChanges: function(newOrgs, oldOrgs){ // this really needs to be in orgsmanager!
			for (var i = newOrgs.length - 1; i >= 0; i--) {
				// if (! angular.equals( newOrgs[i], oldOrgs.getOrg( newOrgs[i].id ) ) ){
					newOrgs.$save(newOrgs[i]);
				// }
			}
		},
		/// maybe this should be in givingChart.controls?
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
    
    this.taxonomies = [
    	{}
    ];


  }]);
