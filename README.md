# NEAT Expected Goals Model

The purpose of this is to build a model that predicts match results. It will use historic data and a comparison of data points to predict which team will win a match based on current form of expected goals.

## Architecture of the model

1. Model per team. Always play team B against team A's network and then do the same vice versa to compare what each network believes the final score will be.
2. Use markov chains data to pass in historical data into probabilities over time