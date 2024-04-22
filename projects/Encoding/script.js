const textInput = document.getElementById("textInput");
const type = document.getElementById("type");
const cType = document.getElementById("codeType");
const encodeB = document.getElementById("encode");
const numberP = document.getElementById("numberP");
var output;
const letters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ','ק', 'ר', 'ש', 'ת',]

function changeType() {
    encodeB.textContent = type.value
}
function changeEType() {
    if (cType.value == 'pattern')
        numberP.style.display = 'inline-block'
    else
        numberP.style.display = 'none'
}


function click1() {
    output = '';
    const input = textInput.value.toLowerCase()
    for (let i = 0; i < input.length; i++) {
        const letter = () => {
            if (input[i] == 'ך')
                return 'כ'
            else if (input[i] == 'ם')
                return 'מ'
            else if (input[i] == 'ן')
                return 'נ'
            else if (input[i] == 'ף')
                return 'פ'
            else if (input[i] == 'ץ')
                return 'צ'
            else 
                return input[i]
        }
        if (cType.value == 'transient')
            output += transient(letter())
        else if (cType.value == 'pattern')
            output += pattern(letter())
        
    }
    print(output)
}
 
function transient(letter) {
    let a = num(letter)
    if (a == null)
        return ''
    else if (a == 'space')
        return ' '
    return letters[21 - a]
}
function pattern(letter) {
    let a = num(letter)
    if (a == null)
        return ''
    else if (a == 'space')
        return ' '
    console.log(a, parseInt(numberP.value))
    return letters[(a + parseInt(numberP.value))%22 ]

}




function num(letter) {
    for (let i = 0; i < letters.length; i++) {
        if (letter == letters[i])
            return i
        else if (letter == ' ')
            return 'space'
    } 
    return null
}




function print(text) {textOutput.innerHTML = text}