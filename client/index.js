let ID_interval = 0; // export the interval ID (to stop it later)
let output = document.getElementById("output-ul"); // get the output list
let server_url = "http://192.168.178.60:8000"
let chat_url = server_url + "/chat"
let refresh_rate = 1000;

// main retriving function
const main = () => {
    // export the result variable to function scope
    let result = NaN;
    // get Interval ID and start the interval function
    ID_interval = setInterval(() => {
        // send the request for the messages
        $.ajax({
            url: chat_url,
            method: "GET",
            success: (res) => {
                // export the result
                result = res;
            }
        });
        try {
            // clear the output ul
            output.innerHTML = "";
            // append each message to the ul
            result["msg"].forEach((msg) => {
                let li = document.createElement("li");
                // formatting string
                
                li.innerText = `${msg.date} | ${msg.user} >>> ${msg.text}`
                output.appendChild(li);
            });
        } catch (err) {
            // if TypeError (undefined) don't inerupt, because the server might be unreachable
            if (err instanceof TypeError) {} else {
                // else, throw is
                throw err;
            }
        };
    }, refresh_rate);    
}

// Function to start the refreshing on button click
// TODO: cleanup
$("#start").on("click", () => {
    main();
});

// start when the page loads
$(document).ready(() => {
    main();
});

// clear the interval to stop refreshing
$("#stop").on("click", () => {
    clearInterval(ID_interval);
});

// send the message to the server
// TODO: Implement function
$("#submit").on("click", () => {
    if ($("#username")[0].value === "") {
        alert("You have to give a username!");
        return;
    }
    if ($("#message")[0].value === "") {
        alert("You have to put in a message!");
        return;
    }
    let date = new Date(Date.now());
    data = {
        "text": $("#message")[0].value,
        "user": $("#username")[0].value,
        "date": `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    $.ajax({
        url: chat_url,
        method: "POST",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
});

// clear the message field when pressing send
$("#submit").on("click", () => {
    document.getElementById("message").value = ""
})