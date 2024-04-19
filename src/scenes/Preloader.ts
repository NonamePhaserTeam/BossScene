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
        this.CreateBossAnims();

        this.scene.stop(SceneKeys.Preloader);
        this.scene.start(SceneKeys.AngelBoss);
        //this.scene.start(SceneKeys.DemonBoss);
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

        this.load.atlas(
            TextureKeys.Assets.Player,
            "spritesheets/player/player.png",
            "spritesheets/player/player.json"
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
            TextureKeys.DemonBoss.Demon,
            "spritesheets/DemonBoss/demon.png",
            "spritesheets/DemonBoss/demon.json"
        );
        this.load.atlas(
            TextureKeys.Texture.Demon,
            "spritesheets/DemonBoss/demon.png",
            "spritesheets/DemonBoss/demon.json"
        );


        this.load.atlas(
            TextureKeys.Assets.Bomb,
            "spritesheets/bomb/fire.png",
            "spritesheets/bomb/fire.json"
        );
    }
    CreateBossAnims(){
        this.anims.create({
            key: AnimationKeys.DemonBoss.Idle,
            frames: this.anims.generateFrameNames(TextureKeys.DemonBoss.Demon, {
                start: 1,
                end: 6,
                zeroPad: 1,
                prefix: "demonesistemato",
                suffix: ".png",
            }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: AnimationKeys.DemonBoss.Walk,
            frames: this.anims.generateFrameNames(TextureKeys.DemonBoss.Demon, {
                start: 7,
                end: 18,
                zeroPad: 1,
                prefix: "demonesistemato",
                suffix: ".png",
            }),
            frameRate: 8,
            repeat: 0,
        });
        this.anims.create({
            key: AnimationKeys.DemonBoss.Attack,
            frames: this.anims.generateFrameNames(TextureKeys.DemonBoss.Demon, {
                start: 19,
                end: 33,
                zeroPad: 1,
                prefix: "demonesistemato",
                suffix: ".png",
            }),
            frameRate: 8,
            repeat: 0,
        });
        this.anims.create({
            key: AnimationKeys.DemonBoss.Damaged,
            frames: this.anims.generateFrameNames(TextureKeys.DemonBoss.Demon, {
                start: 34,
                end: 38,
                zeroPad: 1,
                prefix: "demonesistemato",
                suffix: ".png",
            }),
            frameRate: 8,
            repeat: 0,
        });
        this.anims.create({
            key: AnimationKeys.DemonBoss.Death,
            frames: this.anims.generateFrameNames(TextureKeys.DemonBoss.Demon, {
                start: 39,
                end: 60,
                zeroPad: 1,
                prefix: "demonesistemato",
                suffix: ".png",
            }),
            frameRate: 8,
            repeat: 0,
        });
    }



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
            frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
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
