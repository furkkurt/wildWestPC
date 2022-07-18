var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [preloader, town, horseRace, bottleShootin, duello, tavern, blackjack, barn, mapSelector, map1, map2, scoreboard, preRidersChase, ridersChase, mancoDuel, preTrain, preTrain2, train, seqTrain, preBridge, preBridge2, bridge1, bridge2, bridge3, prologue, prologue2, prologue3, prologue4, ending1, ending2],
  pixelArt: true
};

var game = new Phaser.Game(config);
