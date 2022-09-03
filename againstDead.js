class againstDead extends Phaser.Scene{
  constructor(){
    super("againstDead")
  }
  create(){
    this.sound.stopAll();
    this.sound.play("trainRobbery");
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
    const upperLayer2 = map.createLayer("other", tileset).setDepth(2.4).setScale(4.375);
    const borderLayer = map.createLayer("walls", tileset).setVisible(false).setScale(4.375);

    this.player = this.physics.add.sprite(8.5 * 70, 4.6 * 70, "player").setScale(1.5).setDepth(2.01);
    this.player.play("playerIdle");
    this.player.body.setSize(this.player.width / 1.5, this.player.height / 2);
    this.player.setImmovable();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);
    this.time.addEvent({
      delay: 50,
      callback:() =>{
        this.cameras.main.zoom -= .01
      }, repeat: 125
    });
    
    var characters = ["bloodJoe", "blueHat", "redHat", "greenGuy", "blackHat"];
    var npcNum;
    var npcName;
    this.x = 0;
    var pickNpc = () => {
      npcNum = Math.floor(Math.random() * 5);
      npcName = characters[npcNum];
    };
    pickNpc();
    this.textBox = this.physics.add.sprite(600, 425, "quoteBox").setScale(10).setDepth(999).setScrollFactor(0).setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(500, 500, "Oh shoot! You drew the DEAD MAN'S HAND!", {fontFamily: "litebulb", color: "black", fontSize: "28px"}).setDepth(1000).setVisible(false);
    //Card playing guys
    var npcSprite1 = this.physics.add.sprite(8.25 * 70, 7.5 * 70, npcName).setScale(1.5).setDepth(2.51).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite1.scaleY = 1.47;this.x--;npcSprite1.y += 2.8125;}else{npcSprite1.scaleY = 1.5;this.x++;npcSprite1.y -= 2.8125;}}, loop: true});
    pickNpc();
    var npcSprite2 = this.physics.add.sprite(6.25 * 70, 5.75 * 70, npcName).setScale(1.5).setDepth(2.51).setInteractive();
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite2.scaleY = 1.47;this.x--;npcSprite2.y += 2.8125;}else{npcSprite2.scaleY = 1.5;this.x++;npcSprite2.y -= 2.8125;}}, loop: true});
    pickNpc();
    var npcSprite3 = this.physics.add.sprite(10.5 * 70, 5.75 * 70, npcName).setScale(1.5).setDepth(2.51).setInteractive();
    npcSprite3.flipX = true;
    this.time.addEvent({delay: 750,callback:() =>{if (this.x == 0){npcSprite2.scaleY = 1.47;this.x--;npcSprite3.y += 2.8125;}else{npcSprite3.scaleY = 1.5;this.x++;npcSprite3.y -= 2.8125;}}, loop: true});
    pickNpc();
   
    this.smoke = this.add.sprite(0,0,"whiteFilter").setOrigin(0).setScale(100).setDepth(998);
    this.smoke.alpha = 0;
    this.time.addEvent({
      delay: 6000,
      callback:() =>{
        this.textBox.visible = this.text.visible = true;
        this.time.addEvent({
          delay: 75,
          callback:() =>{
            if(this.smoke.alpha>.5)
              this.symbol = "-"
            else if(this.smoke.alpha<.4)
              this.symbol = "+"
            
            eval("this.smoke.alpha"+this.symbol+"=.01");
          }, loop: true
        })
      }
    })
    
    this.time.addEvent({
      delay: 9000,
      callback:() =>{
        this.deadMan = this.physics.add.sprite(11*70, 2*70, "hickok").setScale(1.6).setDepth(2);
        this.deadMan.flipX = true;
        this.sound.play("doorKick");
        this.time.addEvent({
          delay: 2000,
          callback:() =>{
            this.textBox.visible = this.text.visible = false;
            this.deadMan.play("hickokWalk");
            this.deadMan.setVelocity(-15,25);
            this.sound.play("walkOnWood", {volume: 4});
            this.time.addEvent({
              delay: 3000,
              callback:() =>{
                this.sound.play("walkOnWood", {volume: 4});
              }
            })
            this.time.addEvent({
              delay: 7000,
              callback:() =>{
                this.deadMan.setVelocity(0);
                this.deadMan.play("hickokKnife");
                this.sound.play("swosh", {volume: 6});
                this.time.addEvent({
                  delay: 2000,
                  callback:() =>{
                    this.option1 = this.add.text(100, 100, "Draw against his hand (Lose all your money)", {fontFamily: "litebulb", fontSize: "28px", color: "black"}).setDepth(999).setInteractive();
                    this.orText = this.add.text(400, 150, "OR", {fontFamily: "litebulb", fontSize: "32px", color: "black"}).setDepth(999).setInteractive();
                    this.option2 = this.add.text(275, 200, "Duel against the dead", {fontFamily: "litebulb", fontSize: "28px", color:"black"}).setDepth(999).setInteractive();
                    this.option1.on("pointerover",() => {this.option1.setColor("white")});
                    this.option1.on("pointerout",() => {this.option1.setColor("black")});
                    this.option2.on("pointerover",() => {this.option2.setColor("white")});
                    this.option2.on("pointerout",() => {this.option2.setColor("black")});
                    this.option1.on("pointerdown", () => {localStorage.setItem("money", 0); localStorage.setItem("location", "town"); window.location.reload()});
                    this.option2.on("pointerdown", () => {this.scene.start("deadDuel")});
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
