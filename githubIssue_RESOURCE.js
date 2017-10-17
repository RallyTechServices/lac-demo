var org = "SomeOrgOrUser",
    repo = "MyRepoName",
    headers = {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'myusername',
            'Authorization': 'Basic base64encodedUsername:Password' 
        }
    }; 

var githubIssueBase = 'https://api.github.com/repos/' + org + '/' + repo + '/issues';

/* TODO - Validate that these are parameters that the GitHub API expect */
var params = JSON.parse(req.urlParameters);
if (req.verb === 'GET'){
    var resp = SysUtility.restGet(githubIssueBase,params,headers);
    return JSON.parse(resp);
}


if (req.verb === 'POST'){
    var data = JSON.parse(req.json);
    var id = data.id;
    if (!id){
        throw ('id parameter required for POST.')
    }
    var resp = SysUtility.restPatch(githubIssueBase + '/' + id, null, headers, data);
    return JSON.parse(resp);
} 

return {};



