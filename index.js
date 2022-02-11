#!/usr/bin/env node

const cli = require('commander')
const { init, getData } = require('./functions/utils')
const { predict, train } = require('./functions')

init()

cli
    .version('0.0.1')
    .description('Predict xg with historical match data')

cli
    .command('predict <predictorPath> <matchDataPath> <matchIndex>')
    .alias('p')
    .description('Predicts match xg using model created during training')
    .action(function(predictorPath, matchDataPath, matchIndex, args) {
        const match = getData(matchDataPath)[matchIndex]
        predict(predictorPath, match)
    })

cli
    .command('train <dataPath>')
    .alias('t')
    .description('Trains a model using neat & specified training data')
    .option('-a, --accuracy <float>', 'specifies target loss (defaults to 0.03).')
    .option('-s, --startIndex <index>', 'specifies start index to use for training (defaults to 0).')
    .option('-e, --endIndex <index>', 'specifies end index to use for training (exclusive) (defaults to 10).')
    .option('-p, --print', 'add to print training progress')
    .action(function(dataPath, args) {
        if (args.accuracy == undefined) args.accuracy = 0.03
        else if (args.accuracy < 0.001) args.accuracy = 0.001
        else if (args.accuracy > 1) args.accuracy = 1

        if (args.startIndex == undefined) args.startIndex = 0
        else if (args.startIndex < 0) args.startIndex = 0

        if (args.endIndex == undefined) args.endIndex = 10
        else if (args.endIndex <= args.startIndex) args.endIndex = args.startIndex + 1

        if (args.print == undefined) args.print = false
        else args.print = true
        const data = getData(dataPath)
        train(data, args.accuracy, args.startIndex, args.endIndex, args.print)
    })

cli.parse(process.argv)