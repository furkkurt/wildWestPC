class GamePad extends UIBlock{
    constructor(config) {
      super();
      this.emitter=EventDispatcher.getInstance();
      this.scene=config.scene;
      
      this.cross=this.scene.add.image(19, 364, "cross");
      this.cross.setScale(.5);
      this.cross.alpha=.4;
			this.add(this.cross);
			this.cross.setDepth(999);
			this.cross.setScrollFactor(0);

			this.up=this.scene.add.image(19,280,"hidden");
			this.up.setScale(1.67);
			this.up.alpha=.05;
			this.up.setInteractive();
      this.up.on("pointerdown", this.upPress.bind(this));
      this.up.on("pointerup", this.upRelease.bind(this));
      this.up.on("pointerout", this.upRelease.bind(this));
      this.add(this.up);
      this.up.setDepth(999);
			this.up.setScrollFactor(0);
			
			this.down=this.scene.add.image(19,448,"hidden");
			this.down.setScale(1.67);
			this.down.alpha=.05;
			this.down.setInteractive();
      this.down.on("pointerdown", this.downPress.bind(this));
      this.down.on("pointerup", this.downRelease.bind(this));
      this.down.on("pointerout", this.downRelease.bind(this));
      this.add(this.down);
      this.down.setDepth(999);
			this.down.setScrollFactor(0);
			
			this.left=this.scene.add.image(-65,364,"hidden");
			this.left.setScale(1.67);
			this.left.alpha=.05;
			this.left.setInteractive();
      this.left.on("pointerdown", this.leftPress.bind(this));
      this.left.on("pointerup", this.leftRelease.bind(this));
      this.left.on("pointerout", this.leftRelease.bind(this));
      this.add(this.left);
      this.left.setDepth(999);
			this.left.setScrollFactor(0);
			
			this.right=this.scene.add.image(103,364,"hidden");
			this.right.setScale(1.67);
			this.right.alpha=.05;
			this.right.setInteractive();
      this.right.on("pointerdown", this.rightPress.bind(this));
      this.right.on("pointerup", this.rightRelease.bind(this));
      this.right.on("pointerout", this.rightRelease.bind(this));
      this.add(this.right);
      this.right.setDepth(999);
			this.right.setScrollFactor(0);
      
      this.dodge=this.scene.add.image(885,480,"dodgeico");
			this.dodge.setScale(6);
			this.dodge.alpha=.8;
			this.dodge.setInteractive();
      this.dodge.on("pointerdown", this.dodgePress.bind(this));
      this.dodge.on("pointerup", this.dodgeRelease.bind(this));
      this.dodge.on("pointerout", this.dodgeRelease.bind(this));
      this.add(this.dodge);
      this.dodge.setDepth(999);
			this.dodge.setScrollFactor(0);    
      this.dodge.setVisible(false);
  }

  upPress(){
    this.up.alpha=.8; 
    this.emitter.emit("UP")
  };
  
	upRelease(){
		this.emitter.emit("RELEASE");
    this.up.alpha=.05;
  };

	downPress(){
    this.down.alpha=.8; 
    this.emitter.emit("DOWN")
  };
  
	downRelease(){
		this.emitter.emit("RELEASE");
    this.down.alpha=.05
  };
		
	leftPress(){
    this.left.alpha=.8; 
    this.emitter.emit("LEFT")
  };
  
	leftRelease(){
		this.emitter.emit("RELEASE");
    this.left.alpha=.05
  };

	rightPress(){
    this.right.alpha=.8; 
    this.emitter.emit("RIGHT")
  };
  
	rightRelease(){
		this.emitter.emit("RELEASE");
    this.right.alpha=.05
  };

  dodgePress(){
    this.emitter.emit("DODGE");
    this.dodge.alpha =.9;
  };

  dodgeRelease(){
    this.dodge.alpha = .8;
  };  
}

