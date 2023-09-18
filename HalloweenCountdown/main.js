let days = 2;
let hours = 4;
let minutes = 1;
let seconds = 15;

const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(countdownInterval);
        const countdownContainer = document.getElementById("countdown-container");
        
        countdownContainer.textContent = "Event has started!";
        countdownContainer.classList.add("event-started"); 
        countdownContainer.classList.add("glow"); 
        return;
    }

    seconds--;

    if (seconds < 0) {
        seconds = 59;
        minutes--;

        if (minutes < 0) {
            minutes = 59;
            hours--;

            if (hours < 0) {
                hours = 23;
                days--;

                if (days < 0) {
                    days = 0;
                }
            }
        }
    }
    
    document.getElementById("dy").textContent = days;
    document.getElementById("hr").textContent = hours;
    document.getElementById("min").textContent = minutes;
    document.getElementById("sec").textContent = seconds;

    // Update the text based on the remaining time
    document.getElementById("dy-txt").textContent = days === 1 ? "Day" : "Days";
    document.getElementById("hr-txt").textContent = hours === 1 ? "Hour" : "Hours";
    document.getElementById("min-txt").textContent = minutes === 1 ? "Minute" : "Minutes";
    document.getElementById("sec-txt").textContent = seconds === 1 ? "Second" : "Seconds";
}
