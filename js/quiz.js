export class Quiz {
  constructor(questionArray) {
    this.questionArray = questionArray;
    this.submitBtn = document.getElementById("submit-btn");
    this.submitBtn.addEventListener("click", this.submitAnswer.bind(this));
    this.tryAginBtn = document.getElementById("try-again-btn");
    this.tryAginBtn.addEventListener("click", this.tryAgain);
    this.multiAnswers = document.getElementById("answers-choices");
    this.currentQuestion = 0;
    this.score = 0;
    this.total = questionArray.length;
    this.showQuestion();
  }

  showQuestion() {
    document.getElementById("quiz-question").innerHTML =
      this.questionArray[this.currentQuestion].question;
    document.getElementById("question-btn").innerHTML = `${
      this.currentQuestion + 1
    } Of ${this.total} Question`;
    this.showAnswer();
  }

  showAnswer() {
    this.answerArray = [
      this.questionArray[this.currentQuestion].correct_answer,
      ...this.questionArray[this.currentQuestion].incorrect_answers,
    ];

    //shows answer before shuffle
    // console.log(this.answerArray);

    let currentIndex = this.answerArray.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [this.answerArray[currentIndex], this.answerArray[randomIndex]] = [
        this.answerArray[randomIndex],
        this.answerArray[currentIndex],
      ];
    }

    let hasala = "";

    for (let i = 0; i < this.answerArray.length; i++) {
      hasala += `<li>
      <label>
        <input type="radio" name="answer" id="${i}" class="mb-2 form-check-input" value="${this.answerArray[i]}" >
        ${this.answerArray[i]}
      </label>
    </li>`;
    }
    this.multiAnswers.innerHTML = hasala;

    //shows answer after shuffle
    // console.log(answerArray);
  }

  submitAnswer() {
    this.checkAnswer();
  }

  checkAnswer() {
    this.answer = document.getElementsByName("answer");
    this.userAnswer = [...this.answer].filter(
      (element) => element.checked
    )[0].value;
    this.correctAnswer =
      this.questionArray[this.currentQuestion].correct_answer;
    // console.log(this.userAnswer);
    // console.log(this.correctAnswer);

    if (this.userAnswer == this.correctAnswer) {
      this.score++;
      $(".correct-answer").fadeIn(500, () => $(".correct-answer").fadeOut(500));
    } else {
      $(".incorrect-answer").fadeIn(500, () =>
        $(".incorrect-answer").fadeOut(500)
      );
    }
    this.currentQuestion++;

    if (this.currentQuestion < this.total) {
      this.showQuestion();
    } else {
      this.finish();
    }
  }

  finish() {
    $("#quiz").fadeOut(500, () => $("#finish").fadeIn(500));
    document.getElementById("score").innerHTML = this.score;
  }

  tryAgain() {
    $("#finish").fadeOut(500, () => $("#setting").fadeIn(500));
  }
}
