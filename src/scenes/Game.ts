import { extend, globalEval } from "jquery";
import Phaser, { Scene } from "phaser";

import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

import Player from "../game/Player";
import Enemy from "../game/Enemy";

export default class Game extends Phaser.Scene
{
    private platform: Phaser.Physics.Arcade.Image
    private player: Player
    private enemy: Enemy
    
    private SPACE: Phaser.Input.Keyboard.Key
    private A: Phaser.Input.Keyboard.Key
    private S: Phaser.Input.Keyboard.Key
    private D: Phaser.Input.Keyboard.Key
    private attackCursors: Phaser.Types.Input.Keyboard.CursorKeys

    

    constructor()
    {
        super(SceneKeys.Game)
    }

    create()
    {
        // background
        this.add.image(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 0.5, TextureKeys.Background)
            .setScale(2);

        // platform
        this.platform = this.physics.add
            .staticImage(936, 950, TextureKeys.Platform)
            .setSize(1750, 125)
            .setScale(1.28, 0.2);
    
        // let p = this.physics.add.sprite(100, 100, TextureKeys.Player)
        //     .setBodySize(50, 80)
        //     .setOffset(40, 22*2)
        //     .play(AnimationKeys.Player.Idle)

        // this.physics.add.collider(this.platform, p)

        this.player = new Player(this, 400, 700, TextureKeys.Player)
        this.physics.add.collider(this.platform, this.player)

        this.enemy = new Enemy(this, 700, 700, TextureKeys.Player)
        this.physics.add.collider(this.platform, this.enemy)
        this.physics.add.collider(this.player, this.enemy, this.OnPlayerEnemyCollision, null, this)

        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.attackCursors = this.input.keyboard.createCursorKeys()
    }

    update(time: number, delta: number): void {
        this.player.HandleMovement(this.SPACE, this.A, this.S, this.D)
        this.player.HandleAttack(this.attackCursors.up, this.attackCursors.left, this.attackCursors.right)
    }

    OnPlayerEnemyCollision()
    {
        let bossDamaged = this.player.BossDamaged()
        this.enemy.OnPlayerTouch(bossDamaged)
    }
}