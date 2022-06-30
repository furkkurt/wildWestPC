var money;
var baglama = true;
var horse;
class town extends Phaser.Scene {
  constructor() {
    super("town");
  };
  preload() {};
  create() {
    if(localStorage.getItem("progress") == undefined)
      localStorage.setItem("progress", 0);
    if(localStorage.getItem("progress") == 0 && localStorage.getItem("hasHorse") != undefined)
      this.scene.start("ridersChase");
    if(localStorage.getItem("progress") == 3 && localStorage.getItem("hasHorse") != undefined)
      this.scene.start("bridge");
    if((localStorage.getItem("duelled") && localStorage.getItem("bottleShooted")) && (localStorage.getItem("horseRaced") && localStorage.getItem("bountyHunted")))
      this.scene.start("preTrain");

    if(localStorage.getItem("money") == undefined){
      money = 0;
      localStorage.setItem("money", money);
    }
    else
      money = localStorage.getItem("money");
    if(localStorage.getItem("hasHorse") == undefined){
      speed = 200;
      horse = "";
    }
    else if(localStorage.getItem("hasHorse") == "black"){
      speed = 300;
      horse = "Black";
    }
    else if(localStorage.getItem("hasHorse") == "brown"){
      speed = 400;
      horse = "Brown";
    }
    else if(localStorage.getItem("hasHorse") == "white"){
      speed = 500;
      horse = "White";
    }
    this.moneyText = this.add.text(-120, -80, "Money: " + money, {color: "black", fontFamily: "litebulb", fontSize: "28px"}).setDepth(100).setScrollFactor(0);
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
    this.textBox = this.physics.add.sprite(540, 375, "quoteBox").setScale(12.2).setDepth(99).setScrollFactor(0).setInteractive().setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(175, 275, "", {fontFamily: "litebulb", color: "black", fontSize: "32px"}).setDepth(100).setScrollFactor(0).setInteractive();
    this.textBox.on("pointerdown", () => {
      if(localStorage.getItem("location") == "duello")
        window.location.reload();
      if(localStorage.getItem("money") >= 25)
        window.location.reload();
      else{
        this.text.setText("You need at least 25 bucks.");
        localStorage.setItem("location", "town");
      }
    });
    this.text.on("pointerdown", () => {
      if(localStorage.getItem("money") >= 25)
        window.location.reload();
      else{
        this.text.setText("You need at least 25 bucks.");
        localStorage.setItem("location", "town");
      }
    });
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

    this.player = this.physics.add.sprite(75 * 70, 75 * 70 + 1, "player").setScale(1.5).setDepth(2.01);
    this.player.play("player"+horse+"Idle");
    this.player.body.setSize(this.player.width / 1.5, this.player.height / 2);
    if (horse != "")
      this.player.body.setSize(this.player.width / 1.25, this.player.height / 2);
    this.player.setImmovable();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(.75);

    this.npcSpawner = this.physics.add.sprite(0, 0, "hidden").setVisible(false);
    this.npcSpawner.setSize(1100, 600);

    collidableLayer.setCollisionByExclusion([-1]);
    npcLayer.setCollisionByExclusion([-1]);
    upperLayer1.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, collidableLayer);

