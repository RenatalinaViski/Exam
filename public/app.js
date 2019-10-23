let appendBody = (node) => document.body.appendChild(document.createElement(node))
let appendToParent = (parent, node) => parent.appendChild(document.createElement(node))
let getId = (id) => document.getElementById(id)
let btn = []//массив своих кораблей
let baBah = []
let ship1 = 0
let ship2 = 0
let ship3 = 0
let ship4 = 0
let idShip1 = []
let idShip2 = []
let idShip3 = []
let idShip4 = []
let dieShip = []//попавшие выстрелы
let btnEnemy = []//список кораблей противника
let looseShip = []//промахи
let idTransform = []
let arrBoatUsers = []//массив караблей картинок
let arrBoatEnemy = []//картинки врага
let arrImgHero = []//массив картинок веселых капитанов
let arrUsers = []//массив капитанов
let nameUser = null
let game = null
let time = null
let previous = 0//предидущий индекс
let notLoose = 0//промахи на счет 3

function control(button) {
  if (getId(+button.id + 11).classList.contains('tr') && getId(+button.id + 9).classList.contains('tr')) {
    if (getId(+button.id - 11).classList.contains('tr') && getId(+button.id - 9).classList.contains('tr')) {
      return true
    }
  }
  return false
}

function controlX(button) {
  if (button.y == 10 && button.x != 1 && button.x != 10) {
    if (getId(+button.id - 11).classList.contains('tr') && getId(+button.id - 9).classList.contains('tr')) {
      return true
    }
  }
  if (button.y == 1 && button.x != 1 && button.x != 10) {
    if (getId(+button.id + 11).classList.contains('tr') && getId(+button.id + 9).classList.contains('tr')) {
      return true
    }
  }
  if (button.x == 1 && button.y != 1 && button.y != 10) {
    if (getId(+button.id + 11).classList.contains('tr') && getId(+button.id - 9).classList.contains('tr')) {
      return true
    }
  }
  if (button.x == 10 && button.y != 1 && button.y != 10) {
    if (getId(+button.id - 11).classList.contains('tr') && getId(+button.id + 9).classList.contains('tr')) {
      return true
    }
  }
  if (button.x == 1 && button.y == 1) {
    if (getId(+button.id + 11).classList.contains('tr')) {
      return true
    }
  }
  if (button.x == 1 && button.y == 10) {
    if (getId(+button.id - 9).classList.contains('tr')) {
      return true
    }
  }
  if (button.x == 10 && button.y == 1) {
    if (getId(+button.id + 9).classList.contains('tr')) {
      return true
    }
  }
  if (button.x == 10 && button.y == 10) {
    if (getId(+button.id - 11).classList.contains('tr')) {
      return true
    }
  }
  return false
}

function sortBtn(arr) {
  let num = 0
  let newArr = []
  for (let i = 0; i < arr.length - 1; i++) {
    for (let g = i; g < arr.length - 1; g++) {
      if (arr[i] > arr[g + 1]) {
        num = arr[g + 1]
        arr[g + 1] = arr[i]
        arr[i] = num
        num = 0
      }
    }
    newArr.push(arr[i])
  }
  newArr.push(arr[arr.length - 1])
  return newArr
}

function shipArr(count) {//пушим сюда наш подсчитанный кораблик
  switch (count) {
    case 1:
      ship1++
      break
    case 2:
      ship2++
      break
    case 3:
      ship3++
      break
    case 4:
      ship4++
      break
  }
}

