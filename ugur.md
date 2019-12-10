# v1.0 Notes


The APIs specified in the README file are implemented and a table created in DynamoDB for the challenges data provided.
There is also a script for uploading the data into dynamodb and a Postman collection to import the APIs into it for sending requests easily.
Here are the the endpoints for each API if you want to use curl or any other method:

  getSingleChallengeByID: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/basic/getSingleChallengeByID/{id}

  getAllChallenges: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/basic/getAllChallenges

  filterByID: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/filter/filterByID/{id}

  filterByName: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/filter/filterByName/{name}

  filterByDifficulty: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/filter/filterByDifficulty/{difficulty}

  filterByRating: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/filter/filterByRating/{ratingRange}

  sortByName: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/sort/sortByName/{sortOrder}

  sortByRating: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/sort/sortByRating/{sortOrder}

  sortByDifficulty: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/sort/sortByDifficulty/{sortOrder}

  sortByCreationDate: GET - https://7zm9z2eki1.execute-api.us-east-2.amazonaws.com/dev/stories/sort/sortByCreationDate/{sortOrder}

  Additional notes: 
  
  1- filterByRating accepts a rating range of numbers seperated by a "-" 

  2- filterByDifficulty accepts parameters "easy", "medium" or "hard".

  3- All sort APIs accept "ascending" or "descending" as a parameter.


  TODOS:

  1- sort procedues are handled in the code rather than being handled in dynamodb side. dynamodB.scan method reads the entire table and it will use most of the rad capacity for real size tables. consedering the size of the table handling the filtering on the dynamDB side is an option if possible

  2- APIs for adding, updating, deleting challenges to dynamoDB can be implemented in the future.

  3- Better error handling

  4- Better and more detailed logging