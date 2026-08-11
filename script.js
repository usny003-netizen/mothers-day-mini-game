/* =====================================================
   MOTHER'S DAY MINI GAME
   JAVASCRIPT VERSION 1.0
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const scenes =
    document.querySelectorAll(".scene");


const bgMusic =
    document.getElementById("bgMusic");


const startBtn =
    document.getElementById("startBtn");


const waterBtn =
    document.getElementById("waterBtn");


const plant =
    document.getElementById("plant");


const waterText =
    document.getElementById("waterText");


const waterDots = [

    document.getElementById("waterDot1"),

    document.getElementById("waterDot2"),

    document.getElementById("waterDot3")

];


const galleryImage =
    document.getElementById("galleryImage");


const photoNumber =
    document.getElementById("photoNumber");


const photoCaption =
    document.getElementById("photoCaption");


const prevPhoto =
    document.getElementById("prevPhoto");


const nextPhoto =
    document.getElementById("nextPhoto");


const galleryNextBtn =
    document.getElementById("galleryNextBtn");


const wheel =
    document.getElementById("wheel");


const spinBtn =
    document.getElementById("spinBtn");


const spinStatus =
    document.getElementById("spinStatus");


const missionTitle =
    document.getElementById("missionTitle");


const missionShort =
    document.getElementById("missionShort");


const missionMessage =
    document.getElementById("missionMessage");


const missionIcon =
    document.getElementById("missionIcon");


const completeMissionBtn =
    document.getElementById(
        "completeMissionBtn"
    );


const popup =
    document.getElementById("popup");


const popupTitle =
    document.getElementById(
        "popupTitle"
    );


const popupText =
    document.getElementById(
        "popupText"
    );


const popupClose =
    document.getElementById(
        "popupClose"
    );


const replayBtn =
    document.getElementById(
        "replayBtn"
    );


const floatingContainer =
    document.getElementById(
        "floatingContainer"
    );


/* =====================================================
   STATE
===================================================== */

let currentScene =
    "scene-start";


let waterCount = 0;


let currentPhoto = 1;


let isSpinning = false;


let selectedMission = null;


let wheelRotation = 0;


/* =====================================================
   SHOW SCENE
===================================================== */

function showScene(sceneId) {

    scenes.forEach(scene => {

        scene.classList.remove(
            "active"
        );

    });


    const target =
        document.getElementById(sceneId);


    if (!target) {

        console.warn(
            "Scene not found:",
            sceneId
        );

        return;

    }


    target.classList.add(
        "active"
    );


    currentScene =
        sceneId;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    createFloatingEffect(
        [
            "🤍",
            "💙",
            "🌼",
            "🌸",
            "✨"
        ],
        5
    );

}


/* =====================================================
   START
===================================================== */

startBtn.addEventListener(
    "click",
    () => {

        /*
           เริ่มเพลง
        */

        bgMusic.volume = 0.45;


        bgMusic.play()
            .then(() => {

                console.log(
                    "🎵 Music started"
                );

            })
            .catch(error => {

                console.log(
                    "Music blocked:",
                    error
                );

            });


        /*
           เอฟเฟกต์เปิดเซอร์ไพรส์
        */

        createFloatingEffect(
            [
                "🌸",
                "🌷",
                "🤍",
                "✨",
                "💗"
            ],
            15
        );


        /*
           ไปเกมแรก
        */

        setTimeout(() => {

            showScene(
                "scene-1"
            );

        }, 500);

    }
);


/* =====================================================
   WATER FLOWER
===================================================== */

const waterMessages = [

    {
        text:
            "หยดน้ำแรก... แทนคำว่าขอบคุณที่แม่ดูแลลูกมาตลอด 🤍",

        button:
            "💧 รดน้ำครั้งที่ 2"
    },


    {
        text:
            "หยดน้ำที่สอง... แทนทุกครั้งที่แม่คอยเป็นห่วงลูก 💙",

        button:
            "💧 รดน้ำครั้งที่ 3"
    },


    {
        text:
            "และหยดสุดท้าย... แทนคำว่า “รักแม่นะ” ที่ลูกอาจไม่ได้พูดบ่อย ๆ 🌼",

        button:
            "🌼 ดูดอกมะลิ"
    }

];


