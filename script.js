// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yay! I love you my love <3";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});

// Background music is handled by the hidden YouTube embed in the HTML.
// The iframe uses autoplay=1&mute=1&loop=1 to play in the background continuously.

// --- YouTube IFrame API player setup (autoplay muted, unmute on first user click) ---
let ytPlayer = null;

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: 'gDlp7Oji95k',
        playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            loop: 1,
            playlist: 'gDlp7Oji95k',
            modestbranding: 1
        },
        events: {
            onReady: function(e){
                try{ e.target.mute(); e.target.playVideo(); }catch(err){}
            }
        }
    });
}

// Unmute on first user click; if player isn't ready yet, retry a few times.
function setupUnmuteOnFirstClick(){
    function handler(){
        let attempts = 0;
        function tryUnmute(){
            attempts++;
            if(ytPlayer && typeof ytPlayer.unMute === 'function'){
                try{ ytPlayer.unMute(); ytPlayer.setVolume(70); }catch(e){}
            }else if(attempts < 10){
                setTimeout(tryUnmute, 200);
            }
        }
        tryUnmute();
        document.removeEventListener('click', handler);
    }
    document.addEventListener('click', handler, {once: true});
}

// Install the unmute handler as soon as the page script runs.
setupUnmuteOnFirstClick();
