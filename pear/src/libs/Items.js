import Images from '../libs/Imgs'
let {Sword, Shield} = Images

export const itemWeapon = [
  {
    name: 'Combat Knife',
    dmg: 25,
    cost: 10,
    img: Sword
  },
  {
    name: 'ShortSword',
    dmg: 10,
    cost: 4,
    img: Sword
  }
]

export const itemShield = [
  {
    name: 'Guardian Shield',
    block: 10,
    cost: 10,
    img: Shield
  }
]

export const itemHead = [
  {
    name: 'Steel helmet',
    block: 5,
    cost: 4
    // img: Helmet
  }
]

export const itemChest = [
  {
    name: 'Dress',
    block: 1,
    cost: 1
    // img:
  }
]

export const itemLegs = [
  {
    name: 'Dragon Scale Legs',
    block: 5,
    cost: 4
    // img:
  }
]

export const itemFeet = [
  {
    name: 'Sandals',
    block: 3,
    cost: 4
    // img:
  }
]
