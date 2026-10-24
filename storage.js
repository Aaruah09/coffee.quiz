function saveQuizState(){

 localStorage.setItem(
   'redrabbit_quizState',
   JSON.stringify({
     current,
     score,
     attempts,
     questions
   })
 );

}

function getPlayerId() {

    let playerId = localStorage.getItem("redrabbit_player_id");

    if (!playerId) {
        playerId = `plr_${crypto.randomUUID()}`;

        localStorage.setItem(
            "redrabbit_player_id",
            playerId
        );
    }

    return playerId;
}