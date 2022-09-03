class preBridge2 extends Phaser.Scene{
  constructor(){
    super("preBridge2")
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
    this.textBox = this.physics.add.sprite(550, 75, "quoteBox").setScale(8).setDepth(999).setScrollFactor(0).setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(295, 40, "", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);

    this.player = this.physics.add.sprite(-800,300,"player").setDepth(4).setScale(1.4);
    this.player.play("playerWalk");
    this.player.setVelocityX(200);
    this.madHat = this.physics.add.sprite(710,300,"bran").setDepth(4).setScale(1.5);
    this.madHat.flipX = true;
    this.time.addEvent({
      delay: 4500,
      callback:() =>{
        this.player.play("playerIdle");
        this.player.setVelocity(0);
        this.time.addEvent({
          delay: 2000,
          callback:() =>{
            this.textBox.setVisible(true);
            this.text.setText("Was waiting for you, big boy!");
            this.time.addEvent({
              delay: 2000,
              callback:() =>{
                this.textBox.x -= 300;
                this.text.x -= 250;
                this.text.setText("Mad Hat! How did you?! ...\nWhatever prepare to die!");
                this.time.addEvent({
                  delay: 3000,
                  callback:() =>{
                    this.textBox.x += 300;
                    this.text.x += 250;
                    this.text.setText("Okay boy, light you last cigar\nand get ready for the duel of your life!");
                    this.time.addEvent({
                      delay: 4000,
                      callback:() =>{
                        this.textBox.x -= 300;
                        this.text.x -= 295;
                        this.text.setText("I don't smoke,\nIt's a filthy habit, especially for a varsity athlete.");
                        this.time.addEvent({
                          delay: 3000,
                          callback:() =>{
                            this.scene.start("bridge1");
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
