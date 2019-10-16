let appendBody = (elem) => document.body.appendChild(document.createElement(elem))
let appendToParent = (parent, elem) => parent.appendChild(document.createElement(elem))

let divField = appendBody('div')
divField.classList.add('w-500', 'br-black', 'h-500')

let input = appendBody('input')
input.style.width = '100'

let button = appendBody('button')
button.innerText = 'Push'
button.onclick = () => {
    let valueInput = input.value
    fetch('/users', {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({name:valueInput})
    })
    setTimeout(()=>{
        fetch('/users')
    .then(responce=>{
        return responce.json()
    })
    .then(data=>{
        console.log(data)
    })
    },2000)
    
}