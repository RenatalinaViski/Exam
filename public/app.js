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
    //button.innerText = idBtn
    button.className = "tr"
    button.x = x
    button.y = y
    this.id = button.id
    this.x = button.x
    this.y = button.y
    this.agree = bool//это признак моего поля, если false то это противник   
    button.onclick = () => {
      if (button.classList.contains("bk")) { //если попали в противника
        button.style.backgroundColor = "red"
        button.className = "red"
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


let userChoose = () => {

}

function music(){
  let music=appendBody('audio')
  music.controls=true
  music.autoplay=true
  let source=appendToParent(music,'source')
  source.src="./music/dolphin.wav"
  source.type="audio/wav"
  music.style.display="none"
}


function start() {    
  music()
  document.body.style.background= 'url("./img/35.jpg")'
  document.body.style.backgroundRepeat="no-repeat"
  document.body.style.backgroundAttachment="fixed"
  document.body.style.backgroundSize="100% 100%"
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
  divRole.classList.add('div-role', 'mr-3','mt-3')
  let h3=appendToParent(divRole,'h3')
  h3.innerText="Прошу ознакомиться с правилами игры:"
  let ul = appendToParent(divRole, 'ul')
  let h4=appendToParent(ul,'h4')  
  h4.innerText = `Необходиму заполнить поле:`
  let li1=appendToParent(ul,'li')
  li1.innerText="4-х палубный корабль - 1шт"
  let li2=appendToParent(ul,'li')
  li2.innerText="3-х палубный корабль - 2шт"
  let li3=appendToParent(ul,'li')
  li3.innerText="2-х палубный корабль - 3шт"
  let li4=appendToParent(ul,'li')
  li4.innerText="1-но палубный корабль-4шт"
  let li5=appendToParent(ul,'li')
  li5.innerText=`Расстояние между кораблями 
  должно быть не менее 1-й клетки.`
  let li6=appendToParent(ul,'li')
  li6.innerText=`Корабли могут выстраиваться 
  только по горизонтали или вертикали`
  ul.style.fontSize = "1.2rem"
}

function imgBetweenGame(pathImg){
   let imgStart = appendToParent(getId('divGif'),'img')  
  imgStart.src = pathImg
  imgStart.style.width = "20rem"
  imgStart.style.height = "20rem"
  imgStart.style.marginTop = "5rem"
  imgStart.style.marginLeft = "-6rem"
  imgStart.id = "imgStart"
}

class Game {
  constructor(parent) {
    document.body.style.background = "url('./img/1.jpg')"
    document.body.style.display="flex"
    document.body.style.flexFlow="column"

    let divContainer=appendBody('div')
    divContainer.style.display="flex"
    divContainer.style.flexFlow="row"

    role(divContainer)
    let divMaria=appendToParent(divContainer,'div')       
    let field = appendToParent(divMaria,'div')
    field.style.height = "500px"
    field.style.width = "500px"
    field.style.display = "flex"
    field.style.alignItems = "center"
    let divGif=appendToParent(divContainer,'div')
    divGif.id="divGif" 
    let fieldMaria = new Field(field, 'Maria') //начинаем игру, создаем поле Мария


    let buttonStart = appendToParent(parent, 'button')
    buttonStart.classList.add('btn-start')
    buttonStart.style.height = "10rem"
    buttonStart.style.width = "10rem"
    buttonStart.style.background='transparent url("https://media.giphy.com/media/6GGUSevj6sS5i/giphy.gif") no-repeat center'
    buttonStart.style.backgroundSize="100% 100%"

    buttonStart.classList.add("btnStart")
    buttonStart.style.fontSize = "1.5rem"


    buttonStart.onclick = () => {      
      ship1 = 0
      ship2 = 0
      ship3 = 0
      ship4 = 0
      if (countShip()) {//если наши кораблики в правильном количество, то можем начинать играть
        document.body.style.flexFlow="row"
        document.getElementsByClassName('div-role')[0].remove()
        document.getElementsByClassName('btnStart')[0].remove()

        fieldMaria.button.forEach(item => {//что бы не мог в период игры делать новые корабли
          getId(item.id).onclick = null
          getId(item.id).ondblclick = null

        })

        let field2 = appendToParent(divContainer,'div')
        field2.id='Tom'
        field2.style.height = "500px"
        field2.style.width = "500px"
        field2.style.display = "flex"
        field2.style.alignItems = "center"
        let fieldApponent = new Field(field2, 'TomHenks', false, 100)//создали поле противника
        
        imgBetweenGame("https://media.giphy.com/media/4SY7hLDg6zA6bcGp4p/giphy.gif")

        for (let i = 0; i < btn.length; i++) {
          getId(btn[i] + 100).className = 'bk' //здесь заполняю поле противника
        }

        setTimeout(() => {///прыгающая картинка Start

        }, 500)

        setTimeout(() => {
          getId('imgStart').remove()//удаляем прыгающую картинку

          ///может здесь начать стрелять?
        }, 4000)

      }
    }

  }
}
// function showEnemy(pathImg) {
//   let imgStart = appendToParent(document.body, 'img')  ///проблема теперь здесь 
//   //imgStart.src = "https://i.gifer.com/1mnr.gif"
//   imgStart.src = pathImg
//   imgStart.style.width = "20rem"
//   imgStart.style.height = "20rem"
//   imgStart.style.marginTop = "-5rem"
//   imgStart.style.marginLeft = "9rem"
//   imgStart.style.color = "#454545"
//   imgStart.id = "imgEnemy"
// }

function shoot(num = 0) {
  let explosion = num
  if (num == 0) {
    explosion = Math.round(Math.random() * 100)
  } else if (num > 99) {
    explosion = 0
  }
  if (baBah.indexOf(explosion) < 0) {
    baBah.push(explosion)
    setTimeout(() => {
      if (btn.indexOf(explosion) > -1) {
        imgBetweenGame("https://i.gifer.com/1mnr.gif")

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

        if (getId('imgStart') != null) {
          getId('imgStart').remove()
        }
        shoot(explosion + 1)//////////////мы попали, идем попадать еще раз

      } else {        
        getId(explosion).style.backgroundColor = "#00cc00"//промазали
      }
    }, 1000)
  }
  else {
    shoot()//рандом выдал такое же число, куда мы уже стреляли. поэтому опять запускаем его
  }

}





start()
let game = null
setTimeout(() => {
  document.body.innerText = ' '
  document.body.style.backgroundColor = "transparent"
  game = new Game(document.body)
}, 10500)






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