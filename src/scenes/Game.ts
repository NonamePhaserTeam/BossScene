import { extend, globalEval } from "jquery";
import Phaser, { Scene } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import Player from "../game/Player";
import Enemy from "../game/Enemy";
import Angel from "../game/Angel";
import Boss1Keys from "../consts/Boss1Keys";
import Boss2Keys from "../consts/Boss2Keys";

export default class Game extends Phaser.Scene {
  private platform: Phaser.Physics.Arcade.Image;
  private platform2: Phaser.Physics.Arcade.Image;
  private player: Player;
  private enemy: Enemy;
  private angel: Angel;
  private SPACE: Phaser.Input.Keyboard.Key;
  private A: Phaser.Input.Keyboard.Key;
  private S: Phaser.Input.Keyboard.Key;
  private D: Phaser.Input.Keyboard.Key;
  private attackCursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private boss1healthbar: Phaser.Physics.Arcade.Image;
  private boss2healthbar: Phaser.Physics.Arcade.Image;
  private boss3healthbar: Phaser.Physics.Arcade.Image;
  private attack: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    let bossPositionX = 900;
    let bossPositionY = 300;
    let playerPositionX = 400;
    let playerPositionY = 700;

    // background
    this.add
      .image(
        gameSettings.gameWidth * 0.5,
        gameSettings.gameHeight * 0.5,
        TextureKeys.Background
      )
      .setScale(1);

    // platform
    this.platform = this.physics.add
      .staticImage(936, 950, TextureKeys.Platform)
      .setSize(1750, 125)
      .setScale(1.28, 0.2);

    this.platform2 = this.physics.add
      .staticImage(300, 700, TextureKeys.Platform2)
      .setSize(500, 65)
      .setScale(0.367, 0.1);

    // Creazione del giocatore
    this.player = new Player(
      this,
      playerPositionX,
      playerPositionY,
      TextureKeys.Player
    );
    this.physics.add.collider(this.platform, this.player);
    this.physics.add.collider(this.platform2, this.player);

    // Creazione dell'angelo
    this.angel = new Angel(
      this,
      bossPositionX,
      bossPositionY,
      TextureKeys.Boss
    );

    this.time.addEvent({
      delay: 1700,
      loop: true,
      callback: () => {
        this.AngelMovementX();
        this.AngelMovementY();
      },
    });

    // Verifica se l'angelo è stato correttamente inizializzato prima di chiamare AttackBoss()
    if (this.angel && this.angel.body) {
      this.AttackBoss();
    }

    // Impostazione della gravità dell'angelo
    if (this.angel && this.angel.body) {
      this.angel.setGravity(0, -500);
    }

    this.time.addEvent({
      delay: 1750,
      loop: true,
      callback: () => {
        this.AttackBoss();
      },
    });

    // Collisioni

    // Gestione delle input
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.attackCursors = this.input.keyboard.createCursorKeys();

    // Creazione della health bar del boss2
    this.boss2healthbar = this.physics.add
      .staticImage(1650, 100, Boss2Keys.Boss2HealthBar1)
      .setSize(700, 100)
      .setScale(1.75);
  }

  update(time: number, delta: number): void {
    this.player.HandleMovement(this.SPACE, this.A, this.S, this.D);
    this.player.HandleAttack(
      this.attackCursors.up,
      this.attackCursors.left,
      this.attackCursors.right
    );
  }

  AngelMovementX() {
    this.angel.setVelocity(1, 100);
  }

  AngelMovementY() {
    this.angel.setVelocityY(100);
  }

  AttackBoss() {
    const bossPositionX = this.angel.x;
    const bossPositionY = this.angel.y + 25;

    const attack = this.physics.add.sprite(
      bossPositionX,
      bossPositionY,
      TextureKeys.Bomb
    );
    attack.setScale(0.05);
    attack.setGravity(0, -500);

    // this.groupDanger.add(bomb);

    const playerPositionX = this.player.x;
    const playerPositionY = this.player.y;
    const dx = playerPositionX - bossPositionX;
    const dy = playerPositionY - bossPositionY;
    const angle = Math.atan2(dy, dx);
    const speed = 100;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    attack.setVelocity(vx, vy);

    this.attack = attack;

    // Gestione dell'overlapping tra attacco e giocatore
    this.physics.add.overlap(
      this.player,
      this.attack,
      this.onPlayerAttackOverlap,
      null,
      this
    );
  }

  onPlayerAttackOverlap() {
    this.attack.destroy(); // Distrugge l'attacco quando collide con il giocatore
  }
}
