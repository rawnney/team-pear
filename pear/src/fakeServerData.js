import React from 'react'
import Images from './libs/Imgs'

let {Monster, Robin} = Images

let fakeServerData = {
  users: [
    {
      userid: '0',
      username: undefined,
      password: undefined,
      name: 'Love',
      lastname: 'Stenkastare',
      avatar: Robin,
      email: undefined,
      sword: '25%',
      blockChance: '25%',
      magic: '25%',
      monstersKilled: '0',
      coins: '0',
      type: 'temp'
    },
    {
      userid: '1',
      username: 'Rawnney',
      password: 'password',
      name: 'Hugo',
      lastname: 'Rune',
      avatar: Robin,
      email: 'hugo@rune.com',
      sword: '100%',
      blockChance: '100%',
      magic: '100%',
      monstersKilled: '25',
      coins: '0',
      type: 'full'
    },
    {
      userid: '2',
      username: 'lol',
      password: 'password',
      name: 'Kalle',
      lastname: 'Rune',
      avatar: Robin,
      email: 'awd@awd.com',
      sword: '100%',
      blockChance: '100%',
      magic: '100%',
      monstersKilled: '25',
      coins: '0',
      type: 'full'
    },
    {
      userid: '3',
      username: 'lol',
      password: 'password',
      name: 'Orvar',
      lastname: 'Rune',
      avatar: Robin,
      email: 'awd@awd.com',
      sword: '100%',
      blockChance: '100%',
      magic: '100%',
      monstersKilled: '25',
      coins: '0',
      type: 'full'
    },
    {
      userid: '4',
      username: 'lol',
      password: 'password',
      name: 'Stina',
      lastname: 'Rune',
      avatar: Robin,
      email: 'awd@awd.com',
      sword: '100%',
      blockChance: '100%',
      magic: '100%',
      monstersKilled: '25',
      coins: '0',
      type: 'full'
    }],

  monster: [
    {
      monsterId: '1',
      name: 'Crazy Eyes',
      avatar: Monster,
      coins: 1
    },
    {
      monsterId: '2',
      name: 'TIM',
      avatar: Monster,
      coins: 2
    },
    {
      monsterId: '3',
      name: 'Godzilla',
      active: false,
      avatar: Monster,
      coins: 3
    },
    {
      monsterId: '4',
      name: 'Jörgen',
      avatar: Monster,
      coins: 4
    },
    {
      monsterId: '5',
      name: 'BOSS',
      avatar: Monster,
      coins: 5
    }
  ]
}

// Math.floor(Math.random() * 20) + 1

export default fakeServerData
