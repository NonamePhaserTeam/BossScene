import Phaser, { Physics } from "phaser";

// creare una classe ad hoc per sprite o oggetti di gioco complessi

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import { gameData } from "../consts/GameData";

export default class Healthbar extends Phaser.GameObjects.Sprite 
{
    private frame_names: string

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) 
	{
		super(scene, x, y, texture);

		this.scene.add.existing(this);
	}

    setFrameProperties(name: string)
    {
        this.frame_names = name
    }

    updateBar(frame_number: number)
    {
        let frame = this.frame_names + frame_number + ".png"
        this.setFrame(frame)
    }
}