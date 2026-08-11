/* =====================================================
   MOTHER'S DAY MEMORY BOOK
   12 AUGUST 2026
===================================================== */


/* =====================================================
   GET ELEMENTS
===================================================== */

const pages =
    document.querySelectorAll(".page");

const music =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");

const envelope =
    document.getElementById("envelope");

const openLetterButton =
    document.getElementById(
        "openLetterButton"
    );

const startButton =
    document.getElementById(
        "startButton"
    );

const giftBox =
    document.getElementById(
        "giftBox"
    );

const finalMessage =
    document.getElementById(
        "finalMessage"
    );

const timelineButton =
    document.getElementById(
        "timelineButton"
    );

const albumButton =
    document.getElementById(
        "albumButton"
    );


/* =====================================================
   PAGE SYSTEM
===================================================== */

function showPage(pageId) {

    pages.forEach(page => {

        page.classList.remove(
            "active"
        );

    });


    const target =
        document.getElementById(
            pageId
        );


    if (!target) {

        return;

    }


    target.classList.add(
        "active"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   MUSIC
===================================================== */

/*
    สำคัญ:

    เพลงจะเริ่มจากการกด
    "เปิดจดหมายจากลูก"

    เพราะมือถือจะยอมให้เพลงเล่น
    หลังจากผู้ใช้มี interaction
*/


function startMusic() {

    music.volume = 0.4;


    const playPromise =
        music.play();


    if (
        playPromise !== undefined
    ) {

        playPromise
            .then(() => {

                musicButton.textContent =
                    "🔊";

            })

            .catch(() => {

                musicButton.textContent =
                    "🔇";

            });

    }

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

musicButton.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();


        if (
            music.paused
        ) {

            music.play()
                .then(() => {

                    musicButton.textContent =
                        "🔊";

                })
                .catch(() => {

                    musicButton.textContent =
                        "🔇";

                });

        }

        else {

            music.pause();

            musicButton.textContent =
                "🔇";

        }

    }
);


/* =====================================================
   OPEN LETTER
===================================================== */

let letterOpened = false;


function openLetter() {

    if (letterOpened) {

        return;

    }


    letterOpened = true;


    /*
       ต้องเรียก play()
       จากการกดของผู้ใช้โดยตรง
    */

    startMusic();


    envelope.classList.add(
        "open"
    );


    createHearts();


    setTimeout(
        function() {

            showPage(
                "pageIntro"
            );

        },
        1000
    );

}


openLetterButton.addEventListener(
    "click",
    openLetter
);


/* =====================================================
   INTRO
===================================================== */

startButton.addEventListener(
    "click",
    function() {

        showPage(
            "pageMessage1"
        );

    }
);


/* =====================================================
   MESSAGE SYSTEM
===================================================== */

const messageButtons =
    document.querySelectorAll(
        ".message-button"
    );


messageButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const number =
                    button.dataset.message;


                const content =
                    document.getElementById(
                        "messageContent" +
                        number
                    );


                if (!content) {

                    return;

                }


                /*
                   เปิดข้อความ
                */

                content.style.animation =
                    "reveal .7s ease";


                createHearts();


                /*
                   เปลี่ยนปุ่ม
                */

                button.textContent =
                    "💙 อ่านแล้ว";


                button.disabled =
                    true;


                button.style.opacity =
                    "0.65";


                /*
                   แสดงปุ่มหน้าต่อไป
                */

                const next =
                    button.parentElement
                        .querySelector(
                            ".next-button"
                        );


                if (next) {

                    setTimeout(
                        function() {

                            next.classList.remove(
                                "hidden"
                            );

                        },
                        500
                    );

                }

            }
        );

    }
);


/* =====================================================
   NEXT PAGE
===================================================== */

const nextButtons =
    document.querySelectorAll(
        ".next-button"
    );


nextButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const nextPage =
                    button.dataset.next;


                showPage(
                    nextPage
                );

            }
        );

    }
);


/* =====================================================
   GIFT
===================================================== */

let giftOpened = false;


giftBox.addEventListener(
    "click",
    function() {

        if (giftOpened) {

            return;

        }


        giftOpened = true;


        giftBox.style.animation =
            "none";


        giftBox.style.transform =
            "scale(1.15) rotate(-5deg)";


        createHearts();

        createConfetti();


        setTimeout(
            function() {

                giftBox.style.display =
                    "none";


                finalMessage.classList.remove(
                    "hidden"
                );


                setTimeout(
                    function() {

                        timelineButton.classList.remove(
                            "hidden"
                        );

                    },
                    500
                );

            },
            600
        );

    }
);


/* =====================================================
   TIMELINE
===================================================== */

timelineButton.addEventListener(
    "click",
    function() {

        showPage(
            "pageTimeline"
        );


        createHearts();

    }
);


/* =====================================================
   ALBUM
===================================================== */

albumButton.addEventListener(
    "click",
    function() {

        showPage(
            "pageAlbum"
        );


        createConfetti();

        createHearts();

    }
);


/* =====================================================
   HEART EFFECT
===================================================== */

function createHearts() {

    const symbols = [
        "💙",
        "🤍",
        "♡",
        "✦"
    ];


    for (
        let i = 0;
        i < 14;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.className =
            "effect-heart";


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
            (
                55 +
                Math.random() * 35
            ) +
            "vh";


        heart.style.setProperty(
            "--moveX",
            (
                Math.random() * 160 -
                80
            ) +
            "px"
        );


        document.body.appendChild(
            heart
        );


        setTimeout(
            function() {

                heart.remove();

            },
            1600
        );

    }

}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const symbols = [
        "💙",
        "♡",
        "🌷",
        "✦",
        "🤍"
    ];


    for (
        let i = 0;
        i < 30;
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
            "9999";

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
                12 +
                Math.random() * 14
            ) +
            "px";


        const duration =
            1800 +
            Math.random() * 1200;


        item.animate(

            [

                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        "translateY(110vh) rotate(720deg)",

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


        document.body.appendChild(
            item
        );


        setTimeout(
            function() {

                item.remove();

            },
            duration + 100
        );

    }

}
