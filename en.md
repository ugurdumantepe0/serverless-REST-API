# Challenge

The Challenge consists of User Stories ultimately resulting in a **RESTful HTTP API** for querying 8select Challenges.

## User Stories

### Basic

**Story**

As an 8select IT Recruiter I would like to be able to query a list of 8select Challenges via the RESTful HTTP API.

**DOD**

- a list of challenges can be queried via the RESTful HTTP API
- a specific challenge can be queried via the RESTful HTTP API

### Filter

**Story**

As an 8select IT Recruiter I would like to quickly and easily find one or more challenges from the list of 8select Challenges by one of their attributes.

**DOD**

- a challenge can be queried by its name
- a challenge can be queried by its ID
- challenges can be queried by their rating being in a given range, e.g. `1> = rating <= 3.5`
- challenges can be queried by their difficulty

### Sort

**Story**

As an 8select IT Recruiter I would like to be able to sort Challenges in ascending or descending order by attribute.

**DOD**

- it can be sorted by date
- it can be sorted by name
- it can be sorted by rating
- it can be sorted by difficulty

## Challenge Database

The data for the API is available as JSON: `challenges.json`.
The `challenge-generator` folder contains the script that generated the data.

```
cd challenge-generator
yarn generate --help
```

### Data structure

| Feld        | Typ                                      |
| ----------- | ---------------------------------------- |
| id          | UUID v4                                  |
| name        | string                                   |
| rating      | float                                    |
| difficulty  | string - one of `easy`, `medium`, `hard` |
| description | string                                   |
| createdAt   | Date                                     |

## Conditions

- "Commit Often, Perfect Later, Publish Once"
- Create a branch and GitHub PR - see https://guides.github.com/introduction/flow/
- Use AWS Lambda - Node.js
- No framework such as express.js or other may be used
- 100% unit test coverage

## Recommendations

- Use TypeScript
- Use Serverless Framework for AWS

## AWS Access

Sign-in URL: https://8select-recruitment.signin.aws.amazon.com/console

## Usefull links

- https://serverless.com/framework/docs/
- https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
- https://docs.aws.amazon.com/lambda/latest/dg/programming-model.html
- https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html
