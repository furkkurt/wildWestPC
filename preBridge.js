class preBridge extends Phaser.Scene{
  constructor(){
    super("preBridge")
  }
  create(){
    this.sound.play("Spagetti");
    this.filter1 = this.add.sprite(0,0,"blackFilter").setScale(999).setDepth(999).setScrollFactor(0);
    this.filter1.alpha = 1;
    this.time.addEvent({
      delay: 50,
      callback:() =>{
        this.filter1.alpha -= .01;
      },repeat: 100
    });
    const sky = this.add.tileSprite(0,0,5000,300,"sky").setOrigin(0).setScale(.7).setScrollFactor(0).setDepth(2);
    const bg = this.add.tileSprite(0,125,6000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,125,9999,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,125,9999,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-100,9999,9999,"race1").setOrigin(0).setScrollFactor(0).setDepth(2).setScale(.55);
    const court = this.add.tileSprite(-9600,300,9999,400,"nightBarn").setOrigin(0).setScrollFactor(0).setDepth(2);
    this.bridge = this.add.tileSprite(400,350,9999,32,"bridge").setOrigin(0).setScrollFactor(0).setDepth(3).setScale(2);  

    this.textBox = this.physics.add.sprite(550, 75, "quoteBox").setScale(8).setDepth(999).setScrollFactor(0).setVisible(false);
    this.textBox.alpha = .8;
    this.text = this.add.text(300, 40, "", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);

    this.player = this.physics.add.sprite(210,300,"player").setDepth(4).setScale(1.4);

    this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.textBox.setVisible(true);
        this.text.setText("Well, guess that's the bridge he was talkin' about.\nThis clearly isn't the safest one I've seen...");
        this.time.addEvent({
          delay: 5000,
          callback:() =>{
            this.text.setFontSize("32px");
            this.text.setText("Well, anyway, here I go..!");
            this.player.play("playerWalk");
            this.time.addEvent({
              delay: 3000,
              callback:() =>{
                this.player.setVelocityX(200);
                this.text.setText("I'm coming for you Mad Hat!\nAnd hell's coming with me!");
                this.time.addEvent({
                  delay: 4000,
                  callback:() =>{
                    this.scene.start("preBridge2");
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
