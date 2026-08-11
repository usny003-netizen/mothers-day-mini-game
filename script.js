/* =====================================================
   MOTHER'S DAY MINI GAME V3
===================================================== */


/* =====================================================
   SCREENS
===================================================== */

const screens = {

    start:
        document.getElementById(
            "scene-start"
        ),

    tree:
        document.getElementById(
            "scene-tree"
        ),

    wheel:
        document.getElementById(
            "scene-wheel"
        ),

    hug:
        document.getElementById(
            "scene-hug"
        ),

    kiss:
        document.getElementById(
            "scene-kiss"
        ),

    love:
        document.getElementById(
            "scene-love"
        ),

    food:
        document.getElementById(
            "scene-food"
        ),

    travel:
        document.getElementById(
            "scene-travel"
        ),

    gallery:
        document.getElementById(
            "scene-gallery"
        ),

    gift:
        document.getElementById(
            "scene-gift"
        ),

    final:
        document.getElementById(
            "scene-final"
        )

};


let currentScene =
    "start";


/* =====================================================
   SCENE CHANGE
===================================================== */

function showScene(name) {

    Object.values(
        screens
    ).forEach(
        screen => {

            screen.classList.remove(
                "active"
            );

            screen.classList.remove(
                "enter"
            );

        }
    );


    const flash =
        document.getElementById(
            "sceneFlash"
        );


    flash.classList.remove(
        "play"
    );


    void flash.offsetWidth;


    flash.classList.add(
        "play"
    );


    setTimeout(
        () => {

            screens[name]
                .classList.add(
                    "active"
                );


            void screens[name]
                .offsetWidth;


            screens[name]
                .classList.add(
                    "enter"
                );


            currentScene =
                name;

        },
        220
    );

}


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById(
        "bgMusic"
    );


const musicBtn =
    document.getElementById(
        "musicBtn"
    );


let musicPlaying =
    false;


musicBtn.addEventListener(
    "click",
    () => {

        if (
            musicPlaying
        ) {

            music.pause();

            musicBtn.textContent =
                "🔇";

            musicPlaying =
                false;

        } else {

            music.play()
                .then(
                    () => {

                        musicBtn.textContent =
                            "🎵";

                        musicPlaying =
                            true;

                    }
                )
                .catch(
                    () => {

                        alert(
                            "แตะหน้าจอก่อนเพื่อเปิดเพลงนะ 💙"
                        );

                    }
                );

        }

    }
);


/* =====================================================
   START
===================================================== */

document
    .getElementById(
        "startBtn"
    )
    .addEventListener(
        "click",
        () => {

            music.play()
                .then(
                    () => {

                        musicPlaying =
                            true;

                        musicBtn.textContent =
                            "🎵";

                    }
                )
                .catch(
                    () => {}
                );


            showScene(
                "tree"
            );

        }
    );


/* =====================================================
   TREE
===================================================== */

let waterCount =
    0;


const jasmine =
    document.getElementById(
        "jasmine"
    );


const waterBtn =
    document.getElementById(
        "waterBtn"
    );


const treeNextBtn =
    document.getElementById(
        "treeNextBtn"
    );


const waterCountText =
    document.getElementById(
        "waterCount"
    );


const treeMessage =
    document.getElementById(
        "treeMessage"
    );


const treeMessages = [

    "เมล็ดเล็ก ๆ กำลังรอความรักจากแม่ 🤍",

    "ได้รับน้ำแล้ว 💧 ต้นมะลิเริ่มเติบโต",

    "ดูสิ...ใบใหม่กำลังโต 🌿",

    "ต้นมะลิโตขึ้นแล้ว 🌿",

    "ใกล้จะออกดอกแล้วนะ 🌼",

    "🌼 มะลิบานแล้ว เพราะได้รับความรักจากแม่ 🤍"

];


waterBtn.addEventListener(
    "click",
    waterTree
);


