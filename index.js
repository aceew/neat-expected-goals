const Neat = require('justneat');
const Genome = require('justneat/models/neatGenome')
const Client = require('justneat/models/client')

const fs = require('fs');
const data = require('./data/2019.json');
const outputFolder = "./output"

const inputsData = {
  homePossession: 'team_a_possession',
  homeAttacks: 'team_a_attacks',
  awayAttacks: 'team_b_attacks',
  homePrematchXG: 'team_a_xg_prematch',
  awayPrematchXG: 'team_b_xg_prematch',
  homePrematchPPG: 'pre_match_home_ppg',
  awayPrematchPPG: 'pre_match_away_ppg',
}

const accuracy = 0.160
const expectedOutputLength = 2
const testCaseName = `${Object.keys(inputsData).join('_')}_${expectedOutputLength}_${accuracy}`
const networkFilename = `${outputFolder}/${testCaseName}_network.json`
const resultFilename = `${outputFolder}/${testCaseName}_result.json`

const gameCount = 5

const getMatchInputs = (match) => {
  const inputs = {}
  Object.keys(inputsData).forEach((key) => {
    if (key === 'homePossession') {
      inputs[key] = match.team_a_possession / 100
    } else {
      inputs[key] = match[inputsData[key]]
    }
  });

  const expectedHomeXG = match.team_a_xg
  const expectedAwayXG = match.team_b_xg

  return {
    inputs,
    expectedOutputs: {
      expectedHomeXG,
      expectedAwayXG
    }
  }
}

const run = () => {
  let neat;

  const testMatchData = data.data.slice(0, gameCount).map((match) => {
    const { inputs, expectedOutputs} = getMatchInputs(match)
    return [Object.values(inputs), Object.values(expectedOutputs)]
  })

  const isExisting = fs.existsSync(networkFilename)

  if (isExisting) {
    const existingData = fs.readFileSync(networkFilename, 'utf-8')
    neat = Neat.FromJson(existingData)
  } else {
    neat = new Neat(testMatchData[0][0].length, expectedOutputLength)
  }

  const best = neat.trainData(testMatchData, accuracy, true)
  const networkData = neat.toJson()
  fs.writeFileSync(networkFilename, networkData)
  fs.writeFileSync(resultFilename, best.client.genome.toJson())
};

const predictMatch = () => {
  // TODO parametise match data
  const { inputs: inputObject, expectedOutputs } = getMatchInputs(data.data[0])

  // TODO generate on the go
  const genomeData = require(resultFilename)
  const client = new Client(Genome.FromJson(JSON.stringify(genomeData)))
  const outputs = client.predict(Object.values(inputObject))
  console.table({ outputs, expectedOutputs })
};

// run();

predictMatch();