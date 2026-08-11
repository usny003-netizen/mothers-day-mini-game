/* =========================================
   MOTHER'S DAY
   MEMORY BOOK
   12 AUGUST 2026
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const pages =
    document.querySelectorAll(".page");

const music =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");

const envelope =
    document.getElementById("envelope");

const openEnvelope =
    document.getElementById("openEnvelope");


/* =========================================
   PAGE SYSTEM
========================================= */

function showPage(id) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const page =
        document.getElementById(id);

    if (!page) return;


    page.classList.add("active");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   MUSIC
========================================= */

let musicPlaying = false;


function startMusic() {

    music.volume = 0.35;


    music.play()

        .then(() => {

            musicPlaying = true;

            musicButton.textContent =
                "♫";

        })

        .catch(() => {

            console.log(
                "Browser blocked music."
            );

        });

}


musicButton.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music.play();

            musicPlaying = true;

            musicButton.textContent =
                "♫";

        } else {

            music.pause();

            musicPlaying = false;

            musicButton.textContent =
                "♪";

        }

    }
);


/* =========================================
   OPEN ENVELOPE
========================================= */

function openLetter() {

    if (
        envelope.classList.contains("open")
    ) {

        return;

    }


    envelope.classList.add("open");


    /* เริ่มเพลงหลังจากการคลิก */

    startMusic();


    createHearts();


    setTimeout(() => {

        showPage("introPage");

    }, 1300);

}


openEnvelope.addEventListener(
    "click",
    openLetter
);

envelope.addEventListener(
    "click",
    openLetter
);


/* =========================================
   START MEMORY
========================================= */

document
    .getElementById("startMemory")
    .addEventListener(
        "click",
        () => {

            showPage("message1");

        }
    );


/* =========================================
   MESSAGE REVEAL
========================================= */

const messageButtons =
    document.querySelectorAll(
        ".open-message"
    );


messageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const target =
                button.dataset.target;


            const message =
                document.querySelector(
                    `.secret-message[data-message="${target}"]`
                );


            if (!message) return;


            message.classList.add("show");


            button.style.display =
                "none";


            const next =
                button.parentElement
                    .querySelector(
                        ".next-button"
                    );


            if (next) {

                setTimeout(() => {

                    next.classList.remove(
                        "hidden"
                    );

                }, 900);

            }


            createHearts();

        }
    );

});


/* =========================================
   NEXT BUTTONS
========================================= */

const nextButtons =
    document.querySelectorAll(
        ".next-button"
    );


nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const nextPage =
                button.dataset.next;


            showPage(nextPage);

        }
    );

});


/* =========================================
   SECRET GIFT
========================================= */

const gift =
    document.getElementById("gift");

const secretText =
    document.getElementById("secretText");

const timelineButton =
    document.getElementById(
        "timelineButton"
    );


let giftOpened = false;


gift.addEventListener(
    "click",
    () => {

        if (giftOpened) return;


        giftOpened = true;


        const box =
            gift.querySelector(
                ".gift-box"
            );


        box.style.transform =
            "scale(1.15) rotate(-5deg)";


        createHearts();

        createConfetti();


        setTimeout(() => {

            secretText.classList.remove(
                "hidden"
            );


            timelineButton.classList.remove(
                "hidden"
            );


            gift.style.display =
                "none";

        }, 700);

    }
);


/* =========================================
   TIMELINE
========================================= */

timelineButton.addEventListener(
    "click",
    () => {

        showPage("timelinePage");

        createHearts();

    }
);


/* =========================================
   ALBUM
========================================= */

document
    .getElementById("albumButton")
    .addEventListener(
        "click",
        () => {

            showPage("albumPage");

            createConfetti();

        }
    );


/* =========================================
   HEART EFFECT
========================================= */

function createHearts() {

    const symbols = [
        "💙",
        "♡",
        "🤍",
        "✦"
    ];


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.className =
            "heart-effect";


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.left =
            Math.random() *
            100 +
            "vw";


        heart.style.top =
            65 +
            Math.random() *
            25 +
            "vh";


        heart.style.setProperty(
            "--x",
            (
                Math.random() * 160 -
                80
            ) +
            "px"
        );


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 1600);

    }

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols = [
        "💙",
        "♡",
        "✦",
        "🌷",
        "🤍"
    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        item.style.position =
            "fixed";

        item.style.zIndex =
            "999";

        item.style.pointerEvents =
            "none";

        item.style.left =
            Math.random() *
            100 +
            "vw";

        item.style.top =
            "-30px";

        item.style.fontSize =
            (
                10 +
                Math.random() * 15
            ) +
            "px";


        document.body.appendChild(
            item
        );


        const duration =
            1800 +
            Math.random() * 1600;


        item.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `
                        translateY(110vh)
                        rotate(720deg)
                        `,

                    opacity: 0
                }
            ],

            {
                duration:
                    duration,

                easing:
                    "linear"
            }

        );


        setTimeout(() => {

            item.remove();

        }, duration + 100);

    }

}
