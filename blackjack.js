class blackjack extends Phaser.Scene{
  constructor(){
    super("blackjack")
  }
  create(){
    this.add.sprite(-50,0,"table").setOrigin(0).setScale(2);
    this.hitBut = this.add.sprite(360,320,"nightFilter").setInteractive().setOrigin(0).setDepth(9);
    this.hitBut.scaleX = 8; this.hitBut.scaleY = 4; this.hitBut.alpha = .01;
    this.hitText = this.add.text(370,320,"hit",{fontFamily:"litebulb", fontSize:"32px", color:"red"});
    this.standBut = this.add.sprite(345,360,"nightFilter").setInteractive().setOrigin(0).setDepth(9);
    this.standBut.scaleX = 13; this.standBut.scaleY = 4; this.standBut.alpha = .01;
    this.standText = this.add.text(350,355,"Stand",{fontFamily:"litebulb", fontSize:"32px", color:"black"});
    this.hitBut.on("pointerdown", () => {this.hit(this.playerHand)});
    this.standBut.on("pointerdown", () => {this.end()});
    this.moneyText = this.add.text(10, 0, "Money: " + localStorage.getItem("money"), {color: "black", fontFamily: "litebulb", fontSize: "32px"}).setDepth(99).setOrigin(0);

    this.againBut = this.add.sprite(355,325,"nightFilter").setInteractive().setOrigin(0).setDepth(9).setVisible(false);
    this.againBut.scaleX = 22; this.againBut.scaleY = 4; this.againBut.alpha = .01;
    this.againText = this.add.text(350,315,"play again",{fontFamily:"litebulb", fontSize:"32px", color:"red"}).setVisible(false);
    this.quitBut = this.add.sprite(370,365,"nightFilter").setInteractive().setOrigin(0).setDepth(9).setVisible(false);
    this.quitBut.scaleX = 14; this.quitBut.scaleY = 4; this.quitBut.alpha = .01;
    this.quitText = this.add.text(365,355,"get up",{fontFamily:"litebulb", fontSize:"32px", color:"black"}).setVisible(false);
    this.againBut.on("pointerdown", () => {
      if(parseInt(localStorage.getItem("money")) >= 10)
        this.scene.start("blackjack");
      else
        this.add.text(230,400,"You need at least 10 bucks to play.", {fontFamily:"litebulb", fontSize:"24px", color: "red"});
    });
    this.quitBut.on("pointerdown", () => {this.scene.start("tavern")});
    
    this.numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    this.symbols = ["c", "d", "h", "s"];
    this.playerHand = [];
    this.playerSum = 0;
    this.botHand1 = [];
    this.botSum1 = 0;
    this.botHand2 = [];
    this.botSum2 = 0;
    this.botHand3 = [];
    this.botSum3 = 0;
    this.hit(this.playerHand);
    this.hit(this.playerHand);
    this.hit(this.botHand1);
    this.hit(this.botHand1);
    this.hit(this.botHand2);
    this.hit(this.botHand2);
    this.hit(this.botHand3);
    this.hit(this.botHand3);
    this.ai(this.botHand1, this.botSum1, 2);
    this.ai(this.botHand2, this.botSum2, 4);
    this.ai(this.botHand3, this.botSum3, 6);
  }
  hit(deck){
    this.num = this.numbers[Math.floor(Math.random() * 13)];
    this.symbol = this.symbols[Math.floor(Math.random() * 4)];
    this.card = this.symbol + this.num;
    while((this.botHand1.includes(this.card) ||this.botHand2.includes(this.card)) || (this.botHand3.includes(this.card) || this.playerHand.includes(this.card))){
      this.num = this.numbers[Math.floor(Math.random() * 13)];
      this.symbol = this.symbols[Math.floor(Math.random() * 4)];
      this.card = this.symbol + this.num;
    }
    deck.push(this.card);
    if((deck.includes("cA") && deck.includes("sA")) && (deck.includes("c8") && deck.includes("s8"))){
      this.againBut.visible = this.hitBut.visible = this.standBut.visible = this.quitBut.visible = this.hitText.visible = this.standText.visible = this.quitText.visible = this.againText.visible = false;
      this.filter = this.add.sprite(0,0,"blackFilter").setOrigin(0).setScale(100).setDepth(999);
      this.filter.alpha = 0;
      this.time.addEvent({
        delay: 10,
        callback:() =>{
          this.filter.alpha += .01;
        },repeat: 100
      });
      this.time.addEvent({
        delay: 1000,
        callback:() =>{
          this.scene.start("againstDead");
        }
      })
    }

    if(this.numbers.indexOf(this.num)<9)
      this.value = parseInt(this.num);
    else if(this.numbers.indexOf(this.num) >= 9 && this.numbers.indexOf(this.num) < 12)
      this.value = 10;
    else
      this.value = 11;

    if(deck == this.botHand1){
      this.botSum1 += this.value;
      if(this.botSum1>21 && ((this.botHand1.includes("cA") || this.botHand1.includes("sA")) || (this.botHand1.includes("dA") || this.botHand1.includes("hA"))))
        this.botSum1 -= 10;
    }
    else if(deck == this.botHand2){
      this.botSum2 += this.value;
      if(this.botSum2>21 && ((this.botHand2.includes("cA") || this.botHand2.includes("sA")) || (this.botHand2.includes("dA") || this.botHand2.includes("hA"))))
        this.botSum2 -= 10;
    }
    else if(deck == this.botHand3){
      this.botSum3 += this.value;
      if(this.botSum3>21 && ((this.botHand3.includes("cA") || this.botHand3.includes("sA")) || (this.botHand3.includes("dA") || this.botHand3.includes("hA"))))
        this.botSum3 -= 10;
    }
    else{
      this.playerSum += this.value;
      if(this.playerSum>21 && ((this.playerHand.includes("cA") || this.playerHand.includes("sA")) || (this.playerHand.includes("dA") || this.playerHand.includes("hA"))))
        this.playerSum -= 10;
    }

    if(deck == this.playerHand)
      this.add.sprite(350+((this.playerHand.indexOf(this.card)) * 20),175,this.card).setOrigin(0).setDepth(9).setScale(.8);
    else if(deck == this.botHand1)
      this.add.sprite(300,100+((this.botHand1.indexOf(this.card)) * 20),"back").setOrigin(0).setDepth(9).setScale(.8).setRotation(1.57);
    else if(deck == this.botHand2)
      this.add.sprite(500,185+((this.botHand2.indexOf(this.card)) * 20),"back").setOrigin(0).setDepth(9).setScale(.8).setRotation(-1.57);
    else
      this.add.sprite(350+((this.botHand3.indexOf(this.card)) * 20),25,"back").setOrigin(0).setDepth(9).setScale(.8);
  }
  ai(botHand, botSum, num){
    if(botSum < (14 + num))
      this.hit(botHand);
  }
  end(){
    for(let i = 0; i<=this.botHand1.length; i++)
      this.add.sprite(300,100+((this.botHand1.indexOf(this.botHand1[i])) * 20),this.botHand1[i]).setOrigin(0).setDepth(9).setScale(.8).setRotation(1.57);
    for(let i = 0; i<=this.botHand2.length; i++)
      this.add.sprite(500,185+((this.botHand2.indexOf(this.botHand2[i])) * 20),this.botHand2[i]).setOrigin(0).setDepth(9).setScale(.8).setRotation(-1.57);
    for(let i = 0; i<=this.botHand3.length; i++)
      this.add.sprite(350+((this.botHand3.indexOf(this.botHand3[i])) * 20),25,this.botHand3[i]).setOrigin(0).setDepth(9).setScale(.8);
    this.add.text(305,140,this.botSum1, {fontFamily:"litebulb",fontSize:"24px", color:"black"});
    this.add.text(410,135,this.botSum3, {fontFamily:"litebulb",fontSize:"24px", color:"black"});
    this.add.text(460,140,this.botSum2, {fontFamily:"litebulb",fontSize:"24px", color:"black"});
    this.add.text(360,145,this.playerSum, {fontFamily:"litebulb",fontSize:"24px", color:"black"});

    if(this.playerSum == 21){
      this.add.text(360, 275, "You win!", {fontFamily:"litebulb", fontSize:"32px"}).setDepth(999);
      this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 20);
        localStorage.setItem("money", this.newMoney);
    }
    else if(this.playerSum>21){
      this.add.text(360, 275, "You lose...", {fontFamily:"litebulb", fontSize:"32px"}).setDepth(999);
      this.newMoney = parseInt(parseInt(localStorage.getItem("money")) - 10);
      if (this.newMoney < 0)
        this.newMoney = 0;
      localStorage.setItem("money", this.newMoney);
    }
    else{
      this.sums = [this.botSum1, this.botSum2, this.botSum3, this.playerSum];
      this.sums.sort();
      this.sums.reverse();
      for(let i=0; i<4; i++){
        if(this.sums[0] > 21)
          this.sums.shift();
      }
      console.log(this.sums)
      if(this.sums[0] == this.playerSum && this.sums[1] != this.playerSum){
        this.add.text(360, 275, "You win!", {fontFamily:"litebulb", fontSize:"32px"}).setDepth(999);
        this.newMoney = parseInt(parseInt(localStorage.getItem("money")) + 40);
          localStorage.setItem("money", this.newMoney);
      }
      else if(this.sums[0] > this.playerSum){
        this.add.text(360, 275, "You lose...", {fontFamily:"litebulb", fontSize:"32px"}).setDepth(999);
        this.newMoney = parseInt(localStorage.getItem("money") - 10);
        if (this.newMoney < 0)
          this.newMoney = 0;
        localStorage.setItem("money", this.newMoney);
      }
      else{
        this.add.text(360, 275, "Tie!", {fontFamily:"litebulb", fontSize:"32px"}).setDepth(999);
      }
    }
    this.hitBut.visible = this.standBut.visible = this.hitText.visible = this.standText.visible = false;
    this.againBut.visible = this.quitBut.visible = this. againText.visible = this.quitText.visible = true;
  }
}
