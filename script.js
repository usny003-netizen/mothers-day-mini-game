/* =========================================
   🌼 MOTHER'S DAY MINI GAME V3
========================================= */


/* =========================================
   VARIABLES
========================================= */

const scenes =
    document.querySelectorAll(".scene");

let currentScene = 1;


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");

let musicPlaying = false;


function playMusic() {

    if (!music) return;

    music.volume = 0.22;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicBtn.textContent = "🎵";

        })
        .catch(() => {

            musicPlaying = false;

        });
}


function toggleMusic() {

    if (!music) return;

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicBtn.textContent = "🔇";

    } else {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicBtn.textContent = "🎵";

            });

    }
}


musicBtn.addEventListener(
    "click",
    toggleMusic
);


/* =========================================
   SCENE SYSTEM
========================================= */

function goToScene(number) {

    const current =
        document.getElementById(
            `scene${currentScene}`
        );

    const next =
        document.getElementById(
            `scene${number}`
        );

    if (!next || current === next) {
        return;
    }

    current.classList.remove("active");

    setTimeout(() => {

        next.classList.add("active");

        currentScene = number;

    }, 80);
}


/* ปุ่มไปฉากถัดไป */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                playMusic();

                const next =
                    Number(
                        button.dataset.next
                    );

                goToScene(next);

            }
        );

    });


/* =========================================
   🌱 TREE
========================================= */

let waterCount = 0;

const tree =
    document.getElementById("tree");

const waterBtn =
    document.getElementById("waterBtn");

const waterText =
    document.getElementById("waterText");


waterBtn.addEventListener(
    "click",
    waterPlant
);


function waterPlant() {

    playMusic();

    if (waterCount >= 3) {
        return;
    }

    waterCount++;

    tree.className =
        `tree stage${waterCount}`;


    createWaterDrops();


    if (waterCount === 1) {

        waterText.textContent =
            "ต้นมะลิเริ่มโตแล้ว 🌱 อีก 2 ครั้งนะ";

    }


    if (waterCount === 2) {

        waterText.textContent =
            "มีใบแล้วนะ 🌿 อีก 1 ครั้งสุดท้าย";

    }


    if (waterCount === 3) {

        waterText.textContent =
            "มะลิกำลังจะบานแล้ว! 🌼";

        waterBtn.textContent =
            "🌼 ดูมะลิของแม่";

        waterBtn.removeEventListener(
            "click",
            waterPlant
        );

        waterBtn.addEventListener(
            "click",
            () => {

                goToScene(2);

            }
        );

    }

}


/* =========================================
   💧 WATER EFFECT
========================================= */

