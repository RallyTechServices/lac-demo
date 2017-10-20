# lac-demo
Instructions for creating a basic Github - Rally PROTOTYPE integration using Live API Creator Demo

Please see (https://github.com/RallyTechServices/lac-demo/blob/master/lac-demo.pdf) for integration details 

## prerequisites
Please see (https://github.com/RallyTechServices/lac-demo/blob/master/lac-demo.pdf) for prerequisites

## Build Steps
1.  Enable moment.js in API Properties > System Libraries 
2.  Create Object Link table with the following fields:
      - ac_id (string - 100)
      - github_id (string - 100)
      - github_data (text) 
3.  Create and Test github JAVASCRIPT RESOURCE
      - will need to support GET and POST verbs 
      - see (https://developer.github.com/v3/issues/) for Github API Reference 
      - test in REST lab
4.  Create and Test rally JAVASCRIPT RESOURCE
      - will need to support GET and POST verbs 
      - see (https://rally1.rallydev.com/slm/doc/webservice/) for Rally API Reference 
      - test in REST lab
5.  Create linkedObject TABLE Resource:
      - select github_id field as a key 
6.  Create Request Event for linkedObject to support Merge insert for updates 
7.  Create syncGithubIssues JAVASCRIPT Resource as the "controller"/business rules for creating github issues as rally stories 
8.  Create INSERT rule on linked_object table to insert new issues as Rally User Stories
9.  Create syncRallyArtifacts JAVASCRIPT Resource as the "controller" for updating issue status in github from Rally status updates 
10 . Create the TIMER for syncGithubIssues
11.  Create the TIMER for syncRallyArtifacts 

 
 
