var gunDrawn = false;
var mouse;
var fired = false;
var bulletNpcCollider;
var bullet;
var bullets = 6;
var bulletText, reloadingText;
var collidableLayer;
var targetSprite;
class map1 extends Phaser.Scene {
  constructor() {
    super("map1");
	};
  preload(){
	};
	create(){
		mouse = this.input.activePointer;
		this.emitter=EventDispatcher.getInstance();
    this.gamePad = new GamePad({scene: this});
		this.gamePad.x = 0; this.gamePad.y = 0;
		this.setListeners();
		this.sound.stopAll();
		this.sound.play("Tequila", {loop: true, volume:.15});
		const map = this.make.tilemap({key: "map1", tileWidth: 70, tileHeight:70});
    const tileset = map.addTilesetImage("sheet", "tile");
    collidableLayer = map.createLayer("collidableLayer", tileset).setDepth(1);
    const nonCollidableLayer = map.createLayer("nonCollidableLayer", tileset);
		const upperLayer1 = map.createLayer("upperLayer1", tileset).setDepth(3);
		const upperLayer2 = map.createLayer("upperLayer2", tileset).setDepth(4);
		const lowerLayer = map.createLayer("lowerLayer", tileset).setDepth(1);
    const npcLayer = map.createLayer("npcLayer", tileset).setVisible(false);

		this.player = this.physics.add.sprite(75*70,75*70,"player").setScale(1.5).setDepth(2);
		this.player.play("playerIdle");
		this.player.body.setSize(this.player.width/1.5, this.player.height/2);
		this.player.setImmovable();
		bulletText = this.add.text(-120,-60,"Bullets: " + bullets, {color: "black"}).setDepth(100).setScale(2).setScrollFactor(0);
		reloadingText = this.add.text(-120,-20,"Reloading", {fontFamily:"wantedo", color: "black"}).setDepth(100).setScale(2).setScrollFactor(0).setVisible(false);
		bullet=this.physics.add.sprite(0,0,"bullet").setScale(2.5).setDepth(2);
		this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(.75);
		
		this.npcSpawner = this.physics.add.sprite(0,0,"hidden").setVisible(false);
		this.npcSpawner.setSize(1100,600);
		this.playerBulletCollider = this.physics.add.sprite(0,0,"hidden").setVisible(false);
		this.playerBulletCollider.setSize(this.player.width,this.player.height*1.4);
		bulletNpcCollider = this.physics.add.sprite(0,0,"hidden").setVisible(false).setSize(4,4);

		collidableLayer.setCollisionByExclusion([-1]);
		npcLayer.setCollisionByExclusion([-1]);
		this.physics.add.collider(this.player,collidableLayer);
		this.player.setInteractive();
		this.player.on("pointerdown", ()=>{
			this.player.play("playerShoot");
			this.time.addEvent({delay: 500, callback:()=>{gunDrawn = true}});
		});
		
		this.time.addEvent({
			delay: 1000,
			callback: () => {
				this.playerBulletCollider.x = this.player.x;
				this.playerBulletCollider.y = this.player.y;
				this.npcSpawner.x = this.player.x;
				this.npcSpawner.y = this.player.y;
			},
			loop: true
		})		
		//Target
		var characters = ["bloodJoe","blueHat","redHat","joeHorse"];
		var directions = ["up", "down", "left", "right"];
		var targetNum = Math.floor(Math.random() * 4);
		var target = characters[targetNum];
		var wantedSign = this.physics.add.sprite(860,20,target+"Wanted").setScrollFactor(0).setDepth(99).setScale(2);
		var targetTileX = 50+Math.floor(Math.random()*51);
		var targetTileY = 50+Math.floor(Math.random()*51);
		var targetX = targetTileX * 70;
		var targetY = targetTileY * 70;
		targetSprite = this.physics.add.sprite(targetX,targetY,target).setScale(1.5).setDepth(2);
		targetSprite.play(target + "Walk");
		var directionNumTarget = Math.floor(Math.random()*4);
		var targetDirection = directions[directionNumTarget];
			if (targetDirection == "up"){
				targetSprite.setVelocityY(-200);
			}
			else if (targetDirection == "down"){
				targetSprite.setVelocityY(200);
			}
			else if (targetDirection == "left"){
				targetSprite.setVelocityX(-200);
				targetSprite.flipX = true;
			}
			else{
				targetSprite.setVelocityX(200);
				targetSprite.flipX = false;
			};
			this.physics.add.collider(targetSprite,collidableLayer,()=>{
				var directionNumTarget = Math.floor(Math.random()*4);
				var targetDirection = directions[directionNumTarget];
				if (targetDirection == "up"){
					targetSprite.setVelocityY(-200);
				}
				else if (targetDirection == "down"){
					targetSprite.setVelocityY(200);
				}
				else if (targetDirection == "left"){
					targetSprite.setVelocityX(-200);
					targetSprite.flipX = true;
				}
				else{
					targetSprite.setVelocityX(200);
					targetSprite.flipX = false;
				}
			});
			this.time.addEvent({delay: 250, 
				callback: ()=>{
					if(targetSprite.x<50*70){
						targetSprite.setVelocityX(400);
						targetSprite.flipX = false;
					};	
					if(targetSprite.x>100*70){
						targetSprite.setVelocityX(-400);
						targetSprite.flipX = true;
					};
					if(targetSprite.y<50*70)
						targetSprite.setVelocityY(400)
					if(targetSprite.y>100*70)
						targetSprite.setVelocityY(-400);
				}, loop: true
			});
			this.time.addEvent({
				delay: 10000,
				callback: () => {
					targetSprite.play(target+"Walk");
					var directionNumTarget = Math.floor(Math.random()*4);
					var targetDirection = directions[directionNumTarget];
					if (targetDirection == "up"){
						targetSprite.setVelocityY(-200);
					}
					else if (targetDirection == "down"){
						targetSprite.setVelocityY(200);
					}
					else if (targetDirection == "left"){
						targetSprite.setVelocityX(-200);
					}
					else{
						targetSprite.setVelocityX(200);
					}
				},
				loop: true
			})

		//Place NPC's
		this.physics.add.collider(this.npcSpawner,npcLayer,(x, spawn)=>{
			var npcNum;
			var npcName;
			var pickNpc=()=>{
			  npcNum = Math.floor(Math.random() * 4);
				npcName = characters[npcNum];
				if(npcName == target)
					pickNpc();
			};
			pickNpc();
			var npcSprite = this.physics.add.sprite(spawn.x * 70, spawn.y * 70, npcName).setScale(1.5).setDepth(2);
			this.physics.add.collider(npcSprite, bulletNpcCollider, () => {
				console.log("workd");
				npcSprite.destroy();
				randomDirChange.paused = true;
				this.npcInBorder.paused = true;
			},null,this);
			npcSprite.play(npcName + "Walk");
			npcSprite.setDepth(2);
			npcSprite.setImmovable();
			var directionNum = Math.floor(Math.random()*4);
			var npcDirection = directions[directionNum];
			if (npcDirection == "up"){
				npcSprite.setVelocityY(-200);
			}
			else if (npcDirection == "down"){
				npcSprite.setVelocityY(200);
			}
			else if (npcDirection == "left"){
				npcSprite.setVelocityX(-200);
				npcSprite.flipX = true;
			}
			else{
				npcSprite.setVelocityX(200);
				npcSprite.flipX = false;
			};
			this.physics.add.collider(npcSprite, this.player, () => {
				npcSprite.setVelocity(0);
				npcSprite.play(npcName + "Idle");
				npcSprite.setInteractive();
				var askDirectionX;
				var askDirectionY;
				var directionAnswer;
				var clicked = false;
				npcSprite.on("pointerdown", () => {
					if (targetSprite.x > this.player.x + 10 * 70)
						askDirectionX = "east";
					if (targetSprite.x < this.player.x - 10 * 70)
						askDirectionX = "west";
					if (targetSprite.y < this.player.y + 10 * 70)
						askDirectionY = "south";
					if (targetSprite.y < this.player.y - 10 * 70)
						askDirectionY = "north";
				
					//console.log(askDirectionX + "	" + askDirectionY);
					if (askDirectionX != undefined && askDirectionY == undefined)
						directionAnswer = "I think I saw him heading " + askDirectionX;
					else if (askDirectionX == undefined && askDirectionY != undefined)
						directionAnswer = "I think I saw him heading " + askDirectionY;
					else if (askDirectionX != undefined && askDirectionY != undefined)
						directionAnswer = "I think I saw him heading " + askDirectionY + " " + askDirectionX;
					else
						directionAnswer = "Oh god! I saw him right around here!";
					
					if(clicked == false){
						var directionBox = this.physics.add.sprite(540,375, "quoteBox").setScale(12.2).setDepth(99).setScrollFactor(0);
						var directionText = this.add.text(200, 320, "You : Hey you! Have you seen this guy around?\n\n" + "Kind Stranger : " + directionAnswer + ".",{fontFamily:"wantedo", color: "black"}).setScale(1.8).setDepth(100).setScrollFactor(0); 
						clicked = true;
						this.time.addEvent({delay: 5000, callback:()=>{directionText.destroy(); directionBox.destroy()}});
					}
				})
			})
			this.physics.add.collider(npcSprite, collidableLayer,()=>{
				var directionNum = Math.floor(Math.random()*4);
				var npcDirection = directions[directionNum];
				if (npcDirection == "up"){
					npcSprite.setVelocityY(-200);
				}
				else if (npcDirection == "down"){
					npcSprite.setVelocityY(200);
				}
				else if (npcDirection == "left"){
					npcSprite.setVelocityX(-200);
					npcSprite.flipX = true;
				}
				else{
					npcSprite.setVelocityX(200);
					npcSprite.flipX = false;
				}
			});
			this.npcInBorder = this.time.addEvent({delay:500,
				callback:()=>{
					if(npcSprite != undefined){
						if(npcSprite.x<65*70){
							npcSprite.setVelocityX(400);
							npcSprite.flipX = false;
						}
						if(npcSprite.x>85*70){
							npcSprite.setVelocityX(-400);
							npcSprite.flipX = true;
						};
						if(npcSprite.y<65*70)
							npcSprite.setVelocityY(400)
						if(npcSprite.y>85*70)
							npcSprite.setVelocityY(-400);
					}
					else
						this.npcInBorder.paused = true;
				},loop: true});
			var randomDirChange = this.time.addEvent({
				delay: 10000,
				callback: () => {
					npcSprite.play(npcName + "Walk");
					var directionNum = Math.floor(Math.random()*4);
					var npcDirection = directions[directionNum];
					if (npcDirection == "up"){
						npcSprite.setVelocityY(-200);
					}
					else if (npcDirection == "down"){
						npcSprite.setVelocityY(200);
					}
					else if (npcDirection == "left"){
						npcSprite.setVelocityX(-200);
					}
					else{
						npcSprite.setVelocityX(200);
					}
				},
				loop: true
			});
			this.time.addEvent({delay: 30000, callback: () => {
				npcSprite.destroy();
				randomDirChange.paused = true;
				this.npcInBorder.paused = true;
			}})
		},null,this);
	};
	update(){
		if(this.player.x < 50 * 70)
			this.player.x = 100 * 70;
		if(this.player.x > 100 * 70)
			this.player.x = 50 * 70;
		if(this.player.y < 50 * 70)
			this.player.y = 100 * 70;
		if(this.player.y > 100 * 70)
			this.player.y = 50 * 70;
		if(this.player.flipX == true)
			this.playerBulletCollider.setOffset(-12,-56);
		else
			this.playerBulletCollider.setOffset(12,-56);
		
		if (mouse.isDown && gunDrawn == true && fired == false){
			if(bullet != undefined)
				bullet.destroy();
			bullet=this.physics.add.sprite(this.player.x,this.player.y,"bullet").setScale(2.5).setDepth(2);
			this.physics.add.collider(bullet, collidableLayer);
			this.physics.add.collider(bullet, targetSprite, () => {
				console.log("Win!")
			});
			bullet.setBounce(1);
			var bulletX, bulletY;
			if (game.input.activePointer.x >= 400)
				bulletX = this.player.x + (game.input.activePointer.x - 400)
			else
				bulletX = this.player.x - (400 - game.input.activePointer.x)
			if (game.input.activePointer.y >= 225)
				bulletY = this.player.y + (game.input.activePointer.y - 225)
			else
				bulletY = this.player.y - (225 - game.input.activePointer.y)

			this.physics.moveTo(bullet, bulletX, bulletY, 750);
			
			fired = true;
			bullets = bullets-1;
			bulletText.destroy();
			bulletText = this.add.text(-120,-60,"Bullets: " + bullets, {color: "black"}).setDepth(100).setScale(2).setScrollFactor(0);
			if (bullets >= 1){
				this.sound.play("shoot", {volume:.1});
				this.time.addEvent({delay: 500, callback: () => {fired = false}})
			}
			else{
				this.sound.play("reload", {volume:.25});
				reloadingText.setVisible(true);
				this.time.addEvent({delay: 2500, callback: () => {bullets = 6;fired = false; reloadingText.setVisible(false)}})
			}
		};
		bulletNpcCollider.x = bullet.x;
		bulletNpcCollider.y = bullet.y;
	}
	setListeners(){
		this.emitter.on("UP", this.up.bind(this));
		this.emitter.on("DOWN", this.down.bind(this));
		this.emitter.on("LEFT", this.left.bind(this));
		this.emitter.on("RIGHT", this.right.bind(this));
		this.emitter.on("RELEASE", this.release.bind(this));
	};
	up(){
		gunDrawn = false;
		this.player.play("playerWalk");
		this.player.setVelocityY(-200);
		this.playerBulletCollider.setVelocityY(-200);
		this.npcSpawner.setVelocityY(-200);
	}
	down(){
		gunDrawn = false;
		this.player.play("playerWalk");
		this.player.setVelocityY(200);
		this.playerBulletCollider.setVelocityY(200);
		this.npcSpawner.setVelocityY(200);
	}
	left(){
		gunDrawn = false;
		this.player.play("playerWalk");
		this.player.setVelocityX(-200);
		this.player.flipX = true;
		this.player.body.setOffset(0,62);
		this.playerBulletCollider.setVelocityX(-200);
		this.npcSpawner.setVelocityX(-200);
	}
	right(){
		gunDrawn = false;
		this.player.play("playerWalk");
		this.player.setVelocityX(200);
		this.player.flipX = false;
		this.player.body.setOffset(12,62);
		this.playerBulletCollider.setVelocityX(200);
		this.npcSpawner.setVelocityX(200);
	}
	release(){
		this.player.setVelocity(0);
		this.player.play("playerIdle");
		this.playerBulletCollider.setVelocity(0);
		this.npcSpawner.setVelocity(0);
	}
}
