import Phaser, { Scene } from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import BarKeys from "../consts/BarKeys";
import Boss1Keys from "../consts/Boss1Keys";
import Boss2Keys from "../consts/Boss2Keys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    // preload di tutti gli asset
    this.LoadImages();
    this.LoadSpritesheets();
  }

  create() {
    // creazione di tutte le animazioni
    this.CreateAnimations();
    // this.scene.start(SceneKeys.BossFight);
    this.scene.stop(SceneKeys.Preloader);
    // this.scene.start(SceneKeys.HealthBar);
    this.scene.start(SceneKeys.Game);
    this.scene.launch(SceneKeys.HealthBar);
  }

  private LoadImages(): void {
    this.load.image(TextureKeys.Background, "images/tilemaps/caverna.png");
    this.load.image(TextureKeys.Platform, "images/background.png");
    this.load.image(TextureKeys.Bomb, "images/bomb.png");
    this.load.image(TextureKeys.Attack, "images/bomb.png");
    this.load.image(BarKeys.ButtonDown, "images/buttondown.png");
    this.load.image(TextureKeys.Platform2, "images/background.png");
    this.load.image(BarKeys.ButtomUp, "images/buttonup.png");
    this.load.image(
      Boss1Keys.Boss1HealthBar1,
      "images/boss1/barravitaboss1.png"
    );
    this.load.image(
      Boss1Keys.Boss1HealthBar2,
      "images/boss1/barravitaboss2.png"
    );
    this.load.image(
      Boss1Keys.Boss1HealthBar3,
      "images/boss1/barravitaboss3.png"
    );
    this.load.image(
      Boss1Keys.Boss1HealthBar4,
      "images/boss1/barravitaboss4.png"
    );
    this.load.image(
      Boss1Keys.Boss1HealthBar5,
      "images/boss1/barravitaboss5.png"
    );
    this.load.image(
      Boss1Keys.Boss1HealthBar6,
      "images/boss1/barravitaboss6.png"
    );
    this.load.image(
      Boss1Keys.Boss1HealthBar7,
      "images/boss1/barravitaboss7.png"
    );
    this.load.image(
      Boss1Keys.Boss1HealthBar8,
      "images/boss1/barravitaboss8.png"
    );
    this.load.image(BarKeys.HealthBar1, "images/healthbar/hearts1.png");
    this.load.image(BarKeys.HealthBar2, "images/healthbar/hearts2.png");
    this.load.image(BarKeys.HealthBar3, "images/healthbar/hearts3.png");
    this.load.image(BarKeys.HealthBar4, "images/healthbar/hearts4.png");
    this.load.image(BarKeys.HealthBar5, "images/healthbar/hearts5.png");
    this.load.image(BarKeys.HealthBar6, "images/healthbar/hearts6.png");
    this.load.image(BarKeys.HealthBar7, "images/healthbar/hearts7.png");

    this.load.image(Boss2Keys.Boss2HealthBar1, "images/boss2/healthbar1.png");
    this.load.image(Boss2Keys.Boss2HealthBar2, "images/boss2/healthbar2.png");
    this.load.image(Boss2Keys.Boss2HealthBar3, "images/boss2/healthbar3.png");
    this.load.image(Boss2Keys.Boss2HealthBar4, "images/boss2/healthbar4.png");
    this.load.image(Boss2Keys.Boss2HealthBar5, "images/boss2/healthbar5.png");
    this.load.image(Boss2Keys.Boss2HealthBar6, "images/boss2/healthbar6.png");
    this.load.image(Boss2Keys.Boss2HealthBar7, "images/boss2/healthbar7.png");
    this.load.image(Boss2Keys.Boss2HealthBar8, "images/boss2/healthbar8.png");
  }

  private LoadSpritesheets(): void {
    this.load.atlas(
      TextureKeys.Player,
      "Samurai/atlas/samurai.png",
      "Samurai/atlas/samurai.json"
      // "images/boss2/boss1.png"
    );
    this.load.atlas(
      TextureKeys.Boss,
      "images/boss2/boss2_img/angels.png",
      "images/boss2/boss2_img/angel_boss.json"
    );
  }

  private CreateAnimations(): void {
    this.anims.create({
      key: AnimationKeys.Player.Attack1,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 5,
        prefix: "attack_1_",
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Attack2,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 3,
        prefix: "attack_2_",
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Attack3,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 2,
        prefix: "attack_3_",
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Dead,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 2,
        prefix: "dead_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Hurt,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 1,
        prefix: "hurt_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Jump,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 11,
        prefix: "jump_",
        suffix: ".png",
        zeroPad: 2,
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Run,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 7,
        prefix: "run_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Walk,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 7,
        prefix: "walk_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Shield,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 1,
        prefix: "shield_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Player.Idle,
      frames: this.anims.generateFrameNames(TextureKeys.Player, {
        start: 0,
        end: 5,
        prefix: "idle_",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Boss2.Idle,
      frames: this.anims.generateFrameNames(TextureKeys.Boss, {
        start: 1, //numero minimo dopo il prefisso dell'animazione
        end: 5, // stessa cosa ma il massimo, in poche parole primo ed ultimo frame
        prefix: "boss", // ciò che c'è prima del numero frame
        zeroPad: 1, // quanti numeri ci sono dopo il prefisso
        suffix: ".png", //
      }),
      frameRate: 6, // velocità di aggiornamento dell'animazione
      repeat: -1, // quante volte ripetere, per loopparla -1
    });
  }
}
