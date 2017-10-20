if (req.verb === 'PUT' && req.resourceName === 'linkedObject'){
    var data = JSON.parse(json);
    var newData = [];
    for (var i=0; i<data.length; i++){
        newData.push({
            "github_id":data[i].number,
            "github_data":JSON.stringify(data[i]),
            "@metadata":{"action":"MERGE_INSERT", "key":"github_id"}
        });
    }
    json = JSON.stringify(newData); 
}
