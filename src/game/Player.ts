import Phaser, { Game, Physics } from "phaser";
import AnimationKeys from "../consts/AnimationKeys";

// import { Bullets } from "../game/components";
import Bullets from "../game/Bullets";
import TextureKeys from "../consts/TextureKeys";
import { gameSettings } from "../consts/GameSettings";
import { gameData } from "../consts/GameData";
import SceneKeys from "../consts/SceneKeys";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    private speed = 250;
    private isMoving = false;
    private isMovingLeft = false;
    private isMovingRight = false;
    private isAttacking = false;
    private isTouchingDown = true;
    private isJumping = false;
    private enableDash = false;
    private shiftEnabled = true;
    private health = 100;
    private enableShooting = true;
    private dirshot: string;
    private colpo: Bullets;
    private dacol: number;
    private scena: Phaser.Scene
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
        this.scene.physics.world.enable(this);
        // this.setInteractive(true);
        this.scene.add.existing(this);
        this.create();
    }

    private create() {
        this.setCollideWorldBounds(true);
        this.anims.play(AnimationKeys.Player.Idle);
        this.setScale(1.5);
        this.scene.input.keyboard.on("keydown-SPACE", () => {
            if (this.isTouchingDown) {
                this.isJumping = true;
                setTimeout(() => {
                    this.isJumping = false;
                }, 500);
            }
        });
        /* this.on("pointerdown", () => {
                console.log("pointerdown");
            }) */
    }

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);
    }

    private handleResetFlag(flag: boolean, timeReset: number) {
        flag = true;
        setTimeout(() => {
            flag = false;
        }, timeReset);
    }

    getXY(): { x: number; y: number } {
        return {
            x: this.body.x,
            y: this.body.y,
        };
    }

    BossDamaged() {
        if (this.isAttacking) {
            return true;
        } else {
            return false;
        }
    }
    HandleMovement(
        LEFT: Phaser.Input.Keyboard.Key,
        SHIFT: Phaser.Input.Keyboard.Key,
        RIGHT: Phaser.Input.Keyboard.Key
        // Blow: Phaser.Input.Keyboard.Key,
    ) {
        if (this.isAttacking) {
            this.setVelocity(0);
            return;
        }

        this.setVelocity(0);

        this.isMoving = LEFT.isDown || RIGHT.isDown;
        this.isTouchingDown = this.body.touching.down || this.body.blocked.down;

        if (SHIFT.isDown && this.shiftEnabled) {
            this.enableDash = true;
            setTimeout(() => {
                this.shiftEnabled = true;
            }, 5000);
            setTimeout(() => {
                this.enableDash = false;
                this.shiftEnabled = false;
            }, 150);
        }
        if (this.isMoving) {
            if (this.isTouchingDown) this.anims.play(AnimationKeys.Player.Walk, true);
            if (LEFT.isDown) {
                this.setVelocityX(-this.speed);
                this.setFlipX(true);
                this.handleResetFlag(this.isMovingLeft, 300);
                if (this.enableDash && this.isTouchingDown) {
                    this.setVelocityX(-this.speed * 15);
                }
            }
            if (RIGHT.isDown) {
                this.setVelocityX(this.speed);
                this.setFlipX(false);
                this.handleResetFlag(this.isMovingRight, 300);

                if (this.enableDash && this.isTouchingDown) {
                    this.setVelocityX(this.speed * 15);
                }
            }
        }
        if (this.isJumping) {
            this.isMoving = true;
            this.anims.play(AnimationKeys.Player.Jump, true);
            this.setVelocityY(-this.speed * 3);
        } else if (!this.isTouchingDown) {
            this.setFrame("jumpsprite6.png");
            this.setVelocityY(this.speed);
        }

        if (!this.isMoving && this.isTouchingDown) {
            this.anims.play(AnimationKeys.Player.Idle, true);
            this.setAccelerationY(0);
            this.setVelocityX(0);
        }
    }

    HandleAttack(
        Key1?: Phaser.Input.Keyboard.Key, // cazzotto
        Key2?: Phaser.Input.Keyboard.Key, // blow
        Key3?: Phaser.Input.Keyboard.Key, // spada
        Key4?: Phaser.Input.Keyboard.Key, // left
        Key5?: Phaser.Input.Keyboard.Key, // right
        Key6?: Phaser.Input.Keyboard.Key, // up
        Key7?: Phaser.Input.Keyboard.Key // down
    ) {
        if (Key1.isDown) {
            this.isAttacking = true;
            this.anims.play(AnimationKeys.Player.Punch, true);
        } else if (Key2.isDown && !this.isTouchingDown) {
            this.isJumping = false;
            this.setVelocityY(this.speed * 20);
            // this.isAttacking = true;
            // this.anims.play(AnimationKeys.Player.Blow, true);
        } else if (Key3.isDown) {
            // this.anims.play(AnimationKeys.Player.Sword, true)
        }

        if (this.enableShooting) {
            if (
                Key4.isDown &&
                !Key6.isDown &&
                !Key7.isDown &&
                !Key5.isDown &&
                !this.isMovingRight
            ) {
                this.dirshot = "LEFT";
                this.setFlipX(true);
                this.isAttacking = true;
                this.anims.play(AnimationKeys.Player.fionda, true);
                this.handleResetFlag(this.enableShooting, 2000);
            } // SINISTRA

            if (
                Key5.isDown &&
                !Key6.isDown &&
                !Key7.isDown &&
                !Key4.isDown &&
                !this.isMovingLeft
            ) {
                this.dirshot = "RIGHT";
                this.setFlipX(false);
                this.isAttacking = true;
                this.anims.play(AnimationKeys.Player.fionda, true);
                this.handleResetFlag(this.enableShooting, 2000);
            } // DESTRA

            if (Key7.isDown && this.flipX) {
                this.dirshot = "LEFT_DOWN";
                this.setFlipX(true);
                this.isAttacking = true;
                this.anims.play(AnimationKeys.Player.fionda, true);
                this.handleResetFlag(this.enableShooting, 2000);
            } // BASSO SINISTRA
            else if (Key6.isDown && this.flipX) {
                this.dirshot = "LEFT_UP";
                this.setFlipX(true);
                this.isAttacking = true;
                this.anims.play(AnimationKeys.Player.fionda, true);
                this.handleResetFlag(this.enableShooting, 2000);
            } //ALTO SINISTRA

            if (Key7.isDown && !this.flipX) {
                this.dirshot = "RIGHT_DOWN";
                this.setFlipX(false);
                this.isAttacking = true;
                this.anims.play(AnimationKeys.Player.fionda, true);
                this.handleResetFlag(this.enableShooting, 2000);
            } // BASSO DESTRA
            else if (Key6.isDown && !this.flipX) {
                this.dirshot = "RIGHT_UP";
                this.setFlipX(false);
                this.isAttacking = true;
                this.anims.play(AnimationKeys.Player.fionda, true);
                this.handleResetFlag(this.enableShooting, 2000);
            } // ALTO DESTRA
        }

        this.on("animationcomplete", () => {
            this.isAttacking = false;
            // if (this.anims.currentAnim.key === "player-fionda") {
            //   this.colpo = new Bullets(
            //     this.this.scene,
            //     this.body.x,
            //     this.body.y,
            //     this.dirshot
            //   );

            //   /* setTimeout(() => {
            // 		this.colpo.checkCollision()
            // 	}, 300); */
            // }

            if (this.anims.currentAnim.key === AnimationKeys.Player.Jump) {
                console.log(this.anims.currentAnim.key);
            }
        });
    }

    getDir() {
        return this.dirshot;
    }

    HandleDamage() {
        if (gameData.playerHealth < 9) gameData.playerHealth += 1;
        if (gameData.playerHealth == 8) {

            if (this.scene) {
                //this.scene.start(SceneKeys.DemonBoss);

                //schermo nero opaco
                const black = this.scene.add.image(
                    gameSettings.gameWidth * 0.5,
                    gameSettings.gameHeight * 0.5,

                    TextureKeys.Global.Black
                );
                black.displayWidth = 1920;
                black.displayHeight = 1080;
                black.alpha = 0.5;

                //prima scritta
                const die = this.scene.add.image(
                    gameSettings.gameWidth * 0.5,
                    gameSettings.gameHeight * 0.5,
                    TextureKeys.Global.Die
                );
                die.setPosition(900, 450);

                //seconda scritta
                const back = this.scene.add.image(
                    gameSettings.gameWidth * 0.5,
                    gameSettings.gameHeight * 0.5,

                    TextureKeys.Global.Back
                );
                back.displayWidth = 800;
                back.displayHeight = 200;
                back.setPosition(900, 825);
                back.depth = 0.9;
                back.setInteractive();
                back.on("pointerdown", () => {
                    alert("hi");
                    // this.this.scene.start(SceneKeys.SelezioneModalità);
                    // Esegui qui le azioni che desideri quando l'immagine viene cliccata
                });
            }
        }
    }
}
