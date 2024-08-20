const input = document.getElementById("date-input");
const switchLanguageButton = document.getElementById("switch-langBtn");
const calculateBtn = document.getElementById("calculateBtn");
const tooltips = document.querySelectorAll(".tooltip-text");
const title = document.querySelector(".title");
const resultTitle = document.getElementById("resultTitle");
const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");
let currentLanguage = "ru";

switchLanguageButton.addEventListener("click", () => {
  switch (currentLanguage) {
    case "ru":
      currentLanguage = "en";
      setLanguage(currentLanguage);
      break;
    case "en":
      currentLanguage = "ru";
      setLanguage(currentLanguage);
      break;
  }
});

function setLanguage(currentLanguage) {
  switch (currentLanguage) {
    case "ru":
      title.textContent = "Калькулятор возраста";
      tooltips[0].textContent = "Сменить язык";
      tooltips[1].textContent = "Рассчёт возраста";
      resultTitle.textContent = "Вы живёте";
      years.textContent = "Лет";
      months.textContent = "Месяцев";
      days.textContent = "Дней";

      break;
    case "en":
      title.textContent = "Age calculation";
      tooltips[0].textContent = "Switch language";
      tooltips[1].textContent = "Calculate age";
      resultTitle.textContent = "You have lived";
      years.textContent = "Years";
      months.textContent = "Months";
      days.textContent = "Days";
      break;
  }
}

function checkDate() {
  if (input.value === "") {
    calculateBtn.classList.add("disabled");
    if (currentLanguage === "ru") {
      alert("Введите дату рождения");
    } else {
      alert("Please enter your birth date");
    }
  } else {
    calculateBtn.classList.remove("disabled");
    createResults(new Date(input.value));
  }
}
calculateBtn.addEventListener("click", checkDate);

function createResults(birthDate) {
  const today = new Date();

  if (birthDate > today) {
    if (currentLanguage === "ru") {
      alert("Дата рождения не может быть в будущем");
    } else {
      alert("Birth date cannot be in the future");
    }
    return;
  }

  const checkResults = document.querySelector(".results");
  if (checkResults) {
    checkResults.remove();
  }

  const resultsDiv = document.createElement("div");
  resultsDiv.className = "results";

  let yearsDifference = today.getFullYear() - birthDate.getFullYear();
  let monthsDifference = today.getMonth() - birthDate.getMonth();
  let daysDifference = today.getDate() - birthDate.getDate();

  if (daysDifference < 0) {
    monthsDifference--;
    daysDifference += new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
  }

  if (monthsDifference < 0) {
    yearsDifference--;
    monthsDifference += 12;
  }

  let yearsText, monthsText, daysText;

  if (currentLanguage === "ru") {
    resultTitleText = "Вы живете";
    yearsText = yearsDifference + " Лет";
    monthsText = monthsDifference + " Месяцев";
    daysText = daysDifference + " Дней";
  } else {
    resultTitleText = "You have lived";
    yearsText = yearsDifference + " Years";
    monthsText = monthsDifference + " Months";
    daysText = daysDifference + " Days";
  }

  const resultTitle = document.createElement("p");
  resultTitle.id = "resultTitle";
  resultTitle.textContent = resultTitleText;

  const yearsResult = document.createElement("p");
  yearsResult.id = "years";
  yearsResult.textContent = yearsText;

  const mounthResult = document.createElement("p");
  mounthResult.id = "months";
  mounthResult.textContent = monthsText;

  const daysResult = document.createElement("p");
  daysResult.id = "days";
  daysResult.textContent = daysText;

  resultsDiv.appendChild(resultTitle);
  resultsDiv.appendChild(yearsResult);
  resultsDiv.appendChild(mounthResult);
  resultsDiv.appendChild(daysResult);

  document.body.appendChild(resultsDiv);
}

function keyboardInput(event) {
  if (event.key === "Enter") {
    checkDate();
  }
}
document.addEventListener("keydown", keyboardInput);