let appendBody = (node) => document.body.appendChild(document.createElement(node))
let appendToParent = (parent, node) => parent.appendChild(document.createElement(node))
let getId = (id) => document.getElementById(id)
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
  for (let i = 0; i < arr.length - 1; i++) {
    for (let g = i; g < arr.length - 1; g++) {
      if (arr[i] > arr[g + 1]) {
        num = arr[g + 1]
        arr[g + 1] = arr[i]
        arr[i] = num
        num = 0
      }
    }
  }
  return arr
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
  ship1 = 0
  ship2 = 0
  ship3 = 0
  ship4 = 0
  let arrBoat = sortBtn(btn)
  let count = 1
  for (let i = 0; i < arrBoat.length; i++) {
    if (arrBoat[i] == +arrBoat[i + 1] - 1 && +arrBoat[i + 1] % 10 != 0) {
      count++
      continue
    } if (arrBoat.find(item => { return item == (+arrBoat[i] + 10) })) {
      if (count > 1) {
        shipArr(count)
        count == 2 ? idShip2.push(arrBoat[i - 2]) : idShip3.push(arrBoat[i - 3])
        count = 1
      }
      for (let h = i, k = 10; h < arrBoat.length; h++) {
        if (arrBoat[i] == (+arrBoat[h] - k)) {
          arrBoat.splice(h, 1)
          k += 10
          h--
          count++

        }
      }
      arrBoat.splice(i, 1)
      i--
      idTransform.push(arrBoat[i])
      count == 2 ? idShip2.push(arrBoat[i]) : count == 3 ? idShip3.push(arrBoat[i]) : idShip4.push(arrBoat[i]) //это что бы приципить кораблик на плаву
      shipArr(count)
      count = 1
      continue
    } else {
      shipArr(count)
      idShip1.push(arrBoat[i])
      count = 1
    }
  }

}

function countShip() {
  ship1 = 0
  ship2 = 0
  ship3 = 0
  ship4 = 0
  controlShip()
  if (ship1 > 4 || ship1 < 4 || ship2 > 3 || ship2 < 3 || ship3 > 2 || ship3 < 2 || ship4 > 1 || ship4 < 1) {
    alert("Прошу придерживаться правил и выбрать допустимое количество кораблей")
    console.log(`ship1=${ship1}, ship2=${ship2},ship3=${ship3}, ship4=${ship4}`)

    return false
  }
  return true
}

let btn = []
class Button {
  constructor(parent, idBtn, x, y, bool=1) {
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
      if (button.style.backgroundColor == "transparent") {
        if ((this.id > 9 && this.id < 90) && (this.x > 1 && this.x < 10)) {
          if (control(button)) {
            button.style.backgroundColor = "black"
            button.style.border = "1px solid white"
            button.className = "bk"
            btn.push(parseInt(button.id))
          }
        } else if (controlX(button)) {
          button.style.backgroundColor = "black"
          button.style.border = "1px solid white"
          button.className = "bk"
          btn.push(parseInt(button.id))
        }
        console.log(this.agree)
        if(!this.agree){
          button.style.backgroundColor = "#009999"
          button.style.border = "1px solid white"
          button.className = "loose"

      }
      }
      if(button.style.backgroundColor == "black"&&!this.agree){
        button.style.backgroundColor="transparent"
          button.style.backgroundImage=data.fire
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
  }
}

class Field {
  constructor(parent, owner,bool=true) {
    let field = appendToParent(parent, 'div')
    field.style.height = "21rem"
    field.style.width = "21rem"
    field.style.display = "inline-block"
    field.border = "1px solid black"
    this.owner = owner
    this.button = []
    this.ships = []
    for (let y = 1, i = 0; y <= 10; y++) {
      for (let x = 1; x <= 10; x++ , i++) {
        this.button.push(new Button(field, `${i}`, x, y,bool))
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

  let imgStart = appendToParent(divImg, 'img')
  imgStart.src = 'https://media.giphy.com/media/4SY7hLDg6zA6bcGp4p/giphy.gif'
  imgStart.style.width = "20rem"
  imgStart.style.height = "20rem"
  imgStart.style.marginTop = "-5rem"
  imgStart.style.marginLeft = "7rem"
  imgStart.style.color = "#454545"
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
      if (countShip()) {
        document.getElementsByClassName('div-role')[0].remove()
        document.getElementsByClassName('btnStart')[0].remove()
        let field2 = appendBody('div')
        field2.style.height = "500px"
        field2.style.width = "500px"
        field2.style.display = "flex"
        field2.style.alignItems = "center"
        let fieldApponent = new Field(field2, 'TomHenks', false)

        fieldMaria.button.forEach(item => {//что бы не мог в период игры делать новые корабли
          console.log(item.id)
          getId(item.id).onclick=null
          getId(item.id).ondblclick=null
        })//могут быть проблемы
      }
    }
  }
}


start()
setTimeout(() => {
  document.body.innerText = ' '
  document.body.style.backgroundColor = "transparent"
  let game = new Game(document.body)

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