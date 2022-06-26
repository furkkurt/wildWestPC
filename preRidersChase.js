class preRidersChase extends Phaser.Scene {
  constructor() {
    super("preRidersChase");
  };
  create() {
    if(localStorage.getItem("hasHorse") == "black")
      horse = "Black";
    else if(localStorage.getItem("hasHorse") == "brown")
      horse = "Brown";
    else
      horse = "White";
    
    this.sound.stopAll();
    this.sound.play("Tequila", {
      loop: true,
      volume: .15
    });  
    
    this.textBox = this.physics.add.sprite(245, 425, "quoteBox").setScale(12.2).setDepth(99).setScrollFactor(0)
    this.textBox.alpha = .8;
    this.text = this.add.text(-120, 350, "Hey you! I'm Cheating Donald of the gang of\nMad Hat Bran...\nAnd I'm here to put an end to this bullsh*t..!\nNow run for your life!", {fontFamily: "litebulb", color: "black", fontSize: "32px"}).setDepth(100).setScrollFactor(0);
    
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
    
    this.bandit = this.physics.add.sprite(this.player.x + 300, this.player.y, "darkishHorse").setScale(1.5).setDepth(2);
    this.bandit1 = this.physics.add.sprite(this.player.x + 2000, this.player.y, "darkishHorse").setScale(1.5).setDepth(2);
    this.bandit2 = this.physics.add.sprite(this.player.x + 2300, this.player.y, "darkishHorse").setScale(1.5).setDepth(2);
    this.bandit.flipX = this.bandit1.flipX = this.bandit2.flipX = true;

    collidableLayer.setCollisionByExclusion([-1]);
    npcLayer.setCollisionByExclusion([-1]);
    upperLayer1.setCollisionByExclusion([-1]);

    this.time.addEvent({
      delay: 7000,
      callback:() =>{
        this.text.setVisible(false);
        this.textBox.setVisible(false);
        this.sound.play("swosh");
        this.player.flipX = true;
        this.time.addEvent({
          delay: 1000,
          callback:() =>{
            this.player.play("player"+horse+"Walk");
            this.player.setVelocityX(-500);
            this.time.addEvent({
              delay: 1000,
              callback:() =>{
                this.bandit.setVelocityX(-500);
                this.bandit.play("darkishHorseWalk");
                this.bandit.setVelocityX(-475);
                this.bandit1.play("darkHorseWalk");
                this.bandit1.setVelocityX(-475);
                this.bandit2.play("joeHorseWalk");
                this.bandit2.setVelocityX(-475);
                this.time.addEvent({
                  delay: 7000,
                  callback:() =>{
                    localStorage.setItem("location", "ridersChase");
                    window.location.reload();
                  }
                })
              }
            })
          }
        })
      }
    })
  }
}
