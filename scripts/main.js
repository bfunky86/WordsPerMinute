let timerOutput = document.getElementById('timer');
let errorOutput = document.getElementById('numError');
let accuracyOutput = document.getElementById('accuracy');
let resetBtn = document.getElementById('resetButton');
let input = document.getElementById('inputText');
let promptBox = document.getElementById('prompt');
var timer, counter = 0, numError, accuracy, totalTyped = 0, correctTyped = 0, currPrompt;
var currentInput, currentInputArray, timeLeft, wpm;



function resetTest() {
    stopTimer();
    resetValues();
    getPrompt();
    input.addEventListener('click', startTimer, false);
}

function resetValues() {
    errorOutput.textContent = '0';
    timerOutput.textContent = '60s';
    accuracyOutput.textContent = '100%';
    input.value = '';
    promptBox.textContent = '';
}

function getPrompt() {
    resetValues();
    var p1 = "But I must explain to you how all this mistaken idea of denouncing pleasure " +
        "and praising pain was born and I will give you a complete account of the system, and expound " +
        "the actual teachings of the great explorer of the truth, the master-builder of human happiness.";
    var p2 = "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because " +
        "those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.";
    var p3 = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, " +
        "but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.";
    var p4 = "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?";
    var p5 = "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, " +
        "or one who avoids a pain that produces no resultant pleasure?";
    var p6 = "In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do " +
        "what we like best, every pleasure is to be welcomed and every pain avoided.";
    var p7 = "But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently " +
        "occur that pleasures have to be repudiated and annoyances accepted.";
    var p8 = "The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure " +
        "other greater pleasures, or else he endures pains to avoid worse pains.";
    var prompts = [p1, p2, p3, p4, p5, p6, p7, p8];

    var count = Math.floor(Math.random() * 8);
    currPrompt = prompts[count];
    
    currPrompt.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        promptBox.appendChild(charSpan)
    })

}

function processCurrentInput() {
    var endQuote = false;
    currentInput = input.value;
    currentInputArray = currentInput.split('');
    totalTyped++;
    numError = 0;
    quoteSpanArray = promptBox.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = currentInputArray[index];
        if(typedChar === '.' || typedChar === '?'){
            endQuote = true;
        }
        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            numError++;
        }
    });

    errorOutput.textContent = numError;
    correctTyped = totalTyped - numError;
    accuracy = findAccuracy(correctTyped, totalTyped);
    accuracyOutput.textContent = accuracy;


    if (endQuote) {
        timeLeft = timerOutput.textContent.substring(0,2);
        if(Number(timeLeft) >= 30){
            wpm = (totalTyped / 5) / 0.5;
        } else if(Number(timeLeft) >= 15){
            wpm = (totalTyped / 5) / .75;
        } else {
            wpm = totalTyped / 5;
        }
        stopTimer();
        getPrompt();
        alert('CONGRATULATIONS, YOU CAN TYPE ' + Math.round(wpm) + ' WORDS PER MINUTE!!');
    }
}

function findAccuracy(correct, total) {
    return parseInt((correct / total) * 100) + '%';
}

function startTimer() {
    var count = 59;
    timer = setInterval(function () {
        $("#timer").html(count-- + 's');
        if (count < 0) {
            clearInterval(timer);
        }
    }, 1000);
    input.removeEventListener('click', startTimer, false);
}

function stopTimer() {
    clearTimeout(timer);
}

window.addEventListener('load', getPrompt, false);
resetBtn.addEventListener('click', resetTest, false);
input.addEventListener('input', processCurrentInput, false);
input.addEventListener('click', startTimer, false);