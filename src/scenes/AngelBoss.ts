// import { globalEval } from "jquery";
import Phaser from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import Player from "../game/Player";
import Healthbar from "../game/HealthBar";
import Angel from "../game/Angel";
import { gameData } from "../consts/GameData";
import Bullets from "../game/Bullets";
import Monster from "../game/Monster";

export default class AngelBoss extends Phaser.Scene {
  private platform: Phaser.Physics.Arcade.Image;
  private platform2: Phaser.Physics.Arcade.Image;

  private player: Player;
  private playerPosition = {
    x: 400,
    y: 700,
  };

  private boss: Angel;
  private secondboss: Monster;
  private colpo: Bullets;
  private bossPosition = {
    x: 900,
    y: 300,
  };

  private secondobossPosition = {
    x: 900,
    y: 300,
  };

  private playerHealthbar: Healthbar;
  private bossHealthbar: Healthbar;
  private monsterHealth: Healthbar;

  private SPACE: Phaser.Input.Keyboard.Key;
  private A: Phaser.Input.Keyboard.Key;
  private S: Phaser.Input.Keyboard.Key;
  private D: Phaser.Input.Keyboard.Key;
  private Q: Phaser.Input.Keyboard.Key;
  private ENTER: Phaser.Input.Keyboard.Key;
  private X: Phaser.Input.Keyboard.Key;
  private P: Phaser.Input.Keyboard.Key;
  private LEFT: Phaser.Input.Keyboard.Key;
  private RIGHT: Phaser.Input.Keyboard.Key;
  private UP: Phaser.Input.Keyboard.Key;
  private DOWN: Phaser.Input.Keyboard.Key;

  private lastQ = 0;
  private countplayer = 0;
  private countboss = 0;
  private secondbountBoss = 0;
  private bombs: Phaser.GameObjects.Container;

  constructor() {
    super(SceneKeys.AngelBoss);
  }

  init() {
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.RIGHT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  create() {
    // this.add.image(
    //   gameSettings.gameWidth * 0.5,
    //   gameSettings.gameHeight * 0.5,
    //   TextureKeys.BossAngel.Background
    // );

    const map9 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaNine
    );
    map9.setDepth(-1000);

    const map8 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaEight
    );
    map8.setDepth(-990);