waterBtn.addEventListener(
    "click",
    () => {

        if (
            waterCount >= 3
        ) {

            return;

        }


        waterCount++;


        const index =
            waterCount - 1;


        /*
           จุดน้ำ
        */

        waterDots[index]
            .classList.add(
                "done"
            );


        /*
           ต้นไม้โต
        */

        plant.classList.add(
            `grow-${waterCount}`
        );


        /*
           เอฟเฟกต์น้ำ
        */

        createWaterDrops();


        /*
           ข้อความ
        */

        if (
            waterCount < 3
        ) {

            waterText.innerHTML =
                waterMessages[index]
                    .text;


            waterBtn.textContent =
                waterMessages[index]
                    .button;

        }

        else {

            waterText.innerHTML =
                `
                ดูสิ... 🌱<br>
                <strong>
                    ต้นมะลิโตขึ้นแล้ว!
                </strong>
                `;


            waterBtn.textContent =
                "🌼 ดูดอกมะลิกัน";


            waterBtn.disabled =
                true;


            createFloatingEffect(
                [
                    "🌼",
                    "🌸",
                    "✨"
                ],
                12
            );


            setTimeout(() => {

                showScene(
                    "scene-2"
                );

            }, 1600);

        }

    }
);


/* =====================================================
   WATER DROPS
===================================================== */

function createWaterDrops() {

    for (
        let i = 0;
        i < 8;
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


        drop.style.left =
            `${45 + Math.random() * 10}%`;


        drop.style.top =
            `${35 + Math.random() * 10}%`;


        drop.style.fontSize =
            `${12 + Math.random() * 10}px`;


        drop.style.pointerEvents =
            "none";


        drop.style.zIndex =
            "3000";


        document.body.appendChild(
            drop
        );


        const x =
            (Math.random() - 0.5)
            * 100;


        drop.animate(

            [

                {
                    transform:
                        "translateY(0)",

                    opacity: 1
                },


                {
                    transform:
                        `translate(${x}px, 100px)`,

                    opacity: 0
                }

            ],

            {

                duration: 700,

                easing:
                    "ease-out"

            }

        ).onfinish = () => {

            drop.remove();

        };

    }

}


/* =====================================================
   NEXT BUTTONS
===================================================== */

document
    .querySelectorAll(
        ".next-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const nextScene =
                    button.dataset.next;


                showScene(
                    nextScene
                );

            }
        );

    });


/* =====================================================
   GALLERY
===================================================== */

const photos = [

    {
        file:
            "photo1.jpg",

        caption:
            "รูปแรกของความทรงจำดี ๆ ที่ลูกอยากเก็บไว้ 🤍"
    },


    {
        file:
            "photo2.jpg",

        caption:
            "ไม่ว่าจะผ่านไปนานแค่ไหน รูปนี้ก็ยังทำให้ลูกยิ้มได้เสมอ 💙"
    },


    {
        file:
            "photo3.jpg",

        caption:
            "ช่วงเวลาธรรมดา ๆ ที่จริง ๆ แล้วมีค่ามากที่สุด 🌼"
    },


    {
        file:
            "photo4.jpg",

        caption:
            "ขอบคุณที่ทำให้คำว่า “บ้าน” มีความหมายเสมอ 🤍"
    },


    {
        file:
            "photo5.jpg",

        caption:
            "รูปสุดท้าย... แต่ความทรงจำของเรายังมีอีกเยอะเลยนะ 💙"
    }

];


function changePhoto(number) {

    if (
        number < 1
    ) {

        number =
            photos.length;

    }


    if (
        number > photos.length
    ) {

        number = 1;

    }


    currentPhoto =
        number;


    galleryImage.classList.add(
        "change"
    );


    setTimeout(() => {

        galleryImage.src =
            photos[
                currentPhoto - 1
            ].file;


        galleryImage.alt =
            `รูปความทรงจำ ${currentPhoto}`;


        photoNumber.textContent =
            currentPhoto;


        photoCaption.textContent =
            photos[
                currentPhoto - 1
            ].caption;


        galleryImage.classList.remove(
            "change"
        );

    }, 180);

}


prevPhoto.addEventListener(
    "click",
    () => {

        changePhoto(
            currentPhoto - 1
        );

    }
);


nextPhoto.addEventListener(
    "click",
    () => {

        changePhoto(
            currentPhoto + 1
        );

    }
);


galleryNextBtn.addEventListener(
    "click",
    () => {

        showScene(
            "scene-4"
        );

    }
);


/* =====================================================
   MISSIONS
===================================================== */

