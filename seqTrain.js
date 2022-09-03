class seqTrain extends Phaser.Scene{
  constructor(){
    super("seqTrain")
  }
  create(){
    this.filter1 = this.add.sprite(0,0,"blackFilter").setScale(999).setDepth(999).setScrollFactor(0);
    this.filter1.alpha = 1;
    this.time.addEvent({
      delay: 50,
      callback:() =>{
        this.filter1.alpha -= .01;
      },repeat: 100
    });

    this.sound.stopAll();
    this.sound.play("crickets");
    const sky = this.add.tileSprite(0,-50,5000,300,"nightSky").setOrigin(0).setScale(.4).setScrollFactor(0).setDepth(2);
    const bg = this.add.tileSprite(0,-25,6000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,-25,9999,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,-25,9999,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-25,9999,1000,"race1").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const court = this.add.tileSprite(0,100,9999,400,"nightBarn").setOrigin(0).setScrollFactor(0);
    this.track = this.add.tileSprite(-1350,180, 9999, 500, "track").setOrigin(0).setDepth(2.99).setScale(.2);
    this.filter = this.add.sprite(0,0,"nightFilter").setScale(999).setDepth(999);
    this.filter.alpha = .2;
    
    this.train = this.physics.add.sprite(300,-40,"trainEngine").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,200).setOffset(30,95);
    this.train.flipX = true;
    this.train1 = this.physics.add.sprite(320 - this.train.width,-40,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);

    this.passenger1 = this.physics.add.sprite(50,360,"blueHat").setDepth(4).setScale(1.4);
    this.passenger2 = this.physics.add.sprite(100,360,"redHat").setDepth(4).setScale(1.4);
    this.passenger3 = this.physics.add.sprite(150,360,"greenGuy").setDepth(4).setScale(1.4);
    this.player = this.physics.add.sprite(210,360,"player").setDepth(4).setScale(1.4);
    this.captain = this.physics.add.sprite(300,360,"blackHat").setDepth(4).setScale(1.4);
    this.captain.flipX = true;

    this.textBox = this.physics.add.sprite(550, 375, "quoteBox").setScale(8).setDepth(999).setScrollFactor(0).setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(310, 330, "", {fontFamily: "litebulb", color: "black", fontSize: "20px"}).setDepth(999).setScrollFactor(0);

    this.time.addEvent({
      delay: 3000,
      callback:() =>{
        this.textBox.setVisible(true);
        this.text.setText("Looks like the track is broken. You'll have to\nwalk the rest of the way, gentlemen.\nBarnacle Town is about 5 miles to east,\nright after you cross the canyon.");

        this.time.addEvent({
          delay: 8000,
          callback:() =>{
            this.time.addEvent({
                delay: 20,
                callback:() =>{
                  this.filter1.alpha += .01;
                  this.filter1.setDepth(1000);
                },repeat: 100
              });
          }
        })
        this.time.addEvent({
          delay: 10000,
          callback:() =>{
            this.scene.start("preBridge");
          }
        })
      }
    })
  }
}
