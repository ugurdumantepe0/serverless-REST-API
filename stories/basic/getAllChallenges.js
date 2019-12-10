'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: process.env.challengesTable,
};

module.exports.getAllChallenges = (event, context, callback) => {
  // get all challenges from the database
  dynamoDb.scan(params, (error, result) => {
    // handle errors
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
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};