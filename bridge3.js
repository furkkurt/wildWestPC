class bridge3 extends Phaser.Scene{
  constructor(){
    super("bridge3")
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

    this.textBox = this.physics.add.sprite(550, 75, "quoteBox").setScale(8).setDepth(999).setScrollFactor(0);
    this.textBox.alpha = .8;
    this.text = this.add.text(295, 40, "Listen! Whatever I've done I did for my children.\nSave me kid!\nI swear on god I'll live an honest life from now on.", {fontFamily: "litebulb", color: "black", fontSize: "19px"}).setDepth(999).setScrollFactor(0);
    this.option1 = this.add.text(600, 230, "F*ck off Bran!", {fontFamily: "litebulb", fontSize: "19px"}).setInteractive().setDepth(999).setVisible(false);
    this.option2 = this.add.text(600, 300, "Sure thing pal!", {fontFamily: "litebulb", fontSize: "19px"}).setInteractive().setDepth(999).setVisible(false);

    this.option1.on("pointerdown", ()=>{this.scene.start("ending1")});
    this.option2.on("pointerdown", ()=>{this.scene.start("ending2")});

    this.time.addEvent({
      delay: 5000,
      callback:() =>{
        this.option1.visible = this.option2.visible = true;
      }
    })
  }
}