const missions = [

    {
        title:
            "กอดแม่ 1 ที 🤗",

        icon:
            "🤗",

        short:
            "กอดแม่ให้นานที่สุด",

        message:
            "กอดนี้ไม่ต้องนับเวลาเลยนะ เพราะสำหรับลูกแล้ว... อยากกอดแม่นาน ๆ เท่าที่จะทำได้เลย 🤍"
    },


    {
        title:
            "บอกรักแม่ 💙",

        icon:
            "💙",

        short:
            "พูดว่า “รักแม่นะ”",

        message:
            "บางทีคำสั้น ๆ แค่คำเดียว อาจเป็นคำที่แม่อยากได้ยินที่สุด วันนี้ลูกอยากให้แม่ได้ยินจากปากลูกจริง ๆ นะ 💙"
    },


    {
        title:
            "จุ๊บแก้มแม่ 2 ข้าง 😘",

        icon:
            "😘",

        short:
            "จุ๊บซ้ายหนึ่งที ขวาหนึ่งที",

        message:
            "ภารกิจนี้ง่ายมาก... แต่ระวังแม่เขินนะ 😝 เพราะจุ๊บนี้คือคำขอบคุณสำหรับทุกความรักที่แม่ให้ลูกมา"
    },


    {
        title:
            "พาแม่กินข้าว 🍚",

        icon:
            "🍚",

        short:
            "มื้อหนึ่งของแม่กับลูก",

        message:
            "มื้อธรรมดา ๆ ที่ได้นั่งกินข้าวด้วยกัน บางครั้งกลับเป็นช่วงเวลาที่ลูกอยากเก็บไว้ในความทรงจำที่สุดเลยนะ 🤍"
    },


    {
        title:
            "แม่เลือกที่เที่ยวไว้ก่อนนะ ✈️",

        icon:
            "✈️",

        short:
            "เลือกที่ที่แม่อยากไป",

        message:
            "แม่เลือกที่เที่ยวไว้ก่อนนะ 💙 ลูกมีเงินเมื่อไหร่... ลูกจะพาแม่ไปเอง เพราะยังมีอีกหลายที่ที่ลูกอยากพาแม่ไปเห็นด้วยกัน"
    }

];


/* =====================================================
   CREATE WHEEL LABELS
===================================================== */

function createWheelLabels() {

    wheel
        .querySelectorAll(
            ".wheel-label"
        )
        .forEach(
            label =>
                label.remove()
        );


    missions.forEach(
        (mission, index) => {

            const label =
                document.createElement(
                    "div"
                );


            label.className =
                "wheel-label";


            const angle =
                index * 72 + 36;


            label.style.transform =
                `
                translate(-50%, -50%)
                rotate(${angle}deg)
                translateY(-105px)
                rotate(-${angle}deg)
                `;


            label.innerHTML =
                `
                ${mission.icon}
                <br>
                ${getShortMission(index)}
                `;


            wheel.appendChild(
                label
            );

        }
    );

}


function getShortMission(index) {

    const names = [

        "กอดแม่",

        "บอกรักแม่",

        "จุ๊บแก้ม",

        "กินข้าว",

        "เที่ยวด้วยกัน"

    ];


    return names[index];

}


createWheelLabels();


/* =====================================================
   SPIN WHEEL
===================================================== */

spinBtn.addEventListener(
    "click",
    () => {

        if (
            isSpinning
        ) {

            return;

        }


        isSpinning =
            true;


        spinBtn.disabled =
            true;


        spinStatus.textContent =
            "🎡 กำลังหมุน... ลุ้นกันนะ";


        /*
           สุ่มภารกิจ
        */

        const selectedIndex =
            Math.floor(
                Math.random()
                * missions.length
            );


        selectedMission =
            missions[
                selectedIndex
            ];


        /*
           คำนวณองศา
        */

        const segmentCenter =
            selectedIndex * 72 + 36;


        const targetAngle =
            360 -
            segmentCenter +
            270;


        const extraSpins =
            360 * 5;


        const finalRotation =
            wheelRotation +
            extraSpins +
            targetAngle;


        wheelRotation =
            finalRotation;


        wheel.style.transform =
            `rotate(${finalRotation}deg)`;


        /*
           รอวงล้อหมุน
        */

        setTimeout(
            () => {

                isSpinning =
                    false;


                spinBtn.disabled =
                    false;


                spinStatus.textContent =
                    "🎉 ได้ภารกิจแล้ว!";


                setTimeout(
                    () => {

                        showMission();

                    },
                    500
                );

            },
            4100
        );

    }
);


