function randomItem(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

function showToast(text){
 const toast = document.getElementById('toast');
 toast.innerText = text;
 toast.classList.add('show');
 setTimeout(()=>{ toast.classList.remove('show'); },2000);
}
