'use strict';

const AWS = require('aws-sdk');
const helper = require('../../helperFunctions');
const dynamoDb = new AWS.DynamoDB();

module.exports.filterByName = (event, context, callback) => {
    // parameters for dynamoDB to do the search and filtering accordingly
    const params = {
    TableName: process.env.challengesTable,
    ExpressionAttributeValues: {
      ':name' : {S: helper.strReplace(event.pathParameters.name, "%20", " ")}
    },
    // we need to assign name to something because it's a keyword in DynamoDB and it's not allowed to use as it is
    ExpressionAttributeNames: {
      "#n": "name"
    },
    FilterExpression: 'contains (#n, :name)'
  };
  // filter the database with the input name
  dynamoDb.scan(params, (error, result) => {
    // error if there is no item with the input name
    if(helper.isEmpty(result.Items)){
      console.error('No challenges found with this name');
      callback(null, {
        headers: { 'Content-Type': 'text/plain' },
        body: 'No challenges found with this name',
      });
      return;
    }
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not get the challenge',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};