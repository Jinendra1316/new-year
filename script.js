// Run after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    const countdownEl = document.getElementById("countdown");
    const timerEl = document.getElementById("timer");

    // REAL New Year 2026
    const newYear = new Date("Jan 1, 2026 00:00:00").getTime();

    // TEST MODE (1 minute)
    // const newYear = new Date(Date.now() + 60 * 1000).getTime();

    function hideAllQuestions() {
        document.querySelectorAll(".question").forEach(q =>
            q.classList.add("hidden")
        );
    }

    /* ---------------- COUNTDOWN ---------------- */
    const intervalId = setInterval(() => {
        const now = Date.now();
        const diff = newYear - now;

        if (diff <= 0) {
            clearInterval(intervalId);
            countdownEl.classList.add("hidden");
            hideAllQuestions();
            document.getElementById("q1").classList.remove("hidden");
            return;
        }

        const s = Math.floor((diff / 1000) % 60);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));

        timerEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);

    /* ---------------- ANSWER HANDLING ---------------- */

    const reaction = document.getElementById("reaction");
    const reactionText = document.getElementById("reactionText");
    const reactionGif = document.getElementById("reactionGif");

    const yesReactions = {
        1: {
            text: "That already made my heart smile 🥹❤️",
            gif: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
        },
        2: {
            text: "Every moment with you feels warmer 🌙✨",
            gif: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
        },
        3: {
            text: "Then I promise to never let go 🫶",
            gif: "https://media.giphy.com/media/l0MYyDa8S9ghzNebm/giphy.gif"
        },
        4: {
            text: "You’ll always have me 🤍",
            gif: "https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
        }
    };

    window.answer = function (qNum, choice) {
        hideAllQuestions();
        reaction.classList.remove("hidden");

        if (choice === "yes") {
            reactionText.textContent = yesReactions[qNum].text;
            reactionGif.src = yesReactions[qNum].gif;

            setTimeout(() => {
                reaction.classList.add("hidden");
                const nextQ = document.getElementById(`q${qNum + 1}`);
                if (nextQ) {
                    nextQ.classList.remove("hidden");
                } else {
                    showMessage();
                }
            }, 3000);

        } else {
            reactionText.textContent =
                "That’s completely okay… I just wanted you to feel loved and safe 🤍";
            reactionGif.src =
                "https://media.giphy.com/media/9d3LQ6TdV2Flo8ODTU/giphy.gif";
        }
    };

    /* ---------------- FINAL MESSAGE ---------------- */

    window.showMessage = function () {
        hideAllQuestions();
        reaction.classList.add("hidden");
        document.getElementById("message").classList.remove("hidden");
    };

    /* ---------------- VIDEO SURPRISE ---------------- */

    window.showSurprise = function () {
        document.getElementById("message").classList.add("hidden");

        const surprise = document.getElementById("surprise");
        const video = document.getElementById("surpriseVideo");

        // Disable background blur & overlay
        document.body.classList.add("video-playing");

        surprise.classList.remove("hidden");
        video.currentTime = 0;
        video.play();

        // Restore background when video ends
        video.onended = () => {
            document.body.classList.remove("video-playing");
        };
    };
});