    this.time.addEvent({
      delay: 250,
      callback: () => {
        this.npcSpawner.x = this.player.x;
        this.npcSpawner.y = this.player.y;
      },
      loop: true
    })
    //Place NPC's
    this.physics.add.collider(this.npcSpawner, npcLayer, (x, spawn) => {
      var characters = ["bloodJoe", "blueHat", "redHat", "joeHorse", "greenGuy", "blackHat"];
      var directions = ["up", "down", "left", "right"];
      var npcNum;
      var npcName;
      var pickNpc = () => {
        npcNum = Math.floor(Math.random() * 6);
        npcName = characters[npcNum];
        if (npcName == target)
          pickNpc();
      };
      pickNpc();
      var npcSprite = this.physics.add.sprite(spawn.x * 70, spawn.y * 70, npcName).setScale(1.5).setDepth(2.01);
			this.physics.add.collider(npcSprite, bulletNpcCollider, () => {
        randomDirChange.paused = true;
        this.npcInBorder.paused = true;
        npcSprite.setVisible(false);
        npcSprite.setActive(false);
			  npcSprite.x = 0;
			  npcSprite.y = 0;
			  civilianKills += 1;
      }, null, this);
      this.time.addEvent({
        delay: 30000,
        callback: () => {
          randomDirChange.paused = true;
          this.npcInBorder.paused = true;
          npcSprite.setVisible(false);
          npcSprite.setActive(false);
					npcSprite.x = 0;
					npcSprite.y = 0;
				},
        loop: true,
        paused: false
      });
      npcSprite.play(npcName + "Walk");
      npcSprite.setDepth(2);
      npcSprite.setImmovable();
      var directionNum = Math.floor(Math.random() * 4);
      var npcDirection = directions[directionNum];
      if (npcDirection == "up") {
        npcSprite.setVelocityY(-100);
      } else if (npcDirection == "down") {
        npcSprite.setVelocityY(100);
      } else if (npcDirection == "left") {
        npcSprite.setVelocityX(-100);
        npcSprite.flipX = true;
      } else {
        npcSprite.setVelocityX(100);
        npcSprite.flipX = false;
      };
      this.physics.add.collider(npcSprite, this.player, () => {
				if(npcSprite.y>this.player.y)
					npcSprite.setDepth(2.1);
				else
					npcSprite.setDepth(2);
				if (baglama == true){
					this.player.setVelocity(0); 
					baglama = false;
					this.time.addEvent({delay:5000, callback:()=>{baglama=true}});
				};
				npcSprite.setVelocity(0);
        npcSprite.play(npcName + "Idle");
        npcSprite.setInteractive();
        var askDirectionX;
        var askDirectionY;
        var directionAnswer;
        var clicked = false;
        let i = 0;
        npcSprite.on("pointerdown", () => {
          if(i == 0){
            i++;
            let events = ["duello", "aim", "aim", "aim", "race", "race", "race"];
            let eventNum;
            if (localStorage.getItem("hasHorse") == undefined)
                eventNum = Math.floor(Math.random() * 4);
            else
              eventNum = Math.floor(Math.random() * 7);
              let event = events[eventNum];
            this.textBox.setVisible(true);
            if(event == "aim"){
              this.text.text = "You trust your aim? Bet against me on\nbottle shootin'\n                                Accept";
              localStorage.setItem("location", "bottleShootin");
            }
            else if(event == "race"){
              this.text.text = "Your horse looks slow. I bet you wouldn't\nstand a chance against me in a race.\n                             Accept";
              localStorage.setItem("location", "horseRace");
            }
            else{
              this.text.text = "We don't welcome strangers around here\nboy. Be ready for a duel at 12!\n                             Accept";
              localStorage.setItem("location", "duello");
            }
          }
        })
      })
      this.physics.add.collider(npcSprite, upperLayer1, () => {npcSprite.x -= 32});
			this.physics.add.collider(npcSprite, collidableLayer, () => {
       	var directionNum = Math.floor(Math.random() * 4);
        var npcDirection = directions[directionNum];
        if (npcDirection == "up") {
          npcSprite.setVelocityY(-100);
        } else if (npcDirection == "down") {
          npcSprite.setVelocityY(100);
        } else if (npcDirection == "left") {
          npcSprite.setVelocityX(-100);
          npcSprite.flipX = true;
        } else {
          npcSprite.setVelocityX(100);
          npcSprite.flipX = false;
        }
      });
      this.npcInBorder = this.time.addEvent({
        delay: 500,
        callback: () => {
          if (npcSprite.x < 65 * 70) {
            npcSprite.setVelocityX(400);
            npcSprite.flipX = false;
          }
          if (npcSprite.x > 85 * 70) {
            npcSprite.setVelocityX(-400);
            npcSprite.flipX = true;
          };
          if (npcSprite.y < 65 * 70)
            npcSprite.setVelocityY(400)
          if (npcSprite.y > 85 * 70)
            npcSprite.setVelocityY(-400);
        },
        loop: true
      });
      var randomDirChange = this.time.addEvent({
        delay: 5000,
        callback: () => {
          npcSprite.play(npcName + "Walk");
          var directionNum = Math.floor(Math.random() * 4);
          var npcDirection = directions[directionNum];
          if (npcDirection == "up") {
            npcSprite.setVelocityY(-100);
          } else if (npcDirection == "down") {
            npcSprite.setVelocityY(100);
          } else if (npcDirection == "left") {
            npcSprite.setVelocityX(-100);
          } else {
            npcSprite.setVelocityX(100);
          }
        },
        loop: true
      });
    }, null, this);