    const map7 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaSeven
    );
    map7.setDepth(-980);

    const map6 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaSix
    );
    map6.setDepth(-970);

    const map5 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaFive
    );
    map5.setDepth(-960);

    const map4 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaFour
    );
    map4.setDepth(-950);

    const map3 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaThree
    );
    map3.setDepth(-940);

    const map2 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaTwo
    );
    map2.setDepth(-930);

    const map1 = this.add.image(
      gameSettings.gameWidth * 0.5,
      gameSettings.gameHeight * 0.5,
      TextureKeys.Caverna.CavernaOne
    );
    map1.setDepth(-920);

    this.platform = this.physics.add
      .staticImage(
        gameSettings.gameWidth / 2,
        1090,
        TextureKeys.BossAngel.Platform
      )
      .setSize(1, 1)
      .setScale(4, 1);

    //modificare playerHeathbar

    this.playerHealthbar = new Healthbar(
      this,
      gameSettings.gameWidth - 200,
      gameSettings.gameHeight - 100,
      TextureKeys.Assets.PlayerHealthBar
    );

    // this.playerHealthbar.setFrameProperties("hearts");
    this.playerHealthbar.setFrameProperties("vita");
    this.playerHealthbar.setScale(2);

    this.bossHealthbar = new Healthbar(
      this,
      gameSettings.gameWidth / 2,
      100,
      TextureKeys.BossAngel.AngelHealthbar
    );
    this.bossHealthbar.setFrameProperties("healthbar");
    this.bossHealthbar.setScale(2);

    this.boss = new Angel(
      this,
      this.bossPosition.x,
      this.bossPosition.y,
      TextureKeys.BossAngel.Angel
    );

    this.player = new Player(
      this,
      this.playerPosition.x,
      this.playerPosition.y,
      TextureKeys.Assets.Player,
    //   this.boss
    );

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.createBomb();
      },
    });
    this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => {
        this.boss.BossMovement();
      },
      callbackScope: this,
    });
    this.colpo = new Bullets(this, this.player.x, this.player.y, "direction");
    if (this.player && this.boss) {
      // Esegui le operazioni solo se this.player e this.boss sono definiti
      // Ad esempio:
      this.physics.add.overlap(
        this.colpo,
        this.boss,
        this.handleBulletBossCollision,
        null,
        this
      );
    }
  }

  update(time: number, delta: number) {
    this.player.HandleMovement(this.A, this.SPACE, this.D);
	if(gameData.playerHealth <= 8)
    	this.playerHealthbar.updateBar(gameData.playerHealth);
    // if (Phaser.Input.Keyboard.JustDown()) {
    //   this.createRock();
    // }
    //codice nuovo
    this.player.HandleAttack(
      this.ENTER,
      this.X,
      this.S,
      this.LEFT,
      this.RIGHT,
      this.UP,
      this.DOWN
    );
    // this.boss.BossMovement();
	
	if (this.Q.isDown && time > 500 + this.lastQ) {
		this.lastQ = time;
		if (!this.player.BossDamaged()) {
		  this.countboss++;
		  // this.player.HandleDamage();
		  // this.playerHealthbar.updateBar(gameData.playerHealth);
  
		  gameData.angelHealth += 1;
		  this.bossHealthbar.updateBar(gameData.angelHealth);
		  // this.bossHealthbar.updateBar(gameData.monsterHealth);
			if (this.countboss == 7) {
				this.time.addEvent({
					delay: 0, // Dopo 2 secondi (2000 millisecondi)
					callback: this.shakeCamera,
					callbackScope: this,
				});
				this.flash();
	
				this.bossHealthbar.destroy();
				this.boss.destroy();
			
				this.secondboss = new Monster(
					this,
					this.secondobossPosition.x,
					this.secondobossPosition.y,
					TextureKeys.Monster.Monster
				);
  
				this.monsterHealth = new Healthbar(
				this,
				gameSettings.gameWidth / 2,
				100,
				TextureKeys.Monster.MonsterHealthbar
				);
				this.monsterHealth.setFrameProperties("healthbar");
				this.monsterHealth.setScale(2);
				if (this.Q.isDown && time > 500 + this.lastQ) {
					this.lastQ = time;
					if (!this.player.BossDamaged()) {
						gameData.monsterHealth += 1;
						this.monsterHealth.updateBar(gameData.monsterHealth);
					}
				}
			}	// this.scene.start(SceneKeys.Jumper);
		}
	}
    /* setTimeout(() => {
        this.colpo.checkCollision()
      }, 300); */
  }

  
  flash() {
    const rect = this.add.graphics();
    rect.fillStyle(0xffffff, 1); // Imposta il colore e l'opacità del rettangolo (bianco, opaco)
    rect.fillRect(0, 0, gameSettings.gameWidth * 2, gameSettings.gameHeight); // Disegna un rettangolo a schermo intero
    rect.setDepth(9999); // Assicura che il rettangolo sia sopra a tutti gli altri elementi

    const flashTween = this.tweens.add({
      targets: rect,
      alpha: { from: 1, to: 0.7 }, // Aumenta l'opacità da 1 a 0 per farlo scomparire
      duration: 300, // Durata del flash (in millisecondi)
      ease: "Linear",
      yoyo: true, // Ripeti l'effetto andando da 1 ad 0 e poi da 0 a 1
      repeat: 1, // Ripeti l'effetto due volte (una volta per ogni direzione dello yoyo)
      onComplete: () => {
        rect.destroy();
      },
    });

    // Avvia il tween
    flashTween.play();
  }
  shakeCamera() {
    const shakeDuration = 1000; // Durata del tremore in millisecondi (0.5 secondi)
    const shakeIntensity = 0.05; // Intensità del tremore

    // Fa tremare la camera principale della scena
    this.cameras.main.shake(shakeDuration, shakeIntensity);
  }
  

  createBomb() {
    const bossPositionX = this.boss.x;
    const bossPositionY = this.boss.y + 25;

    const bomb = this.physics.add.sprite(
      bossPositionX,
      bossPositionY,
      TextureKeys.Assets.Bomb
    );
    // bomb.depth = 0.6;
    bomb.setScale(3);
    bomb.setGravity(0, -200);

    // this.groupDanger.add(bomb);

    const characterPositionX = this.player.x;
    const characterPositionY = this.player.y;
    const dx = characterPositionX - bossPositionX;
    const dy = characterPositionY - bossPositionY;
    const angle = Math.atan2(dy, dx);
    const speed = 300;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    bomb.setVelocity(vx, vy);

    this.physics.add.overlap(
      bomb,
      this.platform,
      (obj1, obj2) => {
        obj1.destroy();
      },
      null,
      this
    );
    this.physics.add.overlap(
      bomb,
      this.player,
      (obj1, obj2) => {
        obj1.destroy();
        this.player.HandleDamage();
      },
      null,
      this
    );
  }

  // createRock() {
  //   const characterPositionX = this.player.x;
  //   const characterPositionY = this.player.y;

  //   const rock = new Bullets(
  //     this,
  //     characterPositionX,
  //     characterPositionY,
  //     "RIGHT" // Direzione del proiettile (ad esempio, 'RIGHT')
  //   );
  // }

  handleBulletBossCollision(colpo: any, boss: any) {
    alert("Colpito");
    colpo.destroy();
  }
}
