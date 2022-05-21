class prologue2 extends Phaser.Scene {
  constructor() {
    super("prologue2");
  };
  preload() {};
  create() {
    this.emitter = EventDispatcher.getInstance();
    this.sound.stopAll();
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

    this.player = this.physics.add.sprite(10.5 * 70, 3.75 * 70, "player").setScale(2).setDepth(2.01);
    this.player.play("playerChildIdle");
    this.player.body.setSize(this.player.width / 2, this.player.height / 4);
    this.player.setImmovable();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(.75);
    
    this.mom = this.physics.add.sprite(6.5*70,6*70, "mom").setScale(1.6).setDepth(2.01);
    this.mom.play("momIdle");
    borderLayer.setCollisionByExclusion([-1]);
    collidableLayer.setCollisionByExclusion([-1]);
    upperLayer1.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, borderLayer);
    this.physics.add.collider(this.player, collidableLayer);

  }
}
