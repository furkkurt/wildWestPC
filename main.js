var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 450,
        scale: {
          mode: Phaser.Scale.FIT,
        },
				physics: {
					default: "arcade",
					arcade: {debug: false}
				},
        scene: [preloader, mapSelector, map1],
				pixelArt: false
    };

var game = new Phaser.Game(config);
