class train extends Phaser.Scene{
  constructor(){
    super("train")
  }
  create(){
    const sky = this.add.tileSprite(0,-50,5000,300,"sky").setOrigin(0).setScale(.4).setScrollFactor(0).setDepth(2);
    const bg = this.add.tileSprite(0,-25,6000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,-25,9999,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,-25,9999,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-25,9999,1000,"race1").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const court = this.add.tileSprite(0,100,9999,400,"barn").setOrigin(0).setScrollFactor(0);

    this.move = this.time.addEvent({
      delay: 20,
      callback: () => {
        sky.x -= .0625;
        bg.x -= .125;
        far.x -= .25;
        mid.x -= .5;
        close.x -= 1;
        court.x -= 4;
      }, loop: true
    });

    this.reset = this.time.addEvent({
      delay: 25000,
      callback:() =>{
        sky.x = bg.x = far.x = mid.x = close.x = court.x = 0;
      }, loop: true
    });

    this.emitter = EventDispatcher.getInstance();
    this.gamePad = new GamePad({scene: this});
    this.gamePad.x = 125;
    this.gamePad.y = -50;
    this.setListeners();
  }
  setListeners() {
    this.emitter.on("UP", this.up.bind(this));
    this.emitter.on("DOWN", this.down.bind(this));
  };
  up(){
    if(this.player.y == 225)
      this.player.y = 150
    else
      this.player.y = 225
  }
  down(){
    if(this.player.y == 225)
      this.player.y = 300
    else
      this.player.y = 225
  }
}
