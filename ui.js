/* =========================================================
   GAME STATE
========================================================= */

let selectedGame = null;


/* =========================================================
   RED RABBIT HOME
========================================================= */

function showHome() {

  const nextPlay = localStorage.getItem('nextPlay');

  if (nextPlay && Date.now() < Number(nextPlay)) {
    showCooldown();
    return;
  }

  document.getElementById('app').innerHTML = `

    <div class="redrabbit-experience">


      <!-- ================================================
           ENTRANCE
      ================================================= -->

      <section class="redrabbit-entrance">

      <img
    src="rr.logo.png"
    alt="Red Rabbit Café"
    class="entrance-logo-image"
>

        <div class="entrance-depth depth-one"></div>
        <div class="entrance-depth depth-two"></div>

        <div class="entrance-content">

        

          <div class="entrance-eyebrow">
            WELCOME
          </div>

          <div class="entrance-logo">
            RED RABBIT
          </div>

          <div class="entrance-cafe">
            CAFÉ
          </div>

          <div class="entrance-rule"></div>


          <button
            class="enter-button"
            onclick="enterRedRabbit()">

            <span>
              ENTER
            </span>

            

          </button>

        </div>


        <div class="entrance-footer">
          EST. 2026
        </div>

      </section>



      <!-- ================================================
           MAIN CAFÉ
      ================================================= -->

      <section class="redrabbit-main">


        <header class="redrabbit-nav">

          <div class="nav-logo">

            <span>
              RED RABBIT
            </span>

            <small>
              CAFÉ
            </small>

          </div>

        </header>



        <div class="cafe-intro">

          <span class="section-label">
            THE RED RABBIT EXPERIENCE
          </span>

          <h1>
            More than<br>
            <em>just coffee.</em>
          </h1>

          <p>
            Explore. Play. Compete.
          </p>

        </div>



        <div class="home-actions">


          <!-- ============================================
               MENU
          ============================================= -->

          <button
            class="home-option"
            onclick="showMenu()">

            <span class="option-number">
              01
            </span>

            <span class="option-content">

              <strong>
                MENU
              </strong>

              <small>
                Discover what's brewing.
              </small>

            </span>


            <svg
              class="option-arrow"
              viewBox="0 0 20 20"
              aria-hidden="true">

              <path
                d="M4 16 L16 4 M9 4 H16 V11"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="square"
                stroke-linejoin="miter">
              </path>

            </svg>

          </button>



          <!-- ============================================
               GAMES
          ============================================= -->

          <button
            class="home-option"
            onclick="showGames()">

            <span class="option-number">
              02
            </span>

            <span class="option-content">

              <strong>
                GAMES
              </strong>

              <small>
                Challenge yourself.
              </small>

            </span>


            <svg
              class="option-arrow"
              viewBox="0 0 20 20"
              aria-hidden="true">

              <path
                d="M4 16 L16 4 M9 4 H16 V11"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="square"
                stroke-linejoin="miter">
              </path>

            </svg>

          </button>



          <!-- ============================================
               LEADERBOARD
          ============================================= -->

          <button
            class="home-option"
            onclick="showLeaderboard()">

            <span class="option-number">
              03
            </span>

            <span class="option-content">

              <strong>
                LEADERBOARD
              </strong>

              <small>
                See who's on top.
              </small>

            </span>


            <svg
              class="option-arrow"
              viewBox="0 0 20 20"
              aria-hidden="true">

              <path
                d="M4 16 L16 4 M9 4 H16 V11"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="square"
                stroke-linejoin="miter">
              </path>

            </svg>

          </button>


        </div>



        <footer class="home-footer">

          <span>
            RED RABBIT EXPERIENCE
          </span>

          <span>
            EST. 2026
          </span>

        </footer>


      </section>

    </div>

  `;
}


/* =========================================================
   ENTER RED RABBIT
========================================================= */

function enterRedRabbit() {
  const experience = document.querySelector('.redrabbit-experience');
  if (!experience) return;

  experience.classList.add('entered', 'redrabbit-entering');

  // Let the entrance transition finish, then remove it from the layout.
  window.setTimeout(() => {
    const entrance = experience.querySelector('.redrabbit-entrance');
    if (entrance) {
      entrance.setAttribute('aria-hidden', 'true');
      entrance.style.display = 'none';
    }
    experience.classList.remove('redrabbit-entering');
  }, 800);
}

