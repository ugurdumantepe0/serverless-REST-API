'use strict';

const AWS = require('aws-sdk');
const helper = require('../../helperFunctions');
const dynamoDb = new AWS.DynamoDB();

module.exports.filterByRating = (event, context, callback) => {
    // here the rating range is splitted into it's lower and upper bound by the "-" in between them
    const ranges = helper.rangeSplitter(event.pathParameters.ratingRange);
    var params = {
    TableName: process.env.challengesTable,
    ExpressionAttributeValues: {
      ':ratingLowerBound' : {N: ranges[0]},
      ':ratingUpperBound' : {N: ranges[1]}
    },
    FilterExpression: 'rating BETWEEN :ratingLowerBound  AND :ratingUpperBound',
  };
  
  // if the order of ranges is entered wrong simply reassign the bounds accordingly
  if ( Number(ranges[0]) > Number(ranges[1])) {
    params.ExpressionAttributeValues = {
      ':ratingLowerBound' : {N: ranges[1]},
      ':ratingUpperBound' : {N: ranges[0]}
    };
  }

  // filter the database with the input range of rating
  dynamoDb.scan(params, (error, result) => {
    // Check if rating ranges are numbers, return error if not
    if (isNaN(ranges[0]) || isNaN(ranges[1]) ) {
        console.error('The input ranges are not numbers');
      callback(null, {
        headers: { 'Content-Type': 'text/plain' },
        body: 'Rating ranges are not acceptable numbers',
      });
      return;
    }
    // error if there is no item with the input rating range
    if(helper.isEmpty(result.Items)){
      console.error('No challenges found with in this rating range');
      callback(null, {
        headers: { 'Content-Type': 'text/plain' },
        body: 'No challenges found in this rating range',
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