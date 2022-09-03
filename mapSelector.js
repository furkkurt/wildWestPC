var map = 1;
var nextMap;
var preMap;
class mapSelector extends Phaser.Scene {
  constructor() {
    super("mapSelector");
  };
  preload(){
	};
	create(){
		this.sound.stopAll();
		this.sound.play("Spagetti", {volume:.25, loop: true});
		this.add.image(400,225,"ui");
		var map1 = this.add.image(680,240,"map1").setScale(.24);
		map1.setInteractive();
		map1.on("pointerdown", ()=>{
			this.scene.start("map1");
		});	
		var map2 = this.add.image(680,240,"map2").setScale(.24).setVisible(false);
		map2.setInteractive()
		map2.on("pointerdown", ()=>{
			this.scene.start("map2");
		});
		var map3 = this.add.image(680,240,"map3").setScale(.24).setVisible(false);
		var map4 = this.add.image(680,240,"map4").setScale(.24).setVisible(false);
		var map5 = this.add.image(680,240,"map5").setScale(.24).setVisible(false);
		
		var map1Dif = this.add.text(600, 425, "Difficulty: Easy", {color: "black", fontFamily: "texat"}).setScale(.9);
		var map2Dif = this.add.text(600, 425, "Difficulty: Medium", {color: "black", fontFamily: "texat"}).setScale(.75).setVisible(false);
		var map3Dif = this.add.text(600, 425, "Difficulty: Medium", {color: "black", fontFamily: "texat"}).setScale(.75).setVisible(false);
		var map4Dif = this.add.text(600, 425, "Difficulty: Medium", {color: "black", fontFamily: "texat"}).setScale(.75).setVisible(false);
		var map5Dif = this.add.text(600, 425, "Difficulty: Hard", {color: "black", fontFamily: "texat"}).setScale(.85).setVisible(false);

		var arrowNext = this.add.sprite(755,400,"arrowSign").setScale(.15).setInteractive();
		var arrowPre = this.add.sprite(585,400,"arrowSign").setScale(.15).setInteractive();
		arrowPre.flipX = true;
	
		arrowNext.on("pointerdown", () => {
			nextMap = map + 1;
			eval("map"+nextMap).setVisible(true);
			eval("map"+nextMap+"Dif").setVisible(true);
			eval("map"+map).setVisible(false);
			eval("map"+map+"Dif").setVisible(false);
			map += 1;
		});
		arrowPre.on("pointerdown", () => {
			preMap = map - 1;
			eval("map"+preMap).setVisible(true);
			eval("map"+preMap+"Dif").setVisible(true);
			eval("map"+map).setVisible(false);
			eval("map"+map+"Dif").setVisible(false);
			map -= 1;
		});
	}
}

