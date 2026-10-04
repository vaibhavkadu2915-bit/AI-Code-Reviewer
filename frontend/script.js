const codeInput = document.getElementById("codeInput");
const reviewButton = document.getElementById("reviewButton");
const result = document.getElementById("result");

const buttonText = document.getElementById("buttonText");
const characterCount = document.getElementById("characterCount");


// =========================================================
// CHARACTER COUNT
// =========================================================

codeInput.addEventListener("input", () => {

    const count = codeInput.value.length;

    characterCount.textContent =
        `${count} character${count === 1 ? "" : "s"}`;

});


// =========================================================
// REVIEW CODE
// =========================================================

reviewButton.addEventListener("click", async () => {

    const code = codeInput.value.trim();


    // ---------------------------------------------
    // Check empty input
    // ---------------------------------------------

    if (!code) {

        result.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    !
                </div>

                <h3>No code provided</h3>

                <p>
                    Please enter some code before starting the review.
                </p>

            </div>
        `;

        return;
    }


    // ---------------------------------------------
    // Loading state
    // ---------------------------------------------

    reviewButton.disabled = true;

    buttonText.textContent = "Analyzing...";


    result.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                ✦
            </div>

            <h3>Analyzing your code...</h3>

            <p>
                AI is reviewing your code for bugs,
                logic issues and possible improvements.
            </p>

        </div>
    `;


    try {

        console.log("Sending Code:");
        console.log(code);


        // ---------------------------------------------
        // Send code to backend
        // ---------------------------------------------

        const response = await fetch(
            "http://localhost:3000/review",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    code: code
                })
            }
        );


        // ---------------------------------------------
        // Convert response to JSON
        // ---------------------------------------------

        const data = await response.json();


        console.log("Backend response:");
        console.log(data);


        // ---------------------------------------------
        // Handle backend error
        // ---------------------------------------------

        if (!response.ok) {

            result.innerHTML = `
                <div class="empty-state">

                    <div class="empty-icon">
                        !
                    </div>

                    <h3>Review unavailable</h3>

                    <p>
                        ${data.review || data.message || "Something went wrong."}
                    </p>

                </div>
            `;

            return;
        }


        // ---------------------------------------------
        // Display AI review
        // ---------------------------------------------

        result.innerHTML = marked.parse(
            data.review || data.message
        );


    } catch (error) {

        console.error("Frontend error:", error);


        result.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    !
                </div>

                <h3>Connection error</h3>

                <p>
                    Could not connect to the backend.
                    Make sure your Node.js server is running.
                </p>

            </div>
        `;

    } finally {

        // ---------------------------------------------
        // Restore button
        // ---------------------------------------------

        reviewButton.disabled = false;

        buttonText.textContent = "Review Code";

    }

});