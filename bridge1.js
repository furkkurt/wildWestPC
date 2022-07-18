class bridge1 extends Phaser.Scene{
  constructor(){
    super("bridge1")
  }
  create(){
    const sky = this.add.tileSprite(0,0,5000,300,"sky").setOrigin(0).setScale(.7).setScrollFactor(0).setDepth(2);
    const bg = this.add.tileSprite(0,125,6000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,125,9999,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,125,9999,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-100,9999,9999,"race1").setOrigin(0).setScrollFactor(0).setDepth(2).setScale(.55);
    this.bridge = this.add.tileSprite(0,350,9999,32,"bridge").setOrigin(0).setScrollFactor(0).setDepth(3).setScale(2);  
    this.time.addEvent({
      delay: 25,
      callback:() =>{
        sky.x -= .025;
      }, loop: true
    });

    this.player = this.physics.add.sprite(100,300,"player").setDepth(4).setScale(1.4);
    this.enemy = this.physics.add.sprite(710, 290, "bran").setDepth(4).setScale(1.5);
    this.enemy.flipX = true;
    this.text = this.add.text(300,0,"Ready",{fontFamily:"litebulb", fontSize:"64px", color:"black"}).setDepth(99);
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
        this.rivalDelay = Math.floor(Math.random()*10) * 100;
        this.text.setText("Shoot!");
        this.shoot.on("pointerdown", () => {
          this.shoot.setVisible(false);
          this.player.play("playerShoot");
          this.enemy.play("branShoot");
          this.text.setVisible(false);
          this.sound.play("shoot", {volume: .1});
          this.delayCounter.paused = true;
          if(this.delay > this.rivalDelay){
            //die
            localStorage.clear();
            this.lost = this.add.text(300,-30,"You lost.", {fontFamily: "litebulb", fontSize: "96px", color: "black"});
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
            this.textBox = this.physics.add.sprite(550, 75, "quoteBox").setScale(8).setDepth(999).setScrollFactor(0).setVisible(false);
            this.textBox.alpha = .8;
            this.time.addEvent({
              delay: 1000,
              callback:() =>{
                this.textBox.setVisible(true);
                this.text2 = this.add.text(295, 40, "You got me kid, you got me good...", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);
                this.time.addEvent({
                  delay: 3000,
                  callback:() =>{
                    this.enemy.setTexture("branVest");
                    this.text2.setText("You got me kid, you got me good...\nIn my book tho, if you're not cheatin', you're not\ntryin', so I never go for a duel without my vest!", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);
                    this.time.addEvent({
                      delay: 7000,
                      callback:() =>{
                        this.textBox.x -= 300;
                        this.text2.x -= 250;
                        this.text2.setText("You slimy little bastard!");
                        this.time.addEvent({
                          delay: 1500,
                          callback:() =>{
                            this.player.play("playerWalk");
                            this.player.setVelocityX(400);
                            this.time.addEvent({
                              delay: 1000,
                              callback:() =>{
                                this.scene.start("bridge2");
                              }
                            })
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
            this.add.text(300,-30,"Tie.", {fontFamily: "litebulb", fontSize: "96px", color: "black"}); 
            
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
            this.time.addEvent({delay: 1000,callback:() =>{this.enemy.setRotation(-1.57); this.enemy.x-=50; this.enemy.y +=50; this.enemy.play("branIdle")}});
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
