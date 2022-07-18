class preloader extends Phaser.Scene {
  constructor() {
    super("boot");
  };
  preload(){
		this.load.spritesheet("sheet", "assets/sheet.png", {frameWidth: 70, frameHeight: 70});
		this.load.image("ui", "/assets/mapSelector.png");
		this.load.image("bg", "/assets/BG.png");
    this.load.tilemapTiledJSON("map1", "assets/levels/map1.json");
    this.load.tilemapTiledJSON("map2", "assets/levels/map2.json");
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
		this.load.image("map2", "assets/map2.png");
		this.load.image("bullet", "assets/bullet.png");
		this.load.audio("shoot", "assets/audio/shoot.mp3");
		this.load.audio("reload", "assets/audio/reload.mp3")
		this.load.image("arrowSign", "assets/arrowSign.png");
		this.load.image("scoreboard", "assets/scoreboard.png");
		this.load.image("dodgeico", "assets/controller/dodgeico.png");
		this.load.image("tavernSheet", "assets/tavernSheet.png");
		this.load.tilemapTiledJSON("tavern", "assets/tavern.json");
		this.load.tilemapTiledJSON("home", "assets/house.json");
		this.load.image("barn", "assets/barn.png");
		this.load.image("nightBarn", "assets/nightBarn.png");
		this.load.image("blackHorse", "assets/blackHorse.png");
		this.load.image("brownHorse", "assets/brownHorse.png");
		this.load.image("whiteHorse", "assets/whiteHorse.png");
		this.load.image("race4", "assets/rocky-far-mountains.png"); 
		this.load.image("race1", "assets/rocky-nowater-close.png");
		this.load.image("race3", "assets/rocky-nowater-far.png");
		this.load.image("race2", "assets/rocky-nowater-mid.png");
		this.load.image("sky", "assets/sky.png");
		this.load.image("nightSky", "assets/nightSky.png");
		this.load.atlas("bottle", "assets/beer.png", "assets/beer.json");
		this.load.image("barrel", "assets/barrel.png");
		this.load.image("duello", "assets/duello.png");
		this.load.image("redFilter", "assets/redFilter.png");
		this.load.image("nightFilter", "assets/nightFilter.png");
		this.load.image("table", "assets/table.png");
		this.load.image("back", "assets/cards/back.png");
		this.load.image("c2", "assets/cards/c2.png");
		this.load.image("c3", "assets/cards/c3.png");
		this.load.image("c4", "assets/cards/c4.png");
		this.load.image("c5", "assets/cards/c5.png");
		this.load.image("c6", "assets/cards/c6.png");
		this.load.image("c7", "assets/cards/c7.png");
		this.load.image("c8", "assets/cards/c8.png");
		this.load.image("c9", "assets/cards/c9.png");
		this.load.image("c10", "assets/cards/c10.png");
		this.load.image("cJ", "assets/cards/cJ.png");
		this.load.image("cQ", "assets/cards/cQ.png");
		this.load.image("cK", "assets/cards/cK.png");
		this.load.image("cA", "assets/cards/cA.png");		
		this.load.image("d2", "assets/cards/d2.png");
		this.load.image("d3", "assets/cards/d3.png");
		this.load.image("d4", "assets/cards/d4.png");
		this.load.image("d5", "assets/cards/d5.png");
		this.load.image("d6", "assets/cards/d6.png");
		this.load.image("d7", "assets/cards/d7.png");
		this.load.image("d8", "assets/cards/d8.png");
		this.load.image("d9", "assets/cards/d9.png");
		this.load.image("d10", "assets/cards/d10.png");
		this.load.image("dJ", "assets/cards/dJ.png");
		this.load.image("dQ", "assets/cards/dQ.png");
		this.load.image("dK", "assets/cards/dK.png");
		this.load.image("dA", "assets/cards/dA.png");
		this.load.image("h2", "assets/cards/h2.png");
		this.load.image("h3", "assets/cards/h3.png");
		this.load.image("h4", "assets/cards/h4.png");
		this.load.image("h5", "assets/cards/h5.png");
		this.load.image("h6", "assets/cards/h6.png");
		this.load.image("h7", "assets/cards/h7.png");
		this.load.image("h8", "assets/cards/h8.png");
		this.load.image("h9", "assets/cards/h9.png");
		this.load.image("h10", "assets/cards/h10.png");
		this.load.image("hJ", "assets/cards/hJ.png");
		this.load.image("hQ", "assets/cards/hQ.png");
		this.load.image("hK", "assets/cards/hK.png");
		this.load.image("hA", "assets/cards/hA.png");
		this.load.image("s2", "assets/cards/s2.png");
		this.load.image("s3", "assets/cards/s3.png");
		this.load.image("s4", "assets/cards/s4.png");
		this.load.image("s5", "assets/cards/s5.png");
		this.load.image("s6", "assets/cards/s6.png");
		this.load.image("s7", "assets/cards/s7.png");
		this.load.image("s8", "assets/cards/s8.png");
		this.load.image("s9", "assets/cards/s9.png");
		this.load.image("s10", "assets/cards/s10.png");
		this.load.image("sJ", "assets/cards/sJ.png");
		this.load.image("sQ", "assets/cards/sQ.png");
		this.load.image("sK", "assets/cards/sK.png");
		this.load.image("sA", "assets/cards/sA.png");
		this.load.atlas("father", "assets/father.png", "assets/father.json");
		this.load.atlas("playerChild", "assets/mr-brown-child.png", "assets/mr-brown-child.json");
		this.load.image("childShoot", "assets/childShoot.png");
		this.load.atlas("playerYouth", "assets/mr-brown-youth.png", "assets/mr-brown-youth.json");
		this.load.image("house", "assets/house.png");
		this.load.image("blackFilter", "assets/blackFilter.png");
		this.load.atlas("bran", "assets/madHat.png", "assets/madHat.json");
		this.load.atlas("branPunch", "assets/branPunch.png", "assets/branPunch.json");
		this.load.atlas("branVest", "assets/madHatVest.png", "assets/madHatVest.json");
		this.load.image("title", "assets/title.png");
		this.load.audio("swosh", "assets/audio/swosh.mp3");
		this.load.audio("doorKick", "assets/audio/doorKick.mp3");
		this.load.audio("doorOpen", "assets/audio/doorOpen.mp3");
		this.load.audio("walkOnWood", "assets/audio/walkOnWood.mp3");
		this.load.audio("walkOnSand", "assets/audio/walkOnSand.mp3");
		this.load.audio("trainRobbery", "assets/audio/trainRobbery.mp3");
		this.load.audio("fatherYeah", "assets/audio/father/yeah.mp3");
		this.load.audio("fatherHey", "assets/audio/father/hey.mp3");
		this.load.audio("fatherHow", "assets/audio/father/howItsDone.mp3");
		this.load.audio("fatherThoia", "assets/audio/father/thoia.mp3");
		this.load.audio("fatherNo1", "assets/audio/father/no1.mp3");
		this.load.audio("fatherDone", "assets/audio/father/nicely.mp3");
		this.load.audio("fatherAhah", "assets/audio/father/ahah.mp3");
		this.load.audio("mom", "assets/audio/mom.mp3");
		this.load.audio("branGoing", "assets/audio/bran/goingfriend.mp3");
		this.load.audio("branKill", "assets/audio/bran/ikill.mp3");
		this.load.audio("branLaugh", "assets/audio/bran/laugh.mp3");
		this.load.audio("branUnderstand", "assets/audio/bran/understand.mp3");
		this.load.audio("branListen", "assets/audio/bran/listentome.mp3");
		this.load.image("bed", "assets/bed.png");
		this.load.image("trainEmpty", "assets/train/Empty.png");
		this.load.image("trainEngine", "assets/train/Engine.png");
		this.load.image("trainCoal", "assets/train/Coal.png");
		this.load.image("trainLogs", "assets/train/Logs.png");
		this.load.image("trainCaboose", "assets/train/Caboose.png");
		this.load.image("track", "assets/train/track.png");
		this.load.audio("train", "assets/audio/train.mp3");
		this.load.audio("crickets", "assets/audio/crickets.mp3");
		this.load.image("dirt", "assets/dirt.png");
		this.load.image("bridge", "assets/bridge.png");
		//new guys
		this.load.atlas("blackHat", "assets/blackHat.png", "assets/blackHat.json");
		this.load.atlas("greenGuy", "assets/greenGuy.png", "assets/greenGuy.json");
		this.load.atlas("mrBrownBlackHorse", "assets/mrBrownBlackHorse.png", "assets/mrBrownBlackHorse.json");
		this.load.atlas("mrBrownHorse", "assets/mrBrownHorse.png", "assets/mrBrownHorse.json");
		this.load.atlas("mrBrownWhiteHorse", "assets/mrBrownWhiteHorse.png", "assets/mrBrownWhiteHorse.json");
		this.load.image("greenGuyWanted", "assets/greenGuyWanted.png");
		this.load.image("blackHatWanted", "assets/blackHatWanted.png");
		this.load.atlas("darkHorse", "assets/darkHorse.png", "assets/darkHorse.json");
		this.load.atlas("darkishHorse", "assets/darkishHorse.png", "assets/darkishHorse.json");
		this.load.atlas("mom", "assets/mom.png", "assets/mom.json");
		this.load.image("momOld", "assets/momOld.png");
		this.load.atlas("manco", "assets/manco.png", "assets/manco.json");
		this.load.atlas("blondie", "assets/blondie.png", "assets/blondie.json");
	};
	create(){
		this.anims.create({key:"playerIdle", frameRate:1,frames:[{key:"player",frame:"1"}],repeat:0});
		this.anims.create({key:"bloodJoeIdle", frameRate:1,frames:[{key:"bloodJoe",frame:"1"}],repeat:0});
		this.anims.create({key:"blueHatIdle", frameRate:1,frames:[{key:"blueHat",frame:"1"}],repeat:0});
		this.anims.create({key:"redHatIdle", frameRate:1,frames:[{key:"redHat",frame:"1"}],repeat:0});
		this.anims.create({key:"joeHorseIdle", frameRate:1,frames:[{key:"joeHorse",frame:"1"}],repeat:0});
		this.anims.create({key:"blackHatIdle", frameRate:1,frames:[{key:"blackHat",frame:"1"}],repeat:0});
		this.anims.create({key:"greenGuyIdle", frameRate:1,frames:[{key:"greenGuy",frame:"1"}],repeat:0});
		this.anims.create({key:"playerBlackIdle", frameRate:1,frames:[{key:"mrBrownBlackHorse",frame:"1"}],repeat:0});
		this.anims.create({key:"playerBrownIdle", frameRate:1,frames:[{key:"mrBrownHorse",frame:"1"}],repeat:0});
		this.anims.create({key:"playerWhiteIdle", frameRate:1,frames:[{key:"mrBrownWhiteHorse",frame:"1"}],repeat:0});
		this.anims.create({key:"playerChildIdle", frameRate:1,frames:[{key:"playerChild",frame:"1"}],repeat:0});
		this.anims.create({key:"playerYouthIdle", frameRate:1,frames:[{key:"playerYouth",frame:"1"}],repeat:0});
		this.anims.create({key:"fatherIdle", frameRate:1,frames:[{key:"father",frame:"1"}],repeat:0});
		this.anims.create({key:"darkHorseIdle", frameRate: 1, frames:[{key:"darkHorse",frame:"1"}],repeat:0});
		this.anims.create({key:"darkishHorseIdle", frameRate: 1, frames:[{key:"darkishHorse",frame:"1"}],repeat:0});
		this.anims.create({key:"momIdle", frameRate: 1, frames:[{key:"mom",frame:"1"}],repeat:0});
		this.anims.create({key:"branIdle", frameRate: 1, frames:[{key:"bran",frame:"1"}],repeat:0});
		this.anims.create({key:"branVestIdle", frameRate: 1, frames:[{key:"bran",frame:"1"}],repeat:0});
		this.anims.create({key:"mancoIdle", frameRate:1,frames:[{key:"manco",frame:"1"}],repeat:0});
		this.anims.create({key:"blondieIdle", frameRate:1,frames:[{key:"blondie",frame:"1"}],repeat:0});

		this.anims.create({key:"playerShoot", frameRate:1,frames:[{key:"player",frame:"6"}],repeat:0});
		this.anims.create({key:"bloodJoeShoot", frameRate:1,frames:[{key:"bloodJoe",frame:"6"}],repeat:0});
		this.anims.create({key:"blueHatShoot", frameRate:1,frames:[{key:"blueHat",frame:"6"}],repeat:0});
		this.anims.create({key:"redHatShoot", frameRate:1,frames:[{key:"redHat",frame:"6"}],repeat:0});
		this.anims.create({key:"joeHorseShoot", frameRate:1,frames:[{key:"joeHorse",frame:"4"}],repeat:0});
		this.anims.create({key:"blackHatShoot", frameRate:1,frames:[{key:"blackHat",frame:"6"}],repeat:0});
		this.anims.create({key:"greenGuyShoot", frameRate:1,frames:[{key:"greenGuy",frame:"6"}],repeat:0});
		this.anims.create({key:"playerBlackShoot", frameRate:1,frames:[{key:"mrBrownBlackHorse",frame:"4"}],repeat:0});
		this.anims.create({key:"playerBrownShoot", frameRate:1,frames:[{key:"mrBrownHorse",frame:"4"}],repeat:0});
		this.anims.create({key:"playerWhiteShoot", frameRate:1,frames:[{key:"mrBrownWhiteHorse",frame:"4"}],repeat:0});
		this.anims.create({key:"playerYouthShoot", frameRate:1,frames:[{key:"playerYouth",frame:"6"}],repeat:0});
		this.anims.create({key:"fatherShoot", frameRate:1,frames:[{key:"father",frame:"6"}],repeat:0});
		this.anims.create({key:"branShoot", frameRate:1,frames:[{key:"bran",frame:"6"}],repeat:0});
		this.anims.create({key:"branHang", frameRate:1,frames:[{key:"branPunch",frame:"1"}],repeat:0});
		this.anims.create({key:"branVestShoot", frameRate:1,frames:[{key:"bran",frame:"6"}],repeat:0});
		this.anims.create({key:"mancoShoot", frameRate:1,frames:[{key:"manco",frame:"2"}],repeat:0});
		this.anims.create({key:"blondieShoot", frameRate:1,frames:[{key:"blondie",frame:"2"}],repeat:0});

		this.anims.create({key:"bottleBreak", frameRate: 8, frames:[{key:"bottle", frame:"1"}, {key:"bottle", frame:"2"}, {key:"bottle", frame:"3"}, {key:"bottle", frame:"4"}]})

		this.anims.create({
			key: "playerWalk",
			frameRate: 8,
			frames: [{key:"player",frame:"2"},{key:"player",frame:"3"},{key:"player",frame:"4"},{key:"player",frame:"5"}],
			repeat: -1
		});
		this.anims.create({
			key: "playerChildWalk",
			frameRate: 8,
			frames: [{key:"playerChild",frame:"2"},{key:"playerChild",frame:"3"},{key:"playerChild",frame:"4"},{key:"playerChild",frame:"5"}],
			repeat: -1
		});
		this.anims.create({
			key: "playerYouthWalk",
			frameRate: 8,
			frames: [{key:"playerYouth",frame:"2"},{key:"playerYouth",frame:"3"},{key:"playerYouth",frame:"4"},{key:"playerYouth",frame:"5"}],
			repeat: -1
		});
		this.anims.create({
			key: "fatherWalk",
			frameRate: 8,
			frames: [{key:"father",frame:"2"},{key:"father",frame:"3"},{key:"father",frame:"4"},{key:"father",frame:"5"}],
			repeat: -1
		});		
		this.anims.create({
			key: "momWalk",
			frameRate: 8,
			frames: [{key:"mom",frame:"2"},{key:"mom",frame:"3"},{key:"mom",frame:"4"},{key:"mom",frame:"5"}],
			repeat: -1
		});
		this.anims.create({
			key: "branWalk",
			frameRate: 8,
			frames: [{key:"bran",frame:"2"},{key:"bran",frame:"3"},{key:"bran",frame:"4"},{key:"bran",frame:"5"}],
			repeat: -1 
		});		
		this.anims.create({
			key: "branVestWalk",
			frameRate: 8,
			frames: [{key:"bran",frame:"2"},{key:"bran",frame:"3"},{key:"bran",frame:"4"},{key:"bran",frame:"5"}],
			repeat: -1 
		});		
		this.anims.create({
			key: "blondieWalk",
			frameRate: 8,
			frames: [{key:"blondie",frame:"2"},{key:"blondie",frame:"3"},{key:"blondie",frame:"4"},{key:"blondie",frame:"5"}],
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
			key: "blackHatWalk",
			frameRate: 8,
			frames: [{key:"blackHat",frame:"2"},{key:"blackHat",frame:"3"},{key:"blackHat",frame:"4"},{key:"blackHat",frame:"5"}],
			repeat: -1
		});	
		this.anims.create({
			key: "greenGuyWalk",
			frameRate: 8,
			frames: [{key:"greenGuy",frame:"2"},{key:"greenGuy",frame:"3"},{key:"greenGuy",frame:"4"},{key:"greenGuy",frame:"5"}],
			repeat: -1
		});	
		this.anims.create({
			key: "redHatWalk",
			frameRate: 8,
			frames: [{key:"redHat",frame:"2"},{key:"redHat",frame:"3"},{key:"redHat",frame:"4"},{key:"redHat",frame:"5"}],
			repeat: -1
		});	
		this.anims.create({
			key: "playerBlackWalk",
			frameRate: 6,
			frames: [{key:"mrBrownBlackHorse",frame:"2"},{key:"mrBrownBlackHorse",frame:"3"}],
			repeat: -1
		});		
		this.anims.create({
			key: "playerBrownWalk",
			frameRate: 6,
			frames: [{key:"mrBrownHorse",frame:"2"},{key:"mrBrownHorse",frame:"3"}],
			repeat: -1
		});		
		this.anims.create({
			key: "playerWhiteWalk",
			frameRate: 6,
			frames: [{key:"mrBrownWhiteHorse",frame:"2"},{key:"mrBrownWhiteHorse",frame:"3"}],
			repeat: -1
		});
		this.anims.create({
			key: "joeHorseWalk",
			frameRate: 6,
			frames: [{key:"joeHorse",frame:"2"},{key:"joeHorse",frame:"3"}],
			repeat: -1
		});		
		this.anims.create({
			key: "darkHorseWalk",
			frameRate: 6,
			frames: [{key:"darkHorse",frame:"2"},{key:"darkHorse",frame:"3"}],
			repeat: -1
		});		
		this.anims.create({
			key: "darkishHorseWalk",
			frameRate: 6,
			frames: [{key:"darkishHorse",frame:"2"},{key:"darkishHorse",frame:"3"}],
			repeat: -1
		});

		this.anims.create({
			key: "blondiePunch",
			frameRate: 2,
			frames: [{key:"blondie",frame:"7"},{key:"blondie",frame:"8"}],
			repeat: 0
		});
		this.anims.create({
			key: "playerPunch",
			frameRate: 2,
			frames: [{key:"player",frame:"7"},{key:"player",frame:"8"}],
			repeat: 0
			});		
		this.anims.create({
			key: "branPunch",
			frameRate: 2,
			frames: [{key:"branPunch",frame:"1"},{key:"branPunch",frame:"2"}],
			repeat: 0
		});
		/*
		if(localStorage.getItem("location") == "map1")
			this.scene.start("map1");
		else if(localStorage.getItem("location") == "map2")
			this.scene.start("map2");
		else if(localStorage.getItem("location") == "town")
			this.scene.start("town");
		else if(localStorage.getItem("location") == "barn")
			this.scene.start("barn");
		else if(localStorage.getItem("location") == "tavern")
			this.scene.start("tavern");
		else if(localStorage.getItem("location") == "bottleShootin")
			this.scene.start("bottleShootin");
		else if(localStorage.getItem("location") == "horseRace")
			this.scene.start("horseRace");
		else if(localStorage.getItem("location") == "duello")
			this.scene.start("duello");
		else if(localStorage.getItem("location") == "chase")
			this.scene.start("ridersChase");
		else
			this.scene.start("prologue");
			*/
		this.scene.start("bridge3");
	}
}
