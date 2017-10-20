var baseUrl = "http://localhost:8080/rest/default/ghbrly/v1/";

var url = baseUrl + "rally";
var authHeaders = {
    "headers":{"Authorization": "CALiveAPICreator GdoHMz3k15YhvuqVuDVB:1"}
};

var urlParams = JSON.parse(req.urlParameters) || {};

if (!urlParams.lastRun){
    throw("Please provide last run date.");
}

var params = {
    "objectType":"HierarchicalRequirement",
    "query": '(LastUpdateDate > "' + urlParams.lastRun + '")',
    "fetch":"ObjectUUID,ScheduleState"
};

var queryResult = SysUtility.restGet(url, params, authHeaders);
queryResult = JSON.parse(queryResult);

var results = queryResult && queryResult.QueryResult && queryResult.QueryResult.Results || [];
log.debug('results count: ' + results.length);

var updates = 0;
for (var i=0; i<results.length; i++){
    var params = {
        "sysfilter":"equal(ac_id:'" + results[i].ObjectUUID + "')"
    };
   var match = SysUtility.getResource('linkedObject',params);
   var githubId = null;
   if (match && match.length > 0){
       /* there should only be one */
       githubId = match[0].github_id;
   }
   
   /* This is where there could be more efficient refactoring to 
      figure out which fields to update 
      */ 
   var state="open";
   if (results[i].ScheduleState === "Accepted"){
        state="closed";  
   } 
   
   if (githubId){
       var payload = {
           "id":githubId,
           "state": state 
       };
       try {
            var resp = SysUtility.restPost(baseUrl + 'githubIssue', null, authHeaders, payload);
            log.debug('resp ' + resp); 
            updates++;
       } catch (e){
          log.error('ERROR updating github id ' + githubId + ': ' + e); 
       }
      
   }
}
return {"message": updates + " updates made."};

