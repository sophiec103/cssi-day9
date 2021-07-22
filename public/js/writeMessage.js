function verifypasscode(passcode) {
    let hasNumber = false;
    let hasUpperCase = false;

    passcode.split('').forEach((value) => {
        if (/\d/.test(value)) {
            hasNumber = true
        } else {
            if (value === value.toUpperCase()) {
                hasUpperCase = true
            }
        }
    })


    if (hasNumber === false) {
        alert("Stronger password required (number required). Please try again.");
        return false
    }

    if (hasUpperCase === false) {
        alert("Stronger password required (uppercase required). Please try again.");
        return false
    }

    if (hasUpperCase && hasNumber) {
        return true
    }

}

function submitMessage() {
    const passcode = document.querySelector('#passcode').value;
    const message = document.querySelector("#message").value;
    if (verifypasscode(passcode)) {
        ;
        if (message.length < 25) {
            firebase.database().ref('/messages').push({
                passcode: passcode,
                message: message,
            })
        } else {
            alert("Message is too long. Please enter a shorter message")
        }
    }
}
