class mapSelector extends Phaser.Scene {
  constructor() {
    super("mapSelector");
  };
  preload(){
	};
	create(){
		this.sound.play("Spagetti", {volume:.25, loop: true});
		this.add.image(400,225,"ui");
		var map1 = this.add.image(680,240,"map1").setScale(.24);
		map1.setInteractive();
		map1.on("pointerdown", ()=>{
			this.scene.start("map1");
		});	
		var arrowNext = this.add.sprite(755,400,"arrowSign").setScale(.15);
		var arrowPre = this.add.sprite(585,400,"arrowSign").setScale(.15);
		arrowPre.flipX = true;
	}
}