function controlShip() {
  let arrBoat = sortBtn(btn)
  let count = 1
  for (let i = 0; i < arrBoat.length; i++) {
    if (arrBoat[i] == +arrBoat[i + 1] - 1 && +arrBoat[i + 1] % 10 != 0) {
      count++
      continue
    } if (arrBoat.find(item => { return item == (+arrBoat[i] + 10) })) {

      if (count > 1) {//////под вопросом может этот кусок и не нужен
        shipArr(count)
        count = 1
      }
      let id = []
      for (let h = i, k = 10; h < arrBoat.length; h++) {
        if (arrBoat[i] == (+arrBoat[h] - k)) {
          id.push(arrBoat[h])
          arrBoat.splice(h, 1)
          k += 10
          h--
          count++
        }
      }
      id.unshift(arrBoat[i])
      count == 2 ? id.forEach(item => { idShip2.push(item) }) : count == 3 ? id.forEach(item => { idShip3.push(item) }) : id.forEach(item => { idShip4.push(item) })//это что бы приципить кораблик на плаву
      idTransform.push(arrBoat[i])
      arrBoat.splice(i, 1)
      i--
      shipArr(count)
      count = 1
      continue
    } else {
      shipArr(count)
      if (count == 1) {
        idShip1.push(+arrBoat[i])
      }
      if (count == 2) {
        idShip2.push(+arrBoat[i - 1])
        idShip2.push(+arrBoat[i])
      }
      if (count == 3) {
        idShip3.push(+arrBoat[i - 2])
        idShip3.push(+arrBoat[i - 1])
        idShip3.push(+arrBoat[i])
      }
      if (count == 4) {
        idShip4.push(+arrBoat[i - 3])
        idShip4.push(+arrBoat[i - 2])
        idShip4.push(+arrBoat[i - 1])
        idShip4.push(+arrBoat[i])
      }
      count = 1
    }
  }
}

function countShip() {
  controlShip()
  if (ship1 > 4 || ship1 < 4 || ship2 > 3 || ship2 < 3 || ship3 > 2 || ship3 < 2 || ship4 > 1 || ship4 < 1) {
    alert("Прошу придерживаться правил и выбрать допустимое количество кораблей")
    console.log(`ship1=${ship1}, ship2=${ship2},ship3=${ship3}, ship4=${ship4}`)
    return false
  }
  return true
}


class Button {
  constructor(parent, idBtn, x, y, bool = 1) {
    let button = appendToParent(parent, 'button')
    button.style.border = "1px solid black"
    button.style.backgroundColor = "transparent"
    button.style.height = "2rem"
    button.style.width = "2rem"
    button.id = idBtn
    button.className = "tr"
    button.x = x
    button.y = y
    this.id = button.id
    this.x = button.x
    this.y = button.y
    this.agree = bool//это признак моего поля, если false то это противник   
    button.onclick = () => {
      if (button.classList.contains("black")) { //если попали в противника
        button.style.backgroundColor = "red"
        button.className = "red"
        btnEnemy.splice(btnEnemy.indexOf(this.id), 1)
        winner()
        imgBetweenGame(arrImgHero[Math.round(Math.random() * 10 % 8)])
      }
      if (button.className == "tr" && !this.agree) {//если промазали, передаем эстафету ему
        button.style.backgroundColor = "#009999"
        button.style.border = "1px solid white"
        button.className = "loose"
        shoot()
      }
      if (button.style.backgroundColor == "transparent") {
        if ((this.id > 9 && this.id < 90) && (this.x > 1 && this.x < 10)) {
          if (control(button)) {//проверка центра поля, можно ли поставить кораблик сюда
            button.style.backgroundColor = "black"
            button.style.border = "1px solid white"
            button.className = "bk"
            btn.push(parseInt(button.id))
          }
        } else if (controlX(button) && this.agree) {//проверка стен поля, можно ли поставить сюда кораблики
          button.style.backgroundColor = "black"
          button.style.border = "1px solid white"
          button.className = "bk"
          btn.push(parseInt(button.id))
        }
      }

    }
    button.ondblclick = () => {//если передумали и сняли эту палубу с кораблика
      if (this.agree) {
        button.style.backgroundColor = "transparent"
        button.style.border = "1px solid black"
        button.className = "tr"
        btn.splice(btn.indexOf(+button.id), 1)
      }
    }
    button.oncontextmenu = (event) => {//метка на поле
      if (!this.agree) {
        button.style.backgroundColor = "#1a53ff"
        button.style.border = "1px solid black"
      }

    }
  }
}

