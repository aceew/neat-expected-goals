const { Neat } = require('justneat');
const fs = require('fs');
const { getMatchInputs, getFileNames } = require('./utils')

const train = (data, accuracy, startIndex, endIndex, print) => {
    let neat;
    const { networkFilename, resultFilename } = getFileNames()

    const testMatchData = data.slice(startIndex, endIndex).map((match) => {
        const { inputsObject, expectedOutputsObject } = getMatchInputs(match)
        return [Object.values(inputsObject), Object.values(expectedOutputsObject)]
    })

    const isExisting = fs.existsSync(networkFilename)
    if (isExisting) {
        const existingData = fs.readFileSync(networkFilename, 'utf-8')
        neat = Neat.FromJson(existingData)
    } else {
        neat = new Neat(testMatchData[0][0].length, 2, { maxPop: 2000, hyper: { cullRate: 0.8 } })
    }

    const best = neat.trainData(testMatchData, accuracy, print, (neat, loss, gen) => {
        const networkData = neat.toJson()
        fs.writeFileSync(networkFilename, networkData)
        fs.writeFileSync(resultFilename, neat.pop[0].genome.toJson())
        console.log('Saved network & best genome')
    })
    fs.writeFileSync(resultFilename, best.client.genome.toJson())
};

module.exports = train