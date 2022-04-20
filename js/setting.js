import { Quiz } from "./quiz.js";

export class Setting {
  constructor() {
    this.categoryInput = document.getElementById("Category");
    this.startBtn = document.getElementById("start-btn");
    this.questionsInput = document.getElementById("question-num");
    this.difficultyInput = document.getElementsByName("Difficulty");
    this.startBtn.addEventListener("click", this.startQuiz.bind(this));
  }

  async startQuiz() {
    let category = this.categoryInput.value;
    let numOfQuestions = this.questionsInput.value;
    let difficulty = [...this.difficultyInput].filter(
      (element) => element.checked
    )[0].value;
    let api = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;
    let questionArray = await this.fetchUrl(api);

    if (questionArray.length > 0) {
      $("#setting").fadeOut(500, () => $("#quiz").fadeIn(500));
    }
    if (numOfQuestions == "") {
      $(".alert").css("display", "block");
    } else {
      $(".alert").css("display", "none");
    }

    new Quiz(questionArray);
  }

  async fetchUrl(API) {
    let request = await fetch(API);
    let response = await request.json();

    return response.results;
  }
}