/* =====================================================
   SHOW MISSION
===================================================== */

function showMission() {

    if (
        !selectedMission
    ) {

        return;

    }


    missionTitle.textContent =
        selectedMission.title;


    missionShort.textContent =
        selectedMission.short;


    missionIcon.textContent =
        selectedMission.icon;


    missionMessage.textContent =
        selectedMission.message;


    showScene(
        "scene-5"
    );

}


/* =====================================================
   COMPLETE MISSION
===================================================== */

completeMissionBtn.addEventListener(
    "click",
    () => {

        showPopup(

            "ภารกิจสำเร็จแล้ว! 🎉",

            "เก่งมากเลย 💙 วันนี้เราได้สร้างความทรงจำดี ๆ ให้กันอีกหนึ่งอย่างแล้วนะ"

        );

    }
);


/* =====================================================
   POPUP
===================================================== */

function showPopup(
    title,
    text
) {

    popupTitle.textContent =
        title;


    popupText.textContent =
        text;


    popup.classList.add(
        "show"
    );


    createFloatingEffect(
        [
            "💙",
            "🤍",
            "🌼",
            "✨"
        ],
        12
    );

}


popupClose.addEventListener(
    "click",
    () => {

        popup.classList.remove(
            "show"
        );


        setTimeout(
            () => {

                showScene(
                    "scene-6"
                );

            },
            250
        );

    }
);


/*
   กดพื้นที่ด้านนอก popup
*/

popup.addEventListener(
    "click",
    event => {

        if (
            event.target === popup
        ) {

            popup.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   FLOATING EFFECT
===================================================== */

function createFloatingEffect(
    symbols,
    amount = 8
) {

    if (
        !floatingContainer
    ) {

        return;

    }


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const item =
            document.createElement(
                "div"
            );


        const symbol =
            symbols[
                Math.floor(
                    Math.random()
                    * symbols.length
                )
            ];


        item.textContent =
            symbol;


        item.className =
            "floating-item";


        item.style.left =
            `${Math.random() * 100}%`;


        item.style.fontSize =
            `${16 + Math.random() * 20}px`;


        item.style.animationDuration =
            `${3 + Math.random() * 2}s`;


        item.style.animationDelay =
            `${Math.random() * 0.8}s`;


        floatingContainer.appendChild(
            item
        );


        setTimeout(
            () => {

                item.remove();

            },
            6000
        );

    }

}


/* =====================================================
   REPLAY
===================================================== */

replayBtn.addEventListener(
    "click",
    () => {

        /*
           Reset
        */

        waterCount =
            0;


        currentPhoto =
            1;


        isSpinning =
            false;


        selectedMission =
            null;


        wheelRotation =
            0;


        /*
           Reset wheel
        */

        wheel.style.transform =
            "rotate(0deg)";


        /*
           Reset water
        */

        waterDots.forEach(
            dot => {

                dot.classList.remove(
                    "done"
                );

            }
        );


        plant.classList.remove(
            "grow-1",
            "grow-2",
            "grow-3"
        );


        waterText.innerHTML =
            `
            ต้นมะลิต้นนี้ยังเล็กอยู่เลย<br>
            แม่ช่วยลูกดูแลมันหน่อยนะ
            `;


        waterBtn.textContent =
            "💧 รดน้ำครั้งที่ 1";


        waterBtn.disabled =
            false;


        /*
           Reset gallery
        */

        changePhoto(1);


        /*
           Reset wheel
        */

        spinStatus.textContent =
            "กดหมุนเพื่อสุ่มภารกิจให้แม่";


        spinBtn.disabled =
            false;


        /*
           Reset popup
        */

        popup.classList.remove(
            "show"
        );


        /*
           กลับหน้าแรก
        */

        showScene(
            "scene-start"
        );

    }
);


/* =====================================================
   MUSIC
===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (

            document.visibilityState ===
            "visible"

            &&

            currentScene !==
            "scene-start"

        ) {

            bgMusic
                .play()
                .catch(
                    () => {}
                );

        }

    }
);


/* =====================================================
   PRELOAD PHOTOS
===================================================== */

photos.forEach(
    photo => {

        const img =
            new Image();


        img.src =
            photo.file;

    }
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "💙 Mother's Day Mini Game loaded!"
);

console.log(
    "🌼 5 photos ready"
);

console.log(
    "🎵 Music ready"
);

console.log(
    "🎡 5 missions ready"
);
