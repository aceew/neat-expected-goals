const fs = require('fs')
const { outputFolder, inputsData } = require('../models/config')

const getMatchInputs = (match) => {
    const inputsObject = {}
    Object.keys(inputsData).forEach((key) => {
        if (key === 'homePossession') {
            inputsObject[key] = match.team_a_possession / 100
        } else {
            inputsObject[key] = match[inputsData[key]]
        }
    });

    const expectedHomeXG = match.team_a_xg
    const expectedAwayXG = match.team_b_xg

    return {
        inputsObject,
        expectedOutputsObject: {
            expectedHomeXG,
            expectedAwayXG
        }
    }
}

const init = () => {
    const dirExists = fs.existsSync(outputFolder)
    if (!dirExists) fs.mkdirSync(outputFolder)
}

const dataCache = {}
const getData = (dataPath) => {
    if (dataCache[dataPath] == undefined) dataCache[dataPath] = (require(dataPath)).data;
    return dataCache[dataPath].slice(0)
}


const getFileNames = accuracy => {
    const testCaseName = `${Object.keys(inputsData).join('_')}`
    const networkFilename = `${outputFolder}/${testCaseName}_network.json`
    const resultFilename = `${outputFolder}/${testCaseName}_${accuracy}_result.json`
    return { networkFilename, resultFilename }
}

module.exports = { getMatchInputs, init, getData, getFileNames }