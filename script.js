window.addEventListener("DOMContentLoaded", function () // html file full ah load aagaurathuku intha line 
{
    const form = document.getElementById("feedback-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const ratingSelect = document.getElementById("rating");
    const commentInput = document.getElementById("comment");
    const feedbackList = document.getElementById("feedback-list");

    window.addEventListener("load", loadFeedbacks);

    form.addEventListener("submit", function (e) { // step 1
        e.preventDefault();
        const name = nameInput.value.trim();    //step 2
        const email = emailInput.value.trim();
        const rating = ratingSelect.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !email || !rating || !comment) { // empty check // step 3
            alert("Please fill all fields");
            return;
        }

        const feedback = {   // input value read panrom // step 4
            name,
            email,
            rating,
            comment,
            date: new Date().toLocaleString(),
        };

        saveFeedback(feedback);
        displayFeedback(feedback);
        form.reset(); // step 7
    });

    // Save to localStorage
    function saveFeedback(feedback) {   // feedback obj ah ithula pass panrom // step 5
        let feedbacks = []; 
        const stored = localStorage.getItem("feedbacks"); // old val iruka nu check panrom 
        if (stored) {
            try {
                feedbacks = JSON.parse(stored); // storing the first feedback and convert it into array
                if (!Array.isArray(feedbacks)) {
                    feedbacks = []; // fallback if corrupted
                }
            } catch (err) {
                feedbacks = []; // fallback if parse fails
            }
        }
        feedbacks.push(feedback); // feedback la ula values elam feedbacks ku add panrom
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks)); //array ah string ah mathrom
    }

    // Load and display feedbacks  // step 8
    function loadFeedbacks() {
        let stored = localStorage.getItem("feedbacks");
        if (stored) {
            try {
                const feedbacks = JSON.parse(stored);// string to array conversion
                if (Array.isArray(feedbacks)) {
                    feedbacks.forEach(displayFeedback);
                }
            } catch (e) {
                console.error("Failed to parse feedbacks from localStorage", e);
            }
        }
    }

    // Display a single feedback on the page
    function displayFeedback(feedback) {  // step 6
        const div = document.createElement("div");
        div.className = "feedback-item";
        div.innerHTML = `
            <h4>${feedback.name} <span class="stars">${"*".repeat(feedback.rating)}</span></h4>
            <p><strong>Email:</strong> ${feedback.email}</p>
            <p><strong>Comment:</strong> ${feedback.comment}</p>
            <p><small>${feedback.date}</small></p>
        `;
        feedbackList.appendChild(div);
    }
});

    