const { Genome, Client } = require('justneat')
const fs = require('fs')
const { getMatchInputs } = require('./utils')

const predictMatch = (predictorPath, match) => {
    const { inputsObject, expectedOutputsObject } = getMatchInputs(match);
    const genomeData = fs.readFileSync(predictorPath, 'utf-8')
    const client = new Client(Genome.FromJson(genomeData))
    const outputs = client.predict(Object.values(inputsObject))
    console.table({ outputs, expectedOutputsObject })
};

module.exports = predictMatch