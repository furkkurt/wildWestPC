class map6 extends Phaser.Scene {
  constructor() {
    super("map6");
  };
  create() {
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
    seconds = 0;
    civilianKills = 0;
		bullets = 6;
		gunDrawn = false; 
    fired = false;
    mouse = this.input.activePointer;
    this.emitter = EventDispatcher.getInstance();
    this.gamePad = new GamePad({
      scene: this
    });
    this.textBox = this.physics.add.sprite(540, 375, "quoteBox").setScale(12.2).setDepth(99).setScrollFactor(0).setInteractive().setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(175, 275, "", {fontFamily: "litebulb", color: "black", fontSize: "28px"}).setDepth(100).setScrollFactor(0).setInteractive();
    this.gamePad.dodge.setVisible(true);
    this.gamePad.x = 0;
    this.gamePad.y = 0;
    this.setListeners();
    this.sound.stopAll();
    this.sound.play("Tequila", {
      loop: true,
      volume: .15
    });
    const map = this.make.tilemap({
      key: "map6",
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

    this.player = this.physics.add.sprite(62 * 70, 47 * 70, "player").setScale(1.5).setDepth(2.01);
    this.player.play("player"+horse+"Idle");
    this.player.body.setSize(this.player.width / 1.5, this.player.height / 2);
    this.player.setImmovable();
    bulletText = this.add.text(-120, -60, "Bullets: " + bullets, {color: "black", fontFamily: "litebulb", fontSize: "28px"}).setDepth(100).setScrollFactor(0);
    reloadingText = this.add.text(-120, -20, "Reloading", {fontFamily: "litebulb",color: "red", fontSize: "28px"}).setDepth(100).setScrollFactor(0).setVisible(false);
    bullet = this.physics.add.sprite(0, 0, "bullet").setScale(2.5).setDepth(2);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(.75);

    this.npcSpawner = this.physics.add.sprite(0, 0, "hidden").setVisible(false);
    this.npcSpawner.setSize(1100, 600);
    this.playerBulletCollider = this.physics.add.sprite(0, 0, "hidden").setVisible(false);
    this.playerBulletCollider.setSize(this.player.width, this.player.height * 1.4);
    bulletNpcCollider = this.physics.add.sprite(0, 0, "hidden").setVisible(false).setSize(4, 4);

    collidableLayer.setCollisionByExclusion([-1]);
    npcLayer.setCollisionByExclusion([-1]);
    upperLayer1.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, collidableLayer);
    this.player.setInteractive();
    this.player.on("pointerdown", () => {
      this.player.play("player"+horse+"Shoot");
      this.time.addEvent({
        delay: 500,
        callback: () => {
          gunDrawn = true
        }
      });
    });

    this.time.addEvent({
      delay: 250,
      callback: () => {
        this.playerBulletCollider.x = this.player.x;
        this.playerBulletCollider.y = this.player.y;
        this.npcSpawner.x = this.player.x;
        this.npcSpawner.y = this.player.y;
      },
      loop: true
    })
		//Timer
		this.timeText = this.add.text(bulletText.x + 920, bulletText.y + 170, "0 Seconds", {color: "black", fontFamily: "litebulb", fontSize:"21px"}).setDepth(999).setOrigin(0).setScrollFactor(0);
    this.civilText = this.add.text(bulletText.x + 905, bulletText.y + 200, "0 Civilians Killed", {color: "black", fontFamily: "litebulb", fontSize:"21px"}).setDepth(999).setOrigin(0).setScrollFactor(0);
		this.time.addEvent({delay: 1000,
			callback: () => {
				seconds += 1;
        this.timeText.setText(seconds + " Seconds");
        this.civilText.setText(civilianKills + " Civilians Killed");
			},loop:true});
    //Target
    var characters = ["bloodJoe", "blueHat", "redHat", "joeHorse", "greenGuy", "blackHat"];
    var directions = ["up", "down", "left", "right"];
    var targetNum = Math.floor(Math.random() * 6);
    target = characters[targetNum];
    var wantedSign = this.physics.add.sprite(860, 20, target + "Wanted").setScrollFactor(0).setDepth(99).setScale(2);
    var targetTileX = 50 + Math.floor(Math.random() * 51);
    var targetTileY = 50 + Math.floor(Math.random() * 51);
    var targetX = targetTileX * 70;
    var targetY = targetTileY * 70;
    targetSprite = this.physics.add.sprite(targetX, targetY, target).setScale(1.5).setDepth(2);
    targetSprite.play(target + "Walk");
    var directionNumTarget = Math.floor(Math.random() * 4);
    var targetDirection = directions[directionNumTarget];
    if (targetDirection == "up") {
      targetSprite.setVelocityY(-200);
    } else if (targetDirection == "down") {
      targetSprite.setVelocityY(200);
    } else if (targetDirection == "left") {
      targetSprite.setVelocityX(-200);
      targetSprite.flipX = true;
    } else {
      targetSprite.setVelocityX(200);
      targetSprite.flipX = false;
    };
    this.physics.add.collider(targetSprite, collidableLayer, () => {
      var directionNumTarget = Math.floor(Math.random() * 4);
      var targetDirection = directions[directionNumTarget];
      if (targetDirection == "up") {
        targetSprite.setVelocityY(-200);
      } else if (targetDirection == "down") {
        targetSprite.setVelocityY(200);
      } else if (targetDirection == "left") {
        targetSprite.setVelocityX(-200);
        targetSprite.flipX = true;
      } else {
        targetSprite.setVelocityX(200);
        targetSprite.flipX = false;
      }
    });
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        targetSprite.play(target + "Walk");
        var directionNumTarget = Math.floor(Math.random() * 4);
        var targetDirection = directions[directionNumTarget];
        if (targetDirection == "up") {
          targetSprite.setVelocityY(-200);
        } else if (targetDirection == "down") {
          targetSprite.setVelocityY(200);
        } else if (targetDirection == "left") {
          targetSprite.setVelocityX(-200);
        } else {
          targetSprite.setVelocityX(200);
        }
      },
      loop: true
    });
    this.physics.add.overlap(this.npcSpawner, targetSprite, () => {
      targetOnSight = true;
    });
    //Place NPC's
    this.randx = (11 + Math.floor(Math.random() * 77)) * 100;
    this.randy = (11 + Math.floor(Math.random() * 77)) * 100;

    this.directNpc = this.physics.add.sprite(this.randx,this.randy, "blueHat").setScale(1.5).setDepth(2.1).setInteractive();
    this.directNpcNum = Math.floor(Math.random() * 6);
    while (this.directNpcNum == targetNum)
      this.directNpcNum = Math.floor(Math.random() * 6);
    this.directNpc.setTexture(characters[this.directNpcNum]);
    this.directNpc.on("pointerdown", () => { 
      this.textBox.setVisible(true);
      this.text.text = "You: Hey you! Have you seen this guy around?\n" + "Kind Stranger: Follow me, I know exactly\nwhere to find him."

      //leading
      this.leadingNpc = this.time.addEvent({
        delay: 500,
        callback:() =>{
          if(targetSprite.x < this.directNpc.x)
            this.directNpc.setVelocityX(-400);
          else
            this.directNpc.setVelocityX(400);

          if(targetSprite.y < this.directNpc.y)
            this.directNpc.setVelocityY(-400);
          else
            this.directNpc.setVelocityY(400);

          if(Math.abs(targetSprite.x - this.directNpc.x) < 500 && Math.abs(targetSprite.y - this.directNpc.y) < 300){
            this.directNpc.setVelocity(0);
            this.leadingNpc.paused = true;
            this.directNpc.play(characters[this.directNpcNum]+"Idle");
          };
        },loop: true
      });
    });
    
    this.physics.add.collider(this.directNpc, collidableLayer, ()=>{
      this.directNpc.play(characters[this.directNpcNum]+"Walk");
      var directionNum = Math.floor(Math.random() * 4);
      var npcDirection = directions[directionNum];
      if (npcDirection == "up") {
        this.directNpc.setVelocityY(-800);
      } else if (npcDirection == "down") {
        this.directNpc.setVelocityY(800);
      } else if (npcDirection == "left") {
        this.directNpc.setVelocityX(-800);
        this.directNpc.flipX = true;
      } else {
        this.directNpc.setVelocityX(800);
        this.directNpc.flipX = false;
      };
    });
    this.randx = (11 + Math.floor(Math.random() * 77)) * 100;
    this.randy = (11 + Math.floor(Math.random() * 77)) * 100;

    this.hostileNpc = this.physics.add.sprite(this.randx,this.randy, "blueHat").setScale(1.5).setDepth(2.1).setInteractive();
    this.hostileNpcNum = Math.floor(Math.random() * 6);
    while (this.hostileNpcNum == targetNum)
      this.hostileNpcNum = Math.floor(Math.random() * 6);
    this.hostileNpc.setTexture(characters[this.hostileNpcNum]);
    this.hostileNpc.on("pointerdown", () => {
      this.hostileNpc.play(characters[this.hostileNpcNum]+"Walk");
      this.textBox.setVisible(true);
      this.text.text = "You: Hey you! Have you seen this guy around?\n" + "'Kind' Stranger: Should've never come here!";

      //attack
      this.attackNpc = this.time.addEvent({
        delay: 3000,
        callback:() =>{
          this.hostileNpc.play(characters[this.hostileNpcNum]+"Shoot");
          this.time.addEvent({
            delay: 200,
            callback:() =>{
              this.hostileNpc.play(characters[this.hostileNpcNum]+"Walk");
            }
          })
          if(this.player.x < this.hostileNpc.x)
            this.hostileNpc.setVelocityX(-150);
          else
            this.hostileNpc.setVelocityX(150);

          if(this.player.y < this.hostileNpc.y)
            this.hostileNpc.setVelocityY(-150);
          else
            this.hostileNpc.setVelocityY(150);

          var hostileBullet = this.physics.add.sprite(this.hostileNpc.x, this.hostileNpc.y, "bullet").setScale(4).setDepth(3);
		      hostileBullet.setBounce(1);
          this.physics.add.collider(hostileBullet, collidableLayer, () => {hostileBullet.destroy()});
          this.physics.moveTo(hostileBullet, this.player.x, this.player.y, 500);
		  		this.physics.add.collider(this.player, hostileBullet, ()=>{
			  		hostileBullet.destroy();
				  	this.scene.start("map1");
  				});
	  			this.sound.play("shoot", {volume:.1});
        },loop: true
      });
      this.time.addEvent({
        delay: 2000,
        callback:() =>{
          this.attackNpc.paused = true;
          this.time.addEvent({
            delay: 1000,
            callback:() =>{
              this.attackNpc.paused = false;
            }
          })
        }, loop: true
      })
    });
    this.physics.add.collider(this.hostileNpc, collidableLayer);
    this.physics.add.collider(this.hostileNpc, bulletNpcCollider, () => {this.hostileNpc.destroy(); seconds = 0;});

    this.physics.add.collider(this.npcSpawner, npcLayer, (x, spawn) => {
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
        npcSprite.destroy();
				civilianKills += 1;
      }, null, this);
      this.time.addEvent({
        delay: 30000,
        callback: () => {
          randomDirChange.paused = true;
          this.npcInBorder.paused = true;
          npcSprite.setVisible(false);
          npcSprite.setActive(false);
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
        npcSprite.setVelocityY(-200);
      } else if (npcDirection == "down") {
        npcSprite.setVelocityY(200);
      } else if (npcDirection == "left") {
        npcSprite.setVelocityX(-200);
        npcSprite.flipX = true;
      } else {
        npcSprite.setVelocityX(200);
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
        npcSprite.on("pointerdown", () => {
          if (targetSprite.x > this.player.x + 10 * 70)
            askDirectionX = "east";
          if (targetSprite.x < this.player.x - 10 * 70)
            askDirectionX = "west";
          if (targetSprite.y < this.player.y + 10 * 70)
            askDirectionY = "south";
          if (targetSprite.y < this.player.y - 10 * 70)
            askDirectionY = "north";

          if (askDirectionX != undefined && askDirectionY == undefined)
            directionAnswer = "I think I saw him heading " + askDirectionX;
          else if (askDirectionX == undefined && askDirectionY != undefined)
            directionAnswer = "I think I saw him heading " + askDirectionY;
          else if (askDirectionX != undefined && askDirectionY != undefined)
            directionAnswer = "I think I saw him heading " + askDirectionY + " " + askDirectionX;
          else
            directionAnswer = "Oh god! I saw him right around here!";

          if (clicked == false) {
            clicked = true;
            this.textBox.setVisible(true);
            this.text.text = "You: Hey you! Have you seen this guy around?\n" + "Kind Stranger : " + directionAnswer + ".";
          }
        })
      })
      this.physics.add.collider(npcSprite, upperLayer1, () => {npcSprite.x -= 32});
			this.physics.add.collider(npcSprite, collidableLayer, () => {
       	var directionNum = Math.floor(Math.random() * 4);
        var npcDirection = directions[directionNum];
        if (npcDirection == "up") {
          npcSprite.setVelocityY(-200);
        } else if (npcDirection == "down") {
          npcSprite.setVelocityY(200);
        } else if (npcDirection == "left") {
          npcSprite.setVelocityX(-200);
          npcSprite.flipX = true;
        } else {
          npcSprite.setVelocityX(200);
          npcSprite.flipX = false;
        }
      });
      this.npcInBorder = this.time.addEvent({
        delay: 500,
        callback: () => {
          if (npcSprite.x < 30 * 70) {
            npcSprite.setVelocityX(400);
            npcSprite.flipX = false;
          }
          if (npcSprite.x > 100 * 70) {
            npcSprite.setVelocityX(-400);
            npcSprite.flipX = true;
          };
          if (npcSprite.y < 30 * 70)
            npcSprite.setVelocityY(400)
          if (npcSprite.y > 100 * 70)
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
            npcSprite.setVelocityY(-200);
          } else if (npcDirection == "down") {
            npcSprite.setVelocityY(200);
          } else if (npcDirection == "left") {
            npcSprite.setVelocityX(-200);
          } else {
            npcSprite.setVelocityX(200);
          }
        },
        loop: true
      });
    }, null, this);
  };
  update() {
    if (this.player.x < 15 * 70)
      this.player.x = 225 * 70;
    if (this.player.x > 225 * 70)
      this.player.x = 15 * 70;
    if (this.player.y < 15 * 70)
      this.player.y = 225 * 70;
    if (this.player.y > 225 * 70)
      this.player.y = 15 * 70;

    if (targetSprite.x < 15 * 70)
      targetSprite.x = 225 * 70;
    if (targetSprite.x > 225 * 70)
      targetSprite.x = 15 * 70;
    if (targetSprite.y < 15 * 70)
      targetSprite.y = 225 * 70;
    if (targetSprite.y > 225 * 70)
      targetSprite.y = 15 * 70;

    if (this.player.flipX == true)
      this.playerBulletCollider.setOffset(-12, -56);
    else
      this.playerBulletCollider.setOffset(12, -56);

    if (mouse.isDown && gunDrawn == true && fired == false) {
      if (bullet != undefined)
        bullet.destroy();
      bullet = this.physics.add.sprite(this.player.x, this.player.y, "bullet").setScale(2.5).setDepth(2);
      this.autoBulletDestroyer = this.time.addEvent({
        delay: 3000,
        callback:() =>{
          if (bullet != undefined && this.physics.overlap(bullet, this.npcSpawner) == false){
            bullet.destroy();
            bullet = this.physics.add.sprite(0, 0, "bullet").setScale(4).setDepth(3);
          }
        }
      });
      this.physics.add.collider(bullet, collidableLayer);
      this.physics.add.collider(bullet, targetSprite, () => {
				score = (110 - seconds/2) - civilianKills * 10;
				switch (Math.floor(score/10)){
					case 10:
						rank = "S+";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 600);
            localStorage.setItem("money", this.newMoney);
					case 9:
						rank = "S";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 500);
            localStorage.setItem("money", this.newMoney);
					case 8:
						rank = "A+";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 400);
            localStorage.setItem("money", this.newMoney);
					case 7:
						rank = "A";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 300);
            localStorage.setItem("money", this.newMoney);
					case 6:
						rank = "B+";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 200);
            localStorage.setItem("money", this.newMoney);
					case 5:
						rank = "B";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 150);
            localStorage.setItem("money", this.newMoney);
					case 4:
						rank = "C";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 100);
            localStorage.setItem("money",this.newMoney);
					case 3:
						rank = "D";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 60);
            localStorage.setItem("money",this.newMoney);
					case 2:
						rank = "E";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 40);
            localStorage.setItem("money",this.newMoney);
					case 1:
						rank = "F";
						break;
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 20);
            localStorage.setItem("money",this.newMoney);
					default:
						rank = "F";
            this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 20);
            localStorage.setItem("money",this.newMoney);
				};
        if(localStorage.getItem("bountyHunted") == false){
          localStorage.setItem("bountyHunted", true);
          this.scene.start("duelBoss");
        }
				this.scene.start("scoreboard");
      });
      bullet.setBounce(1);
      var bulletX, bulletY;
      if (game.input.activePointer.x >= 400)
        bulletX = this.player.x + (game.input.activePointer.x - 400)
      else
        bulletX = this.player.x - (400 - game.input.activePointer.x)
      if (game.input.activePointer.y >= 225)
        bulletY = this.player.y + (game.input.activePointer.y - 225)
      else
        bulletY = this.player.y - (225 - game.input.activePointer.y)

      this.physics.moveTo(bullet, bulletX, bulletY, 500);

      fired = true;
      bullets = bullets - 1;
      bulletText.destroy();
      bulletText = this.add.text(-120, -60, "Bullets: " + bullets, {color: "black", fontFamily: "litebulb", fontSize: "14px"}).setDepth(100).setScrollFactor(0);
      if (bullets >= 1) {
        this.sound.play("shoot", {
          volume: .1
        });
        this.time.addEvent({
          delay: 500,
          callback: () => {
            fired = false
          }
        })
      } else {
        this.sound.play("reload", {
          volume: .25
        });
        reloadingText.setVisible(true);
        this.time.addEvent({
          delay: 2500,
          callback: () => {
            bullets = 6;
            fired = false;
            reloadingText.setVisible(false)
						bulletText.destroy();
            bulletText = this.add.text(-120, -60, "Bullets: " + bullets, {color: "black", fontFamily: "litebulb", fontSize: "14px"}).setDepth(100).setScrollFactor(0);
					}
        })
      }
    };
    bulletNpcCollider.x = bullet.x;
    bulletNpcCollider.y = bullet.y;
    if (gunDrawn == true && targetOnSight == true) {
      if (firstEnemyShot == false)
        this.targetCombat();
      else;
    }
  }
  targetCombat() {
    //shoot once
    var enemyBullet = this.physics.add.sprite(targetSprite.x, targetSprite.y, "bullet").setScale(2.5).setDepth(2);
    this.physics.add.collider(enemyBullet, collidableLayer);
		enemyBullet.setBounce(1);
		this.physics.moveTo(enemyBullet, this.player.x, this.player.y, 500);
    targetSprite.setVelocity(0);
    targetSprite.play(target + "Shoot");
    firstEnemyShot = true;
    //start running
    this.onTheRun = this.time.addEvent({
      delay: 2000,
      callback: () => {
				targetSprite.play(target + "Walk");
        if (this.player.x - targetSprite.x < 0 && targetSprite.x < 100 * 70)
          targetSprite.setVelocityX(200);
        else
          targetSprite.setVelocityX(-400);
        if (this.player.x - targetSprite.x > 0 && targetSprite.x > 50 * 70)
          targetSprite.setVelocityX(-200);
        else
          targetSprite.setVelocityX(400);

        if (this.player.y - targetSprite.y < 0 && targetSprite.y < 100 * 70)
          targetSprite.setVelocityY(200);
        else
          targetSprite.setVelocityY(-400);
        if (this.player.y - targetSprite.y > 0 && targetSprite.y > 50 * 70)
          targetSprite.setVelocityY(-200);
        else
          targetSprite.setVelocityY(400);

				if (Math.abs(targetSprite.x - this.player.x) > 400 || Math.abs(targetSprite.y - this.player.y) > 400) {
					targetSprite.setVelocity(0);
					this.shootin.paused = false;
					this.onTheRun.paused = true;
				}
      },
      loop: true
    });
    //stop and shoot if you have enough distance
    this.shootin = this.time.addEvent({
      delay: 750,
      callback: () => {
        this.onTheRun.paused = true;
        targetSprite.setVelocity(0);
        targetSprite.play(target + "Shoot");
        var enemyBullet = this.physics.add.sprite(targetSprite.x, targetSprite.y, "bullet").setScale(2.5).setDepth(2);
        this.physics.moveTo(enemyBullet, this.player.x, this.player.y, 500);
				this.physics.add.collider(this.player, enemyBullet, ()=>{
					enemyBullet.destroy();
					this.scene.start("map6");
				});
				this.sound.play("shoot", {volume:.1});
				if (Math.abs(targetSprite.x - this.player.x) < 250 && Math.abs(targetSprite.y - this.player.y) < 250) {
					this.onTheRun.paused = false;
          this.shootin.paused = true;
        }
      },
      loop: true
    });
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
    this.player.setVelocityY(-200);
    this.playerBulletCollider.setVelocityY(-200);
    this.npcSpawner.setVelocityY(-200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  down() {
    gunDrawn = false;
    this.player.play("player"+horse+"Walk");
    this.player.setVelocityY(200);
    this.playerBulletCollider.setVelocityY(200);
    this.npcSpawner.setVelocityY(200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  left() {
    gunDrawn = false;
    this.player.play("player"+horse+"Walk");
    this.player.setVelocityX(-200);
    this.player.flipX = true;
    this.player.body.setOffset(0, 62);
    this.playerBulletCollider.setVelocityX(-200);
    this.npcSpawner.setVelocityX(-200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  right() {
    gunDrawn = false;
    this.player.play("player"+horse+"Walk");
    this.player.setVelocityX(200);
    this.player.flipX = false;
    this.player.body.setOffset(12, 62);
    this.playerBulletCollider.setVelocityX(200);
    this.npcSpawner.setVelocityX(200);
    this.textBox.setVisible(false);
    this.text.text = "";
  }
  release() {
    this.player.setVelocity(0);
    this.player.play("player"+horse+"Idle");
    this.playerBulletCollider.setVelocity(0);
    this.npcSpawner.setVelocity(0);
  }
  dodge(){
    gunDrawn = false;
    this.player.play("player"+horse+"Idle");
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
  };
}
