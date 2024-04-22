const text = document.getElementById("textInput");
const div1 = document.getElementById("div1");
var equation;
var epos; 
function Solve() {
    var numt = 0;
    var cx = 0;
    //קולט משוואה
    equation = text.value.toLowerCase().replace(/ /g, '');
    div1.style.color = 'rgb(15, 28, 61)';
    div1.innerHTML = '';
    try {epos = equation.indexOf('=')}
    catch {}
    if ((count(equation, '=') != 1 || epos == 0 || epos == equation.length - 1) && text.value != "") {
        print('Error')
        div1.style.color = 'red';
    }
    else if (text.value != "") {
        let temp = equation;
        fix();
        if (temp != equation)
            print(equation)
        //חיבור וחיסור

        //בעיית המספרים העשרוניים
        for (let i = 0; i < equation.length; i++) {
            if (equation[i] == 'x') {
                let num = 1;
                if (equation[i - 1] == '-')
                    num = -num;
                if (i < epos)
                    cx += num;
                else
                    cx -= num;
            }
            if (isNum(equation[i])) {
                let num = idNum(i);
                let a = Math.max(afterDot(num), afterDot(cx));
                let b = Math.max(afterDot(num), afterDot(numt));
                if (equation[i + String(num).length] == 'x') {
                    if (a != 0) {
                        cx *= Math.pow(10, a);
                        num *= Math.pow(10, a);
                    }
                    if (equation[i - 1] == '-')
                    num = -num;
                    if (i < epos)
                        cx += num;
                    else
                        cx -= num
                    i++;
                    if (a != 0) {
                        cx /= Math.pow(10, a);
                        num /= Math.pow(10, a);
                    }
                } else {
                    if (b != 0) {
                        numt *= Math.pow(10, b);
                        num *= Math.pow(10, b);
                    }
                    if (equation[i - 1] == '-')
                    num = -num;
                    if (i < epos)
                        numt += num;
                    else
                        numt -= num
                    if (b != 0) {
                        numt /= Math.pow(10, b);
                        num /= Math.pow(10, b);
                    }
                }
                i += String(num).length - 1;
            }
        }
        //פיתרון
        numt = -numt;
        if (cx == 0) {
            print('0='+(numt));
            if (numt == 0)
                print('Infinite solutions')
            else
                print('No solution')
        } else if (cx == 1)
            print('x='+(numt));
        else {
            if (cx == -1)
                print('-x='+(numt));
            else
                print(cx+'x='+(numt));
            if (numt%cx != 0){
                print('x='+(numt-numt%cx)/cx+'.'+Math.abs(numt%cx)+'/'+Math.abs(cx));
                print('<button class="btn2" onclick="decimal(this, '+numt/cx+')">Decimal?</button>')
            }
            else
                print('x='+numt/cx);
        }
    }
}
function isNum(str) {return parseInt(str) == str};
function print(text) {div1.innerHTML += text + "<br/>"}
function remove(place1, place2) {equation = equation.substring(0,place1) + equation.substring(place2 + 1)}
function add(place, text) {equation = equation.substring(0,place) + text + equation.substring(place)}
function afterDot(string) {
    string = string.toString();
    let result = 0;
    if (count(string, '.') == 1) {
        for (let a = string.indexOf('.') + 1; isNum(string[a]); a++) {result++}
    }
    return result;
}
function count(string, obj) {
    let a = 0;
    for (let i = 0; i < string.length; i++) {
        if (obj == string[i])
            a++
    }
    return a;
}
function idNum(i) {
    let num = 0;
    let a;
    for (a = i; isNum(equation[a]); a++) {
        num = num*10 + parseInt(equation[a]);
    }
    if (equation[a] == '.') {
        a++;
        for (let b = 1; isNum(equation[a]); b++) {
            num += parseInt(equation[a])/Math.pow(10, b);
            a++
        }
    }
    return num;
}
function fix() {
    epos = equation.indexOf('=');
    for (let i = 0; i < equation.length; i++) {
        let minuses = 0;
        let a;
        for (a = i; equation[a] == '+' || equation[a] == '-'; a++) {
            if (equation[a] == '-')
                minuses++;
        }
        if (a > i) {
            remove(i, a - 1);
            if (minuses % 2 == 0)
                add(i, '+');
            else
                add(i, '-');
        }
        if (equation[i] == 'x' && (equation[i+1] == 'x' || equation[i+1] == '*')) {
            if (equation[i+1] == 'x')
                remove(i, i+1);
            else if (equation[i+1] == '*' && equation[i+2] == 'x')
                remove(i, i+2);
            add(i, 'x^2');
            i += 2
        }
    }
    epos = equation.indexOf('=');
    for (let i = epos - 1; !isNum(equation[i]) && equation[i] != ')' && equation[i] != 'x'; i--)
        print(i)
    for (let i = equation.length - 1; !isNum(equation[i]) && equation[i] != ')' && equation[i] != 'x'; i--)
        remove(i, i);
    while (!isNum(equation[0]) && equation[0] != '(' && equation[0] != '-' && equation[0] != 'x')
        remove(0, 0);
}
function decimal(btn2, answer) {
    div1.removeChild(btn2);
    print('x='+answer);
}