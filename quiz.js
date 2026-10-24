async function savePlay() {
  if (!dbClient) return;
  const name = localStorage.getItem("playerName") || "Guest";
  try {
    await dbClient.from('plays').insert([
  {
    cafe: "vasasi",
    player_name: name,
    score: score,
    completed: true
  }
]);
  } catch (dbError) {
    console.error("Database write failed:", dbError);
  }
}


function startQuiz(){

    localStorage.setItem('quizInProgress','true');

    const name = document.getElementById('name').value.trim();

    if(!name){
        alert('Enter your name');
        return;
    }

    localStorage.setItem('playerName',name);

    questions = shuffle(allQuestions).slice(0, TOTAL_QUESTIONS);

    current = 0;
    score = 0;
    attempts = 0;

    showQuestion();

}

function checkAnswer(selected,btn){
clearInterval(timerInterval);

 const correct = questions[current].correctAnswer;
 const buttons = document.querySelectorAll('#options button');
 buttons.forEach(b=>b.disabled=true);

 if(selected===correct){
   btn.classList.add('correct');
   score++;
 }else{
   btn.classList.add('wrong');
   buttons.forEach(b=>{
     if(b.dataset.key===correct){ b.classList.add('correct'); }
   });
 }

 setTimeout(()=>{
   current++;
   saveQuizState();
   if(current < TOTAL_QUESTIONS){ showQuestion(); }
   else{ showResult(); }
 },1200);
}

function retryQuiz(){
 const easyQuestions =
shuffle(
  allQuestions.filter(
    q => q.category === "Easy"
  )
).slice(0,2);

const normalQuestions =
shuffle(
  allQuestions.filter(
    q => q.category === "Normal"
  )
).slice(0,2);

const hardQuestions =
shuffle(
  allQuestions.filter(
    q => q.category === "Hard"
  )
).slice(0,2);

const insaneQuestions =
shuffle(
  allQuestions.filter(
    q => q.category === "Insane"
  )
).slice(0,2);

questions = [

  ...easyQuestions,

  ...normalQuestions,

  ...hardQuestions,

  ...insaneQuestions

];
 current = 0;
 score = 0;
 showQuestion();
}