class ridersChase extends Phaser.Scene{
  constructor(){
    super("ridersChase")
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

    this.horse;
    if(localStorage.getItem("hasHorse")=="white")
      this.horse = "White";
    if(localStorage.getItem("hasHorse")=="brown")
      this.horse = "Brown";
    if(localStorage.getItem("hasHorse")=="black")
      this.horse = "Black";
    this.player = this.physics.add.sprite(700,225,"player").setDepth(3);
    this.player.play("player"+this.horse+"Walk");
    this.player.setSize(160,40);
    this.player.setOffset(10,150);

    this.cowboy1 = this.physics.add.sprite(0, 125, "darkishHorse").setDepth(2.99);
    this.cowboy2 = this.physics.add.sprite(0, 225, "joeHorse").setDepth(3);
    this.cowboy3 = this.physics.add.sprite(0, 325, "darkHorse").setDepth(3.01);
    this.cowboy1.play("darkishHorseWalk");
    this.cowboy2.play("joeHorseWalk");
    this.cowboy3.play("darkHorseWalk");
    
    this.bullet1 = this.physics.add.sprite(0,-100,"bullet").setScale(5);
    this.bullet2 = this.physics.add.sprite(0,-100,"bullet").setScale(5);
    this.bullet3 = this.physics.add.sprite(0,-100,"bullet").setScale(5);
    this.bullet1.setVelocityX(1000);
    this.bullet2.setVelocityX(1000);
    this.bullet3.setVelocityX(1000);
    this.physics.add.collider(this.player, this.bullet1, () => {localStorage.clear(); window.location.reload()});
    this.physics.add.collider(this.player, this.bullet2, () => {localStorage.clear(); window.location.reload()});
    this.physics.add.collider(this.player, this.bullet3, () => {localStorage.clear(); window.location.reload()});

    this.shootin = this.time.addEvent({
      delay: 2000,
      callback:() =>{
        this.bullet1.x = 0;
        this.bullet2.x = -500;
        this.bullet3.x = -1000;
        this.bullet1.y = 200 + (75 * (Math.floor(Math.random()*3)));
        this.bullet2.y = 200 + (75 * (Math.floor(Math.random()*3)));
        this.bullet3.y = 200 + (75 * (Math.floor(Math.random()*3)));
      }, loop: true
    });

    this.cowboy1.setVelocityX(20);
    this.cowboy2.setVelocityX(20);
    this.cowboy3.setVelocityX(20);

    this.time.addEvent({
      delay: 10000,
      callback:() =>{
        this.shootin.paused = true;
        this.move.paused = true;
        this.reset.paused = true;
        this.player.setVelocityY(-600);
        this.time.addEvent({
          delay: 1300,
          callback:() =>{
            this.player.setVelocityY(300);
            this.time.addEvent({
              delay: 2600,
              callback:() =>{
                this.player.setVelocity(0);
              }
            })
          }
        })
        this.time.addEvent({
          delay: 2000,
          callback:() =>{
            this.cowboy1.play("darkishHorseIdle");
            this.cowboy2.play("joeHorseIdle");
            this.cowboy3.play("darkHorseIdle");
            this.cowboy1.setVelocity(0);
            this.cowboy2.setVelocity(0);
            this.cowboy3.setVelocity(0);
            this.time.addEvent({
              delay: 20,
              callback:() =>{
                this.cowboy1.x -= 8;
                this.cowboy2.x -= 8;
                this.cowboy3.x -= 8;
              }, repeat: 100
            });
          }
        })
        court.x = this.player.x - 9600;
        this.time.addEvent({
          delay: 20,
          callback:() =>{
            court.x -= 8;
          }, repeat: 500
        })
        this.time.addEvent({
          delay: 3000,
          callback:() =>{
            court.x = 1000;
            this.move.paused = false;
          }
        });
        this.time.addEvent({
          delay: 8000,
          callback:() =>{
            localStorage.setItem("progress", parseInt(localStorage.getItem("progress"))+1);
            localStorage.setItem("location", "town");
            window.location.reload();
          }
        })
      }
    })

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
  update(){
    if(this.bullet1.x<this.cowboy1.x)
      this.bullet1.setVisible(false);
    else
      this.bullet1.setVisible(true);
    if(this.bullet2.x<this.cowboy1.x)
      this.bullet2.setVisible(false);
    else
      this.bullet2.setVisible(true);
    if(this.bullet3.x<this.cowboy1.x)
      this.bullet3.setVisible(false);
    else
      this.bullet3.setVisible(true);
  }
}
