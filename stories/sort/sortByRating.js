'use strict';

const AWS = require('aws-sdk'); 
const helper = require('../../helperFunctions');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: process.env.challengesTable,
};

var sortedChallenges = [];
module.exports.sortByRating = (event, context, callback) => {
  // get all challenges from the database
  dynamoDb.scan(params, (error, result) => {
    // do ascending order
    if (event.pathParameters.sortOrder === 'ascending') {
        sortedChallenges = helper.sortChallenges(result.Items, 'rating', 'asc');
    }
    // do descending order 
    else if (event.pathParameters.sortOrder === 'descending') {
        sortedChallenges = helper.sortChallenges(result.Items, 'rating', 'des');
    }
    else {
        console.error('not an accepted sortOrder');
        callback(null, {
        headers: { 'Content-Type': 'text/plain' },
        body: 'This is not an accepted sorting order',
      });
      return;
    }
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not get challenges',
      });
      return;
    }
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(sortedChallenges),
    };
    callback(null, response);
  });
};