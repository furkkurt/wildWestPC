class prologue extends Phaser.Scene{
  constructor(){
    super("prologue")
  }
  create(){
    this.skip = this.add.text(710, 10, "SKIP", {fontFamily: "litebulb", color: "black", fontSize: "28px"}).setDepth(999).setInteractive();
    this.skip.on("pointerdown", ()=>{
      localStorage.setItem("location", "town");
      this.scene.start("boot");
    })
    this.sound.stopAll();
    this.sound.play("Tequila", {
      loop: true,
      volume: .15
    });
    const sky = this.add.tileSprite(0,-120,5000,1000,"sky").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    this.time.addEvent({
      delay: 25,
      callback:() =>{
        sky.x -= 0.1;
      }, loop: true
    })    
    this.reset = this.time.addEvent({
      delay: 25000,
      callback:() =>{
        sky.x = 0;
      }, loop: true
    });
    const bg = this.add.tileSprite(0,-25,4000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,-25,4000,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,-25,4000,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-25,4000,1000,"race1").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    this.add.sprite(0,-288,"house").setOrigin(0).setDepth(3);
    this.add.sprite(340,120,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(390,120,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(440,120,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(490,120,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(540,120,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(590,120,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(640,120,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(690,120,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    
    this.bottle1 = this.physics.add.sprite(0,97,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
    this.bottle2 = this.physics.add.sprite(0,97,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
    this.bottle3 = this.physics.add.sprite(0,97,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
    this.rand1 = Math.floor(Math.random() * 8);
    this.rand2 = Math.floor(Math.random() * 8);
    this.rand3 = Math.floor(Math.random() * 8);
    this.bottle1.x = 360+(50*this.rand1);
    this.bottle2.x = 360+(50*this.rand2);
    this.bottle3.x = 360+(50*this.rand3);
    this.bottle1.active = this.bottle2.active = this.bottle3.active = true;
    this.bottle1.visible = this.bottle2.visible = this.bottle3.visible = true;
    this.refreshBottles = () => {
      if ((this.bottle1.active == false && this.bottle2.active == false) && this.bottle3.active == false){
        this.rand1 = Math.floor(Math.random() * 8);
        this.rand2 = Math.floor(Math.random() * 8);
        this.rand3 = Math.floor(Math.random() * 8);
        while ((this.rand1 == this.rand2 || this.rand1 == this.rand3) || this.rand2 == this.rand3){
          this.rand1 = Math.floor(Math.random() * 8);
          this.rand2 = Math.floor(Math.random() * 8);
          this.rand3 = Math.floor(Math.random() * 8);
        }
        this.bottle1.x = 360+(50*this.rand1);
        this.bottle2.x = 360+(50*this.rand2);
        this.bottle3.x = 360+(50*this.rand3);
        this.bottle1.active = this.bottle2.active = this.bottle3.active = true;
        this.bottle1.visible = this.bottle2.visible = this.bottle3.visible = true;
      }
    }
    this.textBox = this.physics.add.sprite(230, 350, "quoteBox").setScale(7).setDepth(101).setScrollFactor(0).setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(25, 310, "", {fontFamily: "litebulb", color: "black", fontSize: "21px"}).setDepth(102).setScrollFactor(0);

    //father shoots
    this.father = this.physics.add.sprite(600,320,"father").setDepth(100).setScale(1.4);
    this.father.flipX=true;
    this.child = this.physics.add.sprite(125,150,"playerChild").setDepth(100).setScale(1.5).setVisible(false);
    this.blackFilter = this.add.sprite(0,0,"blackFilter").setScale(100).setDepth(200);
    this.blackFilter.alpha = 0;
    this.time.addEvent({
      delay: 1000,
      callback:() =>{
        this.time.addEvent({delay: 500,callback:() =>{this.father.play("fatherShoot"); this.bottle3.play("bottleBreak");this.sound.play("shoot", {volume:.1})}})
        this.time.addEvent({delay: 750,callback:() =>{this.father.play("fatherIdle")}});
        this.time.addEvent({delay: 1000,callback:() =>{this.father.play("fatherShoot"); this.bottle2.play("bottleBreak");this.sound.play("shoot", {volume:.1})}})
        this.time.addEvent({delay: 1250,callback:() =>{this.father.play("fatherIdle")}});
        this.time.addEvent({delay: 1500,callback:() =>{this.father.play("fatherShoot"); this.bottle1.play("bottleBreak");this.sound.play("shoot", {volume:.1})}})
        this.time.addEvent({delay: 2000,callback:() =>{this.father.play("fatherIdle")}});
        //child comes out
        this.time.addEvent({
          delay: 4000,
          callback:() =>{
            this.sound.play("doorOpen");
            this.child.setVisible(true);
            //child runs
            this.time.addEvent({
              delay: 2000,
              callback:() =>{
                this.sound.play("walkOnSand", {volume: 10});
                this.child.play("playerChildWalk");
                this.child.setVelocity(380,190);
                this.time.addEvent({
                  delay: 1000,
                  callback:() =>{
                    this.child.setVelocity(0);
                    this.child.play("playerChildIdle");
                    this.time.addEvent({
                      delay: 1000,
                      callback:() =>{
                        this.textBox.setVisible(true);
                        this.text.setText("Can I try too, dad?");
                        this.time.addEvent({
                          delay: 3000,
                          callback:() =>{
                            this.sound.play("fatherYeah");
                            this.text.setText("Sure thing son, have a try.\nJust don't tell your ma about it.");
                            this.time.addEvent({
                              delay: 1800,
                              callback: () => {
                                this.time.addEvent({
                                  delay: 20,
                                  callback:() =>{
                                    this.blackFilter.alpha += .025;
                                    if(this.fadeIn == true)
                                      this.blackFilter.alpha -= .05;
                                    if (this.blackFilter.alpha >= 1)
                                      this.fadeIn = true;
                                  }, repeat: 80
                                })
                              }
                            });
                            this.time.addEvent({
                              delay: 3000,
                              callback:() =>{
                                this.sound.play("fatherHey");
                                this.text.setText("If you wanna shoot like a cowboy\nyou better take this hat.");
                              }
                            })
                            this.time.addEvent({
                              delay: 4000,
                              callback:() =>{
                                this.time.addEvent({
                                  delay: 1000,
                                  callback:() =>{
                                    this.sound.play("swosh");
                                    this.child.setTexture("childShoot");
                                  }
                                })
                                this.child.flipX = true;
                                this.sound.play("swosh");
                                this.bottle1 = this.physics.add.sprite(0,97,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
                                this.bottle2 = this.physics.add.sprite(0,97,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
                                this.bottle3 = this.physics.add.sprite(0,97,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
                                this.bottle4 = this.physics.add.sprite(0,97,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
                                this.rand1 = Math.floor(Math.random() * 8);
                                this.rand2 = Math.floor(Math.random() * 8);
                                this.rand3 = Math.floor(Math.random() * 8);
                                this.bottle1.x = 360+(50*this.rand1);
                                this.bottle2.x = 360+(50*this.rand2);
                                this.bottle3.x = 360+(50*this.rand3);
                                this.bottle1.active = this.bottle2.active = this.bottle3.active = true;
                                this.bottle1.visible = this.bottle2.visible = this.bottle3.visible = true;
                                this.bottle1.on("pointerdown", () => {this.sound.play("shoot", {volume:.1}); this.bottle1.setActive(false); this.bottle1.setVisible(false); this.bottles += 1; this.refreshBottles()});
                                this.bottle2.on("pointerdown", () => {this.sound.play("shoot", {volume:.1}); this.bottle2.setActive(false); this.bottle2.setVisible(false); this.bottles += 1; this.refreshBottles()});
                                this.bottle3.on("pointerdown", () => {this.sound.play("shoot", {volume:.1}); this.bottle3.setActive(false); this.bottle3.setVisible(false); this.bottles += 1; this.refreshBottles()});
                                this.bottle4.x = this.bottle3.x;
                                this.bottle4.on("pointerdown", () => {this.sound.play("shoot", {volume:.1}); this.bottle4.setActive(false); this.bottle4.setVisible(false);
                                  this.fadeIn = false;
                                  this.time.addEvent({
                                    delay: 8800,
                                    callback: () => {
                                      this.time.addEvent({
                                        delay: 20,
                                        callback:() =>{
                                          this.blackFilter.alpha += .025;
                                          if(this.fadeIn == true)
                                            this.blackFilter.alpha -= .05;
                                          if (this.blackFilter.alpha >= 1)
                                            this.fadeIn = true;
                                        }, repeat: 80
                                      })
                                    }
                                  });

                                  this.time.addEvent({
                                    delay: 10000,
                                    callback:() =>{
                                      this.bottle1.destroy();
                                      this.bottle2.destroy();
                                      this.bottle3.destroy();
                                      this.sound.play("fatherHow");
                                      this.text.setText("Not bad son, not bad at all!\nYou'll be one hell of a cowboy.\nNow lets go eat.");
                                      this.time.addEvent({
                                        delay: 4000,
                                        callback:() =>{
                                          this.sound.play("fatherThoia");
                                          this.text.setText("You go help mother and\nI'll grab myself some beer.");
                                        }
                                      })
                                      this.time.addEvent({
                                        delay: 8000,
                                        callback:() =>{
                                          this.child.setVelocity(-380,-190);
                                          this.father.setVelocity(0, 250);
                                          this.child.play("playerChildWalk");
                                          this.father.play("fatherWalk");
                                          this.sound.play("walkOnSand", {volume: 10});
                                        }
                                      })
                                      this.time.addEvent({
                                        delay: 9000,
                                        callback:() =>{
                                          this.child.setVelocity(0);
                                          this.father.setVelocity(0);
                                          this.child.setVisible(false);
                                          this.father.setVisible(false);
                                          this.sound.play("doorOpen");
                                        }
                                      });
                                      this.time.addEvent({
                                        delay: 11000,
                                        callback:() =>{
                                          this.madHatBran = this.physics.add.sprite(900, 320, "bran").setScale(1.5).setDepth(998).play("branWalk").setVelocityX(-100);
                                          this.madHatBran.flipX = true;
                                          this.sound.play("walkOnSand", {volume: 10});
                                        }
                                      });
                                      this.filter2 = this.add.sprite(0,0,"blackFilter").setOrigin(0).setScale(100).setDepth(999);
                                      this.filter2.alpha = 0;
                                      this.time.addEvent({
                                        delay: 12000,
                                        callback:() =>{
                                          this.time.addEvent({
                                            delay: 25,
                                            callback:() =>{
                                              this.filter2.alpha += .01;
                                            },repeat: 100
                                          })
                                        }
                                      });
                                      this.time.addEvent({
                                        delay: 14000,
                                        callback:() =>{
                                          this.scene.start("prologue2");
                                        }
                                      })
                                    }
                                  })
                                });
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
        })
      }
    })
  }
}