function backToCafe() {

  const main = document.querySelector('.redrabbit-main');

  if (main) {
    main.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    return;
  }

  // If the main café section no longer exists,
  // rebuild the experience first.
  showHome();

  setTimeout(() => {

    const newMain =
      document.querySelector('.redrabbit-main');

    if (newMain) {

      newMain.scrollIntoView({
        behavior: 'instant',
        block: 'start'
      });

    }

  }, 50);
}

/* =========================================================
   NAME PAGE
========================================================= */

function showNamePage() {

  const saved = localStorage.getItem('playerName') || '';

  document.getElementById('app').innerHTML = `

    <div class="name-page">

      <div class="name-card">

        <span class="name-eyebrow">
          COFFEE QUIZ
        </span>

        <h2>
          What's your<br>
          <em>name?</em>
        </h2>

        <p>
          Let's make it personal.
        </p>

        <input
          id="name"
          type="text"
          placeholder="Your name"
          value="${saved}"
          autocomplete="off"
        >

        <button
          class="name-continue"
          onclick="startQuiz()">

          CONTINUE

        </button>

      </div>

    </div>
  `;
}


/* =========================================================
   QUESTION
========================================================= */

function showQuestion() {

  const q = questions[current];

  const shuffledOptions =
    shuffle(Object.entries(q.options));

  document.getElementById('app').innerHTML = `

    <div class="quiz-brand">
      <span>RED RABBIT</span>
      <small>CAFÉ</small>
    </div>

    <div class="progress-text">
      ${current + 1}/${TOTAL_QUESTIONS}
    </div>

    <div class="countdown">
      <div id="countdown-bar"></div>
    </div>

    <h3>
      ${q.question}
    </h3>

    <div id="options"></div>

  `;

  const optionsContainer =
    document.getElementById('options');

  const labels = ["A", "B", "C", "D"];

  shuffledOptions.forEach(
    ([key, value], index) => {

      optionsContainer.innerHTML += `

        <button
          data-key="${key}"
          onclick="checkAnswer('${key}', this)">

          <strong>
            ${labels[index]}
          </strong>

          ${value}

        </button>

      `;

    }
  );

  showToast(
    randomItem(quizComments)
  );

  startTimer();
}


/* =========================================================
   RESULT
========================================================= */

function showResult() {

  console.log(
    "FINAL SCORE =",
    score
  );

  console.log(
    "TOTAL QUESTIONS =",
    TOTAL_QUESTIONS
  );


  localStorage.removeItem(
    'quizState'
  );


  attempts++;

  savePlay();


  const now =
    new Date();


  const timeString =
    now.toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    );


  const dateString =
    now.toLocaleDateString(
      [],
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    );


  const timeStampHTML = `

    <div
      style="
        font-size:12px;
        color:var(--text-light);
        margin-top:20px;
        font-weight:500;
      ">

      ${dateString}
      at
      ${timeString}

    </div>

  `;


  /* ================================================
     PERFECT SCORE
  ================================================= */

  if (score === TOTAL_QUESTIONS) {

    localStorage.removeItem(
      'quizInProgress'
    );


    localStorage.setItem(
      'nextPlay',
      Date.now() + (10 * 1000)
    );


    document.getElementById('app').innerHTML = `

    <div class="result-screen">
      <h2>
        🏆 Coffee Master
      </h2>


      <div class="reward">
        Challenge Complete 🎉
      </div>


      <p>
        You passed today's challenge.
      </p>


      <p style="margin-top:10px;">

        Rewards aren't live just yet —
        we're currently testing and fine-tuning
        the experience.

      </p>


      <p style="margin-top:10px;">

        Keep sharpening your coffee knowledge ☕

      </p>


      <div id="timer"></div>


      ${timeStampHTML}

</div>

    `;


    startCooldownTimer();

    return;
  }


  /* ================================================
     RETRY
  ================================================= */

  if (attempts < MAX_ATTEMPTS) {

    document.getElementById('app').innerHTML = `
<div class="result-screen">

      <h2>
        Challenge Complete
      </h2>


      <div class="reward">
        ${score}/${TOTAL_QUESTIONS}
      </div>


      <p>
        ${randomItem(retryMessages)}
      </p>


      <button
        onclick="retryQuiz()">

        Try Again

      </button>

      </div>
    `;

    return;
  }


  /* ================================================
     LOCKED OUT
  ================================================= */

  localStorage.setItem(
    'nextPlay',
    Date.now() + (10 * 1000)
  );


  document.getElementById('app').innerHTML = `

    <h2>
      Challenge Complete
    </h2>


    <div class="reward">
      ${score}/${TOTAL_QUESTIONS}
    </div>


    <p>
      ${randomItem(failMessages)}
    </p>


    <div id="timer"></div>


    ${timeStampHTML}

  `;


  startCooldownTimer();
}


