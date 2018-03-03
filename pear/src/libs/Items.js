import Images from '../libs/Imgs'
let {
  Club, CombatKnife, BoneSword, JaggedSword, FireSword, BladeOfDestruction,
  BrokenShield, VikingShield, TowerShield, DemonShield, BlessedShield,
  LeatherHelmet, JesterHat, ChainHelmet, VikingHelmet, RoyalHelmet, GoldenHelmet,
  LeatherArmor, FlowerDress, GreenTunic, ChainArmor, KnightArmor, GoldenArmor,
  LeatherLegs, BastSkirt, StuddedLegs, KnightLegs, DemonLegs, GoldenLegs,
  LeatherBoots, GuardianBoots, SteelBoots, FireWalkerBoots, GoldenBoots
} = Images

// head: 100,
// weapon: 101,
// chest: 102,
// shield: 103,
// legs: 104,
// feet: 105,

export const itemStart = [
  {
    id: 100,
    name: 'Leather Helmet',
    block: 1,
    img: LeatherHelmet
  },
  {
    id: 101,
    name: 'Club',
    dmg: 4,
    img: Club
  },
  {
    id: 102,
    name: 'Leather Armor',
    block: 1,
    img: LeatherArmor

  },
  {
    id: 103,
    name: 'Broken Shield',
    block: 10,
    img: BrokenShield
  },
  {
    id: 104,
    name: 'Leather Legs',
    block: 1,
    img: LeatherLegs
  },
  {
    id: 105,
    name: 'Leather Boots',
    block: 1,
    img: LeatherBoots
  }
]

export const itemWeapon = [
  {
    id: 0,
    name: 'Combat Knife',
    dmg: 10,
    cost: 4,
    img: CombatKnife
  },
  {
    id: 2,
    name: 'Bone Sword',
    dmg: 20,
    cost: 7,
    img: BoneSword
  },
  {
    id: 3,
    name: 'Jagged Sword',
    dmg: 30,
    cost: 11,
    img: JaggedSword
  },
  {
    id: 3,
    name: 'Fire Sword',
    dmg: 40,
    cost: 15,
    img: FireSword
  },
  {
    id: 4,
    name: 'Blade of Destruction',
    dmg: 50,
    cost: 29,
    img: BladeOfDestruction
  }
]

export const itemShield = [
  {
    id: 0,
    name: 'Viking Shield',
    block: 20,
    cost: 7,
    img: VikingShield
  },
  {
    id: 1,
    name: 'Tower Shield',
    block: 30,
    cost: 11,
    img: TowerShield
  },
  {
    id: 2,
    name: 'Demon Shield',
    block: 40,
    cost: 15,
    img: DemonShield
  },
  {
    id: 3,
    name: 'Blessed Shield',
    block: 50,
    cost: 29,
    img: BlessedShield
  }
]

export const itemHead = [
  {
    id: 0,
    name: 'Jester Hat',
    block: 1,
    cost: 1,
    img: JesterHat
  },
  {
    id: 1,
    name: 'Chain Helmet',
    block: 2,
    cost: 3,
    img: ChainHelmet
  },
  {
    id: 2,
    name: 'Viking Helmet',
    block: 4,
    cost: 6,
    img: VikingHelmet
  },
  {
    id: 3,
    name: 'Royal Helmet',
    block: 8,
    cost: 11,
    img: RoyalHelmet
  },
  {
    id: 4,
    name: 'Golden Helmet',
    block: 12,
    cost: 29,
    img: GoldenHelmet
  }
]

export const itemChest = [
  {
    id: 0,
    name: 'Flower Dress',
    block: 1,
    cost: 1,
    img: FlowerDress
  },
  {
    id: 1,
    name: 'Green Tunic',
    block: 2,
    cost: 4,
    img: GreenTunic
  },
  {
    id: 2,
    name: 'Chain Armor',
    block: 4,
    cost: 7,
    img: ChainArmor
  },
  {
    id: 3,
    name: 'Knight Armor',
    block: 9,
    cost: 17,
    img: KnightArmor
  },
  {
    id: 4,
    name: 'Golden Armor',
    block: 12,
    cost: 29,
    img: GoldenArmor
  }
]

export const itemLegs = [
  {
    id: 0,
    name: 'Bast Skirt',
    block: 1,
    cost: 1,
    img: BastSkirt
  },
  {
    id: 1,
    name: 'Studded Legs',
    block: 2,
    cost: 4,
    img: StuddedLegs
  },
  {
    id: 2,
    name: 'Knight Legs',
    block: 4,
    cost: 7,
    img: KnightLegs
  },
  {
    id: 3,
    name: 'Demon Legs',
    block: 9,
    cost: 17,
    img: DemonLegs
  },
  {
    id: 4,
    name: 'Golden Legs',
    block: 12,
    cost: 29,
    img: GoldenLegs
  }
]

export const itemFeet = [
  {
    id: 0,
    name: 'Guardian Boots',
    block: 2,
    cost: 4,
    img: GuardianBoots
  },
  {
    id: 1,
    name: 'Steel Boots',
    block: 4,
    cost: 7,
    img: SteelBoots
  },
  {
    id: 2,
    name: 'Fire Walker Boots',
    block: 9,
    cost: 17,
    img: FireWalkerBoots
  },
  {
    id: 3,
    name: 'Golden Boots',
    block: 12,
    cost: 29,
    img: GoldenBoots
  }
]
