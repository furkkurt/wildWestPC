var baglama = true;
class tavern extends Phaser.Scene {
  constructor() {
    super("tavern");
  };
  preload() {};
  create() {
    this.emitter = EventDispatcher.getInstance();
    this.gamePad = new GamePad({
      scene: this
    });
    this.gamePad.x = 0;
    this.gamePad.y = 0;
    this.setListeners();
    this.sound.stopAll();
    this.sound.play("Tequila", {
      loop: true,
      volume: .15
    });
    const map = this.make.tilemap({
      key: "tavern",
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

    this.player = this.physics.add.sprite(10.5 * 70, 3.75 * 70, "player").setScale(1.5).setDepth(2.01);
    this.player.play("playerIdle");
    this.player.body.setSize(this.player.width / 1.5, this.player.height / 2);
    this.player.setImmovable();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(.75);
      
    this.exit = this.physics.add.sprite(10 * 70-14, 1 * 70-15).setOrigin(0).setInteractive().setDepth(999);
    this.exit.scaleY = 5;
    this.exit.scaleX = 3;
    this.exit.on("pointerdown", () => {localStorage.setItem("location", "town");window.location.reload()});

    this.npcSpawner = this.physics.add.sprite(0, 0, "hidden").setVisible(false);
    this.npcSpawner.setSize(1100, 600);

    borderLayer.setCollisionByExclusion([-1]);
    collidableLayer.setCollisionByExclusion([-1]);
    upperLayer1.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, borderLayer);
    this.physics.add.collider(this.player, collidableLayer);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.npcSpawner.x = this.player.x;
        this.npcSpawner.y = this.player.y;
      },
      loop: true
    })
    
    var characters = ["bloodJoe", "blueHat", "redHat", "greenGuy", "blackHat"];
    var npcNum;
    var npcName;
    this.x = 0;
    var pickNpc = () => {
      npcNum = Math.floor(Math.random() * 5);
      npcName = characters[npcNum];
    };
    pickNpc();
    this.textBox = this.physics.add.sprite(600, 425, "quoteBox").setScale(10).setDepth(99).setScrollFactor(0).setInteractive().setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(325, 335, "", {fontFamily: "litebulb", color: "black", fontSize: "33px"}).setDepth(100).setScrollFactor(0).setInteractive();
    //Card playing guys
    var npcSprite1 = this.physics.add.sprite(8.25 * 70, 7.5 * 70, npcName).setScale(1.5).setDepth(2.01).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite1.scaleY = 1.47;this.x--;npcSprite1.y += 2.8125;}else{npcSprite1.scaleY = 1.5;this.x++;npcSprite1.y -= 2.8125;}}, loop: true});
    pickNpc();
    var npcSprite2 = this.physics.add.sprite(6.25 * 70, 5.75 * 70, npcName).setScale(1.5).setDepth(2.01).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite2.scaleY = 1.47;this.x--;npcSprite2.y += 2.8125;}else{npcSprite2.scaleY = 1.5;this.x++;npcSprite2.y -= 2.8125;}}, loop: true});
    pickNpc();
    var npcSprite3 = this.physics.add.sprite(10.5 * 70, 5.75 * 70, npcName).setScale(1.5).setDepth(2.01).setInteractive();
    npcSprite3.flipX = true;
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite2.scaleY = 1.47;this.x--;npcSprite3.y += 2.8125;}else{npcSprite3.scaleY = 1.5;this.x++;npcSprite3.y -= 2.8125;}}, loop: true});
    pickNpc();
    npcSprite1.on("pointerdown", () => {cardScene()});
    npcSprite2.on("pointerdown", () => {cardScene()});
    npcSprite3.on("pointerdown", () => {cardScene()});
    var cardScene = () => { 
      this.textBox.setVisible(true);
      this.text.text = "Wanna play blackjack?";
      if(money>=10){
        this.text.on("pointerdown", () => {this.scene.start("blackjack")});      
        this.textBox.on("pointerdown", () => {this.scene.start("blackjack")});      
      }
      else{
        this.text.on("pointerdown", () => {this.text.setText("You need at least 10 bucks to play.")});      
        this.textBox.on("pointerdown", () => {this.text.setText("You need at least 10 bucks to play.")});      
      }
    };
    //Easy
    var npcSprite4 = this.physics.add.sprite(8.25 * 70, 2.75 * 70, npcName).setScale(1.5).setDepth(1.99).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite2.scaleY = 1.47;this.x--;npcSprite4.y += 2.8125;}else{npcSprite4.scaleY = 1.5;this.x++;npcSprite4.y -= 2.8125;}}, loop: true});
    pickNpc();
    npcSprite4.on("pointerdown", () => {bountyScene()});
    var bountyScene = () => { 
      this.textBox.setVisible(true);
      this.text.text = "I want you to kill a man for me,\nyou'll be paid.";
      localStorage.setItem("location", "map1");
      this.text.on("pointerdown", () => {window.location.reload()});      
      this.textBox.on("pointerdown", () => {window.location.reload()});      
    };
    //Hard
    var npcSprite5 = this.physics.add.sprite(1.25 * 70, 3.75 * 70, npcName).setScale(1.5).setDepth(2.01).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite3.scaleY = 1.47;this.x--;npcSprite5.y += 2.8125;}else{npcSprite5.scaleY = 1.5;this.x++;npcSprite5.y -= 2.8125;}}, loop: true});
    pickNpc();
    var npcSprite6 = this.physics.add.sprite(1.25 * 70, 4.75 * 70, npcName).setScale(1.5).setDepth(2.01).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite4.scaleY = 1.47;this.x--;npcSprite6.y += 2.8125;}else{npcSprite6.scaleY = 1.5;this.x++;npcSprite6.y -= 2.8125;}}, loop: true});
    pickNpc();
    npcSprite5.on("pointerdown", () => {bountyScene3()});
    npcSprite6.on("pointerdown", () => {bountyScene3()});
    var bountyScene3 = () => { 
      this.textBox.setVisible(true);
      this.text.text = "I want you to kill a man for me,\nyou'll be paid greatly.";
      this.text.on("pointerdown", () => {this.scene.start("map5")});      
      this.textBox.on("pointerdown", () => {this.scene.start("map5")});      
    };
    //Mid
    var npcSprite7 = this.physics.add.sprite(17.25 * 70, 3.75 * 70, npcName).setScale(1.5).setDepth(2.01).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite5.scaleY = 1.47;this.x--;npcSprite7.y += 2.8125;}else{npcSprite7.scaleY = 1.5;this.x++;npcSprite7.y -= 2.8125;}}, loop: true});
    pickNpc();
    var npcSprite8 = this.physics.add.sprite(17.25 * 70, 5.75 * 70, npcName).setScale(1.5).setDepth(2.01).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite6.scaleY = 1.47;this.x--;npcSprite8.y += 2.8125;}else{npcSprite8.scaleY = 1.5;this.x++;npcSprite8.y -= 2.8125;}}, loop: true});
    pickNpc();
    var npcSprite9 = this.physics.add.sprite(17.25 * 70, 7.5 * 70, npcName).setScale(1.5).setDepth(2.01).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite9.scaleY = 1.47;this.x--;npcSprite9.y += 2.8125;}else{npcSprite9.scaleY = 1.5;this.x++;npcSprite9.y -= 2.8125;}}, loop: true});
    npcSprite7.on("pointerdown", () => {bountyScene2("map2")});
    npcSprite8.on("pointerdown", () => {bountyScene2("map3")});
    npcSprite9.on("pointerdown", () => {bountyScene2("map4")});
    var bountyScene2 = (map) => { 
      this.textBox.setVisible(true);
      this.text.text = "I want you to kill a man for me,\nyou'll be paid good.";
      this.text.on("pointerdown", () => {localStorage.setItem("location", map); window.location.reload()});      
      this.textBox.on("pointerdown", () => {localStorage.setItem("location", map); window.location.reload()});      
    };
  };

  update() {
  }
  setListeners() {
    this.emitter.on("UP", this.up.bind(this));
    this.emitter.on("DOWN", this.down.bind(this));
    this.emitter.on("LEFT", this.left.bind(this));
    this.emitter.on("RIGHT", this.right.bind(this));
    this.emitter.on("RELEASE", this.release.bind(this));
  };
  up() {
    gunDrawn = false;
    this.player.play("playerWalk");
    this.player.setVelocityY(-200);
    this.npcSpawner.setVelocityY(-200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  down() {
    gunDrawn = false;
    this.player.play("playerWalk");
    this.player.setVelocityY(200);
    this.npcSpawner.setVelocityY(200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  left() {
    gunDrawn = false;
    this.player.play("playerWalk");
    this.player.setVelocityX(-200);
    this.player.flipX = true;
    this.player.body.setOffset(0, 62);
    this.npcSpawner.setVelocityX(-200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  right() {
    gunDrawn = false;
    this.player.play("playerWalk");
    this.player.setVelocityX(200);
    this.player.flipX = false;
    this.player.body.setOffset(12, 62);
    this.npcSpawner.setVelocityX(200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  release() {
    this.player.setVelocity(0);
    this.player.play("playerIdle");
    this.npcSpawner.setVelocity(0);
  }
}