/* =========================================================
   COOLDOWN
========================================================= */

function showCooldown() {

  document.getElementById('app').innerHTML = `

    <h2>
      See you soon 👋
    </h2>


    <p>
      Fresh questions unlock shortly.
    </p>


    <div id="timer"></div>

  `;


  startCooldownTimer();
}


/* =========================================================
   GAMES
========================================================= */

function showGames() {

  document.getElementById('app').innerHTML = `

    <div class="games-page">


      <!-- BACK -->

      <button
  class="back-button"
  onclick="backToCafe()">

  ← Back

</button>



      <!-- HEADER -->

      <div class="games-heading">

        <span>
          RED RABBIT PLAYGROUND
        </span>


        <h1>
          Choose your<br>
          <em>challenge.</em>
        </h1>


        <p>
          A little competition makes<br>
          the coffee taste better.
        </p>

      </div>



      <div class="games-list">


        <!-- ==========================================
             COFFEE QUIZ
        =========================================== -->

        <button
          class="game-entry quiz-entry"
          onclick="selectGame('quiz')">


          <div class="game-entry-top">

            <span>
              01 / CLASSIC
            </span>

            <span>
              ~5 MIN
            </span>

          </div>


          <div class="game-entry-icon">
            ☕
          </div>


          <h2>
            Coffee Quiz
          </h2>


          <p>
            Eight questions.<br>
            One perfect score.
          </p>


          <div class="game-entry-action">

            PLAY QUIZ


            <svg
              class="game-action-arrow"
              viewBox="0 0 20 20"
              aria-hidden="true">

              <path
                d="M4 16 L16 4 M9 4 H16 V11"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="square"
                stroke-linejoin="miter">
              </path>

            </svg>

          </div>


        </button>



        <!-- ==========================================
             THE PERFECT POUR
        =========================================== -->

        <button
          class="game-entry pour-entry"
          onclick="selectGame('pour')">


          <div class="game-entry-top">

            <span>
              02 / NEW
            </span>

            <span>
              ~4 MIN
            </span>

          </div>


          <div class="game-entry-icon pour-icon">
            ☕
          </div>


          <h2>
            The Perfect Pour
          </h2>


          <p>
            Think fast.<br>
            Crack the final lock.
          </p>


          <div class="game-entry-action">

            TRY YOUR POUR


            <svg
              class="game-action-arrow"
              viewBox="0 0 20 20"
              aria-hidden="true">

              <path
                d="M4 16 L16 4 M9 4 H16 V11"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="square"
                stroke-linejoin="miter">
              </path>

            </svg>

          </div>


        </button>


      </div>

    </div>

  `;
}


/* =========================================================
   GAME SELECTION
========================================================= */

function selectGame(game) {

  selectedGame =
    game;


  const cards =
    document.querySelectorAll(
      '.game-entry'
    );


  cards.forEach(card => {

    const isSelected =

      (
        game === 'quiz' &&
        card.classList.contains(
          'quiz-entry'
        )
      )

      ||

      (
        game === 'pour' &&
        card.classList.contains(
          'pour-entry'
        )
      );


    if (isSelected) {

      card.classList.add(
        'game-active'
      );

    } else {

      card.classList.add(
        'game-dismiss'
      );

    }

  });


  const gamesPage =
    document.querySelector(
      '.games-page'
    );


  if (gamesPage) {

    gamesPage.classList.add(
      'games-transition'
    );

  }


  setTimeout(() => {

    if (game === 'quiz') {

      showNamePage();

    }


    if (game === 'pour') {

      showComingSoon();

    }

  }, 700);
}

