/* ==========================================
   MOTHER'S DAY MINI GAME V3
========================================== */


/* ==========================================
   MUSIC
========================================== */

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

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
   SCENE SYSTEM
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
   JASMINE TREE
========================================== */

let waterCount = 0;

const waterText =
    document.getElementById("waterText");

const tree =
    document.getElementById("tree");

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
            "กำลังมีใบแล้ว 🌿 อีก 1 ครั้งสุดท้าย";

    }

    if (waterCount === 3) {

        waterText.textContent =
            "มะลิพร้อมออกดอกแล้ว! 🌼";

        waterBtn.textContent =
            "🌼 ดูมะลิของแม่";

        waterBtn.onclick =
            function () {

                goToScene(2);

            };

    }

}


/* ==========================================
   WATER ANIMATION
========================================== */

function createWaterDrop() {

    const drop =
        document.createElement("div");

    drop.textContent = "💧";

    drop.style.position = "fixed";

    drop.style.left =
        (window.innerWidth / 2 + Math.random() * 80 - 40)
        + "px";

    drop.style.top = "35%";

    drop.style.fontSize = "25px";

    drop.style.zIndex = "50";

    drop.style.pointerEvents = "none";

    document.body.appendChild(drop);

    drop.animate(

        [
            {
                transform:
                    "translateY(-20px) scale(0.5)",
                opacity: 0
            },
            {
                transform:
                    "translateY(80px) scale(1)",
                opacity: 1
            },
            {
                transform:
                    "translateY(140px) scale(0.7)",
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
   GALLERY
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
    document.getElementById("galleryImage");

const dots =
    document.querySelectorAll(".dot");


function showPhoto(index) {

    if (!galleryImage) return;

    currentPhoto =
        (index + photos.length)
        % photos.length;

    galleryImage.classList.add(
        "photo-changing"
    );

    setTimeout(() => {

        galleryImage.src =
            photos[currentPhoto];

        galleryImage.onload = () => {

            galleryImage.classList.remove(
                "photo-changing"
            );

        };

        updateDots();

    }, 250);

}


function nextPhoto() {

    showPhoto(currentPhoto + 1);

}


function previousPhoto() {

    showPhoto(currentPhoto - 1);

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
   AUTO GALLERY
========================================== */

let galleryTimer;

function startGalleryAutoPlay() {

    clearInterval(galleryTimer);

    galleryTimer =
        setInterval(() => {

            if (currentScene === 4) {

                nextPhoto();

            }

        }, 4500);

}

startGalleryAutoPlay();


/* ==========================================
   WHEEL
========================================== */

const wheel =
    document.getElementById("wheel");

const wheelResult =
    document.getElementById("wheelResult");

const spinBtn =
    document.getElementById("spinBtn");


let wheelRotation = 0;

let spinning = false;


/*

6 ช่อง

0 = กอด
1 = จุ๊บ
2 = บอกรัก
3 = กินข้าว
4 = เที่ยว
5 = เซอร์ไพรส์

*/

const wheelTasks = [

    {
        icon: "🤗",
        title: "กอดแม่ 1 ที",
        description:
            "กอดแม่แน่น ๆ 1 ครั้ง แล้วบอกแม่ว่า หนูรักแม่นะ ❤️"
    },

    {
        icon: "😘",
        title: "จุ๊บแก้มแม่ 2 ข้าง",
        description:
            "จุ๊บแก้มซ้าย 1 ที และแก้มขวาอีก 1 ที 💕"
    },

    {
        icon: "❤️",
        title: "บอกรักแม่",
        description:
            "พูดออกมาดัง ๆ เลยว่า \"หนูรักแม่นะ\" 💗"
    },

    {
        icon: "🍚",
        title: "พาแม่กินข้าว",
        description:
            "วันนี้แม่อยากกินอะไร หนูตามใจแม่เลย 🍜"
    },

    {
        icon: "🚗",
        title: "พาแม่เที่ยว 1 ที่",
        description:
            "เลือกสถานที่ที่แม่อยากไป แล้วพาแม่ไปเที่ยวกัน 🌳"
    },

    {
        icon: "💐",
        title: "เซอร์ไพรส์แม่",
        description:
            "มอบดอกมะลิให้แม่ พร้อมกอดหนึ่งที 🌼"
    }

];


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

    const sectionAngle = 360 / 6;

    const targetAngle =
        360 -
        (
            randomIndex * sectionAngle
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
   TASK
========================================== */

let selectedTask = 0;

let completedTasks = 0;

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
        "taskBtn"
    ).textContent =
        "❤️ ทำภารกิจสำเร็จ";

    document.getElementById(
        "taskArea"
    ).innerHTML =
        `<div class="task-progress">
            ภารกิจแห่งความรัก 💕
        </div>`;

    goToScene(6);

}


/* ==========================================
   COMPLETE TASK
========================================== */

function completeTask() {

    startMusic();

    createHeartExplosion();

    completedTasks++;

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
   HEART EFFECT
========================================== */

function createHeartExplosion() {

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "🌼"
    ];

    for (let i = 0; i < 18; i++) {

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
            (18 + Math.random() * 20)
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

                easing: "ease-out"
            }

        ).onfinish = () => {

            heart.remove();

        };

    }

}


/* ==========================================
   RESTART
========================================== */

function restartGame() {

    location.reload();

}


/* ==========================================
   START MUSIC AFTER FIRST TOUCH
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


/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {

            nextPhoto();

        }

        if (event.key === "ArrowLeft") {

            previousPhoto();

        }

    }
);
