class prologue4 extends Phaser.Scene{
  constructor(){
    super("prologue4")
  }
  create(){
    music.volume = 1;
    this.filter3 = this.add.sprite(0,0,"blackFilter").setOrigin(0).setScale(100).setDepth(998);
    this.time.addEvent({
      delay: 25,
      callback:() =>{
        this.filter3.alpha -= .01;
      },repeat: 100
    })
    const sky = this.add.tileSprite(0,-120,5000,1000,"sky").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const bg = this.add.tileSprite(0,-25,6000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,-25,9999,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,-25,9999,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-25,9999,1000,"race1").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const court = this.add.tileSprite(0,50,9999,400,"barn").setOrigin(0).setScrollFactor(0);

    this.move = this.time.addEvent({
      delay: 20,
      callback: () => {
        sky.x -= .0625;
        bg.x -= .125;
        far.x -= .25;
        mid.x -= .5;
        close.x -= 1;
        court.x -= 2;
      }, loop: true
    });

    this.reset = this.time.addEvent({
      delay: 25000,
      callback:() =>{
        sky.x = bg.x = far.x = mid.x = close.x = court.x = 0;
      }, loop: true
    });

    this.player = this.physics.add.sprite(375,225,"playerYouth").setDepth(3);
    this.player.play("playerYouthWalk");

    this.filter2 = this.add.sprite(0,0,"nightFilter").setOrigin(0).setScale(100).setDepth(999);
    this.filter2.alpha = 0;
    this.time.addEvent({
      delay: 4000,
      callback:() =>{
        this.time.addEvent({
          delay: 25,
          callback:() =>{
            this.filter2.alpha += .01;
          },repeat: 90
        });
        this.time.addEvent({
          delay: 4000,
          callback:() =>{
            this.player.play("playerWalk");
            this.time.addEvent({
              delay: 25,
              callback:() =>{
                this.filter2.alpha -= .01;
              }, repeat: 90
            });
            this.time.addEvent({
              delay: 4000,
              callback:() =>{
                localStorage.setItem("location", "town");
                this.time.addEvent({
                  delay: 25,
                  callback:() =>{
                    this.filter3.alpha += .01;
                  }, repeat: 100
                });
                this.title=this.add.sprite(0,0,"title").setOrigin(0).setDepth(999);
                this.title.alpha = 0;
                this.time.addEvent({
                  delay: 4000,
                  callback:() =>{
                    this.time.addEvent({
                      delay: 25,
                      callback:() =>{
                        this.title.alpha += .01;
                      }, repeat: 100
                    })
                  }
                })
                this.time.addEvent({
                  delay: 10000,
                  callback:() =>{
                    this.scene.start("boot");
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