function showComingSoon() {

    document.getElementById('app').innerHTML = `

        <div class="coming-soon-page">

            <button class="back-button" onclick="showGames()">
                ← Back
            </button>

            <div class="coming-soon-content">

                <div class="coming-soon-icon">
                    🔒
                </div>

                <h1>THE PERFECT POUR</h1>

                <p>
                    Something new is being brewed.
                </p>

                <span>
                    COMING SOON
                </span>

            </div>

        </div>

    `;
}

/* ============================================
   RED RABBIT — PREMIUM DIGITAL MENU
============================================ */

function showMenu() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <main class="rr-menu-page">

            <button class="rr-menu-back" onclick="showHome()">
                <span>←</span> Back
            </button>

            <header class="rr-menu-hero">
                <span class="rr-menu-eyebrow">RED RABBIT CAFÉ</span>

                <h1>Our <em>Menu</em></h1>

                <p></p>
            </header>

            <nav class="rr-menu-categories" aria-label="Menu categories">
                <button class="active" data-category="combos"
                    onclick="scrollToMenuCategory('combos', this)">Combos</button>

                <button data-category="iced-tea"
                    onclick="scrollToMenuCategory('iced-tea', this)">Iced Tea</button>

                <button data-category="mojitos"
                    onclick="scrollToMenuCategory('mojitos', this)">Mojitos</button>

                <button data-category="shakes"
                    onclick="scrollToMenuCategory('shakes', this)">Thick Shakes</button>

                <button data-category="slushies"
                    onclick="scrollToMenuCategory('slushies', this)">Slushies</button>

                <button data-category="coffee"
                    onclick="scrollToMenuCategory('coffee', this)">Coffee</button>

                <button data-category="pasta"
                    onclick="scrollToMenuCategory('pasta', this)">Pasta</button>

                <button data-category="burgers"
                    onclick="scrollToMenuCategory('burgers', this)">Burgers</button>

                <button data-category="snacks"
                    onclick="scrollToMenuCategory('snacks', this)">Snacks</button>

                <button data-category="salads"
                    onclick="scrollToMenuCategory('salads', this)">Salads</button>

                <button data-category="maggie"
                    onclick="scrollToMenuCategory('maggie', this)">Maggie</button>

                <button data-category="sandwiches"
                    onclick="scrollToMenuCategory('sandwiches', this)">Sandwiches</button>

                <button data-category="omelettes"
                    onclick="scrollToMenuCategory('omelettes', this)">Omelettes</button>

                <button data-category="desserts"
                    onclick="scrollToMenuCategory('desserts', this)">Desserts</button>
            </nav>

            <div class="rr-menu-content">

                <section id="combos" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>01 / COMBOS</span>
                        <h2>Combo <em>Deals</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Burger + Fries + Mojito</span><strong>₹169</strong></div>
                    <div class="rr-menu-item"><span>Chicken Burger Combo</span><strong>₹189</strong></div>
                    <div class="rr-menu-item"><span>Veg Sandwich + Shake</span><strong>₹179</strong></div>
                    <div class="rr-menu-item"><span>Maggi + Shake</span><strong>₹149</strong></div>
                    <div class="rr-menu-item"><span>Fries + Mojito</span><strong>₹119</strong></div>
                </section>

                <section id="iced-tea" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>02 / REFRESHERS</span>
                        <h2>Iced <em>Teas</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Green Apple Iced Tea</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Blueberry Iced Tea</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Kiwi Iced Tea</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Strawberry Iced Tea</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Peach Iced Tea</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Lemon Iced Tea</span><strong>—</strong></div>
                </section>

                <section id="mojitos" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>03 / FRESH & FIZZY</span>
                        <h2>Our <em>Mojitos</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Strawberry Mojito</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Blueberry Mojito</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Green Apple Mojito</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Peach Mojito</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Passion Fruit Mojito</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Basil Orange Mojito</span><strong>—</strong></div>
                </section>

                <section id="shakes" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>04 / SOMETHING CREAMY</span>
                        <h2>Thick <em>Shakes</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Nutella Thick Shake</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Blueberry Shake</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Strawberry Shake</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Almond Banana Shake</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Mango Shake</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Oreo Shake</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>KitKat Shake</span><strong>—</strong></div>
                </section>

                <section id="slushies" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>05 / ICE COLD</span>
                        <h2>Fruit <em>Slushies</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Blueberry Slushie</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Strawberry Slushie</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Kiwi Slushie</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Green Apple Slushie</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Mango Slushie</span><strong>—</strong></div>
                </section>

                <section id="coffee" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>06 / COFFEE BAR</span>
                        <h2>Iced <em>Coffee</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Iced Americano</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Orange Espresso</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Café Latte</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Cranberry Espresso</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Iced Mocha</span><strong>—</strong></div>
                </section>

                <section id="pasta" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>07 / COMFORT FOOD</span>
                        <h2>Past<span class="rr-heading-plain">a</span> <em>Love</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>White Sauce Pasta</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Chicken White Sauce Pasta</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Red Sauce Pasta</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Chicken Red Sauce Pasta</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Aglio Olio</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Aglio Olio Chicken</span><strong>—</strong></div>
                </section>

                <section id="burgers" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>08 / HANDHELD FAVOURITES</span>
                        <h2>The <em>Burgers</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Veg Classic Burger</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Paneer Burger</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Peri Peri Burger</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Japanese Burger</span><strong>—</strong></div>
                </section>

                <section id="snacks" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>09 / LITTLE CRAVINGS</span>
                        <h2>Snack <em>Bites</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Paneer Bites</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>French Fries (Salted)</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>French Fries (Peri Peri)</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Potato Wedges</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Salted Potato Wedges</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Chicken Popcorn</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Crispy Chicken</span><strong>—</strong></div>
                </section>

                <section id="salads" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>10 / FRESH & LIGHT</span>
                        <h2>Garden <em>Bowls</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Caesar Salad (Veg / Non-Veg)</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Greek Salad</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Maize Salad</span><strong>—</strong></div>
                </section>

                <section id="maggie" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>11 / QUICK BITES</span>
                        <h2>Maggi <em>Corner</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Veg Classic Maggi</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Fried Egg Maggi</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Veg Cheese Maggi</span><strong>—</strong></div>
                </section>

                <section id="sandwiches" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>12 / TOASTED & TASTY</span>
                        <h2>Sandwiches</h2>
                    </div>

                    <div class="rr-menu-item"><span>Veg Sandwich</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Chicken Sandwich</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Paneer Sandwich</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Cucumber Cheese Sandwich</span><strong>—</strong></div>
                </section>

                <section id="omelettes" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>13 / BREAKFAST FAVOURITES</span>
                        <h2>Bread <em>Omelettes</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Basic Bread Omelette</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Butter Bread Omelette</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Double Egg Bread Omelette</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Cheese Bread Omelette</span><strong>—</strong></div>
                </section>

                <section id="desserts" class="rr-menu-category">
                    <div class="rr-category-heading">
                        <span>14 / SOMETHING SWEET</span>
                        <h2>Sweet <em>Finishes</em></h2>
                    </div>

                    <div class="rr-menu-item"><span>Brownie</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Brownie with Ice Cream</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Chocolate Loaded Brownie</span><strong>—</strong></div>
                    <div class="rr-menu-item"><span>Cheesecake</span><strong>—</strong></div>
                </section>

            </div>

            <footer class="rr-menu-footer">
                <span>RED RABBIT EXPERIENCE</span>
                <span>GOOD FOOD. GOOD MOOD.</span>
            </footer>

        </main>
    `;

    window.scrollTo(0, 0);
}

function scrollToMenuCategory(categoryId, button) {
    const category = document.getElementById(categoryId);

    if (!category) return;

    document.querySelectorAll(".rr-menu-categories button").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
        button.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }

    category.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}