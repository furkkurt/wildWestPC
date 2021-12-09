class preloader extends Phaser.Scene {
  constructor() {
    super("boot");
  };
  preload(){
		this.load.image("ui", "/assets/mapSelector.png");
		this.load.image("bg", "/assets/BG.png");
    this.load.tilemapTiledJSON("map1", "assets/levels/map1.json");
		this.load.image("tile", "/assets/sheet.png");
		this.load.image("cross", "/assets/controller/cross.png");
		this.load.image("hidden", "/assets/controller/hidden.png");
		this.load.atlas("player", "assets/mr-brown.png", "assets/mr-brown.json");
		this.load.atlas("bloodJoe", "assets/bloodjoe.png", "assets/bloodjoe.json");
		this.load.atlas("blueHat", "assets/bluehat.png", "assets/bluehat.json");
		this.load.atlas("redHat", "assets/redhat.png", "assets/redhat.json");
		this.load.atlas("joeHorse", "assets/joehorse.png", "assets/joehorse.json");
		this.load.image("playerWanted", "assets/mr-brownWanted.png");
		this.load.image("bloodJoeWanted", "assets/bloodjoeWanted.png");
		this.load.image("blueHatWanted", "assets/bluehatWanted.png");
		this.load.image("redHatWanted", "assets/redhatWanted.png");
		this.load.image("joeHorseWanted", "assets/joehorseWanted.png");
		this.load.image("quoteBox", "assets/quote.png");
		this.load.audio("Spagetti", "assets/audio/spagettiWestern.mp3");
		this.load.audio("Tequila", "assets/audio/tequilaStarter.mp3");
		this.load.image("map1", "assets/map1.png");
		this.load.image("bullet", "assets/bullet.png");
		this.load.audio("shoot", "assets/audio/shoot.mp3");
		this.load.audio("reload", "assets/audio/reload.mp3")
		this.load.image("arrowSign", "assets/arrowSign.png");
	};
	create(){
		this.anims.create({key:"playerIdle", frameRate:1,frames:[{key:"player",frame:"1"}],repeat:0});
		this.anims.create({key:"bloodJoeIdle", frameRate:1,frames:[{key:"bloodJoe",frame:"1"}],repeat:0});
		this.anims.create({key:"blueHatIdle", frameRate:1,frames:[{key:"blueHat",frame:"1"}],repeat:0});
		this.anims.create({key:"redHatIdle", frameRate:1,frames:[{key:"redHat",frame:"1"}],repeat:0});
		this.anims.create({key:"joeHorseIdle", frameRate:1,frames:[{key:"joeHorse",frame:"1"}],repeat:0});
		this.anims.create({key:"playerShoot", frameRate:1,frames:[{key:"player",frame:"6"}],repeat:0});
		this.anims.create({
			key: "playerWalk",
			frameRate: 8,
			frames: [{key:"player",frame:"2"},{key:"player",frame:"3"},{key:"player",frame:"4"},{key:"player",frame:"5"}],
			repeat: -1
		});
		this.anims.create({
			key: "bloodJoeWalk",
			frameRate: 8,
			frames: [{key:"bloodJoe",frame:"2"},{key:"bloodJoe",frame:"3"},{key:"bloodJoe",frame:"4"},{key:"bloodJoe",frame:"5"}],
			repeat: -1
		});
		this.anims.create({
			key: "blueHatWalk",
			frameRate: 8,
			frames: [{key:"blueHat",frame:"2"},{key:"blueHat",frame:"3"},{key:"blueHat",frame:"4"},{key:"blueHat",frame:"5"}],
			repeat: -1
		});
		this.anims.create({
			key: "redHatWalk",
			frameRate: 8,
			frames: [{key:"redHat",frame:"2"},{key:"redHat",frame:"3"},{key:"redHat",frame:"4"},{key:"redHat",frame:"5"}],
			repeat: -1
		});	
		this.anims.create({
			key: "joeHorseWalk",
			frameRate: 6,
			frames: [{key:"joeHorse",frame:"2"},{key:"joeHorse",frame:"3"}],
			repeat: -1
		});
		this.scene.start("mapSelector");
	}
}
