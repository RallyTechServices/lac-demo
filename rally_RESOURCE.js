/* this expects the following parameters: 
    objectType (required) - the object type that is being retrieved, created or updated
    id (optional) - only required for an update
    fetch - fetch list for GET
    query - query for GET
    pagesize = pagesize for GET
    start = start index for GET (1-based),
    payload (for posts) that contains objectType and data
*/

var params = JSON.parse(req.urlParameters) || {},
    data = JSON.parse(req.json) || {};
/* Validate required parameters that the Rally API expects */


var objectType = params.objectType || data.objectType,
    headers = {
        headers: {
            'ZSessionID': '_MyAPIKey'
        }
    },
    project = '/project/69318792140'; /* project reference for where to create/search for the artifacts */

if (!objectType){
    throw ('objectType parameter required for rally resource.');
}

var rallyBase = 'https://rally1.rallydev.com/slm/webservice/v2.0/' + objectType;
log.debug('rallyBaseUrl ' + rallyBase);
/* TODO - Validate that these are parameters that the Rally API expects */
if (req.verb === 'GET'){
    var resp = SysUtility.restGet(rallyBase,params,headers);
    return JSON.parse(resp);
}

if (req.verb === 'POST'){
    var id = params.id;
    var data = JSON.parse(req.json),
        urlSuffix = '/';
    
    if (data.objectType){
        delete data.objectType; 
    }
    if (!id){
        /* then we are creating a story */
        urlSuffix += 'create';
        data.Project = project;  /* TODO: this is hardcoded and could be configurable someday*/
    } else {
        /* we are updating */
        urlSuffix += id;
    }
    var payload = {};
    payload[objectType] = data;
    log.debug('url suffix ' + urlSuffix + ' ' + JSON.stringify(data));
    var resp = SysUtility.restPost(rallyBase + urlSuffix, null, headers, payload);
    return JSON.parse(resp);
} 

return {};
