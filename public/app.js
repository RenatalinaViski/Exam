let appendBody = (node) => document.body.appendChild(document.createElement(node))
let appendToParent = (parent, node) => parent.appendChild(document.createElement(node))
let getId = (id) => document.getElementById(id)
let btn = []
let baBah = []
let ship1 = 0
let ship2 = 0
let ship3 = 0
let ship4 = 0
let idShip1 = []
let idShip2 = []
let idShip3 = []
let idShip4 = []
let idTransform = []



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

function shipArr(count) {
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

  // console.log(`ship1=${ship1},  ship2=${ship2},  ship3=${ship3}, ship4=${ship4}`)

  // console.log('idShip1' + idShip1)
  // console.log('idShip2' + idShip2)
  // console.log('idShip3' + idShip3)
  // console.log('idShip4' + idShip4)
}

function countShip() {
  controlShip()
  if (ship1 > 4 || ship1 < 4 || ship2 > 3 || ship2 < 3 || ship3 > 2 || ship3 < 2 || ship4 > 1 || ship4 < 1) {
    alert("Прошу придерживаться правил и выбрать допустимое количество кораблей")
    console.log(`ship1=${ship1}, ship2=${ship2},ship3=${ship3}, ship4=${ship4}`)
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //return false
    return true
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
    button.innerText = idBtn
    button.className = "tr"
    button.x = x
    button.y = y
    this.id = button.id
    this.x = button.x
    this.y = button.y
    this.agree = bool//это признак моего поля, если false то это противник   
    button.onclick = () => {
      if (button.classList.contains("bk")) {
        button.style.backgroundColor = "red"
        button.className = "red"
      }
      if (button.className == "tr" && !this.agree) {
        button.style.backgroundColor = "#009999"
        button.style.border = "1px solid white"
        button.className = "loose"
        //setTimeout(() => {
        shoot()
        //}, 1500)

      }
      if (button.style.backgroundColor == "transparent") {
        if ((this.id > 9 && this.id < 90) && (this.x > 1 && this.x < 10)) {
          if (control(button)) {
            button.style.backgroundColor = "black"
            button.style.border = "1px solid white"
            button.className = "bk"
            btn.push(parseInt(button.id))
          }
        } else if (controlX(button) && this.agree) {
          button.style.backgroundColor = "black"
          button.style.border = "1px solid white"
          button.className = "bk"
          btn.push(parseInt(button.id))
        }
      }

    }
    button.ondblclick = () => {
      if (this.agree) {
        button.style.backgroundColor = "transparent"
        button.style.border = "1px solid black"
        button.className = "tr"
        btn.splice(btn.indexOf(+button.id), 1)
      }
    }
    button.oncontextmenu = (event) => {
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


let userChoose = () => {

}

function start() {
  let divImg = appendBody('div')
  let img = appendToParent(divImg, 'img')
  img.src = './img/morskoiboi.jpg'
  img.style.display = "flex"
  img.style.alignItems = "center"
  img.style.justifyContent = "center"
  img.style.marginTop = "5rem"

  // let imgStart = appendToParent(divImg, 'img')
  // imgStart.src = 'https://media.giphy.com/media/4SY7hLDg6zA6bcGp4p/giphy.gif'
  // imgStart.style.width = "20rem"
  // imgStart.style.height = "20rem"
  // imgStart.style.marginTop = "-5rem"
  // imgStart.style.marginLeft = "9rem"
  // imgStart.style.color = "#454545"
}

function role(parent) {
  let divRole = appendToParent(parent, 'div')
  divRole.classList.add('div-role', 'mr-3')
  let p = appendToParent(divRole, 'p')
  p.innerText = `Необходиму заполнить поле:
  4-х палубный корабль - 1шт
  3-х палубный корабль - 2шт
  2-х палубный корабль - 3шт
  1-но палубный корабль-4шт
  Расстояние между кораблями 
  должно быть не менее 1-й клетки.
  Корабли могут выстраиваться 
  только по горизонтали или вертикали`
  p.style.fontSize = "1.2rem"
  p.style.fontWeight = "bold"
}


class Game {
  constructor(parent) {
    document.body.style.background = "url('./img/1.jpg')"
    role(document.body)
    let field = appendBody('div')
    field.style.height = "500px"
    field.style.width = "500px"
    field.style.display = "flex"
    field.style.alignItems = "center"
    let fieldMaria = new Field(field, 'Maria')


    let buttonStart = appendToParent(parent, 'button')
    buttonStart.classList.add('btn-start')
    buttonStart.style.height = "5rem"
    buttonStart.style.width = "10rem"
    buttonStart.style.backgroundColor = "#0066cc"
    buttonStart.innerText = "START"
    buttonStart.classList.add("btnStart")
    buttonStart.style.fontSize = "1.5rem"


    buttonStart.onclick = () => {
      ship1 = 0
      ship2 = 0
      ship3 = 0
      ship4 = 0
      if (countShip()) {
        document.getElementsByClassName('div-role')[0].remove()
        document.getElementsByClassName('btnStart')[0].remove()

        fieldMaria.button.forEach(item => {//что бы не мог в период игры делать новые корабли
          getId(item.id).onclick = null
          getId(item.id).ondblclick = null

        })

        let field2 = appendBody('div')
        field2.style.height = "500px"
        field2.style.width = "500px"
        field2.style.display = "flex"
        field2.style.alignItems = "center"
        let fieldApponent = new Field(field2, 'TomHenks', false, 100)
        for (let i = 0; i < btn.length; i++) {
          getId(btn[i] + 100).className = 'bk' //здесь заполняю поле противника
        }

        setTimeout(() => {///прыгающая картинка
          let imgStart = appendToParent(document.body, 'img')
          imgStart.src = 'https://media.giphy.com/media/4SY7hLDg6zA6bcGp4p/giphy.gif'
          imgStart.style.width = "20rem"
          imgStart.style.height = "20rem"
          imgStart.style.marginTop = "-5rem"
          imgStart.style.marginLeft = "9rem"
          imgStart.style.color = "#454545"
          imgStart.id = "imgStart"
        }, 500)

        setTimeout(() => {
          getId('imgStart').remove()

          ///может здесь начать стрелять?
        }, 4000)

      }
    }

  }
}
function showEnemy(pathImg) {
  let imgStart = appendToParent(document.body, 'img')  ///проблема теперь здесь 
  //imgStart.src = "https://i.gifer.com/1mnr.gif"
  imgStart.src = pathImg
  imgStart.style.width = "20rem"
  imgStart.style.height = "20rem"
  imgStart.style.marginTop = "-5rem"
  imgStart.style.marginLeft = "9rem"
  imgStart.style.color = "#454545"
  imgStart.id = "imgEnemy"
}
function shoot(num = 0) {
  let explosion = num
  console.log(num)
  if (num == 0) {
    explosion = Math.round(Math.random() * 100)
  } else if (num > 99) {
    explosion = 0
  }
  if (baBah.indexOf(explosion) < 0) {
    baBah.push(explosion)
    setTimeout(() => {
      if (btn.indexOf(explosion) > -1) {
        showEnemy("https://i.gifer.com/1mnr.gif")
        getId(explosion).style.backgroundColor = "red"
        getId(explosion).className = "red"
        ///подсчет убитого корабля
        if (idShip1.indexOf(explosion)) {
          idShip1.splice(idShip1.indexOf(explosion), 1)
        }
        if (idShip2.indexOf(explosion)) {
          idShip2.splice(idShip2.indexOf(explosion), 1)
        }
        if (idShip3.indexOf(explosion)) {
          idShip3.splice(idShip3.indexOf(explosion), 1)
        }
        if (idShip4.indexOf(explosion)) {
          ///если idShip4%4==0 /// картика бегающего радующегося
          //let put=getId('Maria')        
          idShip4.splice(idShip4.indexOf(explosion), 1)
        }

        if (getId('imgEnemy') != null) {
          getId('imgEnemy').remove()
        }
        shoot(explosion + 1)//////////////

      } else {
        console.log(getId(explosion))
        getId(explosion).style.backgroundColor = "#00cc00"
      }
    }, 1000)
  }
  else {
    shoot()
  }

}






////////раскоментить довести до ума, пусть тоже ждут друг друга
start()
let game = null
setTimeout(() => {
  document.body.innerText = ' '
  document.body.style.backgroundColor = "transparent"
  game = new Game(document.body)
}, 3000)






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