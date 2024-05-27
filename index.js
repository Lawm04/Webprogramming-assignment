class Question {
    constructor(questionText, trait, correctOption) {
        this.questionText = questionText;
        this.trait = trait; // Trait affected by this question
        this.correctOption = correctOption;
    }

    isCorrect(answer) {
        return answer === this.correctOption;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.scores = {
            I: 0,
            E: 0,
            S: 0,
            N: 0,
            T: 0,
            F: 0,
            J: 0,
            P: 0
        };
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    guess(answer) {
        const currentQuestion = this.getCurrentQuestion();
        const trait = currentQuestion.trait;
        
        // Update scores based on answer
        if (trait === "I" || trait === "E") {
            this.scores[trait] += (answer - 4); // Centered at 4, answer: 1-7
        } else {
            this.scores[trait] += (answer - 4); // Centered at 4, answer: 1-7
        }

        this.currentQuestionIndex++;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    calculatePersonalityType() {
        let type = "";
        type += this.scores["I"] >= this.scores["E"] ? "I" : "E";
        type += this.scores["S"] >= this.scores["N"] ? "S" : "N";
        type += this.scores["T"] >= this.scores["F"] ? "T" : "F";
        type += this.scores["J"] >= this.scores["P"] ? "J" : "P";
        return type;
    }
}

const questions = [
    new Question("You enjoy vibrant social events with lots of people.", "E", "4"),
    new Question("You often spend time exploring unrealistic yet intriguing ideas.", "N", "4"),
    new Question("Your travel plans are more likely to look like a rough list of ideas than a detailed itinerary.", "P", "4"),
    new Question("You enjoy participating in group activities.", "E", "4"),
    new Question("You usually prefer to get your revenge rather than forgive.", "T", "4"),
    new Question("You often make a backup plan for a backup plan.", "J", "4"),
    new Question("You feel comfortable just walking up to someone you find interesting and striking up a conversation.", "E", "4"),
    new Question("You spend a lot of your free time understanding different views and analyzing different theories.", "N", "4"),
    new Question("Your home and work environments are quite tidy.", "J", "4"),
    new Question("You would rather improvise than spend time coming up with a detailed plan.", "P", "4"),
    new Question("Your emotions control you more than you control them.", "F", "4"),
    new Question("You often feel overwhelmed by your to-do list.", "P", "4"),
    new Question("You like to have a to-do list for each day.", "J", "4"),
    new Question("You are often unsure about where your life is headed.", "P", "4"),
    new Question("You find it easy to stay relaxed and focused even when there is some pressure.", "T", "4"),
    new Question("You rarely worry about how your actions affect other people.", "T", "4"),
    new Question("You often find yourself lost in thought when you are walking in nature.", "N", "4"),

];

const quiz = new Quiz(questions);

function displayQuestion() {
    if (quiz.hasEnded()) {
        showScores();
    } else {
        const question = quiz.getCurrentQuestion();
        const questionElement = document.getElementById('quiz');
        questionElement.innerHTML = `
            <div class="question">${question.questionText}</div>
            <div class="scale">
                <div class="scale-item" data-value="1"></div>
                <div class="scale-item" data-value="2"></div>
                <div class="scale-item" data-value="3"></div>
                <div class="scale-item" data-value="4"></div>
                <div class="scale-item" data-value="5"></div>
                <div class="scale-item" data-value="6"></div>
                <div class="scale-item" data-value="7"></div>
            </div>
            <div class="labels">
                <span class="label">Agree</span>
                <span class="label">Disagree</span>
            </div>
        `;

        const scaleItems = document.querySelectorAll('.scale-item');
        scaleItems.forEach(item => {
            item.addEventListener('click', () => {
                scaleItems.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                document.getElementById('submit').dataset.selectedValue = item.dataset.value;
            });
        });
    }
}

function showScores() {
    const resultElement = document.getElementById('result');
    const personalityType = quiz.calculatePersonalityType();
    resultElement.innerHTML = `
        <h2>Your personality type is: ${personalityType}</h2>
        <a href="https://www.16personalities.com/personality-types" target="_blank">More info about Personalities</a>
    `;
}

document.getElementById('submit').addEventListener('click', function() {
    const selectedValue = this.dataset.selectedValue;
    if (selectedValue) {
        quiz.guess(parseInt(selectedValue));
        displayQuestion();
    }
});

displayQuestion(); 