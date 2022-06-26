var music;
class prologue2 extends Phaser.Scene {
  constructor() {
    super("prologue2");
  };
  preload() {};
  create() {
    this.filter3 = this.add.sprite(0,0,"blackFilter").setOrigin(0).setScale(100).setDepth(999);
    this.time.addEvent({
      delay: 25,
      callback:() =>{
        this.filter3.alpha -= .01;
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

    this.player = this.physics.add.sprite(10.5 * 70, 3.75 * 70, "player").setScale(2).setDepth(2.01);
    this.player.play("playerChildIdle");
    this.player.body.setSize(this.player.width / 2, this.player.height / 4);
    this.player.setImmovable();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(.75);
    
    this.mom = this.physics.add.sprite(6.5*70,6*70, "mom").setScale(1.6).setDepth(2.03);
    this.mom.play("momIdle");
    borderLayer.setCollisionByExclusion([-1]);
    collidableLayer.setCollisionByExclusion([-1]);
    upperLayer1.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, borderLayer);
    this.physics.add.collider(this.player, collidableLayer);
    
    this.textBox = this.physics.add.sprite(650, 440, "quoteBox").setScale(9).setDepth(101).setScrollFactor(0).setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(400, 360, "", {fontFamily: "litebulb", color: "black", fontSize: "23px"}).setDepth(102).setScrollFactor(0);
    
    this.madHatBran = this.physics.add.sprite(11 * 70, 2.5 * 70, "bran").setScale(1.5).setDepth(2.01).setVisible(false);
    this.father = this.physics.add.sprite(11 * 70, 4 * 70, "father").setScale(1.5).setDepth(2.01).setVisible(false);
    this.father.play("fatherShoot");
    this.father.flipX = true;

    this.textBox.setVisible(true);
    this.text.setText("Come here big boy, dinner's ready!");
    this.time.addEvent({
      delay: 3000,
      callback:() =>{
        this.player.flipX = true;
        this.player.setVelocity(-225, 150);
        this.player.play("playerChildWalk");
        this.sound.play("swosh");
        this.time.addEvent({
          delay: 500,
          callback:() =>{
            this.player.setVelocity(0);
            this.player.play("playerChildIdle");
            this.time.addEvent({
              delay: 1000,
              callback:() =>{
                this.text.setText("Not so fast, 'big boy',");
                //play knock knock
                this.time.addEvent({
                  delay: 2000,
                  callback:() =>{
                    this.sound.stopAll();
                    this.sound.play("doorKick", {volume: .25});
                    this.sound.play("branGoing", {volume: 6});
                    this.text.setText("Not so fast, 'big boy',\nfirst you tell me where to find your dad.\nThat bastard owes me BIIIG time!");
                    music = this.sound.add("trainRobbery");
                    music.play();
                    this.madHatBran.setVisible(true);
                    this.time.addEvent({
                      delay: 2000,
                      callback:() =>{
                        this.branWalking = this.sound.add("walkOnWood", {volume: 1.25});
                        this.branWalking.setLoop(true);
                        this.branWalking.play();
                        this.madHatBran.flipX = true;
                        this.madHatBran.play("branWalk");
                        this.madHatBran.setVelocity(-25, 17);
                        this.time.addEvent({
                          delay: 1000,
                          callback:() =>{
                            this.player.setVelocity(-52, 0);
                            this.player.flipX = false;
                            this.mom.setVelocity(-15);
                            this.player.play("playerChildWalk");
                            this.mom.play("momWalk");
                            this.time.addEvent({
                              delay: 4000,
                              callback:() =>{
                                this.text.setText("S- Stay away from my son!");
                                this.sound.play("mom", {volume: 3});
                                this.time.addEvent({
                                  delay: 2000,
                                  callback:() =>{
                                    this.branWalking.pause();
                                    this.sound.play("reload");
                                    this.madHatBran.setVelocity(0);
                                    this.madHatBran.play("branIdle");
                                    this.player.setVelocity(-20,0);
                                    this.mom.setVelocity(-20,0);
                                    this.time.addEvent({
                                      delay: 1000,
                                      callback:() =>{
                                        this.madHatBran.play("branShoot");
                                        this.text.setText("Tell me where your husband is woman!\nOr else...");
                                        this.sound.play("branKill", {volume: 7});
                                        this.time.addEvent({
                                          delay: 6000,
                                          callback:() =>{
                                            this.mom.setVelocity(0);
                                            this.player.setVelocity(0);
                                            this.mom.play("momIdle");
                                            this.player.play("playerChildIdle");
                                            this.time.addEvent({
                                              delay: 2000,
                                              callback:() =>{
                                                this.sound.play("doorOpen", {volume: 4});
                                                this.sound.play("reload");
                                                this.father.setVisible(true);
                                                this.text.setText("Stay away from my family Bran!");
                                                this.sound.play("fatherNo1");
                                                this.camera = this.physics.add.sprite(this.player.x,this.player.y).setVelocity(50,0);
                                                this.cameras.main.startFollow(this.camera);
                                                this.time.addEvent({
                                                  delay: 5000,
                                                  callback:() =>{
                                                    this.camera.setVelocity(0);
                                                    this.time.addEvent({
                                                      delay: 2000,
                                                      callback:() =>{
                                                        this.text.setText("Well well well...");
                                                        this.sound.play("branLaugh", {volume: 5});
                                                        this.time.addEvent({
                                                          delay: 2500,
                                                          callback:() =>{
                                                            this.madHatBran.flipX = false;
                                                            this.sound.play("swosh");
                                                            this.madHatBran.play("branIdle");
                                                            this.text.setText("A real man should be loyal to his debts,\nDon't you think so Adam?");
                                                            this.sound.play("branUnderstand", {volume: 10});
                                                            this.time.addEvent({
                                                              delay: 5000,
                                                              callback:() =>{
                                                                this.text.setText("What are you still totin' that gun for?\nAre you gonna shoot a fella who's asking\nfor his hard earned money?");
                                                                this.sound.play("branLaugh", {volume: 5});
                                                                this.sound.play
                                                                this.time.addEvent({
                                                                  delay: 5000,
                                                                  callback:() =>{
                                                                    this.text.setText("You might be right Bran, theres no need to\ngun play here.");
                                                                    this.sound.play("fatherYeah");
                                                                    this.time.addEvent({
                                                                      delay: 2000,
                                                                      callback:() =>{
                                                                        music.volume = .3;
                                                                        this.father.play("fatherIdle");
                                                                        this.time.addEvent({
                                                                          delay: 3000,
                                                                          callback:() =>{
                                                                            this.text.setText("Now, about my so called 'debt', We had an\nagreement and I'm paying it monthly.\nIt'll be over by the end of the year.");
                                                                            this.sound.play("fatherDone");
                                                                            this.time.addEvent({
                                                                              delay: 7000,
                                                                              callback:() =>{
                                                                                this.text.setText("You and I both know that-");
                                                                                this.sound.play("fatherHey");
                                                                                this.time.addEvent({
                                                                                  delay: 1000,
                                                                                  callback:() =>{
                                                                                    this.sound.play("shoot");
                                                                                    music.volume = 1.5;
                                                                                    this.madHatBran.play("branShoot");
                                                                                    this.time.addEvent({
                                                                                      delay: 250,
                                                                                      callback:() =>{
                                                                                        this.text.setText("NOOOOo!\nNO!");
                                                                                        this.sound.play("mom", {volume: 6});
                                                                                      }
                                                                                    })
                                                                                    this.time.addEvent({
                                                                                      delay: 1000,
                                                                                      callback:() =>{
                                                                                        this.father.setRotation(-1.57); this.father.x-=50; this.father.y +=50;
                                                                                        this.filter = this.add.sprite(700,335,"redFilter").setDepth(2.01).setOrigin(0);
                                                                                        this.filter.alpha = 0;
                                                                                          this.time.addEvent({
                                                                                            delay: 2000,
                                                                                            callback:() =>{
                                                                                              this.time.addEvent({
                                                                                                delay: 50,
                                                                                                callback:() =>{
                                                                                                  this.filter.scale += .02;
                                                                                                  this.filter.x -= .75;
                                                                                                  this.filter.y -= .26;
                                                                                                  this.filter.alpha += .004;
                                                                                                }, repeat: 100
                                                                                              });
                                                                                              this.text.setText("I'm MAD HAT BRAN! You fuck with me,\nyou're fuckin' with the best! The best,\nold man! Do you hear me!?");
                                                                                              this.sound.play("branListen", {volume: 10})
                                                                                              this.time.addEvent({
                                                                                                delay: 3000,
                                                                                                callback:() =>{
                                                                                                  this.branWalking.play();
                                                                                                  this.madHatBran.play("branWalk");
                                                                                                  this.madHatBran.setVelocity(25,-17);
                                                                                                  this.time.addEvent({
                                                                                                    delay: 5000,
                                                                                                    callback:() =>{
                                                                                                      this.branWalking.pause();
                                                                                                      this.madHatBran.setVisible(false);
                                                                                                      this.madHatBran.setVelocity(0);
                                                                                                      this.time.addEvent({
                                                                                                        delay: 1000,
                                                                                                        callback:() =>{
                                                                                                          this.mom.setVelocity(450,-5);
                                                                                                          this.player.setVelocity(350,-100);
                                                                                                          this.mom.play("momWalk");
                                                                                                          this.player.play("playerChildWalk");
                                                                                                          this.time.addEvent({
                                                                                                            delay: 1333,
                                                                                                            callback:() =>{
                                                                                                              this.mom.setVelocity(0);
                                                                                                              this.mom.flipX = true;
                                                                                                              this.player.setVelocity(0);
                                                                                                              this.mom.play("momIdle");
                                                                                                              this.player.play("playerChildIdle");
                                                                                                              this.time.addEvent({
                                                                                                                delay: 1000,
                                                                                                                callback:() =>{
                                                                                                                  this.text.setText("Avenge... me... son.");
                                                                                                                  this.sound.play("fatherAhah", {volume: 2});
                                                                                                                  this.filter2 = this.add.sprite(0,0,"blackFilter").setOrigin(0).setScale(100).setDepth(999);
                                                                                                                  this.filter2.alpha = 0;
                                                                                                                  this.time.addEvent({
                                                                                                                    delay: 2000,
                                                                                                                    callback:() =>{
                                                                                                                      this.time.addEvent({
                                                                                                                        delay: 25,
                                                                                                                        callback:() =>{
                                                                                                                          this.filter2.alpha += .01;
                                                                                                                        },repeat: 100
                                                                                                                      })
                                                                                                                      this.time.addEvent({
                                                                                                                        delay: 5000,
                                                                                                                        callback:() =>{
                                                                                                                          music.pause();
                                                                                                                          this.scene.start("prologue3");
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
          });
        }
      });
    }
  }
