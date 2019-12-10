'use strict';

const AWS = require('aws-sdk');
const helper = require('../../helperFunctions');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getSingleChallengeByID = (event, context, callback) => {
  console.log(event.pathParameters.id);
  const params = {
    TableName: process.env.challengesTable,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // get challenge from the database
  dynamoDb.get(params, (error, result) => {
    // error if there is no item with that ID
    if(helper.isEmpty(result.Item)){
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
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