class Field {
  constructor(parent, owner, bool = true, startId = 0) {
    let field = appendToParent(parent, 'div')
    field.style.height = "21rem"
    field.style.width = "21rem"
    field.style.display = "inline-block"
    field.border = "1px solid black"
    field.id = owner
    this.owner = owner
    this.button = []
    this.ships = []
    for (let y = 1, i = startId; y <= 10; y++) {
      for (let x = 1; x <= 10; x++ , i++) {
        this.button.push(new Button(field, `${i}`, x, y, bool))
      }
    }
  }
}


class UserChoose {//класс для выбора игрока
  constructor(parent, imgSrc, nameCapitan, discriptionCaptan) {

    this.divCard = appendToParent(parent, 'div')
    this.divCard.id = 'divCard'

    let img = appendToParent(this.divCard, 'img')
    img.src = imgSrc
    img.style.width = "20rem"
    img.style.height = "20rem"
    let divDiscription = appendToParent(this.divCard, 'div')
    let input = appendToParent(divDiscription, 'input')

    let h3Name = appendToParent(divDiscription, 'h3')
    h3Name.innerText = nameCapitan
    let pDiscription = appendToParent(divDiscription, 'p')
    pDiscription.innerText = discriptionCaptan

    let buttonChoose = appendToParent(this.divCard, 'button')
    buttonChoose.style.width = "5rem"
    buttonChoose.style.height = "1.5rem"
    buttonChoose.innerText = "Выбрать"
    buttonChoose.id = "buttonChoose"

    buttonChoose.onclick = () => {
      let value = input.value
      nameUser = value
      fetch(`http://localhost:3000/users`)
        .then(response => response.json())
        .then(data => {
          data.forEach(item => {
            if (item.name == nameCapitan) {
              item.img.forEach(picture => {
                arrImgHero.push(picture)
              })
              item.ship.forEach(boat => {
                arrBoatUsers.push(boat)
              })
            }
          })
        })

      fetch(`http://localhost:3000/users`, {///здесь я должны была записывать юзера в таблицу
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: value })
      })
      document.body.innerHTML = " "
      showEnemy()
    }
  }
}

function showEnemy(parent) {
  document.body.style.display = "flex"
  document.body.style.flexFlow = "column"
  let h1 = appendBody('h1')
  h1.innerText = "Ваш противник"
  h1.style.fontFamily = "fantasy"
  h1.style.textShadow = "1px 1px rgb(227, 180, 140)"
  h1.style.color = "brown"
  let enemy = new UserChoose(document.body, arrBoatEnemy[0].img[0], arrBoatEnemy[0].name, arrBoatEnemy[0].discription)  ///
  document.getElementsByTagName('input')[0].remove()
  document.getElementsByTagName('button')[0].remove()

  setTimeout(() => {
    document.body.innerHTML = " "
    game = new Game(document.body)
  }, 7000)

}

function user() {//выбираем игрока
  document.body.innerHTML = " "
  let divBig = appendBody('div')
  divBig.style.width = "25rem"
  divBig.style.height = "25rem"
  divBig.style.display = "flex"
  divBig.style.flexFlow = "row"

  let arrovLeft = appendToParent(divBig, 'button')
  arrovLeft.style.width = "5rem"
  arrovLeft.style.height = "5rem"
  arrovLeft.style.backgroundColor = "transparent"
  arrovLeft.innerText = "<"
  arrovLeft.style.marginTop = "11rem"

  let arr = []
  fetch(`http://localhost:3000/users`)
    .then(response => { return response.json() })
    .then(data => {
      arrUsers.push(new UserChoose(divBig, data[0].img[0], data[0].name, data[0].discription))
      arrUsers.push(new UserChoose(divBig, data[1].img[0], data[1].name, data[1].discription))
      arrBoatEnemy.push(data[2])
      arrUsers[1].divCard.style.display = "none"
    })

  let arrovRight = appendToParent(divBig, 'button')
  arrovRight.style.width = "5rem"
  arrovRight.style.height = "5rem"
  arrovRight.style.marginTop = "11rem"
  arrovRight.style.marginRight = "1rem"

  arrovRight.style.backgroundColor = "transparent"
  arrovRight.innerText = ">"

  arrovLeft.onclick = () => {
    arrUsers[0].divCard.style.display = "block"
    arrUsers[1].divCard.style.display = "none"
  }
  arrovRight.onclick = () => {
    arrUsers[0].divCard.style.display = "none"
    arrUsers[1].divCard.style.display = "block"
  }
}


