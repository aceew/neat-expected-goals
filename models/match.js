const MINUTE = 60;
const matchMinutes = 90; // Average match lasts

// Average play of a game in seconds.
// Possession turn over, pass, shot on goal etc
const playDurationSeconds = 4;

const possiblePlays = [
  "SUCCESSFUL_PASS",
  "POSSESSION_TURNOVER",
  "GOAL"
]

class Match {
  constructor ({ homeTeam, awayTeam, neat }) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.currentPossession = this.homeTeam;
    this.neat = neat;
  }

  playMatch () {
    // TODO
    const playOpportunityCount = (matchMinutes * 60) / playDurationSeconds;

    for (const playIndex = 0; playIndex < playOpportunityCount; playIndex++) {
      this.getActivePlay();
    }
  }

  // Simulate the match minute by minute
  getActivePlay () {
    for (let i = 0; i < TOTAL; i++) {
      neat.setInputs(birds[i].inputss(pipes), i);
    }

    this.neat.feedForward();
  }
}