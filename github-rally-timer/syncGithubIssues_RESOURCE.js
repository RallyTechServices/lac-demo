var baseUrl = "http://localhost:8080/rest/default/ghbrly/v1/";

var url = baseUrl + "githubIssue";
var authHeaders = {
    "headers":{"Authorization": "CALiveAPICreator GdoHMz3k15YhvuqVuDVB:1"}
};
log.debug('urlParams' + req.urlParameters);
var urlParams = JSON.parse(req.urlParameters) || {};

if (!urlParams.lastRun){
    throw("Please provide last run date.");
}

var params = {
    "since": urlParams.lastRun,
    "filter":"all",
    "state":"open"
};

var recent_issues = SysUtility.restGet(baseUrl + 'githubIssue', params, authHeaders);
recent_issues = JSON.parse(recent_issues);

if (recent_issues && recent_issues.length > 0){
    /* this will do a merge insert so it will insert new ones only */
    var objectLinkUrl = baseUrl + "linkedObject";
    var resp = SysUtility.restPut(objectLinkUrl,{},authHeaders,recent_issues);
    return JSON.parse(resp);
} 
return {"message": "No Github Issues Found"}
