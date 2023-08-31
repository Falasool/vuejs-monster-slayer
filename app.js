function getRandomValue(n, m) {
  return Math.floor(Math.random() * (m - n) + n)
}

const app = Vue.createApp({
  data() {
    return {
      uname: '',
      monsterHealth: 100,
      knightHealth: 100,
      currentRound: 0,
      winner: '',
      logs: [],
    }
  },
  computed: {
    monsterBarStyle() {
      const damage = this.monsterHealth / 100
      return { transform: `scaleX(${damage})` }
    },
    knightBarStyle() {
      const damage = this.knightHealth / 100
      return { transform: `scaleX(${damage})` }
    },
    mayUseSpecialAttack() {
      return this.currentRound / 3 < 1
    },
  },
  watch: {
    knightHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw'
      } else if (value <= 0) {
        this.winner = 'monster'
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.knightHealth <= 0) {
        this.winner = 'draw'
      } else if (value <= 0) {
        this.winner = 'knight'
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth -= attackValue
      // 怪兽反击
      this.attackKnight()
      // 战斗数据就传入 logs array
      this.addLogs(this.uname, 'attacks', attackValue)
    },
    attackKnight() {
      const attackValue = getRandomValue(8, 15)
      this.knightHealth -= attackValue
      // 战斗数据就传入 logs array
      this.addLogs('monster', 'attacks', attackValue)
    },
    specialAttackMonster(event) {
      const attackValue = getRandomValue(10, 25)
      this.monsterHealth -= attackValue
      // 怪兽反击
      this.attackKnight()
      // 战斗数据就传入 logs array
      this.addLogs(this.uname, 'special attack', attackValue)

      // 使用大招后蓝条清空，重新积累
      event.target.style.disabled = true
      this.currentRound = 0
    },
    healKnight() {
      this.currentRound++
      const healValue = getRandomValue(12, 20)
      this.knightHealth += healValue
      // knightHealth 不能超过上限 100
      if (this.knightHealth + healValue > 100) {
        this.knightHealth = 100
      } else {
        this.knightHealth += healValue
      }
      // 怪兽反击
      this.attackKnight()

      // 战斗数据就传入 logs array
      this.addLogs(this.uname, 'heals', healValue)
    },
    surrenderKnight() {
      this.knightHealth = 0
      // 战斗数据就传入 logs array
      this.addLogs(this.uname, 'surrenders', '')
    },
    onBlur(e) {
      e.target.value = this.uname
    },
    // battle log
    addLogs(who, dowhat, value) {
      this.logs.unshift({
        actionBy: who,
        actionType: dowhat,
        actionValue: value,
      })
    },
    currentTime() {
      const now = new Date()
      const Y = now.getFullYear() + '-'
      const M =
        now.getMonth() + 1 < 10
          ? '0' + (now.getMonth() + 1)
          : now.getMonth() + 1 + '-'
      const D = now.getDate() < 10 ? '0' + now.getDate() : now.getDate() + '-'
      const h =
        now.getHours() < 10 ? '0' + now.getHours() : now.getHours() + '-'
      const m =
        now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes() + '-'
      const s =
        now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      return Y + M + D + h + m + s
    },
    restartGame() {
      this.winner = ''
      this.knightHealth = 100
      this.monsterHealth = 100
      this.currentRound = 0
      this.logs = []
    },
  },
})

app.mount('.game')
