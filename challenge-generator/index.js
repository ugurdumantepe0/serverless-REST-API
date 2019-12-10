const faker = require('faker')
const fs = require('fs')
const yargs = require('yargs')

const generateChallenge = () => {
  return {
    id: faker.random.uuid(),
    name: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    rating: parseFloat(faker.finance.amount(1, 5, 2)),
    difficulty: faker.random.arrayElement(['easy', 'medium', 'hard']),
    description: faker.lorem.paragraphs(3),
    createdAt: faker.date.recent(),
  }
}

yargs
  .command({
    command: '$0',
    builder: y =>
      y.options({
        number: {
          type: 'number',
          describe: 'Number of challenges to generate',
          required: true,
          default: 42,
        },
      }),
    handler: ({ number }) => {
      let challenges = []
      for (let i = 1; i <= number; i++) {
        challenges.push(generateChallenge())
      }

      fs.writeFileSync('challenges.json', JSON.stringify(challenges))
    },
  })
  .help()
  .parse()
