function loadFunction() {
    if (localStorage.getItem("recentUser") != null) {
        let user = JSON.parse(localStorage.getItem("recentUser"));
        let username = JSON.parse(localStorage.getItem("names"));
        document.getElementById("message").innerHTML = "Hello " + username[Number(user)] + " !";
    }
}