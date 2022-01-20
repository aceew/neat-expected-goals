const NEAT = require('neat_net-js');
const populationSize = 100;

const dummyMatches = [
  {homeTeam: "West Brom", },
  {},
  {},
  {},
  {},
]

const run = () => {
  const config = {
    model: [
      { nodeCount: 5, type: "input" },
      { nodeCount: 2, type: "output", activationfunc: NEAT.activation.SOFTMAX }
    ],
    mutationRate: 0.1,
    crossoverMethod: NEAT.crossover.RANDOM,
    mutationMethod: NEAT.crossover.RANDOM,
    populationSize: populationSize
  }

  const neat = new NEAT(config);
  // for (let i = 0; i < creatureCount; i++) {
  //   neat.setInputs(ARRAY(INPUT_LAYER_NODE_COUNT), i);  // Set inputs for the creature indexed i.
  // }

  neat.predict()
};

run();