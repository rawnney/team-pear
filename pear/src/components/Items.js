import Images from '../libs/Imgs'
let {Sword, Shield} = Images

export const itemWeapon = [
  {
    name: 'Longsword',
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
