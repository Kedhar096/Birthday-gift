// =====================================
// BIRTHDAY SURPRISE PROJECT
// =====================================

// SCENES

const scenes = document.querySelectorAll(".scene");

const intro = document.getElementById("intro");
const countdown = document.getElementById("countdown");
const birthday = document.getElementById("birthday");
const gallery = document.getElementById("gallery");
const message = document.getElementById("message");
const cakeScene = document.getElementById("cakeScene");
const giftScene = document.getElementById("giftScene");
const letterScene = document.getElementById("letterScene");

// ELEMENTS

const startBtn = document.getElementById("startBtn");
const music = document.getElementById("music");
const countNumber = document.getElementById("countNumber");
const photo = document.getElementById("photo");
const giftBox = document.getElementById("giftBox");

// PHOTOS

const photos = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg"
];

// SHOW SCENE

function showScene(scene) {

    scenes.forEach(function (item) {
        item.classList.remove("active");
    });

    scene.classList.add("active");
}

// START BUTTON

startBtn.addEventListener("click", function () {

    // Browser allows music after user interaction
    music.play().catch(function (error) {
        console.log("Music could not autoplay:", error);
    });

    gsap.to(intro, {
        opacity: 0,
        duration: 1,

        onComplete: function () {

            showScene(countdown);

            startCountdown();
        }
    });

});

// COUNTDOWN

function startCountdown() {

    const numbers = ["3", "2", "1"];

    let index = 0;

    countNumber.textContent = numbers[index];

    animateCount();

    const timer = setInterval(function () {

        index++;

        if (index >= numbers.length) {

            clearInterval(timer);

            setTimeout(showBirthday, 700);

            return;
        }

        countNumber.textContent = numbers[index];

        animateCount();

    }, 1500);
}

function animateCount() {

    gsap.fromTo(
        countNumber,

        {
            scale: 0.2,
            opacity: 0
        },

        {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(2)"
        }
    );
}

// BIRTHDAY

function showBirthday() {

    showScene(birthday);

    confetti({
        particleCount: 250,
        spread: 180,
        origin: {
            y: 0.6
        }
    });

    gsap.from("#birthday .glass-card", {
        y: 80,
        opacity: 0,
        duration: 1.4
    });

    setTimeout(showGallery, 5000);
}

// GALLERY

function showGallery() {

    showScene(gallery);

    let index = 0;

    photo.src = photos[index];

    gsap.from(photo, {
        scale: 0.8,
        opacity: 0,
        duration: 1
    });

    const slideshow = setInterval(function () {

        index++;

        if (index >= photos.length) {

            clearInterval(slideshow);

            setTimeout(showMessage, 1000);

            return;
        }

        gsap.to(photo, {

            opacity: 0,
            scale: 1.2,
            duration: 0.8,

            onComplete: function () {

                photo.src = photos[index];

                gsap.fromTo(
                    photo,

                    {
                        opacity: 0,
                        scale: 0.8
                    },

                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1
                    }
                );
            }
        });

    }, 3500);
}

// MESSAGE

function showMessage() {

    showScene(message);

    new Typed("#typing", {

        strings: [

            "Happy Birthday! 🎉<br><br>" +

            "Wishing you a year full of happiness, success, and unforgettable memories.<br><br>" +

            "May every day bring you new reasons to smile.<br><br>" +

            "Have the most wonderful birthday ever! 🥳✨"

        ],

        typeSpeed: 45,
        backSpeed: 0,
        showCursor: false
    });

    gsap.from(".message-box", {
        y: 60,
        opacity: 0,
        duration: 1.2
    });

    setTimeout(showCake, 14000);
}

// CAKE

function showCake() {

    showScene(cakeScene);

    gsap.from(".cake", {

        scale: 0,
        rotation: 360,
        duration: 2,
        ease: "elastic.out(1, 0.5)"
    });

    gsap.from("#cakeScene h2", {

        opacity: 0,
        y: 40,
        duration: 1,
        delay: 1
    });

    setTimeout(showGift, 6000);
}

// GIFT

function showGift() {

    showScene(giftScene);

    gsap.from(giftBox, {

        scale: 0,
        rotation: -180,
        duration: 1.5,
        ease: "bounce.out"
    });
}

// GIFT CLICK

giftBox.addEventListener("click", function () {

    gsap.to(".lid", {

        y: -40,
        rotation: -10,
        duration: 0.8
    });

    confetti({

        particleCount: 400,
        spread: 220,

        origin: {
            y: 0.6
        }
    });

    setTimeout(showLetter, 1200);
});

// LETTER

function showLetter() {

    showScene(letterScene);

    gsap.from(".letter", {

        scale: 0.6,
        opacity: 0,
        duration: 1.5
    });

    startFireworks();
}

// FIREWORKS

let fireworksStarted = false;

function startFireworks() {

    if (fireworksStarted) {
        return;
    }

    fireworksStarted = true;

    setInterval(function () {

        confetti({

            particleCount: 120,
            spread: 90,
            startVelocity: 45,

            origin: {
                x: Math.random(),
                y: Math.random() * 0.5
            }

        });

    }, 1800);
}

// FLOATING HEARTS

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent = "💖";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        18 + Math.random() * 22 + "px";

    heart.style.animationDuration =
        6 + Math.random() * 4 + "s";

    document.body.appendChild(heart);

    setTimeout(function () {

        heart.remove();

    }, 10000);
}

setInterval(createHeart, 700);

// FLOATING BALLOONS

const balloonColors = [
    "red",
    "blue",
    "yellow",
    "green",
    "purple"
];

function createBalloon() {

    const balloon = document.createElement("div");

    const randomColor =
        balloonColors[
            Math.floor(Math.random() * balloonColors.length)
        ];

    balloon.className = "balloon " + randomColor;

    balloon.style.left =
        Math.random() * 100 + "vw";

    balloon.style.animationDuration =
        10 + Math.random() * 6 + "s";

    document.body.appendChild(balloon);

    setTimeout(function () {

        balloon.remove();

    }, 17000);
}

setInterval(createBalloon, 2200);

// SHOOTING STAR

function shootingStar() {

    const star = document.createElement("div");

    star.style.position = "fixed";
    star.style.width = "3px";
    star.style.height = "3px";

    star.style.background = "white";
    star.style.borderRadius = "50%";

    star.style.boxShadow = "0 0 15px white";

    star.style.left = "-10px";

    star.style.top =
        Math.random() * window.innerHeight / 2 + "px";

    star.style.zIndex = "9999";

    document.body.appendChild(star);

    gsap.to(star, {

        x: window.innerWidth + 300,
        y: 350,

        duration: 1.5,

        ease: "power2.out",

        onComplete: function () {

            star.remove();
        }
    });
}

setInterval(shootingStar, 5000);

// GLASS CARD GLOW

gsap.to(".glass-card", {

    boxShadow:
        "0 0 60px rgba(255, 105, 180, 0.45)",

    repeat: -1,

    yoyo: true,

    duration: 2
});

console.log("🎉 Birthday Surprise Project Loaded Successfully");