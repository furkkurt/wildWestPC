class deadDuel extends Phaser.Scene{
 constructor(){
    super("deadDuel")
  }
  create(){
    localStorage.setItem("location", "deadDuel");
    const sky = this.add.tileSprite(0,-120,5000,1000,"sky").setOrigin(0).setScale(.2).setScrollFactor(0);
    this.time.addEvent({
      delay: 25,
      callback:() =>{
        sky.x -= .1;
      }, loop: true
    });
    const bg = this.add.tileSprite(0,0,6000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0);
    const far = this.add.tileSprite(0,0,9999,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0);
    const mid = this.add.tileSprite(0,0,9999,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0);
    const close = this.add.tileSprite(0,0,9999,1000,"race1").setOrigin(0).setScale(.2).setScrollFactor(0);
    const duello = this.add.tileSprite(0,100,9999,800,"duello").setOrigin(0).setScrollFactor(0).setScale(.5);

    this.player = this.physics.add.sprite(100,300,"player").setDepth(9).setOrigin(0);
    this.enemy = this.physics.add.sprite(700, 375, "hickok").setDepth(9);
    this.enemy.flipX = true;
    this.text = this.add.text(300,30,"Ready",{fontFamily:"litebulb", fontSize:"48px", color:"black"});
    this.time.addEvent({
      delay: 1000,
      callback:() =>{
        this.text.setText("Steady");
      }
    });
    this.shoot = this.physics.add.sprite(0,0).setOrigin(0).setDepth(99).setInteractive().setScale(32).setVisible(false);
    this.early = false;    
    this.shootEarly = this.physics.add.sprite(0,0).setOrigin(0).setDepth(98).setInteractive().setScale(32);
    this.shootEarly.on("pointerdown", () => {
      this.early = true;
      this.shoot.setVisible(false);
      this.time.addEvent({
        delay: 1000,
        callback:() =>{
          this.shoot.setVisible(true);
        }
      })
    });
    this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.shootEarly.setVisible(false);
      }
    })
    this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.shoot.setVisible(true);
        this.delay = 0;
        this.delayCounter = this.time.addEvent({
          delay: 100,
          callback:() =>{
            this.delay += 100
          },loop: true
        })
        this.rivalDelay = Math.floor(Math.random()*10) * 10;
        this.text.setText("Shoot!");
        this.shoot.on("pointerdown", () => {
          if(this.early == false)
            this.shoot.setVisible(false);
          this.player.play("playerShoot");
          this.enemy.play("hickokKnife");
          this.enemy.x = 40;
          this.sound.play("swosh", {volume: 8});
          this.text.setVisible(false);
          this.sound.play("shoot", {volume: .1});
          this.delayCounter.paused = true;
          if(this.delay > this.rivalDelay){
            //die
            localStorage.clear();
            this.lost = this.add.text(50,30,"You lost your body and your soul...", {fontFamily: "litebulb", fontSize: "38px", color: "black"});
            this.time.addEvent({delay: 1000,callback:() =>{this.player.setRotation(1.57); this.player.x+=140; this.player.y += 90; this.player.play("playerIdle")}});
            this.time.addEvent({
              delay: 2000,
              callback:() =>{
                this.filter = this.add.sprite(150,420,"redFilter").setOrigin(0).setDepth(99);
                this.filter.alpha = 0;
                this.time.addEvent({
                  delay: 50,
                  callback:() =>{
                    this.filter.scale += .02;
                    this.filter.x -= .75;
                    this.filter.y -= .26;
                    this.filter.alpha += .004;
                  }, repeat: 100
                });
                this.time.addEvent({
                  delay: 6000,
                  callback:() =>{
                    this.time.addEvent({
                      delay: 50,
                      callback:() =>{
                        this.filter.alpha -= .004
                      }, repeat: 100
                    });
                    this.shoot.setVisible(true);
                    this.shoot.on("pointerdown", () => {window.location.reload()});
                  }
                })
              }
            })
          }
          else if(this.delay < this.rivalDelay){
            this.sound.play("shoot", {volume: .2});
            this.shoot.setVisible(false);
            this.loot = (Math.floor(Math.random() * 5) + 1) * 20;
            this.add.text(300,0,"You win.", {fontFamily: "litebulb", fontSize: "48px", color: "black"}); 
            this.add.text(150, 50,"   You did it! You beat the dead man!\nTown folks reward you with "+this.loot*10+" bucks!", {fontFamily: "litebulb", fontSize: "32px", color: "yellow"}); 

            this.enemy.x = 175; 
            this.enemy.play("hickokKnife");
            this.time.addEvent({
              delay: 2000,
              callback:() =>{
                this.time.addEvent({
                  delay: 50,
                  callback:() =>{
                    this.enemy.alpha -= .01;
                  }, repeat: 100
                });
                this.time.addEvent({
                  delay: 6000,
                  callback:() =>{
                    this.time.addEvent({
                      delay: 1000,
                      callback:() =>{
                        this.textBox = this.physics.add.sprite(430, 350, "quoteBox").setScale(7).setDepth(103).setScrollFactor(0);
                        this.textBox.alpha = .8;
                        this.text = this.add.text(225, 300, "You are a true cowboy...", {fontFamily: "litebulb", color: "black", fontSize: "24px"}).setDepth(104).setScrollFactor(0);
                        this.time.addEvent({
                          delay: 2000,
                          callback:() =>{
                            localStorage.setItem("duelled", "true");
                            let preMoney = localStorage.getItem("money");
                            this.loot = this.loot*10;
                            let postMoney = parseInt(preMoney) + this.loot;
                            localStorage.setItem("money", postMoney);
                            localStorage.setItem("location", "town"); 
                            window.location.reload()
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
          else{
            this.shoot.setVisible(false);
            this.add.text(300,-30,"Tie.", {fontFamily: "litebulb", fontSize: "48px", color: "black"}); 
            
            localStorage.clear();
            this.time.addEvent({delay: 1000,callback:() =>{this.player.setRotation(1.57); this.player.x+=140; this.player.y += 90; this.player.play("playerIdle")}});
            this.time.addEvent({
              delay: 2000,
              callback:() =>{
                this.filter = this.add.sprite(150,420,"redFilter").setOrigin(0).setDepth(99);
                this.filter.alpha = 0;
                this.time.addEvent({
                  delay: 50,
                  callback:() =>{
                    this.filter.scale += .02;
                    this.filter.x -= .75;
                    this.filter.y -= .26;
                    this.filter.alpha += .004;
                  }, repeat: 100
                });
                this.time.addEvent({
                  delay: 6000,
                  callback:() =>{
                    this.time.addEvent({
                      delay: 50,
                      callback:() =>{
                        this.filter.alpha -= .004
                      }, repeat: 100
                    })
                  }
                })
              }
            })
            this.time.addEvent({delay: 1000,callback:() =>{this.enemy.setRotation(-1.57); this.enemy.x-=50; this.enemy.y +=50; this.enemy.play(this.enemyName + "Idle")}});
            this.filter2 = this.add.sprite(150,420,"redFilter").setOrigin(0).setDepth(99);
            this.filter2.alpha = 0;
            this.time.addEvent({
              delay: 2000,
              callback:() =>{
                this.filter2 = this.add.sprite(625,410,"redFilter").setOrigin(0).setDepth(99);
                this.filter2.alpha = 0;
                this.time.addEvent({
                  delay: 50,
                  callback:() =>{
                    this.filter2.scale += .02;
                    this.filter2.x -= .75;
                    this.filter2.y -= .26;
                    this.filter2.alpha += .004;
                  }, repeat: 100
                });
                this.time.addEvent({
                  delay: 6000,
                  callback:() =>{
                    this.time.addEvent({
                      delay: 50,
                      callback:() =>{
                        this.filter2.alpha -= .004
                      }, repeat: 100
                    });
                    this.shoot.setVisible(true);
                    this.shoot.on("pointerdown", () => {console.log("asd");window.location.reload()});
                  }
                })
              }
            })

          }
        });
      }
    });
  }
}