function music() {
  let music = appendBody('audio')
  music.controls = true
  music.autoplay = true
  let source = appendToParent(music, 'source')
  source.src = "./music/dolphin.wav"
  source.type = "audio/wav"
  music.style.display = "none"
}


function start() {
  music()
  document.body.style.background = 'url("./img/35.jpg")'
  document.body.style.backgroundRepeat = "no-repeat"
  document.body.style.backgroundAttachment = "fixed"
  document.body.style.backgroundSize = "100% 100%"
  let divImg = appendBody('div')
  let img = appendToParent(divImg, 'img')
  img.src = './img/morskoiboi.jpg'
  img.style.display = "flex"
  img.style.alignItems = "center"
  img.style.justifyContent = "center"
  img.style.marginTop = "5rem"

  let gifStart = appendToParent(divImg, 'img')
  gifStart.src = 'https://media.giphy.com/media/N6VCRG1dzk7Ic/giphy.gif'
  gifStart.style.width = "40rem"
  gifStart.style.height = "10rem"
  gifStart.style.marginTop = "0"
  gifStart.style.marginLeft = "1rem"
  gifStart.style.color = "#454545"
}

function role(parent) {
  let divRole = appendToParent(parent, 'div')
  divRole.classList.add('div-role', 'mr-3', 'mt-3')
  let h3 = appendToParent(divRole, 'h3')
  h3.innerText = "Прошу ознакомиться с правилами игры:"
  let ul = appendToParent(divRole, 'ul')
  let h4 = appendToParent(ul, 'h4')
  h4.innerText = `Необходиму заполнить поле:`
  let li1 = appendToParent(ul, 'li')
  li1.innerText = "4-х палубный корабль - 1шт"
  let li2 = appendToParent(ul, 'li')
  li2.innerText = "3-х палубный корабль - 2шт"
  let li3 = appendToParent(ul, 'li')
  li3.innerText = "2-х палубный корабль - 3шт"
  let li4 = appendToParent(ul, 'li')
  li4.innerText = "1-но палубный корабль-4шт"
  let li5 = appendToParent(ul, 'li')
  li5.innerText = `Расстояние между кораблями 
  должно быть не менее 1-й клетки.`
  let li6 = appendToParent(ul, 'li')
  li6.innerText = `Корабли могут выстраиваться 
  только по горизонтали или вертикали`
  ul.style.fontSize = "1.2rem"
}

function imgBetweenGame(pathImg) {
  if (getId("imgStart") == null) {
    let imgStart = appendToParent(getId('divGif'), 'img')
    imgStart.src = pathImg
    imgStart.style.width = "20rem"
    imgStart.style.height = "25rem"
    imgStart.style.marginTop = "5rem"
    imgStart.style.marginLeft = "-6rem"
    imgStart.id = "imgStart"
    setTimeout(() => {
      getId('imgStart').remove()//удаляем прыгающую картинку
    }, 4000)
  }
}


function boatImgDown(parent, idShip, pathImg, ...arr) {
  parent.innerHTML=" "
  for (let i = 0; i < 4; i++) {
    let imgStart = appendToParent(parent, 'img')
    imgStart.src = pathImg[i]
    imgStart.style.width = `${i + 3}rem`
    imgStart.style.height = `${i + 3}rem`
    imgStart.style.marginTop = "0"
    imgStart.style.marginLeft = "0rem"
    imgStart.id = `${idShip}${i}`
    let p = appendToParent(parent, 'p')
    p.innerText = arr[i]
  }
}

