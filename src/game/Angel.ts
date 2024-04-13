import Phaser, { Physics } from "phaser";

// creare una classe ad hoc per sprite o oggetti di gioco complessi

import AnimationKeys from "../consts/AnimationKeys";
import Boss2Keys from "../consts/Boss2Keys";
export default class Angel extends Phaser.Physics.Arcade.Sprite {
  private speed = 250;
  private isMoving = false;
  private isAttacking = false;
  private health = 100;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.scene.physics.world.enableBody(this);

    this.body.setSize(this.body.width * 1, this.body.height * 1);
    this.body.setOffset(0, 0);

    this.anims.play(AnimationKeys.Boss2.Idle);

    this.scene.add.existing(this);
  }

  create() {}

  preUpdate(t: number, dt: number) {
    // update per tutte le componenti dello sprite compless
    super.preUpdate(t, dt);
  }

  OnPlayerTouch(damaged: boolean) {
    this.setVelocity(0, 0);

    if (damaged) {
      console.log("Boss colpito");
    }
  }

  HandleAttack(
    Key1: Phaser.Input.Keyboard.Key,
    Key2: Phaser.Input.Keyboard.Key,
    Key3: Phaser.Input.Keyboard.Key
  ) {
    if (Key1.isDown) {
      this.isAttacking = true;
      this.anims.play(AnimationKeys.Player.Attack1);
    } else if (Key2.isDown) {
      this.isAttacking = true;
      this.anims.play(AnimationKeys.Player.Attack2);
    } else if (Key3.isDown) {
      this.isAttacking = true;
      this.anims.play(AnimationKeys.Player.Attack3);
    }

    this.on("animationcomplete", () => {
      this.isAttacking = false;
    });
  }
}
