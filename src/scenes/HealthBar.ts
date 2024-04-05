import Phaser, { Scene } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import BarKeys from "../consts/BarKeys";

export default class HealthBar extends Phaser.Scene {
  private platform: Phaser.Physics.Arcade.Image;
  private background: Phaser.Physics.Arcade.Image;
  private HealthBar1: Phaser.Physics.Arcade.Image;
  private HealthBar2: Phaser.Physics.Arcade.Image;
  private HealthBar3: Phaser.Physics.Arcade.Image;
  private buttonup: Phaser.Physics.Arcade.Image;
  private buttondown: Phaser.Physics.Arcade.Image;

  constructor() {
    super(SceneKeys.HealthBar);
  }

  create() {
    console.log("HealthBar scene created!");
    this.Background();
    this.Platform();
    this.HealthBar1 = this.physics.add
      .staticImage(300, 300, BarKeys.HealthBar1)
      .setSize(300, 115)
      .setScale(2);
    this.buttondown = this.physics.add
      .staticImage(600, 600, BarKeys.ButtomUp)
      .setInteractive();
    this.buttonup = this.physics.add
      .staticImage(750, 600, BarKeys.ButtonDown)
      .setInteractive();

    this.buttondown.on("pointerdown", () => {
      // Cambia l'immagine della healthBar al clic del pulsante buttondown
      this.HealthBar1.setTexture(BarKeys.HealthBar2);
    });

    this.buttonup.on("pointerdown", () => {
      // Cambia l'immagine della healthBar al clic del pulsante buttonup
      this.HealthBar1.setTexture(BarKeys.HealthBar3);
    });
  }

  Background() {
    this.add
      .image(
        gameSettings.gameWidth * 0.5,
        gameSettings.gameHeight * 0.5,
        BarKeys.Background
      )
      .setScale(2);
  }

  Platform() {
    this.platform = this.physics.add
      .staticImage(936, 950, BarKeys.Platform)
      .setSize(1750, 125)
      .setScale(1.28, 0.2);
  }
}
