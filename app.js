let allQuestions = [];
let questions = [];
let current = 0;
let score = 0;
let attempts = 0;

async function init() {

    try {

        const res = await fetch("questions.json");

        if (!res.ok)
            throw new Error("File asset unreadable");

        allQuestions = await res.json();

        const savedQuiz = localStorage.getItem("quizState");

        if (savedQuiz) {

            const state = JSON.parse(savedQuiz);

            current = state.current;
            score = state.score;
            attempts = state.attempts;
            questions = state.questions;

            showQuestion();

        } else {

            showHome();

        }

    } catch (e) {

        document.getElementById("app").innerHTML = `
            <h2 style="color:var(--danger);">
                Critical Error
            </h2>

            <p>
                The system cannot find
                <strong>questions.json</strong>.
            </p>
        `;

        console.error(e);

    }

}

init();