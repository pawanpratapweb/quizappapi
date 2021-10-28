document.querySelector(".points").innerText = localStorage.getItem('points');
fetch(window.location.origin + "/api/random?trd=kjdh8sa6dsKJHKJKHJKH3897B9823490209")
.then(res => {
  return res.json()
}).then(res => {
  const question = document.querySelector(".question");
  const options = document.getElementsByClassName("options")[0];
  var answer = res.answer;
  question.innerText = res.question;
  res.options.map((elem, index) => {
    options.insertAdjacentHTML("beforeend", `<button class="optionInd">${elem}</button>`);
  })
  const optionInd = document.getElementsByClassName("optionInd");

  for(var i=0; i<optionInd.length; i++){
    optionInd[i].addEventListener("click", checkAnswer);
  }
  window.answer = res.answer.trim();
}).catch(err => {
  console.log(err)
})


const checkAnswer = (event) => {
  const banner  = document.querySelector(".banner");
  banner.style.display = "block";
  const element = event.target;
  element.style.background = "cyan";
  element.style.color = "black";
  element.style.fontWeight = "500";
  
  setTimeout(() => {
    if(element.innerHTML == answer){
      const correctAudio = document.querySelector(".correctAudio");
      correctAudio.play();
      element.style.background = "#00ff40";
      element.style.borderColor = "#00ff40";
      localStorage.setItem("points", +localStorage.getItem("points") + 100)
    } else {
      element.style.background = "#ff4533";
      element.style.borderColor = "#ff4533";
      element.parentElement.childNodes.forEach((elem) => {
        if(elem.innerText == answer){
          elem.style.background = "#00ff40";
          elem.style.fontWeight = "500";
          elem.style.color = "black";
          elem.style.borderColor = "#00ff40";
        }
      })
    }
  }, 500)

  setTimeout(() => {
    window.location = window.location.href;
  }, 2000)

}