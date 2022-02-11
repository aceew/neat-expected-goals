class Team {
  constructor({ name, xg, xgAgainstOverall, homeXg, awayXg, homeXgAgainst, awayXgAgainst }) {
    this.name = name || '';
    this.xgOverall = xg || 0;
    this.xgAgainstOverall = xgAgainstOverall || 0;
    this.homeXg = homeXg || 0;
    this.awayXg = awayXg || 0;
    this.homeXgAgainst = homeXgAgainst || 0;
    this.awayXgAgainst = awayXgAgainst || 0;

    this.xgOverall10Match = 0;
  }
}