function waterTree() {

    if (
        waterCount >= 5
    ) {

        return;

    }


    waterCount++;


    jasmine.className =
        `jasmine stage${waterCount}`;


    jasmine.classList.add(
        "watered"
    );


    setTimeout(
        () => {

            jasmine.classList.remove(
                "watered"
            );

        },
        700
    );


    waterCountText.textContent =
        `รดน้ำ ${waterCount} / 5 ครั้ง`;


    treeMessage.innerHTML =
        treeMessages[
            waterCount
        ];


    createWaterSplash();


    if (
        waterCount >= 4
    ) {

        const flowers =
            document.querySelectorAll(
                ".jasmine-flower"
            );


        flowers.forEach(
            (
                flower,
                index
            ) => {

                setTimeout(
                    () => {

                        flower.classList.add(
                            "bloom"
                        );

                    },
                    index * 180
                );

            }
        );

    }


    if (
        waterCount === 5
    ) {

        waterBtn.classList.add(
            "hidden"
        );


        treeNextBtn.classList.remove(
            "hidden"
        );


        createHearts(
            20
        );

    }

}


function createWaterSplash() {

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const drop =
            document.createElement(
                "div"
            );


        drop.textContent =
            "💧";


        drop.style.position =
            "fixed";


        drop.style.zIndex =
            "9999";


        drop.style.pointerEvents =
            "none";


        drop.style.fontSize =
            "24px";


        drop.style.left =
            (
                window.innerWidth / 2
                +
                Math.random() * 180
                -
                90
            )
            + "px";


        drop.style.top =
            "40%";


        document.body.appendChild(
            drop
        );


        const animation =
            drop.animate(
                [
                    {
                        transform:
                            "translateY(0) scale(.5)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translate(
                                ${Math.random() * 100 - 50}px,
                                100px
                            ) scale(1)`,
                        opacity: 0
                    }
                ],
                {
                    duration:
                        900,
                    easing:
                        "ease-out"
                }
            );


        animation.onfinish =
            () => {

                drop.remove();

            };

    }

}


treeNextBtn.addEventListener(
    "click",
    () => {

        showScene(
            "wheel"
        );

        drawWheel();

    }
);


/* =====================================================
   WHEEL
===================================================== */

const canvas =
    document.getElementById(
        "wheel"
    );


const ctx =
    canvas.getContext(
        "2d"
    );


const wheelOptions = [

    "กอดแม่ 🤗",

    "จุ๊บแม่ 😘",

    "บอกรักแม่ ❤️",

    "พาแม่กินข้าว 🍚",

    "พาแม่เที่ยว 🚗",

    "แม่เลือกเอง 🌼"

];


let wheelRotation =
    0;


let spinning =
    false;


function drawWheel() {

    const center =
        canvas.width / 2;


    const radius =
        center - 8;


    const slice =
        (
            Math.PI * 2
        )
        /
        wheelOptions.length;


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    wheelOptions.forEach(
        (
            option,
            index
        ) => {

            const start =
                index * slice;


            const end =
                start + slice;


            ctx.beginPath();


            ctx.moveTo(
                center,
                center
            );


            ctx.arc(
                center,
                center,
                radius,
                start,
                end
            );


            ctx.closePath();


            ctx.fillStyle =
                [
                    "#FFE5EC",
                    "#FFF1C7",
                    "#DDF5E8",
                    "#DDF2FF",
                    "#EDE4FF",
                    "#FFE9D5"
                ][index];


            ctx.fill();


            ctx.strokeStyle =
                "#FFFFFF";


            ctx.lineWidth =
                3;


            ctx.stroke();


            ctx.save();


            ctx.translate(
                center,
                center
            );


            ctx.rotate(
                start
                +
                slice / 2
            );


            ctx.textAlign =
                "right";


            ctx.textBaseline =
                "middle";


            ctx.fillStyle =
                "#527083";


            ctx.font =
                "bold 13px sans-serif";


            ctx.fillText(
                option,
                radius - 15,
                0
            );


            ctx.restore();

        }
    );


    ctx.beginPath();


    ctx.arc(
        center,
        center,
        25,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#FFFFFF";


    ctx.fill();


    ctx.strokeStyle =
        "#D6EAF3";


    ctx.stroke();

}


drawWheel();


document
    .getElementById(
        "spinBtn"
    )
    .addEventListener(
        "click",
        spinWheel
    );


function spinWheel() {

    if (
        spinning
    ) {

        return;

    }


    spinning =
        true;


    const wheelArea =
        document.querySelector(
            ".wheel-area"
        );


    wheelArea.classList.add(
        "spinning"
    );


    const extra =
        5 +
        Math.floor(
            Math.random() * 4
        );


    const randomAngle =
        Math.random()
        * 360;


    const finalRotation =
        wheelRotation
        +
        extra * 360
        +
        randomAngle;


    wheelRotation =
        finalRotation;


    canvas.style.transition =
        "transform 4s cubic-bezier(.12,.8,.15,1)";


    canvas.style.transform =
        `rotate(${finalRotation}deg)`;


    setTimeout(
        () => {

            spinning =
                false;


            wheelArea.classList.remove(
                "spinning"
            );


            const normalized =
                (
                    finalRotation % 360
                    + 360
                )
                % 360;


            const index =
                Math.floor(
                    (
                        360
                        -
                        normalized
                        +
                        30
                    )
                    % 360
                    /
                    (
                        360 /
                        wheelOptions.length
                    )
                );


            const result =
                wheelOptions[
                    index
                ];


            const resultBox =
                document.getElementById(
                    "wheelResult"
                );


            resultBox.classList.remove(
                "hidden"
            );


            resultBox.innerHTML = `
                🎉 <strong>ภารกิจที่ได้คือ</strong><br><br>
                <span style="font-size:22px">
                    ${result}
                </span>
                <br><br>
                <button
                    class="main-btn"
                    onclick="nextFromWheel()"
                >
                    💙 ทำภารกิจ
                </button>
            `;


            createConfetti();

        },
        4200
    );

}


function nextFromWheel() {

    showScene(
        "hug"
    );

}


/* =====================================================
   HUG
===================================================== */

document
    .getElementById(
        "hugBtn"
    )
    .addEventListener(
        "click",
        () => {

            createHearts(
                25
            );


            document
                .getElementById(
                    "hugHeart"
                )
                .textContent =
                "💖";


            setTimeout(
                () => {

                    showScene(
                        "kiss"
                    );

                },
                1500
            );

        }
    );


/* =====================================================
   KISS
===================================================== */

let kissCount =
    0;


document
    .getElementById(
        "kissBtn"
    )
    .addEventListener(
        "click",
        () => {

            kissCount++;


            if (
                kissCount === 1
            ) {

                document
                    .getElementById(
                        "kissLeft"
                    )
                    .classList.add(
                        "show"
                    );

            }


            if (
                kissCount === 2
            ) {

                document
                    .getElementById(
                        "kissRight"
                    )
                    .classList.add(
                        "show"
                    );


                document
                    .getElementById(
                        "kissText"
                    )
                    .innerHTML =
                    "😘 จุ๊บครบ 2 แก้มแล้ว!";


                createHearts(
                    15
                );


                setTimeout(
                    () => {

                        showScene(
                            "love"
                        );

                        startTyping();

                    },
                    1400
                );

            }

        }
    );


/* =====================================================
   LOVE
===================================================== */

const loveText =
    "แม่คือคนสำคัญที่สุดคนหนึ่งในชีวิตลูก... ขอบคุณที่อยู่ข้างลูกเสมอ ไม่ว่าจะวันไหน ลูกก็รักแม่นะ ❤️";


let typingStarted =
    false;


function startTyping() {

    if (
        typingStarted
    ) {

        return;

    }


    typingStarted =
        true;


    const target =
        document.getElementById(
            "loveTyping"
        );


    let index =
        0;


    function type() {

        if (
            index <
            loveText.length
        ) {

            target.textContent +=
                loveText[index];


            index++;


            setTimeout(
                type,
                55
            );

        }

    }


    type();

}


document
    .getElementById(
        "loveBtn"
    )
    .addEventListener(
        "click",
        () => {

            createHearts(
                30
            );


            setTimeout(
                () => {

                    showScene(
                        "food"
                    );

                },
                800
            );

        }
    );


/* =====================================================
   FOOD
===================================================== */

const foodItems =
    document.querySelectorAll(
        ".food-item"
    );


const foodResult =
    document.getElementById(
        "foodResult"
    );


foodItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                const food =
                    item.querySelector(
                        "span"
                    ).textContent;


                foodResult.innerHTML =
                    `
                    🍚 วันนี้แม่เลือก
                    <strong>${food}</strong>
                    ❤️
                    `;


                createConfetti();


                setTimeout(
                    () => {

                        showScene(
                            "travel"
                        );

                    },
                    1800
                );

            }
        );

    }
);


/* =====================================================
   TRAVEL
===================================================== */

document
    .getElementById(
        "travelBtn"
    )
    .addEventListener(
        "click",
        () => {

            const card =
                document.getElementById(
                    "travelCard"
                );


            card.classList.add(
                "travel"
            );


            createHearts(
                20
            );


            setTimeout(
                () => {

                    showScene(
                        "gallery"
                    );

                },
                1600
            );

        }
    );


/* =====================================================
   GALLERY
===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-img"
    );


const captions = [

    "รูปแรกของเรา 🤍",

    "ความทรงจำดี ๆ ของแม่กับลูก 🌼",

    "มีแม่อยู่ด้วยก็มีความสุขเสมอ 💙",

    "ขอบคุณสำหรับทุกช่วงเวลา ❤️",

    "รักแม่ในทุก ๆ วันนะ 🌼"

];


let galleryIndex =
    0;


document
    .getElementById(
        "galleryNext"
    )
    .addEventListener(
        "click",
        () => {

            galleryImages[
                galleryIndex
            ].classList.remove(
                "active"
            );


            galleryIndex =
                (
                    galleryIndex + 1
                )
                %
                galleryImages.length;


            galleryImages[
                galleryIndex
            ].classList.add(
                "active"
            );


            document
                .getElementById(
                    "galleryCaption"
                )
                .textContent =
                captions[
                    galleryIndex
                ];


            document
                .getElementById(
                    "galleryCounter"
                )
                .textContent =
                `${galleryIndex + 1} / ${galleryImages.length}`;


            if (
                galleryIndex ===
                galleryImages.length - 1
            ) {

                document
                    .getElementById(
                        "galleryNext"
                    )
                    .textContent =
                    "🎁 ไปดูของขวัญ";

            }


            if (
                galleryIndex ===
                0
            ) {

                document
                    .getElementById(
                        "galleryNext"
                    )
                    .textContent =
                    "📸 รูปต่อไป";

            }

        }
    );


/* Double click / last photo */

document
    .getElementById(
        "galleryNext"
    )
    .addEventListener(
        "dblclick",
        () => {

            showScene(
                "gift"
            );

        }
    );


/*
   ให้ปุ่มรูปสุดท้ายไปของขวัญ
*/

const originalGalleryButton =
    document.getElementById(
        "galleryNext"
    );


originalGalleryButton.addEventListener(
    "click",
    () => {

        if (
            galleryIndex ===
            galleryImages.length - 1
        ) {

            setTimeout(
                () => {

                    showScene(
                        "gift"
                    );

                },
                300
            );

        }

    }
);


/* =====================================================
   GIFT HOLD
===================================================== */

const giftBox =
    document.getElementById(
        "giftBox"
    );


const holdText =
    document.getElementById(
        "holdText"
    );


const progressBar =
    document.getElementById(
        "giftProgressBar"
    );


let holdTimer;

let holdStart;

let holding =
    false;


function startHolding(
    event
) {

    event.preventDefault();


    if (
        holding
    ) {

        return;

    }


    holding =
        true;


    holdStart =
        Date.now();


    giftBox.classList.add(
        "holding"
    );


    holdText.textContent =
        "💗 กำลังเปิดของขวัญ...";


    progressBar.style.width =
        "0%";


    holdTimer =
        setInterval(
            updateGiftProgress,
            50
        );

}


function updateGiftProgress() {

    const elapsed =
        Date.now()
        -
        holdStart;


    const percent =
        Math.min(
            (
                elapsed /
                3000
            )
            * 100,
            100
        );


    progressBar.style.width =
        percent + "%";


    if (
        percent >= 100
    ) {

        clearInterval(
            holdTimer
        );


        openGift();

    }

}


function cancelHolding() {

    if (
        !holding
    ) {

        return;

    }


    clearInterval(
        holdTimer
    );


    holding =
        false;


    giftBox.classList.remove(
        "holding"
    );


    progressBar.style.width =
        "0%";


    holdText.textContent =
        "💗 กดค้างที่กล่อง 3 วินาที";

}


giftBox.addEventListener(
    "mousedown",
    startHolding
);


giftBox.addEventListener(
    "mouseup",
    cancelHolding
);


giftBox.addEventListener(
    "mouseleave",
    cancelHolding
);


giftBox.addEventListener(
    "touchstart",
    startHolding,
    {
        passive: false
    }
);


giftBox.addEventListener(
    "touchend",
    cancelHolding
);


function openGift() {

    if (
        !holding
    ) {

        return;

    }


    holding =
        false;


    clearInterval(
        holdTimer
    );


    giftBox.classList.remove(
        "holding"
    );


    giftBox.classList.add(
        "open"
    );


    progressBar.style.width =
        "100%";


    holdText.textContent =
        "🎉 เปิดแล้ว!";


    createHearts(
        60
    );


    createConfetti();


    setTimeout(
        () => {

            showScene(
                "final"
            );

        },
        1800
    );

}


/* =====================================================
   HEART EFFECT
===================================================== */

function createHearts(
    amount = 20
) {

    const hearts = [
        "❤️",
        "💗",
        "💖",
        "🤍",
        "🌼"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random()
                    *
                    hearts.length
                )
            ];


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random()
            * 100
            + "vw";


        heart.style.top =
            "100vh";


        heart.style.fontSize =
            (
                18
                +
                Math.random() * 25
            )
            + "px";


        heart.style.zIndex =
            "9999";


        heart.style.pointerEvents =
            "none";


        document.body.appendChild(
            heart
        );


        const animation =
            heart.animate(
                [
                    {
                        transform:
                            "translateY(0) scale(.5)",
                        opacity: 0
                    },

                    {
                        opacity: 1
                    },

                    {
                        transform:
                            `translateY(-${window.innerHeight + 150}px)
                             rotate(${Math.random() * 360}deg)
                             scale(1.2)`,
                        opacity: 0
                    }
                ],
                {
                    duration:
                        2500
                        +
                        Math.random() * 1800,

                    easing:
                        "ease-out"
                }
            );


        animation.onfinish =
            () => {

                heart.remove();

            };

    }

}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti(
    amount = 35
) {

    const emojis = [
        "✨",
        "🌼",
        "💖",
        "🎉",
        "🤍"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const item =
            document.createElement(
                "div"
            );


        item.textContent =
            emojis[
                Math.floor(
                    Math.random()
                    *
                    emojis.length
                )
            ];


        item.style.position =
            "fixed";


        item.style.left =
            Math.random()
            * 100
            + "vw";


        item.style.top =
            "-30px";


        item.style.fontSize =
            (
                15
                +
                Math.random() * 20
            )
            + "px";


        item.style.zIndex =
            "9999";


        item.style.pointerEvents =
            "none";


        document.body.appendChild(
            item
        );


        const animation =
            item.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translateY(${window.innerHeight + 100}px)
                             rotate(720deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration:
                        1800
                        +
                        Math.random() * 1200,

                    easing:
                        "cubic-bezier(.2,.8,.4,1)"
                }
            );


        animation.onfinish =
            () => {

                item.remove();

            };

    }

}
