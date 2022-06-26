class barn extends Phaser.Scene{
  constructor(){
    super("barn")
  }
  create(){
    this.add.tileSprite(0,0,920,460,"barn").setOrigin(0);
    this.horse1 = this.add.sprite(400,150,"blackHorse").setScale(1.25);
    this.horse1price = this.add.text(320, 10, "500 Bucks", {fontFamily: "lightbulb", fontSize: "32px", color: "black"});
    this.horse2 = this.add.sprite(400,150,"brownHorse").setScale(1.25).setVisible(false);
    this.horse2price = this.add.text(310, 10, "1000 Bucks", {fontFamily: "lightbulb", fontSize: "32px", color: "black"}).setVisible(false);
    this.horse3 = this.add.sprite(400,150,"whiteHorse").setScale(1.25).setVisible(false);
    this.horse3price = this.add.text(310, 10, "2000 Bucks", {fontFamily: "lightbulb", fontSize: "32px", color: "black"}).setVisible(false);

    this.next = this.add.text(340,240,"NEXT",{fontFamily:"lightbulb", fontSize: "32px", color: "black"}).setInteractive().setDepth(99);
    this.buy = this.add.text(340,280,"BUY",{fontFamily:"lightbulb", fontSize: "32px", color: "black"}).setInteractive().setDepth(99);
    this.exit = this.add.text(340,320,"EXIT",{fontFamily:"lightbulb", fontSize: "32px", color: "black"}).setInteractive().setDepth(99);
    this.next.on("pointerdown", () => {
      if(this.horse1.visible == true){
        this.horse1.visible = this.horse1price.visible = false;
        this.horse2.visible = this.horse2price.visible = true;
      }
      else if(this.horse2.visible == true){
        this.horse2.visible = this.horse2price.visible = false;
        this.horse3.visible = this.horse3price.visible = true;
      }
      else{
        this.horse3.visible = this.horse3price.visible = false;
        this.horse1.visible = this.horse1price.visible = true;
      }
    });
    this.chase = false;
    this.buy.on("pointerdown", () => {
      if(this.horse1.visible == true && money >= 500){
        if(localStorage.getItem("hasHorse") == undefined)
          this.chase = true
        money -= 500;
        localStorage.setItem("money", money);
        localStorage.setItem("hasHorse", "black");
        localStorage.setItem("location", "town");
        if(this.chase == true)
          this.scene.start("preRidersChase");
        else
          this.scene.start("town");
      }
      else if(this.horse2.visible == true && money >= 1000){
        if(localStorage.getItem("hasHorse") == undefined)
          this.chase = true
        money -= 1000;
        localStorage.setItem("money", money);
        localStorage.setItem("hasHorse", "brown");
        localStorage.setItem("location", "town");
        if(this.chase == true)
          this.scene.start("preRidersChase");
        else
          this.scene.start("town");
      }
      else if(this.horse3.visible == true && money >= 2000){
        if(localStorage.getItem("hasHorse") == undefined)
          this.chase = true
        money -= 500;
        localStorage.setItem("money", money);
        localStorage.setItem("hasHorse", "white");
        localStorage.setItem("location", "town");
        if(this.chase == true)
          this.scene.start("preRidersChase");
        else
          this.scene.start("town");
      }
    });

    this.exit.on("pointerdown", () => {
      localStorage.setItem("location", "town");
      this.scene.start("town");
    })
  
  }
}
