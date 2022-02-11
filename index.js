const Neat = require('justneat');
const Genome = require('justneat/models/neatGenome')
const Client = require('justneat/models/client')

const fs = require('fs');
const data = require('./data/2019.json');
const outputFolder = "./output"

const getMatchInputs = (match) => {
  const homePossession = match.team_a_possession / 100
  const homeAttacks = match.team_a_attacks
  const awayAttacks = match.team_b_attacks
  const homePrematchXG = match.team_a_xg_prematch
  const awayPrematchXG = match.team_b_xg_prematch
  const homePrematchPPG = match.pre_match_home_ppg
  const awayPrematchPPG = match.pre_match_away_ppg

  const expectedHomeXG = match.team_a_xg
  const expectedAwayXG = match.team_b_xg

  return {
    inputs: {
      homePossession,
      homeAttacks,
      awayAttacks,
      homePrematchXG,
      awayPrematchXG,
      homePrematchPPG,
      awayPrematchPPG,
    },
    expectedOutputs: {
      expectedHomeXG,
      expectedAwayXG
    }
  }
}

const run = () => {
  let neat;
  const { inputs: inputObject, expectedOutputs} = getMatchInputs(data.data[0])

  const expected = Object.values(expectedOutputs)
  const inputs = Object.values(inputObject)
  const expectedOutputLength = expected.length
  const accuracy = 0.01

  const testCaseName = `${Object.keys(inputObject).join('_')}_${expectedOutputLength}_${accuracy}`
  const networkFilename = `${outputFolder}/${testCaseName}_network.json`
  const resultFilename = `${outputFolder}/${testCaseName}_result.json`

  const isExisting = fs.existsSync(networkFilename)

  if (isExisting) {
    const existingData = fs.readFileSync(networkFilename, 'utf-8')
    neat = Neat.FromJson(existingData)
  } else {
    neat = new Neat(inputs.length, expectedOutputLength)
  }

  const best = neat.trainData([[inputs, expected]], accuracy, true)
  const networkData = neat.toJson()
  fs.writeFileSync(networkFilename, networkData)
  fs.writeFileSync(resultFilename, best.client.genome.toJson())
};

const predictMatch = () => {
  // TODO parametise match data
  const { inputs: inputObject, expectedOutputs } = getMatchInputs(data.data[0])

  // TODO generate on the go
  const genomeData = require('homePossession_homeAttacks_awayAttacks_homePrematchXG_awayPrematchXG_homePrematchPPG_awayPrematchPPG_2_0.01_result.json')
  const client = new Client(Genome.FromJson(genomeData))
  const outputs = client.predict(Object.values(inputObject))
  console.table({ outputs, expectedOutputs })
};

// run();

predictMatch();