class scoreboard extends Phaser.Scene {
  constructor() {
    super("scoreboard");
  };
  preload() {};
  create() {
		this.add.image(400,225,"scoreboard");
		this.add.text(260, 110, "Score: ", {color:"black", fontFamily: "litebulb", fontSize:"90px"});
		this.add.text(440, 85, score, {color: "red", fontFamily: "litebulb", fontSize:"120px"});
		this.add.text(360, 135, "("+rank+")", {color: "red", fontFamily: "litebulb", fontSize:"120px"});
		this.backToMapSelector = this.add.text(250, 210, "Back to town", {color: "black", fontFamily:"litebulb", fontSize:"90px"});
		this.backToMapSelector.setInteractive();
		this.backToMapSelector.on("pointerdown", () => {localStorage.setItem("location", "town"); window.location.reload()});
		localStorage.setItem("bountyHunted", true)
	};
}
