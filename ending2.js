class ending2 extends Phaser.Scene{
  constructor(){
    super("ending2")
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
    
    this.player = this.physics.add.sprite(400,270,"player").setDepth(4).setScale(1.4);
    this.player.flipX = true;
    this.enemy = this.physics.add.sprite(200, 360, "bran").setDepth(2.5).setScale(1.5);
    this.enemy.play("branHang");

    this.textBox = this.physics.add.sprite(550, 75, "quoteBox").setScale(8).setDepth(999).setScrollFactor(0).setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(295, 40, "Bran swore to live an honest life from now on\nand you parted ways. He was later arrested tho...", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);
    this.text2 = this.add.text(295, 100, "A game by makinDAGames", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);
    this.text3 = this.add.text(295, 140, "Special thanks to creators on opengameart.org <3", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);
    this.music = this.sound.add("ending2", {volume: 0});
    this.text.alpha = this.text2.alpha = this.text3.alpha = 0;

    this.filter = this.add.sprite(0,0,"blackFilter").setOrigin(0).setScale(100).setDepth(998);
    this.title=this.add.sprite(0,0,"title").setOrigin(0).setDepth(999);
    this.filter.alpha = this.title.alpha = 0;

    this.player.play("playerShoot");
    this.time.addEvent({
      delay: 1500,
      callback:() =>{
        this.player.play("playerIdle")
      }
    })
    this.time.addEvent({
      delay: 4000,
      callback:() =>{
        this.music.play();
        this.time.addEvent({
          delay: 200,
          callback:() =>{
            this.music.volume+= .01;
          }, repeat: 100
        })
        this.enemy.setVelocityY(-40);
        this.time.addEvent({
          delay: 1000,
          callback:() =>{
            this.enemy.play("branIdle");
            this.enemy.setVelocityY(0);
            this.time.addEvent({
              delay: 1000,
              callback:() =>{
                this.enemy.setVelocityY(-40);
                this.time.addEvent({
                  delay: 500,
                  callback:() =>{
                    this.enemy.setDepth(this.player.depth);
                    this.time.addEvent({
                      delay: 500,
                      callback:() =>{
                        this.enemy.setVelocity(0);
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

    this.time.addEvent({
      delay: 10000,
      callback:() =>{
        this.time.addEvent({
          delay: 30,
          callback:() =>{
            this.text.alpha += .01;
            this.time.addEvent({
              delay: 5000,
              callback:() =>{
                this.time.addEvent({
                  delay: 30,
                  callback:() =>{
                    this.text2.alpha += .01;
                    this.time.addEvent({
                      delay: 5000,
                      callback:() =>{
                        this.time.addEvent({
                          delay: 30,
                          callback:() =>{
                            this.text3.alpha += .01;
                          }, repeat: 100
                        })
                      }
                    })
                  }, repeat: 100
                })
              }
            })
          }, repeat: 100
        })
      }
    })

    this.time.addEvent({
      delay: 30000,
      callback:() =>{
        this.time.addEvent({
          delay: 50,
          callback:() =>{
            this.filter.alpha += .01;
          }, repeat: 100
        })
        this.time.addEvent({
          delay: 4000,
          callback:() =>{
            this.time.addEvent({
              delay: 50,
              callback:() =>{
                this.title.alpha += .01;
              }, repeat: 100
            })
          }
        })
      }
    })

    this.time.addEvent({
      delay: 55000,
      callback:() =>{
        this.time.addEvent({
          delay: 50,
          callback:() =>{
            this.music.volume -= .01;
            this.title.alpha -= .01;
          }, repeat: 100
        })
      }
    })


  }
}
