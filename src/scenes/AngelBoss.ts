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

export default class AngelBoss extends Phaser.Scene {
  private platform: Phaser.Physics.Arcade.Image;

  private player: Player;
  private playerPosition = {
    x: 400,
    y: 700,
  };

  private boss: Angel;
  private bossPosition = {
    x: 900,
    y: 300,
  };

  private playerHealthbar: Healthbar;
  private bossHealthbar: Healthbar;

  private SPACE: Phaser.Input.Keyboard.Key;
  private A: Phaser.Input.Keyboard.Key;
  private S: Phaser.Input.Keyboard.Key;
  private D: Phaser.Input.Keyboard.Key;
  private Q: Phaser.Input.Keyboard.Key;
  private lastQ = 0;
  private countplayer = 0;
  private countboss = 0;
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
      .staticImage(936, 950, TextureKeys.BossAngel.Platform)
      .setSize(1750, 125)
      .setScale(1.28, 0.2);

    this.player = new Player(
      this,
      this.playerPosition.x,
      this.playerPosition.y,
      TextureKeys.Assets.Player
    );
    this.add.existing(this.player);

    this.physics.add.collider(this.player, this.platform);

    //modificare playerHeathbar

    this.playerHealthbar = new Healthbar(
      this,
      100,
      100,
      TextureKeys.Assets.PlayerHealthBar
    );

    // this.playerHealthbar.setFrameProperties("hearts");
    this.playerHealthbar.setFrameProperties("vita");

    this.bossHealthbar = new Healthbar(
      this,
      gameSettings.gameWidth - 200,
      100,
      TextureKeys.BossAngel.AngelHealthbar
    );
    this.bossHealthbar.setFrameProperties("healthbar");

    this.boss = new Angel(
      this,
      this.bossPosition.x,
      this.bossPosition.y,
      TextureKeys.BossAngel.Angel
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
        this.BossMovement();
      },
      callbackScope: this,
    });
  }

  update(time: number, delta: number) {
    this.player.HandleMovement(this.A, this.SPACE, this.D);
    this.playerHealthbar.updateBar(gameData.playerHealth);

    if (this.Q.isDown && time > 500 + this.lastQ) {
      this.lastQ = time;
      if (!this.player.BossDamaged()) {
        this.countboss++;
        // this.player.HandleDamage();
        // this.playerHealthbar.updateBar(gameData.playerHealth);

        gameData.angelHealth += 1;
        this.bossHealthbar.updateBar(gameData.angelHealth);
        if (this.countboss == 7) {
          alert("Player wins");
          // this.scene.start(SceneKeys.Jumper);
        }
      }
    }
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
  BossMovement() {
    const PositionX = [100, 300, 550, 675, 995];
    const PositionY = [275, 335, 775, 675, 990];

    const randomIndex = Phaser.Math.Between(0, PositionX.length - 1);

    const targetX = PositionX[randomIndex];
    const targetY = PositionY[randomIndex];

    const dx = targetX - this.boss.x;
    const dy = targetY - this.boss.y;

    // Calculate the angle and speed
    const angle = Math.atan2(dy, dx);
    const speed = 50;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    this.boss.setVelocity(vx, vy);
  }
}