    this.barnEnteranceText = this.add.text(4825, 5325, "Enter", {fontFamily: "litebulb", fontSize: "28px", color: "black"}).setVisible(false);
    this.barnEnterance = this.physics.add.sprite(4820,5250).setScale(3).setOrigin(0).setInteractive().setDepth(99);
    this.barnEnterance.on("pointerdown", () => {
      this.scene.start("barn");
    });

    this.tavernEnteranceText = this.add.text(5735, 4695, "Enter", {fontFamily: "litebulb", fontSize: "28px", color: "black"}).setVisible(false);
    this.tavernEnterance = this.physics.add.sprite(5730,4620).setScale(3).setOrigin(0).setInteractive().setDepth(99);
    this.tavernEnterance.on("pointerdown", () => {
      localStorage.setItem("location", "tavern");
      window.location.reload();
    });
  };

  update() {
    if (this.player.x < 50 * 70)
      this.player.x = 100 * 70;
    if (this.player.x > 100 * 70)
      this.player.x = 50 * 70;
    if (this.player.y < 50 * 70)
      this.player.y = 100 * 70;
    if (this.player.y > 100 * 70)
      this.player.y = 50 * 70;
  
    if(this.physics.overlap(this.player, this.tavernEnterance))
      this.tavernEnteranceText.setVisible(true);
    else
      this.tavernEnteranceText.setVisible(false);

    if(this.physics.overlap(this.player, this.barnEnterance))
      this.barnEnteranceText.setVisible(true);
    else
      this.barnEnteranceText.setVisible(false);
  }
  setListeners() {
    this.emitter.on("UP", this.up.bind(this));
    this.emitter.on("DOWN", this.down.bind(this));
    this.emitter.on("LEFT", this.left.bind(this));
    this.emitter.on("RIGHT", this.right.bind(this));
    this.emitter.on("RELEASE", this.release.bind(this));
    this.emitter.on("DODGE", this.dodge.bind(this));
  };
  up() {
    gunDrawn = false;
    this.player.play("player"+horse+"Walk");
    this.player.setVelocityY(-speed);
    this.npcSpawner.setVelocityY(-200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  down() {
    gunDrawn = false;
    this.player.play("player"+horse+"Walk");
    this.player.setVelocityY(speed);
    this.npcSpawner.setVelocityY(200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  left() {
    gunDrawn = false;
    this.player.play("player"+horse+"Walk");
    this.player.setVelocityX(-speed);
    this.player.flipX = true;
    if(horse != "")
      this.player.body.setOffset(50, 90);
    this.npcSpawner.setVelocityX(-200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  right() {
    gunDrawn = false;
    this.player.play("player"+horse+"Walk");
    this.player.setVelocityX(speed);
    this.player.flipX = false;
    if (horse != "")
      this.player.body.setOffset(0, 90);
    this.npcSpawner.setVelocityX(200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  release() {
    this.player.setVelocity(0);
    this.player.play("player"+horse+"Idle");
    this.npcSpawner.setVelocity(0);
  }
  dodge(){
    if(gunDrawn == false){
      var directions = ["up", "down", "left", "right"];
      var directionNumDodge = Math.floor(Math.random() * 4);
      var dodgeDirection = directions[directionNumDodge];
      if (dodgeDirection == "up")
        this.player.setVelocityY(-1500);
      else if (dodgeDirection == "down")
        this.player.setVelocityY(+1500);
      else if (dodgeDirection == "left")
        this.player.setVelocityX(-1500);
      else
        this.player.setVelocityX(+1500);

      this.time.addEvent({
        delay: 100,
        callback:() =>{
          this.player.setVelocity(0)
        }
      })
    }
  };
}
