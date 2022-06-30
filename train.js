class train extends Phaser.Scene{
  constructor(){
    super("train")
  }
  create(){
    this.sound.stopAll();
    this.sound.play("Spagetti", {loop: true, volume: .5});
    this.sound.play("train", {loop: true});
    const sky = this.add.tileSprite(0,-50,5000,300,"nightSky").setOrigin(0).setScale(.4).setScrollFactor(0).setDepth(2);
    const bg = this.add.tileSprite(0,-25,6000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,-25,9999,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,-25,9999,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-25,9999,1000,"race1").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const court = this.add.tileSprite(0,100,9999,400,"nightBarn").setOrigin(0).setScrollFactor(0);
    this.track = this.add.tileSprite(-200,325, 9999, 500, "track").setOrigin(0).setDepth(2.99).setScale(.2);
    this.filter = this.add.sprite(0,0,"nightFilter").setScale(100).setDepth(999).setInteractive();
    this.filter.alpha = .2;
    this.punching = false;
    this.filter.on("pointerdown", () => {
      this.player.play("playerPunch");
      this.sound.play("swosh");
      this.punching = true;
      this.time.addEvent({
        delay: 1000,
        callback:() =>{
          this.punching = false;
        }
      })
    });

    this.player = this.physics.add.sprite(400, 0, "player").setScale(1.5).setDepth(3.01).setBodySize(25,125);
    this.player.setGravityY(1600);
    this.cameras.main.startFollow(this.player);
    
    this.blondie = this.physics.add.sprite(100,0,"blondie").setScale(1.7).setDepth(3.01).setBodySize(29,125);
    this.blondie.setGravityY(2400);

    this.physics.add.collider(this.player,this.blondie,()=>{
      this.blondie.play("blondiePunch");
      this.sound.play("swosh");
      if(this.blondie.flipX)
        this.player.setVelocity(-200);
      else
        this.player.setVelocity(200,-200);
      
      if(this.punching){
        if(this.blondie.flipX)
          this.blondie.setVelocity(500, -500);
        else
          this.blondie.setVelocity(-500);
      }
    });

    this.time.addEvent({
      delay: 2000,
      callback:() =>{
        if(Math.abs(this.blondie.x-this.player.x)<250){
          this.blondie.play("blondiePunch")
          this.sound.play("swosh");
        }
        else
          this.blondie.play("blondieWalk")
      }, loop: true
    })

    this.train = this.physics.add.sprite(500,100,"trainEngine").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,200).setOffset(30,95);
    this.train1 = this.physics.add.sprite(520 - this.train.width,100,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);
    this.train2 = this.physics.add.sprite(540 - (this.train.width*2),100,"trainEmpty").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,150).setOffset(30,240);
    this.train3 = this.physics.add.sprite(560 - (this.train.width*3),100,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);
    this.train4 = this.physics.add.sprite(580 - (this.train.width*4),100,"trainEmpty").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,150).setOffset(30,240);
    this.train5 = this.physics.add.sprite(600 - (this.train.width*5),100,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);
    this.train6 = this.physics.add.sprite(620 - (this.train.width*6),100,"trainEmpty").setOrigin(0).setDepth(3).setImmovable().setBodySize(250,150).setOffset(30,240);
    this.train7 = this.physics.add.sprite(640 - (this.train.width*7),100,"trainLogs").setOrigin(0).setDepth(3).setImmovable().setBodySize(200,150).setOffset(50,122);
    
    this.physics.add.collider(this.player, this.train);this.physics.add.collider(this.player, this.train1);this.physics.add.collider(this.player, this.train2);this.physics.add.collider(this.player, this.train3);this.physics.add.collider(this.player, this.train4);this.physics.add.collider(this.player, this.train5);this.physics.add.collider(this.player, this.train6);this.physics.add.collider(this.player, this.train7);
    this.physics.add.collider(this.blondie, this.train);this.physics.add.collider(this.blondie, this.train1);this.physics.add.collider(this.blondie, this.train2);this.physics.add.collider(this.blondie, this.train3);this.physics.add.collider(this.blondie, this.train4);this.physics.add.collider(this.blondie, this.train5);this.physics.add.collider(this.blondie, this.train6);this.physics.add.collider(this.blondie, this.train7);

    this.train.flipX = this.train1.flipX = this.train2.flipX = this.train1.flipX = this.train2.flipX = true;
/*
    this.trainAnims = this.time.addEvent({
      delay: 200,
      callback:() =>{
        if (this.train.scaleY == .99)
          this.train.scaleY = this.train1.scaleY = this.train2.scaleY = this.train3.scaleY = this.train4.scaleY = this.train5.scaleY = this.train6.scaleY = this.train7.scaleY = 1; 
        else
          this.train.scaleY = this.train1.scaleY = this.train2.scaleY = this.train3.scaleY = this.train4.scaleY = this.train5.scaleY = this.train6.scaleY = this.train7.scaleY = .99
      }, loop: true
    })
    */
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
        this.track.x = this.player.x-500;
      }, loop: true
    })

    this.emitter = EventDispatcher.getInstance();
    this.gamePad = new GamePad({scene: this});
    this.gamePad.x = 125;
    this.gamePad.y = -50;
    this.setListeners();
    //for blondie
    this.jumped = false;
  }
  update(){
    this.filter.x = this.player.x;
    this.filter.y = this.player.y;

    if(this.player.y>350)
      this.scene.start("train")

    //AI
    if(this.blondie.x<this.player.x-120 && this.punching == false)
      this.blondie.setVelocityX(200);
    else if(this.blondie.x>this.player.x+120 && this.punching == false)
      this.blondie.setVelocityX(-200);
    
    if(!this.blondie.body.onFloor() && !this.jumped){
      this.jumped = true;
      this.blondie.setVelocity(-1000)
      this.time.addEvent({
        delay: 1000,
        callback:() =>{
          this.jumped = false
        }
      })
    }
  }
  setListeners() {
    this.emitter.on("UP", this.up.bind(this));
    this.emitter.on("LEFT", this.left.bind(this));
    this.emitter.on("RIGHT", this.right.bind(this));
    this.emitter.on("RELEASE", this.release.bind(this));
    this.emitter.on("RELEASE", this.release.bind(this));
  };
  up(){
    if(this.player.body.onFloor())
      this.player.setVelocityY(-750);
  }
  left(){
    this.player.setVelocityX(-200);
    this.player.flipX = true;
    this.player.play("playerWalk");
  }
  right(){
    this.player.setVelocityX(200);
    this.player.flipX = false;
    this.player.play("playerWalk");
  }
  release(){
    this.player.setVelocity(0);
    this.player.play("playerIdle");
  }
}
