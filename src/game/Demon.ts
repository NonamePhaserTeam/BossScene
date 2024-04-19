import Phaser, { Physics } from "phaser";

// creare una classe ad hoc per sprite o oggetti di gioco complessi

import AnimationKeys from "../consts/AnimationKeys";

export default class Demon extends Phaser.Physics.Arcade.Sprite {
    private speed = 250;
    private bodyObject: Phaser.Physics.Arcade.Body
    private isMoving: boolean

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) 
    {
        super(scene, x, y, texture, frame);

        this.scene.physics.world.enableBody(this);
        this.bodyObject = this.body as Phaser.Physics.Arcade.Body

        this.bodyObject.setSize(this.body.width * 1, this.body.height * 1);
        this.bodyObject.setOffset(0, 0);

        this.anims.play(AnimationKeys.DemonBoss.Idle,true);
        this.scene.add.existing(this);
        
        this.StopMovement()
    }

    create() {}

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);

    }

    StopMovement()
    {
        this.bodyObject.setAllowGravity(false)
        this.bodyObject.setImmovable(true)
        this.isMoving = false
    }
}
