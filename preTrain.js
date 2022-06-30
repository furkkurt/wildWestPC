class preTrain extends Phaser.Scene {
  constructor() {
    super("preTrain");
  };
  create() {
    this.sound.stopAll();
    this.sound.play("Tequila", {
      loop: true,
      volume: .15
    });  
    
    this.filter = this.add.sprite(0,0,"nightFilter").setScale(999).setDepth(998).setScrollFactor(0);
    this.filter.alpha = .5;
    
    this.textBox = this.physics.add.sprite(245, 425, "quoteBox").setScale(12.2).setDepth(999).setScrollFactor(0)
    this.textBox.alpha = .8;
    this.text = this.add.text(-120, 350, "Hey you! I've heard you're lookin' for Mad Hat.\nYou are looking in wrong town tho, Mad Hat Bran\nis in the Branacle Town, the next train heads there.\nGo avenge that jack*ss for he murdered my son!", {fontFamily: "litebulb", color: "black", fontSize: "28px"}).setDepth(999).setScrollFactor(0);
    
    const map = this.make.tilemap({
      key: "map1",
      tileWidth: 70,
      tileHeight: 70
    });
    const tileset = map.addTilesetImage("sheet", "tile");
    collidableLayer = map.createLayer("collidableLayer", tileset).setDepth(1);
    const nonCollidableLayer = map.createLayer("nonCollidableLayer", tileset);
    const upperLayer1 = map.createLayer("upperLayer1", tileset).setDepth(3);
    const upperLayer2 = map.createLayer("upperLayer2", tileset).setDepth(4);
    const lowerLayer = map.createLayer("lowerLayer", tileset).setDepth(1);
    const npcLayer = map.createLayer("npcLayer", tileset).setVisible(false);

    this.player = this.physics.add.sprite(71 * 70, 75 * 70.25 + 1, "player").setScale(1.5).setDepth(2.01);
    this.player.play("player"+horse+"Idle");
    this.player.body.setSize(this.player.width / 1.25, this.player.height / 2);
    this.player.setImmovable();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.stopFollow(this.player);
    this.cameras.main.setZoom(.75);
    
    this.guy = this.physics.add.sprite(this.player.x + 300, this.player.y, "darkHorse").setScale(1.5).setDepth(2);
    this.guy.flipX = true;

    this.time.addEvent({
      delay: 10000,
      callback:() =>{
        this.scene.start("preTrain2");
      }
    })
  }
}
