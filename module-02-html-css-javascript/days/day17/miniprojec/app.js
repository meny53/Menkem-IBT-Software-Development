// ==========================================
// PURE CALCULATION FUNCTIONS
// ==========================================

// Normal earn rule:
// 1 point for every 10 ETB
function normalEarnRule(amount) {
    return Math.floor(amount / 10);
}


// Holiday earn rule:
// Double the normal points
function holidayEarnRule(amount) {
    return normalEarnRule(amount) * 2;
}


// Pure function for adding points
function addPoints(currentPoints, pointsToAdd) {
    return currentPoints + pointsToAdd;
}


// Pure function for redeeming points
// Math.max prevents the result from going below zero
function subtractPoints(currentPoints, pointsToRedeem) {
    return Math.max(0, currentPoints - pointsToRedeem);
}



// ==========================================
// LOYALTY MODULE
// ==========================================

function createLoyaltyAccount(earnRule) {

    // PRIVATE VARIABLE
    // Nothing outside this function can access
    // points directly.
    let points = 0;


    // Earn points
    function earn(amount) {

        const earnedPoints = earnRule(amount);

        points = addPoints(points, earnedPoints);

        return earnedPoints;
    }


    // Redeem points
    function redeem(amount) {

        const oldPoints = points;

        points = subtractPoints(points, amount);

        return oldPoints - points;
    }


    // Getter
    function balance() {

        return points;
    }


    // Only these functions are exposed
    return {
        earn,
        redeem,
        balance
    };
}



// ==========================================
// CREATE CUSTOMER ACCOUNT
// ==========================================

// The normal rule is passed into the module
const loyalty = createLoyaltyAccount(normalEarnRule);



// ==========================================
// SELECT HTML ELEMENTS
// ==========================================

const balanceDisplay =
    document.querySelector("#balance");

const earnForm =
    document.querySelector("#earnForm");

const spendingInput =
    document.querySelector("#spending");

const redeemForm =
    document.querySelector("#redeemForm");

const redeemInput =
    document.querySelector("#redeemAmount");

const holidayButton =
    document.querySelector("#holidayButton");

const message =
    document.querySelector("#message");



// ==========================================
// UPDATE BALANCE ON SCREEN
// ==========================================

function updateBalance() {

    balanceDisplay.textContent =
        `${loyalty.balance()} points`;
}


updateBalance();



// ==========================================
// EARN POINTS
// ==========================================

earnForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const amount =
        Number(spendingInput.value);


    if (amount <= 0) {

        message.textContent =
            "Please enter a valid ETB amount.";

        return;
    }


    const earned =
        loyalty.earn(amount);


    message.textContent =
        `You earned ${earned} points!`;


    updateBalance();


    earnForm.reset();

});



// ==========================================
// HOLIDAY BONUS
// ==========================================

holidayButton.addEventListener("click", function() {

    const amount =
        Number(prompt("Enter the amount spent in ETB:"));


    if (amount <= 0 || isNaN(amount)) {

        message.textContent =
            "Please enter a valid ETB amount.";

        return;
    }


    // Create a new loyalty account using
    // the holiday earn rule.
    const holidayAccount =
        createLoyaltyAccount(holidayEarnRule);


    const earned =
        holidayAccount.earn(amount);


    // Transfer the earned holiday points
    // into the customer's main account.
    loyalty.earn(earned * 10);


    message.textContent =
        `Holiday bonus: ${earned} points earned!`;


    updateBalance();

});



// ==========================================
// REDEEM POINTS
// ==========================================

redeemForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const amount =
        Number(redeemInput.value);


    if (amount <= 0) {

        message.textContent =
            "Please enter a valid number of points.";

        return;
    }


    const redeemed =
        loyalty.redeem(amount);


    if (redeemed === 0) {

        message.textContent =
            "You do not have enough points.";

    } else {

        message.textContent =
            `You redeemed ${redeemed} points.`;

    }


    updateBalance();


    redeemForm.reset();

});