import Phaser, { Scene } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import BarKeys from "../consts/BarKeys";

export default class HealthBar extends Phaser.Scene {
  private HealthBar1: Phaser.Physics.Arcade.Image;
  private HealthBar2: Phaser.Physics.Arcade.Image;
  private HealthBar3: Phaser.Physics.Arcade.Image;
  private HealthBar4: Phaser.Physics.Arcade.Image;
  private HealthBar5: Phaser.Physics.Arcade.Image;
  private HealthBar6: Phaser.Physics.Arcade.Image;
  private HealthBar7: Phaser.Physics.Arcade.Image;
  private buttonup: Phaser.Physics.Arcade.Image;
  private buttondown: Phaser.Physics.Arcade.Image;

  constructor() {
    super(SceneKeys.HealthBar);
  }

  create() {
    console.log("HealthBar scene created!");
    this.HealthBar1 = this.physics.add
      .staticImage(150, 100, BarKeys.HealthBar1)
      .setSize(300, 115)
      .setScale(2);
    this.buttondown = this.physics.add
      .staticImage(600, 100, BarKeys.ButtomUp)
      .setInteractive();
    this.buttonup = this.physics.add
      .staticImage(750, 100, BarKeys.ButtonDown)
      .setInteractive();

    this.buttondown.on("pointerdown", () => {
      this.HealthBar1.setTexture(BarKeys.HealthBar2);
    });

    this.buttonup.on("pointerdown", () => {
      this.HealthBar1.setTexture(BarKeys.HealthBar3);
    });
  }
}
