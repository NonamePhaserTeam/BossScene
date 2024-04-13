import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }

    preload()
    {
        // preload di tutti gli asset
        this.LoadImages()
        this.LoadSpritesheets()
    }

    create()
    {
        // creazione di tutte le animazioni
        this.CreateAnimations()

        this.scene.stop(SceneKeys.Preloader)
        this.scene.start(SceneKeys.AngelBoss)
    }

    LoadImages()
    {
        this.load.image(TextureKeys.BossAngel.Background, 'tiles/BossAngelo/bg.png')
        this.load.image(TextureKeys.BossAngel.Platform, 'tiles/BossAngelo/platform.png')
    }

    LoadSpritesheets()
    {
        this.load.atlas(
            TextureKeys.Assets.Player,
            "spritesheets/Samurai/atlas/samurai.png",
            "spritesheets/Samurai/atlas/samurai.json"
        )

        this.load.atlas(
            TextureKeys.Assets.PlayerHealthBar,
            "healthbars/player/healthbar.png",
            "healthbars/player/healthbar.json"
        )

        this.load.atlas(
            TextureKeys.BossAngel.AngelHealthbar,
            "healthbars/angel_boss/healthbar.png",
            "healthbars/angel_boss/healthbar.json"
        )

        this.load.atlas(
            TextureKeys.BossAngel.Angel,
            "spritesheets/angel_boss/boss.png", 
            "spritesheets/angel_boss/boss.json" 
        )

        this.load.atlas(
            TextureKeys.Assets.Bomb,
            "spritesheets/bomb/fire.png",
            "spritesheets/bomb/fire.json"
        )
    }

    CreateAnimations()
    {

        this.anims.create({
            key: AnimationKeys.Player.Attack1,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 5,
                prefix: "attack_1_",
                suffix: ".png",
            }),
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Attack2,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 3,
                prefix: "attack_2_",
                suffix: ".png",
            }),
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Attack3,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 2,
                prefix: "attack_3_",
                suffix: ".png",
            }),
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Dead,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 2,
                prefix: "dead_",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Hurt,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 1,
                prefix: "hurt_",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Jump,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 11,
                prefix: "jump_",
                suffix: ".png",
                zeroPad: 2,
            }),
            repeat: -1,
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Run,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 7,
                prefix: "run_",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Walk,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 7,
                prefix: "walk_",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Shield,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 1,
                prefix: "shield_",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.Player.Idle,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Player, {
                start: 0,
                end: 5,
                prefix: "idle_",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 10,
        })

        this.anims.create({
            key: AnimationKeys.AngelBoss.Idle,
            frames: this.anims.generateFrameNames(TextureKeys.BossAngel.Angel, {
                start: 1,
                end: 5,
                prefix: "boss",
                zeroPad: 1,
                suffix: ".png"
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: AnimationKeys.Bomb.Bomb,
            frames: this.anims.generateFrameNames(TextureKeys.Assets.Bomb,{
                start: 0,
                end: 2,
                prefix: "",
                zeroPad: 1,
                suffix: ".png"
            }),
            frameRate: 10,
            repeat: -1
        })
    }
}