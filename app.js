const CONFIG = {
    anniversary: "2025-04-04",
    photos: [
        { src: "image/img1.jpg", caption: "Helu miuu" },
        { src: "image/img2.jpg", caption: "Hun bé chưa nèe" },
        { src: "image/img3.jpg", caption: "Xinh gái hongg" },
        { src: "image/img4.jpg", caption: "Nhìn chộm miuu" },
    ],
    musicList: [
        { img: "image/Love For You.png", src: "music/Love For You.mp3", title: "Love For You", artist: "LOVELI LORI, ovg" },// 
        { img: "image/One Of The Girls.png", src: "music/One Of The Girls.mp3", title: "One Of The Girls", artist: "The Weeknd, Lily-Rose Depp" },// The Weeknd, Lily-Rose Depp, Mike Dean, Ramsey, Sam Levinson
        { img: "image/I Was Never There.png", src: "music/I Was Never There.mp3", title: "I Was Never There", artist: "The Weeknd" }, // The Weeknd
        { img: "image/The Lost Soul Down.png", src: "music/The Lost Soul Down.mp3", title: "The Lost Soul Down", artist: "NBSPLV" }, // NBSPLV
        { img: "image/Mind Games.png", src: "music/Mind Games.mp3", title: "Mind Games", artist: "Sickick" }, // Sickick
    ],
    tickets: [
        "Chơi game cùng bé",
        "Nhắn tin cho bé",
        "Gửi nụ hun gió ♡",
        "Cưng chiều bé nèe",
    ],
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function createFloatingHearts() {
    const container = document.getElementById("hearts-container");
    const colors = ["#ffe4e6", "#ffccd5", "#ffb6c1", "#ff99ac", "#ff7f9c"];

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement("div");
        heart.className = "fixed bottom-[-40px]";
        heart.style.left = `${5 + Math.random() * 90}%`;
        heart.style.animation = `floatUp 8s ${i * 1.5}s linear infinite`;

        const size = 20 + Math.random() * 20;
        const color = colors[Math.floor(Math.random() * colors.length)];

        heart.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
                <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"/>
            </svg>
        `;
        container.appendChild(heart);
    }
}


function computeDaysTogether(dateStr) {
    const start = new Date(dateStr).getTime();
    const now = Date.now();
    return Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
}

function renderCountdown() {
    const start = new Date(CONFIG.anniversary);
    const el = $("#countdown");
    function tick() {
        const now = new Date();
        let target = new Date(start);
        target.setFullYear(now.getFullYear());
        if (target < now) {
            target.setFullYear(target.getFullYear() + 1);
        }

        const diff = target - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const data = [
            { v: days, t: "Ngày" },
            { v: hours, t: "Giờ" },
            { v: minutes, t: "Phút" },
            { v: seconds, t: "Giây" },
        ];
        el.innerHTML = data.map(
            x => `
            <div class="card rounded-2xl p-3  backdrop-blur-md border-b border-white/40 bg-white/10 shadow-sm">
                <div class="text-2xl font-bold">${String(x.v).padStart(2, "0")}</div>
                <div class="text-xs opacity-70">${x.t}</div>
            </div>`
        ).join("");
    }

    tick();
    setInterval(tick, 10)
}

function initSlideshow() {
    const wrap = $("#slideshow");
    const caption = $("#slide-caption");
    let idx = 0;
    const len = CONFIG.photos.length;

    CONFIG.photos.forEach((p, i) => {
        const img = document.createElement("img");
        img.className = "slide-img" + (i === 0 ? " active" : "");
        img.src = p.src;
        img.alt = p.caption || `photo-${i}`;
        img.loading = "lazy";
        wrap.appendChild(img);
    });

    function show(i) {
        idx = (i + len) % len;
        $$(".slide-img").forEach((im, k) => {
            im.classList.toggle("active", k === idx);
        });
        caption.textContent = CONFIG.photos[idx]?.caption || "";
    }

    let slideInterval = setInterval(() => show(idx + 1), 3500);

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => show(idx + 1), 3500);
    }

    $("#prev-slide").addEventListener("click", () => {
        show(idx - 1);
        resetInterval();
    });
    $("#next-slide").addEventListener("click", () => {
        show(idx + 1);
        resetInterval();
    });
    show(0);
}


function renderTickets() {
    const box = $("#tickets");
    box.innerHTML = CONFIG.tickets
        .map(t => `<div class="card rounded-2xl p-4 backdrop-blur-md border-b border-white/40 bg-white/40 shadow text-sm text-center">${t}</div>`)
        .join("");
}

function initAudio() {
    const audio = document.getElementById("bg-audio");
    const listEl = document.getElementById("music-list");
    let currentIndex = null;

    const iconPlay = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.018 14L14.41 8 4.018 2z"/>
        </svg>`;
    const iconPause = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5 3h2v10H5V3zm4 0h2v10H9V3z"/>
        </svg>`;

    listEl.innerHTML = "";

    CONFIG.musicList.forEach((track, i) => {
        const li = document.createElement("li");
        li.className = "flex items-center justify-between p-3 backdrop-blur-md border-b border-white/40 bg-white/10 rounded-xl shadow hover:shadow-md transition";

        const img = document.createElement("img");
        img.src = track.img || "";
        img.alt = track.title;
        img.className = "w-12 h-12 rounded-md mr-3 object-cover";

        const textWrap = document.createElement("div");
        textWrap.className = "flex flex-col flex-1";

        const title = document.createElement("span");
        title.textContent = track.title;
        title.className = "font-semibold";

        const artist = document.createElement("span");
        artist.textContent = track.artist || "";
        artist.className = "text-sm opacity-0.7";

        textWrap.appendChild(title);
        textWrap.appendChild(artist);

        const btn = document.createElement("button");
        btn.innerHTML = iconPlay;
        btn.className = "px-2 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 flex items-center justify-center";

        btn.addEventListener("click", () => {
            if (currentIndex === i) {
                if (audio.paused) {
                    audio.play().catch(err => console.warn("Autoplay bị chặn:", err));
                } else {
                    audio.pause();
                }
            } else {
                playTrack(i);
            }
        });

        li.appendChild(img);
        li.appendChild(textWrap);
        li.appendChild(btn);
        listEl.appendChild(li);
    });

    function resetButtons() {
        document.querySelectorAll("#music-list button").forEach(b => b.innerHTML = iconPlay);
    }

    function playTrack(index, autoplay = true) {
        currentIndex = index;
        localStorage.setItem("lastTrack", index);
        audio.src = CONFIG.musicList[index].src;

        resetButtons();
        const btn = document.querySelectorAll("#music-list button")[index];

        const bgDiv = document.getElementById("bg-blur");
        if (CONFIG.musicList[index].img) {
            bgDiv.style.backgroundImage = `url('${CONFIG.musicList[index].img}')`;
        } else {
            bgDiv.style.backgroundImage = '';
        }

        if (autoplay) {
            audio.play().catch(err => console.warn("Autoplay bị chặn:", err));
        }
    }

    function enableSound() {
        if (audio.muted) {
            audio.muted = false;
            localStorage.setItem("audioUnmuted", "true");
        }
        document.removeEventListener("click", enableSound);
        document.removeEventListener("keydown", enableSound);
    }

    audio.addEventListener("timeupdate", () => {
        if (currentIndex !== null) {
            localStorage.setItem("currentTime", audio.currentTime);
        }
    });

    audio.addEventListener("playing", () => {
        if (currentIndex !== null) {
            const btn = document.querySelectorAll("#music-list button")[currentIndex];
            btn.innerHTML = iconPause;
        }
    });

    audio.addEventListener("pause", () => {
        if (currentIndex !== null) {
            const btn = document.querySelectorAll("#music-list button")[currentIndex];
            btn.innerHTML = iconPlay;
        }
    });

    window.addEventListener("load", () => {
        let savedIndex = parseInt(localStorage.getItem("lastTrack"));
        let savedTime = parseFloat(localStorage.getItem("currentTime")) || 0;

        if (isNaN(savedIndex)) savedIndex = 0;

        playTrack(savedIndex, false);
        audio.currentTime = savedTime;

        audio.play().catch(err => console.warn("Không autoplay được:", err));

        document.addEventListener("click", enableSound);
        document.addEventListener("keydown", enableSound);
    });

    audio.addEventListener("ended", () => {
        if (currentIndex !== null) {
            localStorage.setItem("currentTime", 0);
            let nextIndex = (currentIndex + 1) % CONFIG.musicList.length;
            playTrack(nextIndex);
        }
    });
}

function initCard() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const rx = (dy / rect.height) * -20;
            const ry = (dx / rect.width) * 20;
            card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
        });
    });
}

const btnGift = document.getElementById("btn-gift");
const btnGift2 = document.getElementById("btn-gift-2");
const modal = document.getElementById("gift-modal");
const btnClose = document.getElementById("btn-close");

btnGift2.addEventListener("click", () => {
    modal.classList.remove("hidden");
modal.classList.add("flex"); 
});

btnGift.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex"); 
});

btnClose.addEventListener("click", () => {
    modal.classList.add("hidden");
modal.classList.remove("flex");
});

modal.addEventListener("click", (e) => {
if (e.target === modal) {
    modal.classList.add("hidden");
modal.classList.remove("flex");
}
});

function boot() {
    $("#days-together").textContent = computeDaysTogether(CONFIG.anniversary);
    initAudio();
    createFloatingHearts();
    initSlideshow();
    renderCountdown();
    renderTickets();
    initCard();
}

const quizData = [
    {
        question: "Bé thích chơi với Miu chế độ nào nhất?",
        options: ["Rank", "Arena", "Wow"]
    },
    {
        question: "Màu yêu thích của bé là gì?",
        options: ["Hồng", "Cam", "Tím"]
    },
    {
        question: "Món ăn vặt bé thích nhất?",
        options: ["Bánh tráng", "Gà KFC", "Kem"]
    }
];

let currentQuestion = 0;

const quizNumber = document.getElementById("quizNumber");
const quizTotal = document.getElementById("quizTotal");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");

quizTotal.textContent = quizData.length;

function loadQuiz() {
    const q = quizData[currentQuestion];
    quizNumber.textContent = currentQuestion + 1;
    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = "";
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => nextQuestion();
        quizOptions.appendChild(btn);
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        quizQuestion.textContent = "Hoàn thành quiz!";
        quizOptions.innerHTML = "";
    }
}


loadQuiz();
document.addEventListener("DOMContentLoaded", boot)

  










