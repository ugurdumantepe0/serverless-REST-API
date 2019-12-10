'use strict';

const AWS = require('aws-sdk');
const helper = require('../../helperFunctions');
const dynamoDb = new AWS.DynamoDB();

module.exports.filterByDifficulty = (event, context, callback) => {
  const params = {
    TableName: process.env.challengesTable,
    ExpressionAttributeValues: {
      ':difficulty' : {S: event.pathParameters.difficulty}
    },
    FilterExpression: 'contains (difficulty, :difficulty)',
  };

  // filter the database with the input difficulty
  dynamoDb.scan(params, (error, result) => {
    // error if there is no item with the input difficulty
    if(helper.isEmpty(result.Items)){
      console.error('No challenges found with this difficulty');
      callback(null, {
        headers: { 'Content-Type': 'text/plain' },
        body: 'No challenges found with this difficulty',
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