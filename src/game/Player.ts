import Phaser, { Physics } from "phaser";

// creare una classe ad hoc per sprite o oggetti di gioco complessi

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Player extends Phaser.Physics.Arcade.Sprite
{
    private speed = 250
    private isMoving = false
    private isAttacking = false
    private health = 100

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame ?: string | number)
    {
        super(scene, x, y, texture, frame)

        this.scene.physics.world.enableBody(this)
        
        this.body.setSize(this.body.width * 0.4, this.body.height * 0.65)
        this.body.setOffset(35, 40)
        
        this.anims.play(AnimationKeys.Player.Idle)
        
        this.scene.add.existing(this)
    }

    create()
    {
        
    }

    preUpdate(t: number, dt: number)
    {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt)
    }

    BossDamaged()
    {
        if(this.isAttacking)
        {
            return true
        }
        else
        {
            return false
        }
    }

    HandleMovement(UP: Phaser.Input.Keyboard.Key, LEFT: Phaser.Input.Keyboard.Key, DOWN: Phaser.Input.Keyboard.Key, RIGHT: Phaser.Input.Keyboard.Key)
    {
        if(this.isAttacking) return

        this.isMoving = false
        if(LEFT.isDown)
        {
            this.isMoving = true
            this.anims.play(AnimationKeys.Player.Run, true)
            this.setVelocityX(-this.speed)

            this.scaleX = -1
            this.body.offset.x = 90
        }
        if(RIGHT.isDown)
        {
            this.isMoving = true
            this.anims.play(AnimationKeys.Player.Run, true)
            this.setVelocityX(this.speed)

            this.scaleX = 1
            this.body.offset.x = 40
        }
        if(DOWN.isDown)
        {
            this.isMoving = true
            this.anims.play(AnimationKeys.Player.Idle, true)
            this.setAccelerationY(this.speed*3)
        }
        if(UP.isDown)
        {
            if(this.body.velocity.y == 0)
            {
                this.isMoving = true
                this.anims.play(AnimationKeys.Player.Jump, true)
                this.setVelocityY(-this.speed)
            }
        }
        if(!this.isMoving)
        {
            this.anims.play(AnimationKeys.Player.Idle, true)
            this.setAccelerationY(0)
            this.setVelocityX(0)
        }
    }

    HandleAttack(Key1: Phaser.Input.Keyboard.Key, Key2: Phaser.Input.Keyboard.Key, Key3: Phaser.Input.Keyboard.Key)
    {
        if(Key1.isDown)
        {
            this.isAttacking = true
            this.anims.play(AnimationKeys.Player.Attack1)
        }
        else if(Key2.isDown)
        {
            this.isAttacking = true
            this.anims.play(AnimationKeys.Player.Attack2)
        }
        else if(Key3.isDown)
        {
            this.isAttacking = true
            this.anims.play(AnimationKeys.Player.Attack3)
        }

        this.on('animationcomplete', () => {
            this.isAttacking = false
        })
    }
}
