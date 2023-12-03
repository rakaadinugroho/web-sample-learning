function toggleMainMenu() {
    const body = document.body;
    body.classList.toggle("menu-open");
}

const data = [
    {
        "title": "Giant Asteroid To Collide With Earth Next Week",
        "meta": "Science & Technology",
        "short_description": "A giant asteroid is on a collision course with Earth and is expected to hit next week, according to a new study.",
        "description": "Scientists from around the world are closely monitoring the trajectory of a massive asteroid hurtling toward Earth. Estimated to be about 1 mile in diameter, this celestial behemoth poses a significant threat if it collides with our planet. In the event of impact, widespread devastation is anticipated, prompting authorities to consider potential mitigation strategies. As the scientific community races against time, the global population anxiously awaits updates on this unprecedented cosmic threat.",
        "image": "https://example.com/asteroid_image.jpg",
        "slug": "giant-asteroid-collision-earth"
    },
    {
        "title": "New Vaccine Found To Cure All Cancers",
        "meta": "Health & Wellness",
        "short_description": "A new vaccine has been developed that can cure all types of cancer, according to a new study.",
        "description": "In a groundbreaking breakthrough, researchers have unveiled a revolutionary vaccine with the potential to eradicate all forms of cancer. Extensive clinical trials demonstrate unprecedented success, showing a 100% cure rate among patients with advanced cancer. The scientific community heralds this development as a monumental leap forward in the fight against one of humanity's most formidable adversaries. Anticipation is high as the world eagerly awaits the public release of this groundbreaking vaccine, which promises to reshape the landscape of cancer treatment.",
        "image": "https://example.com/vaccine_image.jpg",
        "slug": "new-vaccine-cure-all-cancers"
    },
    {
        "title": "Elon Musk Buys Twitter For $1 Trillion",
        "meta": "Business & Technology",
        "short_description": "Elon Musk has purchased Twitter for $1 trillion, making him the sole owner of the social media platform.",
        "description": "In a stunning move that sent shockwaves through the business and technology sectors, entrepreneur Elon Musk has acquired Twitter for an astronomical $1 trillion. Musk, known for his ventures in electric vehicles and space exploration, now adds a social media giant to his portfolio. Expressing his vision for a more open and transparent platform, Musk assures users that Twitter will undergo significant changes. The acquisition sparks debates on the influence of tech moguls in shaping online discourse and the future direction of social media platforms.",
        "image": "https://example.com/musk_twitter_image.jpg",
        "slug": "elon-musk-buys-twitter"
    }
];


let currUtterance = null
function showNews() {
    const mainContent = document.querySelector(".main-content");

    data.forEach(( { title, meta, short_description: description }, index) => {
        const articleEl = document.createElement("article");

        const playId = `play-${index}`;

        articleEl.innerHTML = `
            <a href="#" class="article-title">${title}</a>
            <span class="meta-container">${meta} <button id="${playId}" class="play-button">Play</button> </span>
            <p>${description}</p>
        `;

        mainContent.appendChild(articleEl);

        const player = document.getElementById(playId);
        player.addEventListener("click", function () {
            if (!player.classList.contains("played")) {
                player.classList.add("played");
            } else {
                player.classList.remove("played");
            }
            playContent(description);
        });
    });
}

// Web API Synthesis
function playContent(text) {
    const synth = window.speechSynthesis;
    if( synth !== undefined ) {
        const utterance = new SpeechSynthesisUtterance(text);
        if (currUtterance != null) {
            synth.cancel()
            currUtterance = null
        }
        synth.speak(utterance);
        currUtterance = utterance;
    }
}

(function () {
    showNews()
}());

// DarkMode Handler
let darkModeCheckbox = document.querySelector("#switch");
darkModeCheckbox.addEventListener("change", function (){
    if (this.checked) {
        document.documentElement.setAttribute("data-theme", "dark")
    } else {
        document.documentElement.setAttribute("data-theme", "light")
    }
});

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(registration => {
            console.log("Service worker scope berhasil", registration.scope);
        })
        .catch(error => {
            console.log("Error Register SW", error);
        })
}