class Game {
  constructor(parent) {
    document.body.style.background = "url('./img/1.jpg')"
    document.body.style.display = "flex"
    document.body.style.flexFlow = "column"

    let divContainer = appendBody('div')
    divContainer.style.display = "flex"
    divContainer.style.flexFlow = "row"

    let divShip = appendBody('div')
    divShip.style.display = 'flex'
    let divShipMari = appendToParent(divShip, 'div')
    divShipMari.id = "divShipMari"
    let divShipEnemy = appendToParent(divShip, 'div')

    role(divContainer)

    let divMaria = appendToParent(divContainer, 'div')
    divMaria.id = "divMaria"
    let field = appendToParent(divMaria, 'div')
    field.style.height = "500px"
    field.style.width = "500px"
    field.style.display = "flex"
    field.style.alignItems = "center"
    let divGif = appendToParent(divContainer, 'div')
    divGif.id = "divGif"
    let fieldMaria = new Field(field, 'Maria') //начинаем игру, создаем поле Мария


    let buttonStart = appendToParent(parent, 'button')
    buttonStart.classList.add('btn-start')
    buttonStart.style.height = "10rem"
    buttonStart.style.width = "10rem"
    buttonStart.style.background = 'transparent url("https://media.giphy.com/media/6GGUSevj6sS5i/giphy.gif") no-repeat center'
    buttonStart.style.backgroundSize = "100% 100%"

    buttonStart.classList.add("btnStart")
    buttonStart.style.fontSize = "1.5rem"


    buttonStart.onclick = () => {
      ship1 = 0
      ship2 = 0
      ship3 = 0
      ship4 = 0
      if (countShip()) {//если наши кораблики в правильном количество, то можем начинать играть
        time = new Date()
        console.log(time)
        document.body.style.flexFlow = "row"
        document.getElementsByClassName('div-role')[0].remove()
        document.getElementsByClassName('btnStart')[0].remove()

        fieldMaria.button.forEach(item => {//что бы не мог в период игры делать новые корабли
          getId(item.id).onclick = null
          getId(item.id).ondblclick = null
        })

        boatImgDown(getId('divShipMari'), 'Mari', arrBoatUsers, ship1, ship2, ship3, ship4)/////////////////////////

        let field2 = appendToParent(divContainer, 'div')
        field2.id = 'divTom'
        field2.style.height = "500px"
        field2.style.width = "500px"
        field2.style.display = "flex"
        field2.style.alignItems = "center"
        let fieldApponent = new Field(field2, 'TomHenks', false, 100)//создали поле противника

        imgBetweenGame("https://media.giphy.com/media/4SY7hLDg6zA6bcGp4p/giphy.gif")
        try {
          fetch(`http://localhost:3000/maketField`)
            .then(response => { return response.json() })
            .then(data => {
              data[Math.round(Math.random() * 10)].forEach(ship => {
                btnEnemy.push(ship)/////////////////////////////////////////////////////////////////добавлю вытащить айди кораблей
                getId(ship + 100).className = 'black'//здесь заполняю поле противника
              })
              console.log(btnEnemy)

            })

        } catch{
          fetch(`http://localhost:3000/maketField/5`)
            .then(response => { return response.json() })
            .then(data => {
              data.forEach(ship => {
                btnEnemy.push(ship)
                getId(ship + 100).className = 'black'//здесь заполняю поле противника
              })
            })
        }
      }
    }

  }
}
function writeResult(winTime) {
  fetch(`http://localhost:3000/users/${nameUser}`, {///здесь я должны была записывать юзера в таблицу
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: nameUser, time: winTime })
  })
}
function end() {
  document.body.innerHTML = " "
  let imgStart = appendBody('img')
  imgStart.src = "https://media.giphy.com/media/2aUG7TvmWjYCmc8nBs/giphy.gif"
  imgStart.style.width = "20rem"
  imgStart.style.height = "20rem"
  imgStart.style.marginTop = "0rem"
  imgStart.style.marginLeft = "0rem"
  imgStart.id = "theEnd"
}

