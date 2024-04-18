import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

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
    // this.CreateAnimations();
    this.CreatePlayerAnims();

    this.scene.stop(SceneKeys.Preloader);
    this.scene.start(SceneKeys.AngelBoss);
  }

  LoadImages() {
    this.load.image(
      TextureKeys.BossAngel.Background,
      "tiles/BossAngelo/bg.png"
    );
    this.load.image(
      TextureKeys.BossAngel.Platform,
      "tiles/BossAngelo/platform.png"
    );

    this.load.image(TextureKeys.Global.Die, "images/die.png");
    this.load.image(TextureKeys.Global.Back, "images/back.png");
    this.load.image(TextureKeys.Global.Black, "images/black.png");
    this.load.image(
      TextureKeys.Caverna.CavernaNine,
      "tiles/BossAngelo/caverna9.png"
    );
    this.load.image(
      TextureKeys.Caverna.CavernaEight,
      "tiles/BossAngelo/caverna8.png"
    );
    this.load.image(
      TextureKeys.Caverna.CavernaSeven,
      "tiles/BossAngelo/caverna7.png"
    );
    this.load.image(
      TextureKeys.Caverna.CavernaSix,
      "tiles/BossAngelo/caverna6.png"
    );
    this.load.image(
      TextureKeys.Caverna.CavernaFive,
      "tiles/BossAngelo/caverna5.png"
    );
    this.load.image(
      TextureKeys.Caverna.CavernaFour,
      "tiles/BossAngelo/caverna4.png"
    );
    this.load.image(
      TextureKeys.Caverna.CavernaThree,
      "tiles/BossAngelo/caverna3.png"
    );
    this.load.image(
      TextureKeys.Caverna.CavernaTwo,
      "tiles/BossAngelo/caverna2.png"
    );
    this.load.image(
      TextureKeys.Caverna.CavernaOne,
      "tiles/BossAngelo/caverna1.png"
    );
  }

  LoadSpritesheets() {
    // this.load.atlas(
    //   TextureKeys.Assets.Player,
    //   "spritesheets/Samurai/atlas/samurai.png",
    //   "spritesheets/Samurai/atlas/samurai.json"
    // );

    this.load.atlas(
      TextureKeys.player.player,
      "spritesheets/player/.png",
      "spritesheets/player/sprite1.json"
    );

    //cuori
    // this.load.atlas(
    //   TextureKeys.Assets.PlayerHealthBar,
    //   "healthbars/player/healthbar.png",
    //   "healthbars/player/healthbar.json"
    // );

    //barra
    this.load.atlas(
      TextureKeys.Assets.PlayerHealthBar,
      "healthbars/player/vita.png",
      "healthbars/player/vita.json"
    );

    this.load.atlas(
      TextureKeys.BossAngel.AngelHealthbar,
      "healthbars/angel_boss/healthbar.png",
      "healthbars/angel_boss/healthbar.json"
    );

    this.load.atlas(
      TextureKeys.BossAngel.Angel,
      "spritesheets/angel_boss/boss.png",
      "spritesheets/angel_boss/boss.json"
    );

    this.load.atlas(
      TextureKeys.Assets.Bomb,
      "spritesheets/bomb/fire.png",
      "spritesheets/bomb/fire.json"
    );
  }

  // CreateAnimations() {
  //   this.anims.create({
  //     key: AnimationKeys.Player.Attack1,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 5,
  //       prefix: "attack_1_",
  //       suffix: ".png",
  //     }),
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Attack2,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 3,
  //       prefix: "attack_2_",
  //       suffix: ".png",
  //     }),
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Attack3,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 2,
  //       prefix: "attack_3_",
  //       suffix: ".png",
  //     }),
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Dead,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 2,
  //       prefix: "dead_",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Hurt,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 1,
  //       prefix: "hurt_",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Jump,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 11,
  //       prefix: "jump_",
  //       suffix: ".png",
  //       zeroPad: 2,
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Run,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 7,
  //       prefix: "run_",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Walk,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 7,
  //       prefix: "walk_",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Shield,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 1,
  //       prefix: "shield_",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Player.Idle,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
  //       start: 0,
  //       end: 5,
  //       prefix: "idle_",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.AngelBoss.Idle,
  //     frames: this.anims.generateFrameNames(TextureKeys.BossAngel.Angel, {
  //       start: 1,
  //       end: 5,
  //       prefix: "boss",
  //       zeroPad: 1,
  //       suffix: ".png",
  //     }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.Bomb.Bomb,
  //     frames: this.anims.generateFrameNames(TextureKeys.Assets.Bomb, {
  //       start: 0,
  //       end: 2,
  //       prefix: "",
  //       zeroPad: 1,
  //       suffix: ".png",
  //     }),
  //     frameRate: 10,
  //     repeat: -1,
  //   });
  // }

  CreatePlayerAnims() {
    this.anims.create({
      key: AnimationKeys.Player.Idle,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
        start: 1,
        end: 5,
        zeroPad: 1,
        prefix: "fermo",
        suffix: ".png",
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.Player.Walk,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
        start: 1,
        end: 8,
        zeroPad: 1,
        prefix: "camminata",
        suffix: ".png",
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.Player.Jump,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
        start: 4,
        end: 6,
        zeroPad: 1,
        prefix: "jumpsprite",
        suffix: ".png",
      }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: AnimationKeys.Player.Punch,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
        start: 2,
        end: 10,
        zeroPad: 1,
        prefix: "fight",
        suffix: ".png",
      }),
      frameRate: 12,
      repeat: 0,
    });

    this.anims.create({
      key: AnimationKeys.Player.fionda,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.fionda, {
        start: 2,
        end: 3,
        zeroPad: 1,
        prefix: "sparo fionda",
        suffix: ".png",
      }),
      frameRate: 12,
      repeat: 0,
    });

    this.anims.create({
      key: "loadfionda",
      frames: this.anims.generateFrameNames(TextureKeys.Texture.fionda, {
        start: 2,
        end: 2,
        zeroPad: 0,
        prefix: "sparo fionda",
        suffix: ".png",
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "sparofionda",
      frames: this.anims.generateFrameNames(TextureKeys.Texture.fionda, {
        start: 3,
        end: 3,
        zeroPad: 0,
        prefix: "sparo fionda",
        suffix: ".png",
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  // CreateEnemiesAnims() {
  //   this.anims.create({
  //     key: AnimationKeys.SkeletonEnemy.Idle,
  //     frames: this.anims.generateFrameNames(TextureKeys.Texture.SkeletonEnemy, {
  //       start: 1,
  //       end: 4,
  //       zeroPad: 1,
  //       prefix: "skeleton-idle",
  //       suffix: ".png",
  //     }),
  //     frameRate: 6,
  //     repeat: -1,
  //   });

  //   this.anims.create({
  //     key: AnimationKeys.SkeletonEnemy.Walk,
  //     frames: this.anims.generateFrameNames(TextureKeys.Texture.SkeletonEnemy, {
  //       start: 1,
  //       end: 8,
  //       zeroPad: 1,
  //       prefix: "skeleton-walk",
  //       suffix: ".png",
  //     }),
  //     frameRate: 6,
  //     repeat: -1,
  //   });
  // }

  // CreateEntitiesAnims() {}
}
