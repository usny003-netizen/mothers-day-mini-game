/* ==========================================
   🌼 MOTHER'S DAY MINI GAME V3
========================================== */


/* ==========================================
   MUSIC
========================================== */

const bgMusic =
    document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");

let musicPlaying = false;


function startMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.25;

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            musicBtn.textContent = "🎵";

        })
        .catch(() => {

            musicPlaying = false;

        });
}


function toggleMusic() {

    if (!bgMusic) return;

    if (musicPlaying) {

        bgMusic.pause();

        musicPlaying = false;

        musicBtn.textContent = "🔇";

    } else {

        bgMusic.play();

        musicPlaying = true;

        musicBtn.textContent = "🎵";

    }
}


/* ==========================================
   SCENE
========================================== */

let currentScene = 1;


function goToScene(sceneNumber) {

    const oldScene =
        document.getElementById(
            `scene${currentScene}`
        );

    const newScene =
        document.getElementById(
            `scene${sceneNumber}`
        );

    if (!newScene) return;

    oldScene.classList.remove("active");

    setTimeout(() => {

        newScene.classList.add("active");

        currentScene = sceneNumber;

    }, 100);
}


/* ==========================================
   🌼 ต้นมะลิ
========================================== */

let waterCount = 0;


const tree =
    document.getElementById("tree");

const waterText =
    document.getElementById("waterText");

const waterBtn =
    document.getElementById("waterBtn");


function waterPlant() {

    startMusic();

    if (waterCount >= 3) return;

    waterCount++;

    tree.className =
        `tree tree-stage-${waterCount}`;


    createWaterDrop();


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

        waterBtn.onclick =
            function () {

                goToScene(2);

            };
    }
}


/* ==========================================
   💧 WATER EFFECT
========================================== */

function createWaterDrop() {

    const drop =
        document.createElement("div");

    drop.textContent = "💧";

    drop.style.position = "fixed";

    drop.style.left =
        (
            window.innerWidth / 2
            + Math.random() * 80
            - 40
        ) + "px";

    drop.style.top = "35%";

    drop.style.fontSize = "25px";

    drop.style.zIndex = "999";

    drop.style.pointerEvents = "none";

    document.body.appendChild(drop);


    drop.animate(

        [
            {
                transform:
                    "translateY(-20px) scale(.5)",

                opacity: 0
            },

            {
                transform:
                    "translateY(80px) scale(1)",

                opacity: 1
            },

            {
                transform:
                    "translateY(140px) scale(.7)",

                opacity: 0
            }
        ],

        {
            duration: 900,

            easing: "ease-in"
        }

    ).onfinish = () => {

        drop.remove();

    };
}


/* ==========================================
   📸 GALLERY
========================================== */

const photos = [

    "photo1.jpg",

    "photo2.jpg",

    "photo3.jpg",

    "photo4.jpg",

    "photo5.jpg"

];


let currentPhoto = 0;


const galleryImage =
    document.getElementById(
        "galleryImage"
    );


const dots =
    document.querySelectorAll(".dot");


function showPhoto(index) {

    currentPhoto =
        (
            index + photos.length
        )
        % photos.length;


    galleryImage.classList.add(
        "photo-changing"
    );


    setTimeout(() => {

        galleryImage.src =
            photos[currentPhoto];

        galleryImage.classList.remove(
            "photo-changing"
        );

        updateDots();

    }, 250);
}


function nextPhoto() {

    showPhoto(
        currentPhoto + 1
    );
}


function previousPhoto() {

    showPhoto(
        currentPhoto - 1
    );
}


function updateDots() {

    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active-dot",
                index === currentPhoto
            );

        }
    );
}


/* ==========================================
   🎡 ภารกิจ 5 อย่าง
========================================== */

const wheelTasks = [

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


/* ==========================================
   🎡 WHEEL
========================================== */

const wheel =
    document.getElementById("wheel");

const wheelResult =
    document.getElementById(
        "wheelResult"
    );

const spinBtn =
    document.getElementById(
        "spinBtn"
    );


let wheelRotation = 0;

let spinning = false;


function spinWheel() {

    if (spinning) return;

    startMusic();

    spinning = true;

    spinBtn.disabled = true;

    spinBtn.textContent =
        "🎡 กำลังหมุน...";


    const randomIndex =
        Math.floor(
            Math.random()
            * wheelTasks.length
        );


    const sectionAngle =
        360 / wheelTasks.length;


    const targetAngle =
        360 -
        (
            randomIndex
            * sectionAngle
            + sectionAngle / 2
        );


    wheelRotation +=
        360 * 5
        + targetAngle;


    wheel.style.transform =
        `rotate(${wheelRotation}deg)`;


    setTimeout(() => {

        const task =
            wheelTasks[randomIndex];


        wheelResult.textContent =
            `${task.icon} ${task.title}`;


        spinBtn.disabled = false;

        spinBtn.textContent =
            "🎁 รับภารกิจนี้";


        spinBtn.onclick =
            function () {

                openTask(randomIndex);

            };


        spinning = false;

    }, 4200);
}


/* ==========================================
   💕 เปิดภารกิจ
========================================== */

let selectedTask = 0;


function openTask(index) {

    selectedTask = index;


    const task =
        wheelTasks[index];


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


    document.getElementById(
        "taskArea"
    ).innerHTML =

        `<div class="task-progress">
            💕 ภารกิจเล็ก ๆ จากหัวใจของลูก 💕
        </div>`;


    document.getElementById(
        "taskBtn"
    ).textContent =
        "❤️ ทำภารกิจสำเร็จ";


    document.getElementById(
        "taskBtn"
    ).disabled = false;


    goToScene(6);
}


/* ==========================================
   ❤️ ทำภารกิจ
========================================== */

function completeTask() {

    startMusic();

    createHeartExplosion();


    const taskBtn =
        document.getElementById(
            "taskBtn"
        );


    taskBtn.textContent =
        "✨ สำเร็จแล้ว!";


    taskBtn.disabled = true;


    setTimeout(() => {

        goToScene(7);

    }, 1500);
}


/* ==========================================
   💕 HEART EFFECT
========================================== */

function createHeartExplosion() {

    const hearts = [

        "❤️",

        "💕",

        "💗",

        "💖",

        "🌼"

    ];


    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random()
                    * hearts.length
                )
            ];


        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.fontSize =
            (
                18
                + Math.random() * 20
            )
            + "px";

        heart.style.zIndex =
            "999";

        heart.style.pointerEvents =
            "none";


        document.body.appendChild(
            heart
        );


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            100
            + Math.random() * 250;


        heart.animate(

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
                    + Math.random() * 500,

                easing:
                    "ease-out"
            }

        ).onfinish = () => {

            heart.remove();

        };
    }
}


/* ==========================================
   🔄 เล่นใหม่
========================================== */

function restartGame() {

    location.reload();

}


/* ==========================================
   🎵 เริ่มเพลงเมื่อกดครั้งแรก
========================================== */

document.addEventListener(
    "click",
    () => {

        if (!musicPlaying) {

            startMusic();

        }

    },
    {
        once: true
    }
);
