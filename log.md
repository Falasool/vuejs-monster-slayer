![image](https://cdn.jsdelivr.net/gh/Falasool/blog-pic-bed@main//blog202308290007098.webp)

## 点击 ATTACK 怪兽血量下降随机数值

⭐️ 最关键的：随机数值。
所以 `Math.floor(Math.random() * (15 - 10) + 10)`，即『生成 [10,15) 范围内的随机浮点数并向下取整』。因为有好几种类型的攻击都要用到这个方法，所以把它提出来:

```js
function getRandomValue(n, m) {
  return Math.floor(Math.random() * (m - n) + n)
}
```

⭐️ 设定初始健康值 monsterHealth 为 100

⭐️ 绑定点击事件 `@click=“attackMonster”`，每次点击摇出一个随机伤害值

```js
attackMonster() {
  const attackValue = getRandomValue(5, 12)
  this.monsterHealth -= attackValue
},
```

⭐️ 给 health process 动态绑定属性 `:style="monsterBarStyle"`，写计算属性 monsterBarStyle

⭐️ 注意：1️⃣this2️⃣ 模板字符串,可以内嵌变量和表达式 3️⃣${damage} 是模板字符串中嵌入的一个变量 4️⃣scaleX() 是 CSS transform 的一个方法,用于缩放元素的宽度

```js
monsterBarStyle() {
  const damage = this.monsterHealth / 100
  return { transform: `scaleX(${damage})` }
},
```

## 攻击怪兽后被反击

⭐️ 『攻击降血条』的逻辑一样。在 attackMonster() 里调用 attackKnight()

```js
attackMonster() {
  // ……………… //
  // 怪兽反击
  this.attackKnight()
},
```

## 特殊攻击

⭐️ 每三次普通攻击/治疗攒够一个蓝条，这时 special attack 才能用。其它时间按扭灰色不起作用 ==> 用 css 伪类 `:disabled` 实现

⭐️ 每次调用普攻和治疗时 currentRound + 1（default = 0），当 currentRound 积累到 3 时 `:disabled` 失效

⭐️ 设置一个 computed，用于控制 `:disabled`，攒够蓝条但不用大招也没关系,btn 会保持 active

```js
mayUseSpecialAttack() {
  return this.currentRound / 3 < 1
},
```

⭐️ 通过 v-bind 动态绑定给 btn: `：style="mayUseSpecialAttack"`

⭐️ 使用大招后蓝条清空重新开始计数

```js
 specialAttackMonster(event) {
  ...

  // 使用大招后蓝条清空，重新积累
  event.target.style.disabled = true
  this.currentRound = 0
},

```

## 点击 HEAL 治疗自己随机数值，怪兽发起攻击

⭐️ 和普通攻击的逻辑一致，只不过变成 +=

⭐️ knightHealth 不能超过上限 100

## 投降

给 knightHealth 赋值为 0

## 玩家输入昵称

⭐️ 输入昵称前隐藏 input 以下的结构 v-if

⭐️ 用 v-model 双向绑定 input 和 value

## 监视比赛结果

⭐️ watch 属性用于监视 data()里的数据

```Vue
knightHealth(value) {
  if (value <= 0 && this.monsterHealth <= 0) {
    this.winner = 'draw'
  } else if (value <= 0) {
    this.winner = 'monster'
  }
}
```

## 显示比赛结果

- v-if
- v-else-if
- v-else

联合使用显示对应的比赛结果

## battle log

⭐️ 设置 `data(){logs:[]}`

⭐️ 设置 methods addLogs(){}

⭐️ 每次攻击 / 治愈时调用 addLogs(),这样战斗数据就传入 logs array 了

⭐️ 用 v-for 遍历把 log 排列出来，用 currentTime() 作为索引

⭐️ 时间戳转换为可读的时间格式

```js
function currentTime(date) {
  var date = new Date(date * 1000) //如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-'
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}
```

## restart 按扭

把 data(){} 里的各项数据重置

## 适应小屏幕

```css
@media (max-width: 393px) {
  ...
}
```
