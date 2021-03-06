var baseUrl = "http://localhost:8080/rest/default/ghbrly/v1/";

var url = baseUrl + "syncRallyArtifacts";
var authHeaders = {
    "headers":{"Authorization": "CALiveAPICreator TimerKey:1"}
};

/* Todo - Max has a better way to get the last time something ran */
var sinceDate = moment(new Date());
sinceDate.subtract(5,'minutes');

var params = {
    "lastRun":sinceDate.toISOString()
};
var resp = timerUtil.restGet(url,params,authHeaders);
log.debug('response ' + resp);
