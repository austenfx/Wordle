const maxWords = 6;
const maxLetters = 5;


let position = {
    word: 1,
    letter: 0
}

function EnterLetter(key){
    //console.log(key + " " + position.word + " " + position.letter);
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

function ChooseLetterElement(position){
    return $(`.word${position.word} .letter${position.letter}`);
}

$(document).on("keydown", (event) => {
    let key = event.key;
    if (key.length === 1 && key.match(/[a-z]/i) && position.letter <= maxLetters) {
        EnterLetter(key);
    }
    if (key == "Backspace") {
        BackSpace();
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