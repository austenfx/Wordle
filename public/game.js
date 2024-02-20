let maxWords = 6;
let maxLetters = 5;
let targetWord = "fluff".toUpperCase();


let position = {
    word: 1,
    letter: 0
}

function EnterLetter(key){
    position = NextLetter(position);
    EditLetter(position, key);
}

function NextLetter(position){
    position.letter++;
    position.letter = Math.min(position.letter, maxLetters + 1);
    return position;
}

function LastLetter(position){
    position.letter--;
    position.letter = Math.max(position.letter, 0);
    return position;
}

function NextWord(position){
    position.word++;
    position.letter = 0;
    if (position.word > maxWords) {
        GuessesComplete();
    }
    return position;
}

function ChooseLetterElement(position){
    return $(`.word${position.word} .letter${position.letter}`);
}

$(document).on("keydown", (event) => {
    let key = event.key;
    if (key.length === 1 && key.match(/[a-z]/i) && position.letter <= maxLetters) {
        EnterLetter(key.toUpperCase());
    }
    if (key == "Backspace") {
        BackSpace();
    }
    else if (key == "Enter") {
        Enter();
    }
});

function EditLetter(position, key){
    let letterElement = ChooseLetterElement(position);
    letterElement.text(key);
    letterElement.addClass("pending");
}

function RemoveLetter(position){
    let letterElement = ChooseLetterElement(position);
    letterElement.text("");
    letterElement.removeClass("pending");
}

function BackSpace(){
    if(position.letter > maxLetters){
        position = LastLetter(position);
    }
    RemoveLetter(position);
    position = LastLetter(position);
}

function Enter() {
    let guess = GetWord(position.word).toUpperCase();
    if (guess.length == maxLetters){
        EnterWord(guess);
        SetLetterStates(position.word, GetLetterStates(guess, targetWord));
        position = NextWord(position);
    }

}

function GetWord(wordNum){
    let word = "";

    for (let i = 1; i <= maxLetters; i++) {
        word += $(".word" + position.word + " .letter" + i).text();
    }
    return word;
}

function GuessesComplete() {
    alert("You lost");
}

function EnterWord(guess) {
    console.log(guess);
}

function GetLetterStates(guess, targetWord) {
    let states = [];

    for (let i = 0; i < maxLetters; i++) {
        states.push(0);
    }

    for (let i = 0; i < maxLetters; i++) {
        if (guess[i] == targetWord[i]) {
            states[i] = 2;
        }
        else {
            let appsInTarget = GetLetterAppsInWord(guess[i], targetWord);
            if (appsInTarget == 0) {
                states[i] = 0;
            }
            else {
                let count = 0;
                for (let x = 0; x < maxLetters; x++) {
                    if (guess[i] == guess[x] && guess[x] == targetWord[x]) {
                        count++;
                        console.log("1" + count);
                    }
                }
                for (let x = 0; x < i; x++) {
                    if (guess[i] == guess[x] && states[x] == 1) {
                        count++;
                        
                    }
                }
                if (count < appsInTarget) {
                    states[i] = 1;
                }
            }
        }
    }

    return states;
}

function SetLetterStates(wordNum, states) {
    
    for (let i = 0; i < maxLetters; i++) {
        let letterElement = $(".word" + wordNum + " .letter" + (i + 1));
        letterElement.removeClass("pending");
        switch (states[i]) {
            case 0:
                letterElement.addClass("missing");
                break;
            case 1:
                letterElement.addClass("yellow");
                break;
            case 2:
                letterElement.addClass("found");
                break;
        
            default:
                break;
        }
    }
}

function GetLetterAppsInWord(letter, word){
    let count = word.split(letter).length - 1;
    //console.log(letter + " appears " + count + " times in " + word);
    return count;
}


