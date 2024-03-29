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
		this.LoadImages()
		this.LoadSpritesheets()
	}

	create() {
		// creazione di tutte le animazioni
		this.CreateAnimations()

		this.scene.stop(SceneKeys.Preloader);
		this.scene.start(SceneKeys.Game);
	}

	private LoadImages() :void
	{
		this.load.image(TextureKeys.Background, "images/background.png");
		this.load.image(TextureKeys.Platform, "images/background.png");
		// this.load.image(TextureKeys.Player, "images/Character/000.png");
		this.load.image(TextureKeys.Boss, "images/Character/0001.png");
		this.load.image(TextureKeys.Bomb, "images/bomb.png");
	
	}

	private LoadSpritesheets() :void
	{
		this.load.atlas(TextureKeys.Player, 'Samurai/atlas/samurai.png', 'Samurai/atlas/samurai.json')
	}

	private CreateAnimations() :void
	{
		this.anims.create({
			key: AnimationKeys.Player.Attack1,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 5, prefix: 'attack_1_', suffix: '.png'}
			),
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Attack2,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 3, prefix: 'attack_2_', suffix: '.png'}
			),
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Attack3,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 2, prefix: 'attack_3_', suffix: '.png'}
			),
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Dead,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 2, prefix: 'dead_', suffix: '.png'}
			),
			repeat: -1,
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Hurt,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 1, prefix: 'hurt_', suffix: '.png'}
			),
			repeat: -1,
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Jump,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 11, prefix: 'jump_', suffix: '.png', zeroPad: 2}
			),
			repeat: -1,
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Run,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 7, prefix: 'run_', suffix: '.png'}
			),
			repeat: -1,
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Walk,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 7, prefix: 'walk_', suffix: '.png'}
			),
			repeat: -1,
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Shield,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 1, prefix: 'shield_', suffix: '.png'}
			),
			repeat: -1,
			frameRate: 10
		})

		this.anims.create({
			key: AnimationKeys.Player.Idle,
			frames: this.anims.generateFrameNames(
				TextureKeys.Player,
				{ start: 0, end: 5, prefix: 'idle_', suffix: '.png'}
			),
			repeat: -1,
			frameRate: 10
		})
	}

}
