const questions = [
    {
        question 1: " ____ is a memorial museum for Gandhi located in the city of Madurai in Tamil Nadu, India.",
        option A: " Mahatma memorial museum",
        option B: "Gandhi memorial museum",
        option C: "Sakthi memorial museum",
        option D: "None of the above",
        correctOption: "option B"
    },

    {
        question 2: "Madurai is popularly called __ the city that never sleeps.",
        option A: " Thoonga Nagaram ",
        option B: " Kovil Nagaram",
        option C: " Meenachi Nagaram ",
        option D: " None of the above ",
        correctOption: "option A"
    },

    {
        question 3: " Distance between Madurai Airport and Madurai City is ___ kms.",
        option A: " 10 ",
        option B: " 20 ",
        option C: " 15 ",
        option D: " 12 ",
        correctOption: "option D"
    },

    {
        question 4: " The southern gopuram is the tallest of them all with a height of ___ feet. ",
        option A: " 180 ",
        option B: " 175 ",
        option C: " 170 ",
        option D: " 185 ",
        correctOption: "option C"
    },

    {
        question 5: " There are several halls in the temple complex including one known as the ___",
        option A: " Hall of thousand pillars ",
        option B: " Meenakshi Nayakkar Mandapam ",
        option C: " None of the above",
        option D: " Both A & B",
        correctOption: "option D"
    },

    {
        question 6: " The most important festival associated with the temple is the ___ ",
        option A: " Meenakshi Thirukkalyanam ",
        option B: " Meenakshi Festival",
        option C: " Meenakshi Mandabam",
        option D: " None of the above",
        correctOption: " option A "
    },

    {
        question 7: " The ancient city of Madurai, more than 2,500 years old, was built by the __ king ",
        option A: " Chera ",
        option B: " Pandiya ",
        option C: " Chola ",
        option D: " Pallava ",
        correctOption: "option B"
    },

    {
        question 8: " Thirumalai Nayak Palace is a 17th-century palace erected in ___ AD by King Tirumala Nayaka ",
        option A: " 1636 ",
        option B: "1637 ",
        option C: " 1638 ",
        option D: " 1639 ",
        correctOption: "option A"
    },

    {
        question 9: " Thirumalai Nayakar mahal is famous for its ___ pillars. Pillar’s height is 82 feet and width is 19 feet",
        option A: " All the below ",
        option B: " Marble ",
        option C: " Large ",
        option D: " Giant ",
        correctOption: "option D"
    },

    {
        question 10: `" This museum was inaugurated by the former Prime Minister Jawaharlal Nehru on __"`,
        option A: " 16 April 1959 ",
        option B: " 15 April 1960 ",
        option C: " 16 April 1960 ",
        option D: " 15 April 1959 ",
        correctOption: "optionD"
    },
]
let shuffledQuestions = [] 

function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}
let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
