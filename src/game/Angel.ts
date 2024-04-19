import Phaser, { Physics } from "phaser";
import { gameData } from "../consts/GameData";
// creare una classe ad hoc per sprite o oggetti di gioco complessi

import AnimationKeys from "../consts/AnimationKeys";

export default class Angel extends Phaser.Physics.Arcade.Sprite {
  private speed = 250;
  private bodyObject: Phaser.Physics.Arcade.Body;
  private isMoving: boolean;
  private health = 60;
  private isAlive = true;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.scene.physics.world.enableBody(this);
    this.bodyObject = this.body as Phaser.Physics.Arcade.Body;

    this.bodyObject.setSize(this.body.width * 1, this.body.height * 1);
    this.bodyObject.setOffset(0, 0);

    this.anims.play(AnimationKeys.AngelBoss.Idle);
    this.scene.add.existing(this);

    this.StopMovement();
  }

  create() {}

  preUpdate(t: number, dt: number) {
    // update per tutte le componenti dello sprite compless
    super.preUpdate(t, dt);
  }

  OnHit(damage: number) {
    this.health -= damage;
	gameData.angelHealth += 1;
	if (this.health <= 0) {
      this.isAlive = false;
      this.destroy(true);
    }
  }
  BossMovement() {
    if (this.isAlive) {
      const PositionX = [100, 300, 550, 675, 995];
      const PositionY = [275, 335, 775, 675, 990];

      const randomIndex = Phaser.Math.Between(0, PositionX.length - 1);

      const targetX = PositionX[randomIndex];
      const targetY = PositionY[randomIndex];

      const dx = targetX - this.x;
      const dy = targetY - this.y;

      // Calculate the angle and speed
      const angle = Math.atan2(dy, dx);
      const speed = 50;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      this.setVelocity(vx, vy);
    }
  }

  StopMovement() {
    this.bodyObject.setAllowGravity(false);
    this.bodyObject.setImmovable(true);
    this.isMoving = false;
  }
}
