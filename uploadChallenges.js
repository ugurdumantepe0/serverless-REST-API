var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

var allChallenges = JSON.parse(fs.readFileSync('challenges.json', 'utf8'));

// read each challenge one by one and load it to DynamoDB
allChallenges.forEach(function(challenges) {
    var params = {
        TableName: "challenges",
        Item: {
            "id":  challenges.id,
            "name": challenges.name,
            "rating":  challenges.rating,
            "difficulty": challenges.difficulty,
            "description": challenges.description,
            "createdAt": challenges.createdAt
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add challenge", challenges.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", challenges.name);
       }
    });
});