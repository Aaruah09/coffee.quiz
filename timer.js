let timerInterval;
const QUESTION_TIME = 20;

function startTimer() {

    clearInterval(timerInterval);

    const bar = document.getElementById("countdown-bar");

    if (!bar) return;

    // Start completely full
    bar.style.width = "100%";

    let timeLeft = QUESTION_TIME;

    timerInterval = setInterval(() => {

        timeLeft--;

        // Drain the bar as time passes
        const progress =
            timeLeft / QUESTION_TIME;

        bar.style.width =
            `${progress * 100}%`;

        // Time is up
        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            current++;

            saveQuizState();

            if (current < TOTAL_QUESTIONS) {

                showQuestion();

            } else {

                showResult();

            }

        }

    }, 1000);

}


function startCooldownTimer() {

    const interval = setInterval(() => {

        const nextPlay =
            Number(localStorage.getItem("redrabbit_nextPlay"));

        const remaining =
            nextPlay - Date.now();

        if (remaining <= 0) {

            clearInterval(interval);

            localStorage.removeItem("redrabbit_nextPlay");

            init();

            return;
        }

        const h =
            Math.floor(
                remaining / 3600000
            );

        const m =
            Math.floor(
                (remaining % 3600000) / 60000
            );

        const s =
            Math.floor(
                (remaining % 60000) / 1000
            );

        const timer =
            document.getElementById("timer");

        if (timer) {

            timer.innerText =
                `${h}h ${m}m ${s}s`;

        }

    }, 1000);

}