function createWaterDrops() {

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const drop =
            document.createElement("div");

        drop.textContent = "💧";

        drop.style.position =
            "fixed";

        drop.style.left =
            (
                window.innerWidth / 2
                + Math.random() * 100
                - 50
            ) + "px";

        drop.style.top =
            "32%";

        drop.style.fontSize =
            "22px";

        drop.style.zIndex =
            "999";

        drop.style.pointerEvents =
            "none";


        document.body.appendChild(
            drop
        );


        const x =
            Math.random() * 70 - 35;


        drop.animate(

            [
                {
                    transform:
                        "translate(0,-20px) scale(.5)",

                    opacity: 0
                },

                {
                    transform:
                        `translate(${x}px,70px) scale(1)`,

                    opacity: 1
                },

                {
                    transform:
                        `translate(${x}px,130px) scale(.6)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    700 + Math.random() * 400,

                easing:
                    "ease-in"
            }

        ).onfinish = () => {

            drop.remove();

        };

    }

}


/* =========================================
   📸 GALLERY
========================================= */

const photos = [

    "./photo1.jpg",
    "./photo2.jpg",
    "./photo3.jpg",
    "./photo4.jpg",
    "./photo5.jpg"

];


let currentPhoto = 0;


const gallery =
    document.querySelector(".gallery");

const galleryImage =
    document.getElementById(
        "galleryImage"
    );

const imageError =
    document.getElementById(
        "imageError"
    );

const photoNumber =
    document.getElementById(
        "photoNumber"
    );

const dots =
    document.querySelectorAll(".dot");


/* โหลดรูปแรก */

loadPhoto(0);


function loadPhoto(index) {

    currentPhoto =
        (
            index + photos.length
        ) % photos.length;


    gallery.classList.remove(
        "show-error"
    );

    galleryImage.classList.add(
        "loading"
    );


    const testImage =
        new Image();


    testImage.onload = () => {

        galleryImage.src =
            photos[currentPhoto];

        galleryImage.classList.remove(
            "loading"
        );

        gallery.classList.remove(
            "show-error"
        );

        updateGalleryUI();

    };


    testImage.onerror = () => {

        console.error(
            "โหลดรูปไม่ได้:",
            photos[currentPhoto]
        );

        galleryImage.classList.remove(
            "loading"
        );

        gallery.classList.add(
            "show-error"
        );

        updateGalleryUI();

    };


    testImage.src =
        photos[currentPhoto];

}


function nextPhoto() {

    loadPhoto(
        currentPhoto + 1
    );

}


function previousPhoto() {

    loadPhoto(
        currentPhoto - 1
    );

}


function updateGalleryUI() {

    photoNumber.textContent =
        `${currentPhoto + 1} / ${photos.length}`;


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPhoto
            );

        }
    );

}


document
    .getElementById("nextBtn")
    .addEventListener(
        "click",
        nextPhoto
    );


document
    .getElementById("prevBtn")
    .addEventListener(
        "click",
        previousPhoto
    );


/* =========================================
   🎡 WHEEL TASKS
========================================= */

const tasks = [

    {
        icon: "🤗",

        title:
            "กอดแม่ 1 ที",

        description:
            "วันนี้ขอกอดแม่แน่น ๆ 1 ครั้งนะ 🤗💗\n"
            + "กอดที่อาจดูธรรมดา แต่สำหรับลูกแล้ว\n"
            + "มันคือกอดที่อยากให้แม่รู้ว่า\n"
            + "ลูกยังรักแม่เสมอนะ 🌷"
    },


    {
        icon: "😘",

        title:
            "จุ๊บแก้มแม่ 2 ข้าง",

        description:
            "ขอจุ๊บแก้มแม่ซ้าย 1 ที\n"
            + "ขวาอีก 1 ทีนะ 😘💕\n"
            + "ตั้งแต่เด็กจนโต แม่คอยหอมและดูแลลูกมาตลอด\n"
            + "วันนี้ขอให้ลูกเป็นคนส่งความรักกลับไปให้แม่บ้างนะ 💗"
    },


    {
        icon: "❤️",

        title:
            "บอกรักแม่",

        description:
            "วันนี้ลองพูดคำว่า\n"
            + "\"หนูรักแม่นะ\" ให้แม่ฟังดัง ๆ ❤️\n"
            + "ถึงลูกอาจจะไม่ค่อยพูดคำนี้บ่อย ๆ\n"
            + "แต่แม่รู้ไหม...\n"
            + "ลูกดีใจเสมอที่เกิดมาเป็นลูกของแม่ 🌼"
    },


    {
        icon: "🍚",

        title:
            "พาแม่กินข้าว",

        description:
            "วันนี้แม่อยากกินอะไร\n"
            + "เลือกได้เลยนะ 🍚💕\n"
            + "ไม่ต้องเป็นร้านหรู ไม่ต้องเป็นของแพง\n"
            + "แค่ได้กินข้าวด้วยกัน ลูกก็มีความสุขแล้ว\n"
            + "เพราะมื้อธรรมดาที่มีแม่อยู่ข้าง ๆ\n"
            + "มีความหมายเสมอ 🥹"
    },


    {
        icon: "🚗",

        title:
            "แม่เลือกที่เที่ยวไว้ก่อนนะ",

        description:
            "อยากไปที่ไหนเลือกไว้ได้เลยนะ 🚗🌷\n"
            + "ถึงตอนนี้ลูกอาจยังไม่มีเงินพาแม่ไป\n"
            + "แต่ถ้าวันไหนลูกมีเงิน\n"
            + "ลูกจะพาแม่ไปเองนะ 💙\n"
            + "เก็บที่ที่แม่อยากไปไว้ก่อนนะ\n"
            + "แล้ววันหนึ่งเราจะไปด้วยกัน"
    }

];


/* =========================================
   🎡 WHEEL
========================================= */

const wheel =
    document.getElementById("wheel");

const spinBtn =
    document.getElementById("spinBtn");

const wheelResult =
    document.getElementById(
        "wheelResult"
    );


let wheelRotation = 0;

let spinning = false;

let selectedTask = null;


/* =========================================
   SPIN
========================================= */

spinBtn.addEventListener(
    "click",
    spinWheel
);


function spinWheel() {

    if (spinning) {
        return;
    }

    playMusic();

    spinning = true;

    spinBtn.disabled = true;

    spinBtn.textContent =
        "🎡 กำลังหมุน...";


    const randomIndex =
        Math.floor(
            Math.random()
            * tasks.length
        );


    selectedTask =
        randomIndex;


    const sectionAngle =
        360 / tasks.length;


    /*
       ให้ช่องที่สุ่มได้
       หยุดบริเวณด้านบน
    */

    const target =
        360 -
        (
            randomIndex
            * sectionAngle
            + sectionAngle / 2
        );


    wheelRotation +=
        360 * 6
        + target;


    wheel.style.transform =
        `rotate(${wheelRotation}deg)`;


    setTimeout(() => {

        const task =
            tasks[randomIndex];


        wheelResult.textContent =
            `${task.icon} ${task.title}`;


        spinBtn.disabled = false;

        spinBtn.textContent =
            "🎁 รับภารกิจนี้";


        spinBtn.removeEventListener(
            "click",
            spinWheel
        );


        spinBtn.addEventListener(
            "click",
            openSelectedTask,
            {
                once: true
            }
        );


        spinning = false;

    }, 4300);

}


/* =========================================
   OPEN TASK
========================================= */

function openSelectedTask() {

    if (selectedTask === null) {
        return;
    }


    const task =
        tasks[selectedTask];


    document.getElementById(
        "taskIcon"
    ).textContent =
        task.icon;


    document.getElementById(
        "taskTitle"
    ).textContent =
        task.title;


    document.getElementById(
        "taskDescription"
    ).textContent =
        task.description;


    const taskBtn =
        document.getElementById(
            "taskBtn"
        );


    taskBtn.disabled = false;

    taskBtn.textContent =
        "❤️ ทำภารกิจสำเร็จ";


    goToScene(6);


    taskBtn.onclick =
        completeTask;

}


/* =========================================
   ❤️ COMPLETE TASK
========================================= */

function completeTask() {

    playMusic();

    const taskBtn =
        document.getElementById(
            "taskBtn"
        );


    taskBtn.disabled = true;

    taskBtn.textContent =
        "✨ สำเร็จแล้ว!";


    createHeartExplosion();


    setTimeout(() => {

        goToScene(7);

    }, 1600);

}


/* =========================================
   💕 HEART EXPLOSION
========================================= */

function createHeartExplosion() {

    const items = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "🌼"
    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const item =
            document.createElement("div");


        item.textContent =
            items[
                Math.floor(
                    Math.random()
                    * items.length
                )
            ];


        item.style.position =
            "fixed";

        item.style.left =
            "50%";

        item.style.top =
            "50%";

        item.style.fontSize =
            (
                18
                + Math.random() * 22
            ) + "px";

        item.style.zIndex =
            "999";

        item.style.pointerEvents =
            "none";


        document.body.appendChild(
            item
        );


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            100
            + Math.random() * 280;


        item.animate(

            [
                {
                    transform:
                        "translate(-50%,-50%) scale(0)",

                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%,-50%) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        )
                        scale(1.2)`,

                    opacity: 0
                }

            ],

            {
                duration:
                    1200
                    + Math.random() * 700,

                easing:
                    "ease-out"
            }

        ).onfinish = () => {

            item.remove();

        };

    }

}


/* =========================================
   🔄 RESTART
========================================= */

document
    .getElementById("restartBtn")
    .addEventListener(
        "click",
        () => {

            location.reload();

        }
    );


/* =========================================
   🎵 FIRST USER INTERACTION
========================================= */

document.addEventListener(
    "click",
    () => {

        if (!musicPlaying) {
            playMusic();
        }

    },
    {
        once: true
    }
);
