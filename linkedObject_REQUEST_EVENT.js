if (req.verb === 'PUT' && req.resourceName === 'github_issue'){
    var data = JSON.parse(json);
    var newData = [];
    for (var i=0; i<data.length; i++){
        //Add any additional fields to save to resource here.  
        newData.push({
            "id":data[i].number,
            "name": data[i].name,
            "@metadata":{"action":"MERGE_INSERT", "key":"id"}
        });
    }
    json = JSON.stringify(newData); 
}
