class horseRace extends Phaser.Scene{
  constructor(){
    super("horseRace")
  }
  create(){
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
        court.x -= 4;
      }, loop: true
    });

    this.reset = this.time.addEvent({
      delay: 25000,
      callback:() =>{
        sky.x = bg.x = far.x = mid.x = close.x = court.x = 0;
      }, loop: true
    });

    this.rock1 = this.physics.add.sprite();
    this.rock2 = this.physics.add.sprite();
    this.rand1;
    this.rand2;
    this.rocks = this.time.addEvent({
      delay: 1000,
      callback:() =>{
        this.rand1 = Math.floor(Math.random() * 3);
        this.rand2 = Math.floor(Math.random() * 3);
        this.rock1 = this.physics.add.sprite(1500, 225+(75*this.rand1), "sheet", 92).setScrollFactor(0).setScale(1).setDepth(this.rand1+1).setVelocityX(-600);
        this.rock2 = this.physics.add.sprite(1500, 225+(75*this.rand2), "sheet", 92).setScrollFactor(0).setScale(1).setDepth(this.rand2+1).setVelocityX(-600);
        this.physics.add.collider(this.player, this.rock1, () => {
          localStorage.setItem("money", parseInt(parseInt(localStorage.getItem("money")) - 25));
          localStorage.setItem("location", "town");
          this.sound.play("doorKick");
          this.time.addEvent({
            delay: 500,
            callback:() =>{
              this.scene.start("town");
            }
          })
        });        
        this.physics.add.collider(this.player, this.rock2, () => {
          localStorage.setItem("money", parseInt(parseInt(localStorage.getItem("money")) - 25));
          localStorage.setItem("location", "town");
          this.scene.start("town");
        });
    this.physics.add.overlap(this.rival, this.rock1, () => {
      if (this.rival.y == 300)
        this.rival.y = 225
      else if (this.rival.y == 225)
        this.rival.y = 150
      else
        this.rival.y = 300
    });    
    this.physics.add.overlap(this.rival, this.rock2, () => {
      if (this.rival.y == 300)
        this.rival.y = 225
      else if (this.rival.y == 225)
        this.rival.y = 150
      else
        this.rival.y = 300
    });
      }, loop: true
    });

    this.horse;
    if(localStorage.getItem("hasHorse")=="white")
      this.horse = "White";
    if(localStorage.getItem("hasHorse")=="brown")
      this.horse = "Brown";
    if(localStorage.getItem("hasHorse")=="black")
      this.horse = "Black";
    this.player = this.physics.add.sprite(375,225,"player").setDepth(3);
    this.player.play("player"+this.horse+"Walk");
    this.player.setSize(160,40);
    this.player.setOffset(10,150);
    this.rival = this.physics.add.sprite(900, 225, "joeHorse").setDepth(3).setVelocityX(-20);
    this.rival.play("joeHorseWalk");
    this.physics.add.collider(this.player, this.rival, () => {
      localStorage.setItem("money", parseInt(parseInt(localStorage.getItem("money")) + 100));
      this.move.paused = this.reset.paused = this.rocks.paused = true;
      this.rock1.setVelocity(0); this.rock2.setVelocity(0); this.rival.setVelocity(0); this.player.setVelocity(0);
      this.player.play("player"+this.horse+"Idle");
      this.rival.play("joeHorseIdle");
      this.box = this.add.sprite(280, 325, "quoteBox").setScale(8).setOrigin(0).setInteractive().setDepth(4);
      this.text = this.add.text(300,340, "Darn! You got me! Here's your money \ndammit...", {fontFamily:"litebulb", color: "black", fontSize: "48px"}).setOrigin(0).setInteractive().setDepth(4);
      localStorage.setItem("horseRaced", true);
      this.box.on("pointerdown", () => {localStorage.setItem("location", "town"); this.scene.start("town")});
      this.text.on("pointerdown", () => {localStorage.setItem("location", "town"); this.scene.start("town")});
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
