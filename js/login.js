if (localStorage.getItem("userObject") == null) {
    let userObject = []
    localStorage.setItem("userObject", JSON.stringify(userObject));
}
function hash(plainPass) {
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(plainPass);
    let hash = hashObj.getHash("HEX");
    return hash
}
function signUp() {
    
    username = $("#username").val();
    pass = $("#pass").val();
    email = $("#email").val();
    // message = document.getElementById("message");

    let listPassword = [];
    let listNames = [];
    let listEmails = [];
    let userObject = []

    if (localStorage.getItem("passwords") !== null) {
        listPassword = JSON.parse(localStorage.getItem("passwords"));
        listNames = JSON.parse(localStorage.getItem("names"));
        listEmails = JSON.parse(localStorage.getItem("emails"));
        userObject = JSON.parse(localStorage.getItem("userObject"));
        if (listNames.indexOf(username)==-1 && listEmails.indexOf(email)==-1 && email.indexOf("@gmail.com" !=-1)) {
            listPassword.push(hash(pass));
            listNames.push(username);
            listEmails.push(email);
            userObject.push([]);
            document.getElementById("message").innerHTML = "Successfully registered";
            setTimeout(() => { document.getElementById("signUp").style.visibility = "Hidden" }, 500);
            setTimeout(() => { document.getElementById("signIn").style.visibility = "visible" }, 500);
        }
        else {
            $("#message").html("Message Error");
        }
    }
    else {
        if (email.indexOf("@gmail.com") !=-1) {
            listPassword.push(hash(pass));
            listNames.push(username);
            listEmails.push(email);
            userObject.push([]);
            document.getElementById("message").innerHTML = "Successfully registered!";
            console.log("Success");
            setTimeout(() => { document.getElementById("signUp").style.visibility = "Hidden" }, 500);
            setTimeout(() => { document.getElementById("signIn").style.visibility = "visible" }, 500);
        } else {
            $("#message").html("Message Error");
        }
        
    }
    
    localStorage.setItem("names",JSON.stringify(listNames));
    localStorage.setItem("passwords",JSON.stringify(listPassword));
    localStorage.setItem("emails", JSON.stringify(listEmails));
    localStorage.setItem("userObject", JSON.stringify(userObject));

}

function signIn() {
    if (localStorage.getItem("names") != null) {
        let username = document.getElementById("name").value;
        let pass = document.getElementById("password").value;
        
        let listNames = JSON.parse(localStorage.getItem("names"));
        let listPassword = JSON.parse(localStorage.getItem("passwords"));
        let index = listNames.indexOf(username);

        if (listPassword[index] == hash(pass)) {
            localStorage.setItem("recentUser", index)
            document.getElementById("logInMessage").innerHTML = "Successfully logged in!";
            setTimeout(() => { location.replace("index.html")}, 500);
        } else {
            document.getElementById("logInMessage").innerHTML = "Log in failed";
        }
    } else {
        $("#logInMessage").html("Log in failed");
    }
    
    
}

function direct(a) {
    if (a == "signin") {
        document.getElementById("signUp").style.visibility = "Hidden" ;
        document.getElementById("signIn").style.visibility = "visible";
    }
    if (a == "signup") {
        document.getElementById("signUp").style.visibility = "visible" ;
        document.getElementById("signIn").style.visibility = "Hidden";
    }
}

function homepage() {
    location.replace("index.html")
}
