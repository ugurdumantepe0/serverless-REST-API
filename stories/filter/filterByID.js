'use strict';

const AWS = require('aws-sdk');
const helper = require('../../helperFunctions');
const dynamoDb = new AWS.DynamoDB();

// todo fix the api returning all items including the id as a string in it's id
module.exports.filterByID = (event, context, callback) => {
   // parameters for dynamoDB to do the search and filtering accordingly
   const params = {
    TableName: process.env.challengesTable,
    ExpressionAttributeValues: {
      ':id' : {S: event.pathParameters.id}
    },
    FilterExpression: 'contains (id, :id)',
  };

  // filter the database with the input ID
  dynamoDb.scan(params, (error, result) => {
    // error if there is no item with the input ID
    if(helper.isEmpty(result.Items)){
      console.error('No challenges found with this id');
      callback(null, {
        headers: { 'Content-Type': 'text/plain' },
        body: 'No challenges found with this id',
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