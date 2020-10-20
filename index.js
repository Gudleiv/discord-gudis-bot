Array.prototype.diff = function (a) {
  return this.filter(function (i) {
    return a.indexOf(i) < 0
  })
}

const Discord = require('discord.js')
const bot = new Discord.Client()

const config = require('./config.json')
const token = config.token
const prefix = config.prefix

const words = require('./words.js')

bot.on('ready', () => {
  let newDate = new Date()
  let date = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
  console.log(`${date} logged in as ${bot.user.username}!`)
})

bot.on('message', (msg) => {
  if (msg.author.bot) return
  if (msg.channel.type == 'dm') {
    let newDate = new Date()
    let date = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    console.log(`${date} \x1b[36m${msg.author.tag}\x1b[0m: ${msg.content}`)
    msg.channel.send('никакого тет-а-тет!').catch(console.error)
    return
  }

  if (msg.author.id != msg.guild.ownerID) return

  let args = msg.content.substring(prefix.length).split(' ')

  switch (args[0]) {
    case 'nick':
      if (!args[1]) break

      let exceptsIDs = [msg.guild.ownerID, bot.user.id]

      const botsRole = Array.from(
        msg.guild.roles.find((role) => role.name === 'bot').members
      )
      botsRole.forEach((val, index) => {
        exceptsIDs.push(val[1].user.id)
      })

      let arrayIDtemp = []
      let arrayID = []
      let array = []

      msg.guild.members.forEach((member) => {
        arrayIDtemp.push(member.user.id)
        array.push(member.nickname || member.user.username)
      })
      arrayID = arrayIDtemp.diff(exceptsIDs)

      if (args[1] == 'random') {
        msg.channel.send('Переименовываю..')
        let counter = 0
        let counter2 = 0
        arrayID.forEach(function (ids, index, arrayID) {
          const n =
            msg.guild.members.get(ids).nickname ||
            msg.guild.members.get(ids).user.username
          if (words.WordChecker(n)) {
            counter++
          } else {
            let nW = words.RandomWordWith(array)
            msg.guild.members.get(ids).setNickname(nW)
            array.push(nW)
            counter2++
          }
          if (index === arrayID.length - 1 && counter2 > 0) {
            msg.channel.send(`Готово!`)
          }
          if (index === arrayID.length - 1 && counter === arrayID.length) {
            msg.channel.send('А некого и переименовывать то!')
          }
        })
      }

      if (args[1] == 'reset') {
        msg.channel.send('Сброс ников...')
        arrayID.forEach(function (ids, index, arrayID) {
          msg.guild.members.get(ids).setNickname('')
          if (index === arrayID.length - 1) {
            msg.channel.send('Ну вот и все!')
          }
        })
      }
      break

    case 'clear':
      if (!args[1]) return
      msg.channel.bulkDelete(1)
      msg.channel.bulkDelete(args[1])
      break
  }
})

bot.login(token)
