class bridge2 extends Phaser.Scene{
  constructor(){
    super("bridge2")
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

    this.player = this.physics.add.sprite(100,270,"player").setDepth(4).setScale(1.4).setGravityY(800);
    this.enemy = this.physics.add.sprite(710, 265, "bran").setDepth(4).setScale(1.5).setGravityY(800);
    this.enemy.flipX = true;
    this.bridgeBody = this.physics.add.sprite(0, 399, "filter").setImmovable();
    this.bridgeBody.scaleX = 99;
    this.physics.add.collider(this.player, this.bridgeBody);
    this.physics.add.collider(this.enemy, this.bridgeBody);
    
    this.border1 = this.physics.add.sprite(0-this.player.width*1.4, 50, "hidden").setVisible(false);
    this.border1.setSize(1, 600);
    this.border2 = this.physics.add.sprite(800+this.player.width*1.4, 50, "hidden").setVisible(false);
    this.border2.setSize(1, 600);
    this.border3 = this.physics.add.sprite(0, 0-this.player.height*1.4, "hidden").setVisible(false);
    this.border3.setSize(800, 1);
    this.physics.add.overlap(this.player, this.border1, ()=>{this.scene.start("bridge1")});
    this.physics.add.overlap(this.player, this.border2, ()=>{this.scene.start("bridge1")});
    this.physics.add.overlap(this.player, this.border3, ()=>{this.scene.start("bridge1")});
    this.physics.add.overlap(this.enemy, this.border3, ()=>{this.scene.start("bridge3")});

    this.punch = false;
    this.hit = this.physics.add.sprite(0,0).setOrigin(0).setDepth(99).setInteractive().setScale(32);
    this.hit.on("pointerdown", () => {
      this.player.play("playerPunch");
      this.time.addEvent({
        delay: 500,
        callback:() =>{
          this.punch = true;
          this.time.addEvent({
            delay: 1000,
            callback:() =>{
              this.punch = false;
              this.player.play("playerIdle");
            }
          })
        }
      })
    });

    this.physics.add.collider(this.player, this.enemy, ()=>{
      if(this.punch)
        this.enemy.setVelocityY(-600);
      else{
        this.player.setVelocityY(-600);
        this.enemy.play("branPunch");
      }
    });

    this.emitter = EventDispatcher.getInstance();
    this.gamePad = new GamePad({scene: this});
    this.gamePad.x = 125;
    this.gamePad.y = -50;
    this.setListeners();

    this.time.addEvent({
      delay: 1000,
      callback:() =>{
        if(this.player.x - this.enemy.x < 200){
          this.enemy.setVelocityX(-300);
          this.enemy.flipX = true;
          this.enemy.play("branWalk");
        }
        else if(this.player.x - this.enemy.x > -200){
          this.enemy.setVelocityX(300);
          this.enemy.flipX = false;
          this.enemy.play("branWalk");
        }
        else{
          this.enemy.setVelocityX(0);
          this.enemy.play("branIdle");
        }
      }, loop: true
    });
  }
  setListeners() {
    this.emitter.on("UP", this.up.bind(this));
    this.emitter.on("LEFT", this.left.bind(this));
    this.emitter.on("RIGHT", this.right.bind(this));
    this.emitter.on("RELEASE", this.release.bind(this));
  };
  up(){
    if(this.player.body.onFloor())
      this.player.setVelocityY(-750);
  }
  left(){
    this.player.setVelocityX(-400);
    this.player.flipX = true;
    this.player.play("playerWalk");
  }
  right(){
    this.player.setVelocityX(400);
    this.player.flipX = false;
    this.player.play("playerWalk");
  }
  release(){
    this.player.setVelocity(0);
    this.player.play("playerIdle");
  }

}