function winner() {
  if (btnEnemy.length == 0) {
    end()
    let won = (Date.now() - time) / 360
    let h1 = appendBody('h1')
    h1.innerText = `Победила ${nameUser}! Выиграла за  ${Math.round(won)}секунд`
    music()
    writeResult(won)

    return true
  }
  if (btn.length == 0) {
    end()
    let won = (Date.now() - time) / 360
    let h1 = appendBody('h1')
    h1.innerText = `Победил любимый Tommy! Выиграла за   ${Math.round(won)}секунд`
    music()
    return true
  }
  return false
}

function bamb(parent) {
  if (getId('babm') == null) {
    let imgStart = appendToParent(parent, 'img')  ///проблема теперь здесь  
    imgStart.src = "https://media.giphy.com/media/lngI73XhH8YwV9iPZK/giphy.gif"
    imgStart.style.width = "20rem"
    imgStart.style.height = "20rem"
    imgStart.style.marginTop = "0rem"
    imgStart.style.marginLeft = "0rem"
    imgStart.id = "bamb"
    if (parent == getId('divTom')) {
      imgStart.style.transform = "rotate(180deg)"////////исправить 
    }
    setTimeout(() => {
      getId('bamb').remove()
    }, 1000)
  }
}

//let previous=null//предидущий индекс
//let notLoose=null//промахи на счет 3

function shoot(num = 0) {

  if (winner()) {

  } else {
    let explosion = num
    if (notLoose > 3) {
      explosion = +btn[0]
      //console.log('explosion=btn[previous] ' + explosion + 'previous' + previous)
    } else {
      if (num == 0) {
        explosion = Math.floor(Math.random() * 100)
      }
      if (num > 99) {
        explosion = 0
      }
    }
    if (baBah.indexOf(explosion) < 0) {
      baBah.push(explosion)

      setTimeout(() => {
        if (btn.indexOf(explosion) > -1) {

          dieShip.push(explosion)//удачный выстрел   
          //previous=+btn.indexOf(explosion)//индекс удачного выстрела
          console.log(notLoose)

          btn.splice(btn.indexOf(explosion), 1)

          getId(explosion).style.backgroundColor = "red"
          getId(explosion).className = "red"

          ///подсчет убитого корабля
          if (idShip1.indexOf(explosion) > -1) {
            idShip1.splice(idShip1.indexOf(explosion), 1)
            imgBetweenGame("./img/3Ft.gif")//радуемся
            --ship1
          }
          if (idShip2.indexOf(explosion) > -1) {
            idShip2.splice(idShip2.indexOf(explosion), 1)
            if (idShip2.length % 2 == 0) {
              imgBetweenGame("./img/1mnr.gif")//радуемся
              --ship2
            }
          }
          if (idShip3.indexOf(explosion) > -1) {
            idShip3.splice(idShip3.indexOf(explosion), 1)
            if (idShip3.length % 3 == 0) {
              imgBetweenGame("./img/1Xd9.gif")
              --ship3
            }
          }
          if (idShip4.indexOf(explosion) > -1) {
            idShip4.splice(idShip4.indexOf(explosion), 1)
            if (idShip4.length == 0) {
              imgBetweenGame("./img/26Hj.gif")
              --ship4
            }
          }

          boatImgDown(getId('divShipMari'), 'Mari', arrBoatUsers, ship1, ship2, ship3, ship4)
          notLoose = 0
          shoot(dieShip[dieShip.length - 1] + 1)//мы попали, идем попадать еще раз

        } else {
          getId(explosion).style.backgroundColor = "#00cc00"//промазали
          looseShip.push(explosion)//wirte our loose
          notLoose++
        }
      }, 1000)
    }
    else {
      shoot()//рандом выдал такое же число, куда мы уже стреляли. поэтому опять запускаем его
    }
  }
}



start()

setTimeout(() => {//выбираем игрока
  user()
}, 10000)







// button.onclick = () => {
//   let valueInput = input.value
//   let data = { name: valueInput }
//   console.log(valueInput)
//   fetch('http://localhost:3000/users', {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       console.log(response.json())
//     })
// }









