import { globalEval } from "jquery";
import Phaser from "phaser";

import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class HelloWorldScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Image;
  private platform: Phaser.Physics.Arcade.Image;
  private A: Phaser.Input.Keyboard.Key;
  private D: Phaser.Input.Keyboard.Key;
  private S: Phaser.Input.Keyboard.Key;
  private W: Phaser.Input.Keyboard.Key;
  private isMovingLeft: boolean = false;
  private isMovingRight: boolean = false;
  private isMovingUp: boolean = false;
  private isMovingDown: boolean = false;
  private isWDown: boolean = false;
  private wCooldown: number = 1600;
  private wCooldownTimer: Phaser.Time.TimerEvent;
  private boss: Phaser.Physics.Arcade.Image;
  private groupDanger: Phaser.Physics.Arcade.StaticGroup;
  private bomb: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super(SceneKeys.Game);
  }

  preload() {
    this.load.image(TextureKeys.Background, "assets/images/background.png");
    this.load.image(TextureKeys.Platform, "assets/images/background.png");
    this.load.image(TextureKeys.Player, "assets/images/Character/000.png");
    this.load.image(TextureKeys.Boss, "assets/images/Character/0001.png");
    this.load.image(TextureKeys.Bomb, "assets/images/bomb.png");
  }

  create() {
    let bossPositionX = 936;
    let bossPositionY = 400;
    let characterPositionX = 736;
    let characterPositionY = 860;
    this.BackGround();
    this.Platform();
    this.Character(characterPositionX, characterPositionY);
    this.physics.add.collider(this.player, this.platform);
    this.MovementPlayer();
    this.Boss(bossPositionX, bossPositionY);
    this.Bomb(bossPositionX, bossPositionY + 25);
    this.MovementBomb(
      characterPositionX,
      characterPositionY,
      bossPositionX,
      bossPositionY
    );
    // this.groupDanger = this.physics.add.staticGroup();

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.createBomb();
      },
    });

    // this.physics.add.collider(this.bomb, this.player);

    this.physics.add.overlap(this.bomb, this.player, (bomb, player) => {
      bomb.destroy();
    });
  }

  init() {
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }

  update(t: number, dt: number) {
    this.player.setVelocityX(0);

    if (this.A.isDown) {
      this.player.setVelocityX(-320);
    } else if (this.D.isDown) {
      this.player.setVelocityX(320);
    }

    if (this.W.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-320);
    }

    if (this.S.isDown) {
      this.player.setVelocityY(320);
    }
  }

  //Crezione del background
  BackGround() {
    this.add
      .image(
        gameSettings.gameWidth * 0.5,
        gameSettings.gameHeight * 0.5,
        TextureKeys.Background
      )
      .setScale(2);
  }

  //Crezione della piattaforma
  Platform() {
    this.platform = this.physics.add
      .staticImage(936, 950, TextureKeys.Platform)
      .setSize(1750, 125)
      .setScale(1.28, 0.2);
  }

  //Creazione della posizione
  Character(characterPositionX: number, characterPositionY: number) {
    this.player = this.physics.add
      .image(characterPositionX, characterPositionY, TextureKeys.Player)
      .setCollideWorldBounds(true);
  }

  //Creazione del boss
  Boss(bossPositionX: number, bossPositionY: number) {
    // let bossPositionX = 936;
    // let bossPositionY = 400;
    this.boss = this.physics.add
      .staticImage(bossPositionX, bossPositionY, TextureKeys.Boss)
      .setSize(1, 1);
  }

  MovementPlayer() {
    this.wCooldownTimer = this.time.addEvent({
      delay: this.wCooldown,
      callback: () => {
        this.isWDown = true;
      },
      loop: true,
    });
  }

  Bomb(bossPositionX: number, bossPositionY: number) {
    this.bomb = this.physics.add.sprite(
      bossPositionX,
      bossPositionY,
      TextureKeys.Bomb
    );
    this.bomb.setScale(0.05);
    this.bomb.setGravity(0, 200);
  }

  MovementBomb(
    characterPositionX: number,
    characterPositionY: number,
    bossPositionX: number,
    bossPositionY: number
  ) {
    const dx = characterPositionX - bossPositionX;
    const dy = characterPositionY - bossPositionY;
    const angle = Math.atan2(dy, dx);
    const speed = 500;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    this.bomb.setVelocity(vx, vy);
  }

  createBomb() {
    const bossPositionX = this.boss.x;
    const bossPositionY = this.boss.y + 25;

    const bomb = this.physics.add.sprite(
      bossPositionX,
      bossPositionY,
      TextureKeys.Bomb
    );
    bomb.setScale(0.05);
    bomb.setGravity(0, -200);

    // this.groupDanger.add(bomb);

    const characterPositionX = this.player.x;
    const characterPositionY = this.player.y;
    const dx = characterPositionX - bossPositionX;
    const dy = characterPositionY - bossPositionY;
    const angle = Math.atan2(dy, dx);
    const speed = 100;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    bomb.setVelocity(vx, vy);
  }
}
