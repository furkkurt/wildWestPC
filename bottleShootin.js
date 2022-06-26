class bottleShootin extends Phaser.Scene{
  constructor(){
    super("bottleShootin")
  }
  create(){
    const sky = this.add.tileSprite(0,-120,5000,1000,"sky").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    this.time.addEvent({
      delay: 25,
      callback:() =>{
        sky.x -= 0.1;
      }, loop: true
    })
    const bg = this.add.tileSprite(0,-25,4000,1000,"race4").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const far = this.add.tileSprite(0,-25,4000,1000,"race3").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const mid = this.add.tileSprite(0,-25,4000,1000,"race2").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const close = this.add.tileSprite(0,-25,4000,1000,"race1").setOrigin(0).setScale(.2).setScrollFactor(0).setDepth(2);
    const court = this.add.tileSprite(0,50,4000,400,"barn").setOrigin(0).setScrollFactor(0);
    this.add.sprite(190,125,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(240,125,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(290,125,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(340,125,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(390,125,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(440,125,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(490,125,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.add.sprite(540,125,"barrel").setDepth(99).setOrigin(0).setScale(.44);
    this.seconds = 30;
    this.bottles = 0;
    this.classS = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0];
    this.classA = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2];
    this.classB = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4];
    this.classC = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
    this.classD = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.classE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.classF = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.timeText = this.add.text(750,350,this.seconds,{fontFamily:"litebulb", fontSize:"48px", color:"black"});
    this.bottleText = this.add.text(750,325,this.bottles,{fontFamily:"litebulb", fontSize:"48px", color:"brown"});
    this.time.addEvent({
      delay: 1000,
      callback:() =>{
        this.seconds -= 1;
        this.timeText.setText(this.seconds);
        if (this.seconds <= 10)
          this.timeText.setColor("red");
        if (this.seconds <= 0){
          this.bottle1.active = this.bottle2.active = this.bottle3.active = false;
          this.bottle1.visible = this.bottle2.visible = this.bottle3.visible = false;
          this.time.addEvent({
            delay: 1000,
            callback:() =>{
              this.add.text(200,200,"You shot " + this.bottles + " bottles.", {fontFamily: "litebulb", fontSize: "64px", color: "black"});
            }
          });
          if(this.bottles > 60)
            this.rank = "S";
          else if(this.bottles > 50 && this.bottles < 60)
            this.rank = "A";
          else if(this.bottles > 40 && this.bottles < 50)
            this.rank = "B";
          else if(this.bottles > 30 && this.bottles < 40)
            this.rank = "C";
          else if(this.bottles > 20 && this.bottles < 30)
            this.rank = "D";
          else if(this.bottles > 10 && this.bottles < 20)
            this.rank = "E";
          else if(this.bottles < 10)
            this.rank = "F";
          this.rand = Math.floor(Math.random() * 10);
          eval("this.rivalNum = this.class" + this.rank + "[" + this.rand + "]");
          this.rivalBottles = this.bottles + this.rivalNum;
          this.time.addEvent({
            delay: 3000,
            callback:() =>{
              this.add.text(200,250,"Your opponent shot " + this.rivalBottles + " bottles.", {fontFamily: "litebulb", fontSize: "64px", color: "black"});
            }
          });
          this.time.addEvent({
            delay: 4000,
            callback:() =>{
              if (this.rivalBottles > this.bottles){
                this.add.text(200,300,"You lost.", {fontFamily: "litebulb", fontSize: "64px", color: "black"});
                this.time.addEvent({
                  delay: 2000,
                  callback:() =>{
                    localStorage.setItem("location", "town"); 
                    this.scene.start("town");
                  }
               });
              this.currentMoney = parseInt(parseInt(localStorage.getItem("money") - 25));
              localStorage.setItem("money", this.currentMoney);
              if (localStorage.getItem("money") <= 0)
                localStorage.setItem("money", 0);
              }
              else if (this.rivalBottles < this.bottles){
                this.add.text(200,300,"You win.", {fontFamily: "litebulb", fontSize: "64px", color: "black"}); 
                this.time.addEvent({
                  delay: 2000,
                  callback:() =>{
                    localStorage.setItem("bottleShooted", true);
                    localStorage.setItem("location", "town"); 
                    this.scene.start("town");
                  }
                });
                this.currentMoney = parseInt(parseInt(localStorage.getItem("money") + 25));
                localStorage.setItem("money", this.currentMoney);
              }
              else{
                this.add.text(200,300,"Tie.", {fontFamily: "litebulb", fontSize: "64px", color: "black"}); 
                this.time.addEvent({
                  delay: 2000,
                  callback:() =>{
                    localStorage.setItem("location", "town"); 
                    this.scene.start("town");
                  }
                });
              }
            }
          })
        }
      }, repeat: 29
    });
    this.bottle1 = this.physics.add.sprite(0,102,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
    this.bottle2 = this.physics.add.sprite(0,102,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
    this.bottle3 = this.physics.add.sprite(0,102,"bottle").setOrigin(0).setScale(1.5).setDepth(99).setInteractive();
    this.rand1 = Math.floor(Math.random() * 8);
    this.rand2 = Math.floor(Math.random() * 8);
    this.rand3 = Math.floor(Math.random() * 8);
    this.bottle1.x = 210+(50*this.rand1);
    this.bottle2.x = 210+(50*this.rand2);
    this.bottle3.x = 210+(50*this.rand3);
    this.bottle1.active = this.bottle2.active = this.bottle3.active = true;
    this.bottle1.visible = this.bottle2.visible = this.bottle3.visible = true;
    this.bottle1.on("pointerdown", () => {this.sound.play("shoot", {volume:.1}); this.bottle1.setActive(false); this.bottle1.setVisible(false); this.bottles += 1; this.refreshBottles(); this.bottleText.setText(this.bottles)});
    this.bottle2.on("pointerdown", () => {this.sound.play("shoot", {volume:.1}); this.bottle2.setActive(false); this.bottle2.setVisible(false); this.bottles += 1; this.refreshBottles(); this.bottleText.setText(this.bottles)});
    this.bottle3.on("pointerdown", () => {this.sound.play("shoot", {volume:.1}); this.bottle3.setActive(false); this.bottle3.setVisible(false); this.bottles += 1; this.refreshBottles(); this.bottleText.setText(this.bottles)});
    this.refreshBottles = () => {
      if ((this.bottle1.active == false && this.bottle2.active == false) && this.bottle3.active == false){
        this.rand1 = Math.floor(Math.random() * 8);
        this.rand2 = Math.floor(Math.random() * 8);
        this.rand3 = Math.floor(Math.random() * 8);
        while ((this.rand1 == this.rand2 || this.rand1 == this.rand3) || this.rand2 == this.rand3){
          this.rand1 = Math.floor(Math.random() * 8);
          this.rand2 = Math.floor(Math.random() * 8);
          this.rand3 = Math.floor(Math.random() * 8);
        }
        this.bottle1.x = 210+(50*this.rand1);
        this.bottle2.x = 210+(50*this.rand2);
        this.bottle3.x = 210+(50*this.rand3);
        this.bottle1.active = this.bottle2.active = this.bottle3.active = true;
        this.bottle1.visible = this.bottle2.visible = this.bottle3.visible = true;
      }
    }
  }
}
