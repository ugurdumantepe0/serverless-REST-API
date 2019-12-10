# Challenge

Die Challenge besteht aus User Stories deren Lösung am Ende zu einer **RESTful HTTP API** für die Abfrage von 8select Challenges dient.

## User Stories

### Basic

**Story**

Als 8select IT Recruiter möchte ich eine Liste von 8select Challenges via RESTful HTTP API abfragen können.

**DOD**

- es kann eine Liste von Challenges via RESTful HTTP API abgefragt werden
- es kann eine bestimmte Challenge via RESTful HTTP API abgefragt werden

### Filtern

**Story**

Als 8select IT Recruiter möchte ich schnell und einfach aus der Liste von 8select Challenges eine oder mehrere Challenges an Hand eines Attributes finden.

**DOD**

- es kann eine Challenge an Hand des Namen abgefragt werden
- es kann eine Challenge an Hand der ID abgefragt werden
- es können alle Challenges für ein Rating zwischen x und y abgefragt werden, z.B. `1 >= rating <= 3.5`
- es können alle Challenges für eine Schwierigkeit abgefragt werden

### Sortieren

**Story**

Als 8select IT Recruiter möchte ich Challenges an Hand eines Attributs aufsteigend oder absteigend sortieren können.

**DOD**

- es kann nach Datum sortiert werden
- es kann nach Name sortiert werden
- es kann nach Rating sortiert werden
- es kann nach Schwierigkeit sortiert werden

## Challenge Database

Die Daten für die API sind als JSON verfügbar: `challenges.json`.
Im Ordner `challenge-generator` findet sich das Script welches die Daten generiert hat.

```
cd challenge-generator
yarn generate --help
```

### Daten-Struktur

| Feld        | Typ                                      |
| ----------- | ---------------------------------------- |
| id          | UUID v4                                  |
| name        | string                                   |
| rating      | float                                    |
| difficulty  | string - one of `easy`, `medium`, `hard` |
| description | string                                   |
| createdAt   | Date                                     |

## Rahmenbedingungen

- "Commit Often, Perfect Later, Publish Once"
- Erstelle einen branch und GitHub PR - see https://guides.github.com/introduction/flow/
- Nutze AWS Lambda - Node.js
- Es dürfen keine Framework wie express.js oder sonstige benutzt werden
- 100% Unit Test Abdeckung

## Empfehlungen

- Benutze TypeScript
- Benutze das Serverless Framework für AWS

## AWS Access

Sign-in URL: https://8select-recruitment.signin.aws.amazon.com/console

## Nützliche Links:

- https://serverless.com/framework/docs/
- https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
- https://docs.aws.amazon.com/lambda/latest/dg/programming-model.html
- https://docs.aws.amazon.com/lambda/latest/dg/deploying-lambda-apps.html
