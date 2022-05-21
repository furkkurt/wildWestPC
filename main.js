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
      debug: true
    }
  },
  scene: [preloader, town, horseRace, bottleShootin, duello, tavern, blackjack, barn, mapSelector, map1, map2, scoreboard, ridersChase, prologue, prologue2],
  pixelArt: true
};

var game = new Phaser.Game(config);
