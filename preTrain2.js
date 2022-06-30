class preTrain2 extends Phaser.Scene{
  constructor(){
    super("preTrain2")
  }
  create(){
    this.sound.stopAll();
    this.sound.play("train", {loop: true});
    const sky = this.add.tileSprite(0,-50,5000,300,"nightSky").setOrigin(0).setScale(.4).setScrollFactor(0).setDepth(2);
    const bg = this.add.tileSprite(0,-25,6000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,-25,9999,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,-25,9999,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-25,9999,1000,"race1").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const court = this.add.tileSprite(0,100,9999,400,"nightBarn").setOrigin(0).setScrollFactor(0);
    this.track = this.add.tileSprite(0,325, 9999, 500, "track").setOrigin(0).setDepth(2.99).setScale(.2);
    this.filter = this.add.sprite(0,0,"nightFilter").setScale(999).setDepth(999);
    this.filter.alpha = .2;
    
    this.train = this.physics.add.sprite(500,100,"trainEngine").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,200).setOffset(30,95);
    this.train.flipX = true;
    this.train1 = this.physics.add.sprite(520 - this.train.width,100,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);
    this.train2 = this.physics.add.sprite(540 - (this.train.width*2),100,"trainEmpty").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,150).setOffset(30,240);
    this.train3 = this.physics.add.sprite(560 - (this.train.width*3),100,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);
    this.train4 = this.physics.add.sprite(580 - (this.train.width*4),100,"trainEmpty").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,150).setOffset(30,240);
    this.train5 = this.physics.add.sprite(600 - (this.train.width*5),100,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);
    this.train6 = this.physics.add.sprite(620 - (this.train.width*6),100,"trainEmpty").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,150).setOffset(30,240);
    this.train7 = this.physics.add.sprite(640 - (this.train.width*7),100,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);

    this.trainAnims = this.time.addEvent({
      delay: 200,
      callback:() =>{
        if (this.train.scaleY == .98)
          this.train.scaleY = this.train1.scaleY = this.train2.scaleY = this.train3.scaleY = this.train4.scaleY = this.train5.scaleY = this.train6.scaleY = this.train7.scaleY = 1.02; 
        else
          this.train.scaleY = this.train1.scaleY = this.train2.scaleY = this.train3.scaleY = this.train4.scaleY = this.train5.scaleY = this.train6.scaleY = this.train7.scaleY = .98
      }, loop: true
    })
    
    this.move = this.time.addEvent({
      delay: 20,
      callback: () => {
        sky.x -= .0625;
        bg.x -= .125;
        far.x -= .25;
        mid.x -= .5;
        close.x -= 1;
        court.x -= 4;
        this.track.x -= 12;
      }, loop: true
    });

    this.reset = this.time.addEvent({
      delay: 25000,
      callback:() =>{
        sky.x = bg.x = far.x = mid.x = close.x = court.x = 0;
      }, loop: true
    });
    this.resetTrack = this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.track.x = 0
      }, loop: true
    })
    
    this.textBox = this.physics.add.sprite(275, 375, "quoteBox").setScale(8).setDepth(999).setScrollFactor(0)
    this.textBox.alpha = .8;
    this.text = this.add.text(20, 350, "Hey Cowboy! Heard you're heading to Barnacle Town\nto face Bran, well you must cross his brother first!\nI'm gonna crush you now!", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);

    this.time.addEvent({
      delay: 8000,
      callback:() =>{
        this.scene.start("train");
      }
    })
  }
}
