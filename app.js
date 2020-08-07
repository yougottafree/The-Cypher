//setting up all the elements for easier manipulation
[inOrderAlphabet,alphabetDict] = createAlphabet();
let squareAlphabet = [...inOrderAlphabet];
squareAlphabet.shift();
const rangeNum = document.querySelector(".range-num");
const slider = document.getElementById("range-input");
const input = document.getElementById("user-input");
const sliderEncode = document.querySelector("#slider-encode");
const boxEncode = document.querySelector("#box-encode");
const changeBtn = document.getElementById("change-table");

changeBtn.addEventListener("click", function(e){
    e.preventDefault();
    shuffleBoard(squareAlphabet);
    encodeBox(input.value);
})

slider.addEventListener("mousemove", function(e){
    // when ever the slider move, update the sliderEncoder
    let num = e.target.value;
    rangeNum.innerText = num;
    encodeSlider(input.value, num);
})

input.addEventListener("keyup", function(e){
    // Whenever something is typed, update both encoder
    let value = e.target.value;
    encodeSlider(value, slider.value);
    encodeBox(value);
})

function createAlphabet(){
    //this function will create the alphabet for utilization
    let inOrderAlphabet = [];
    let alphabetDict= new Object;
    for (let i=97; i<123; i++){
        let string = String.fromCharCode(i);
        alphabetDict[string] = (i-96)%26;
        inOrderAlphabet.push(string);
    }
    inOrderAlphabet.unshift("z")

    return [inOrderAlphabet, alphabetDict];
}

function encodeSlider(string, value){
    // this function will encode the Slider text and update on screen
    result = "";
    for (let y of string){
        i = y.toLowerCase();
        if (i in alphabetDict){
            result+=inOrderAlphabet[(+alphabetDict[i]+(+value))%26].toUpperCase();
        } else {
            result+=i.toUpperCase();
        }
    }
    sliderEncode.innerHTML = result;  
}

function encodeBox(string){
    // this function will encode the Slider text and update on screen
    result = "";
    for (let y of string){
        i = y.toLowerCase();
        if (i in alphabetDict && i!="z"){
            result+=squareAlphabet[(alphabetDict[i]-1)%26].toUpperCase();
        } else {
            result+=i.toUpperCase();
        }
    }
    boxEncode.innerHTML = result;
    console.log(boxEncode)
}

function shuffleBoard(squareAlphabet){
    for (let i = squareAlphabet.length - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [squareAlphabet[i], squareAlphabet[j]] = [squareAlphabet[j], squareAlphabet[i]];
    }
    console.log(squareAlphabet);
    const table = document.querySelectorAll("table tr");
    for (let i=0; i < 5; i++){
        let row = table[i];
        console.log(row);
        for (let j=1; j <=5; j++){
            let cell = row.childNodes[j-1];
            console.log(j+i*5-1)
            cell.innerText = squareAlphabet[j+i*5-1];
        }
    }
}