// inserire qui le texture sotto forma di chiave valore per un utilizzo più veloce e ordinato nelle scene

namespace TextureKeys {
  export enum BossAngel {
    Background = "bg-boss-angel",
    Platform = "platform-boss-angel",
    Platform2 = "platform-boss-angel2",
    AngelHealthbar = "angel-boss-healthbar",
    Angel = "boss-angel",
  }

  export enum Assets {
    Player = "player",
    PlayerHealthBar = "player-healthbar",
    Bomb = "bomb",
    rock = "rock",
  }

  export enum DemonBoss {
	Demon = "demon"
  }

  export enum Global {
    Die = "die",
    Back = "back",
    Black = "black",
  }

  export enum Caverna {
    CavernaNine = "cavernanine",
    CavernaEight = "cavernaeight",
    CavernaSeven = "cavernaseven",
    CavernaSix = "cavernasix",
    CavernaFive = "cavernafive",
    CavernaFour = "cavernafour",
    CavernaThree = "cavernathree",
    CavernaTwo = "cavernatwo",
    CavernaOne = "cavernaone",
  }

  // export enum Texture {
  //   // player = "player",
  // }
  export enum Texture {
    tilemap = "tilemap",
    Logo = "logo",
    Background = "background",
    platform = "platform",
    player = "player",
    SkeletonEnemy = "SkeletonEnemy",
    portale = "portale",
    fionda = "fionda",
    Boss = "boss",
    Bomb = "bomb",
  }
  export enum player {
    player = "player",
    playerHealthBar = "player-healthbar",
    bomb = "bomb",
  }
  export enum Monster {
    idle = "bossIdle",
    Background = "bg-boss-monster",
    Platform = "platform-boss-monster",
    MonsterHealthbar = "monster-boss-healthbar",
    Monster = "boss-monster",
  }
}

export default TextureKeys;
