var baseUrl = "http://localhost:8080/rest/default/ghbrly/v1/";

var url = baseUrl + "githubIssue";
var authHeaders = {
    "headers":{"Authorization": "CALiveAPICreator gitrlyAdminKey:1"}
};

var lastRun = '';

var params = {
    "since": lastRun,
    "filter":"all",
    "state":"open"
};

var recent_issues = SysUtility.restGet(baseUrl + 'githubIssue', params, authHeaders);
recent_issues = JSON.parse(recent_issues);

if (recent_issues && recent_issues.length > 0){
    /* this will do a merge insert so it will insert new ones only */
    var objectLinkUrl = baseUrl + "github_object";
    SysUtility.restPut(objectLinkUrl,{},authHeaders,recent_issues);
} 
log.debug(recent_issues.length + ' issues found.');
