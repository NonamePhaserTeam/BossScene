import { globalEval } from "jquery";
import Phaser from "phaser";

import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class HelloWorldScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Image;
  private platform: Phaser.Physics.Arcade.Image;
  private A: Phaser.Input.Keyboard.Key;
  private D: Phaser.Input.Keyboard.Key;
  private S: Phaser.Input.Keyboard.Key;
  private W: Phaser.Input.Keyboard.Key;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super(SceneKeys.Game);
  }

  preload() {
    this.load.image(TextureKeys.Background, "assets/images/background.png");
    this.load.image(TextureKeys.Platform, "assets/images/background.png");
    this.load.image(TextureKeys.Player, "assets/images/Character/000.png");
  }

  create() {
    this.BackGround();
    this.Platform();
    this.Character();
    this.physics.add.collider(this.player, this.platform);
  }

  BackGround() {
    this.add
      .image(
        gameSettings.gameWidth * 0.5,
        gameSettings.gameHeight * 0.5,
        TextureKeys.Background
      )
      .setScale(2);
  }

  Platform() {
    this.platform = this.physics.add
      .staticImage(936, 950, TextureKeys.Platform)
      .setSize(1750, 125)
      .setScale(1.28, 0.2);
  }

  Character() {
    this.player = this.physics.add
      .image(936, 800, TextureKeys.Player)
      .setCollideWorldBounds(true);
  }

  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    if (this.A.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.D.isDown) {
      this.player.setVelocityX(160);
    }
    if (this.W.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-160);
    } else if (this.S.isDown) {
      this.player.setVelocityY(+160);
    }
  }
}
