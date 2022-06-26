class prologue3 extends Phaser.Scene {
  constructor() {
    super("prologue3");
  };
  preload() {};
  create() {
    music.play();
    music.setSeek(40);
    music.volume= .3;
    this.text2 = this.add.text(200, 150, "15 Years Later", {fontFamily: "litebulb", color: "white", fontSize: "56px"}).setDepth(1000).setScrollFactor(0);
    this.filter3 = this.add.sprite(0,0,"blackFilter").setOrigin(0).setScale(100).setDepth(999);
    this.time.addEvent({
      delay: 25,
      callback:() =>{
        this.filter3.alpha -= .01;
        this.text2.alpha -= .01;
      },repeat: 100
    })
    this.emitter = EventDispatcher.getInstance();
    const map = this.make.tilemap({
      key: "home",
      tileWidth: 16,
      tileHeight: 16
    });
    const tileset = map.addTilesetImage("tavernSheet", "tavernSheet");
    collidableLayer = map.createLayer("tables", tileset).setDepth(1.2).setScale(4.375);
    const nonCollidableLayer = map.createLayer("base", tileset).setScale(4.375);
    const tableEdgeLayer = map.createLayer("tableEdge", tileset).setDepth(1.2).setScale(4.375);
    const tableEdgeLayerUpper = map.createLayer("tableEdgeUpper", tileset).setDepth(2.1).setScale(4.375);
    const upperLayer1 = map.createLayer("chairs", tileset).setDepth(1.1).setScale(4.375);
    const upperLayer2 = map.createLayer("other", tileset).setDepth(1.3).setScale(4.375);
    const borderLayer = map.createLayer("walls", tileset).setVisible(false).setScale(4.375);

    this.player = this.physics.add.sprite(4 * 70, 4 * 70, "playerYouth").setScale(1.6).setDepth(2.01);
    this.player.flipX = true;
    this.player.play("playerYouthIdle");
    this.player.body.setSize(this.player.width / 2, this.player.height / 4);
    this.player.setImmovable();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(.75);
    this.bed = this.add.sprite(90,125,"bed").setOrigin(0).setDepth(2.02).setScale(4.25);
    this.mom = this.physics.add.sprite(2.15*70,4.265*70, "momOld").setScale(1.7).setDepth(2.03);
    borderLayer.setCollisionByExclusion([-1]);
    collidableLayer.setCollisionByExclusion([-1]);
    upperLayer1.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, borderLayer);
    this.physics.add.collider(this.player, collidableLayer);
    
    this.textBox = this.physics.add.sprite(650, 440, "quoteBox").setScale(9).setDepth(101).setScrollFactor(0).setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(380, 360, "", {fontFamily: "litebulb", color: "black", fontSize: "23px"}).setDepth(102).setScrollFactor(0);
    this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.sound.play("mom", {volume: 4});
        this.textBox.setVisible(true);
        this.text.setText("Son, listen; I don't have much time\nThere's one thing I want from you.\nAnd it's for you to avenge this wicked deed.")
        this.time.addEvent({
          delay: 5000,
          callback:() =>{
            this.sound.play("mom", {volume: 4});
            this.time.addEvent({
              delay: 25,
              callback:() =>{
                this.filter3.alpha += .01;
              },repeat: 100
            })
          }
        })
        this.time.addEvent({
          delay: 7000,
          callback:() =>{
            this.scene.start("prologue4");
          }
        })
      }
    })
  }
}

