// Setup data
let userObject = [];
let currentUserData = [];
let usernames = [];
let currentStory = null;
if (localStorage.getItem("userObject") != null) {
    setInterval(() => { 
        let userID = Number(JSON.parse(localStorage.getItem("recentUser")));
        userObject = JSON.parse(localStorage.getItem("userObject"));
        usernames = JSON.parse(localStorage.getItem("names"));
        currentUserData = userObject[userID];
    }, 500);
}
// Display Stories

function displayUserStories() {
    $("#display").empty();
    for (let i = 0; i < currentUserData.length; i++) {
        if (currentUserData[i] != null) {
            let title = currentUserData[i].title;
            let content = currentUserData[i].content; 
            $("#display").append(
                `<div class="storyCompo">
                    <h1>${title}</h1>
                    <i class="fa fa-trash" onclick="redirect('delete','${i}')" style="font-size:5vh"></i>
                    <p>${content}</p>
                    <div class="editBtn" onclick="redirect('write','${i}')">Edit</div>
                </div>`
            )
        }
    }
}

// Save stories
function save() {
    let title = $("#title")[0].innerText;
    let content = $("#content")[0].innerText;
    let userID = Number(JSON.parse(localStorage.getItem("recentUser")));
    let data = JSON.parse(localStorage.getItem("userObject"));
    let user = data[userID];
    if ($("#saveBtn").html() == "Save changes") {
        let object = {title: title, content: content, id: Number(currentStory)};
        user[Number(currentStory)] = object;
        data[userID] = user;
        localStorage.setItem("userObject", JSON.stringify(data));
    } else {
        let object = {title: title, content: content, id: user.length};
        user.push(object);
        data[userID] = user;
        localStorage.setItem("userObject", JSON.stringify(data));
        $("#saveBtn").html("Save changes");
        currentStory = user.length-1;
    }
    setTimeout(() => { redirect("home") }, 500);
}
// Custom webpage base on user condition
function profile() {
    if (document.getElementById("profile").innerHTML == "Login") {
        location.replace("login.html")
    }
    else if (document.getElementById("profile").innerHTML == "Log out") {
        localStorage.removeItem("recentUser")
        document.getElementById("profile").innerHTML= "Login"
        document.getElementById("create").style.display = "none";
        $("#display").empty();
    }
}
// Detail Page
function detail(author, id) {
    $("#display").hide();
    $("#detail").show();
    $("#detail").empty();
    let story = userObject[Number(author)][Number(id)];
    $("#detail").append(
        `<h1>${story.title}</h1>
         <h5>By ${usernames[Number(author)]}</h5>
         <p>${story.content}</p>`
    )

}
// Other function
function redirect(method, id) {
    if (method == "write") {
        document.getElementById("write").style.display = "block";
        document.getElementById('wrap').style.display = "none";
        if (id != null) {
            currentStory = Number(id);
            $("#title").html(currentUserData[Number(id)].title);
            $("#content").html(currentUserData[Number(id)].content);
            $("#saveBtn").html("Save changes");
        } else {
            $("#title").html("Title");
            $("#content").html("");
            $("#saveBtn").html("Save");
        }
    }
    if (method == "save") {
        save();
    }
    if (method == "read") {
        document.getElementById("write").style.display = "none";
        document.getElementById('wrap').style.display = "block";
        $("#display").empty();
        for (let i = 0; i < userObject.length; i++) {
            for (let j = 0; j < userObject[i].length; j++) {
                if (userObject[i][j] != null) {
                    let title = userObject[i][j].title;
                    let content = userObject[i][j].content; 
                    $("#display").append(
                        `<div class="storyCompo" onclick="detail(${i}, ${j})">
                            <h1>${title}</h1>
                            <p style="white-space: pre-wrap">${content}</p>
                            <div class="editBtn">Edit</div>
                        </div>`
                    )
                }
            }
        }
        $(".storyCompo .editBtn").hide();
        $("#logo").hide();
        $("#detail").hide();
        $(".display").show();
        $(".display").css({"flex-direction":"column"});
        $(".storyCompo").css({"width":"40vw"})
    }

    if (method == "delete") {
        let userID = Number(JSON.parse(localStorage.getItem("recentUser")));
        let data = JSON.parse(localStorage.getItem("userObject"));
        let user = data[userID];
        delete user[Number(id)];
        data[userID] = user;
        localStorage.setItem("userObject", JSON.stringify(data));
        redirect("home");


    }
    if (method == "home") {
        if (localStorage.getItem("recentUser") != null) {
            document.getElementById("write").style.display = "none";
            document.getElementById('wrap').style.display = "block";
            let userID = Number(JSON.parse(localStorage.getItem("recentUser")));
            userObject = JSON.parse(localStorage.getItem("userObject"));
            currentUserData = userObject[userID];
            displayUserStories();
            $(".storyCompo p").hide();
            $(".storyCompo").css("height", "fit-content");
            $(".display").css({"flex-direction":"row"});
            $(".storyCompo").css({"width":"30vh"})
        } else {
            $("#display").empty();
        }
        $("#logo").show();
        $("#detail").hide();
        $("#display").show();
    }

    if (method == "load") {
        if (localStorage.getItem("recentUser") != null) {
            document.getElementById("profile").innerHTML= "Log out"
            document.getElementById("create").style.display = "block";
            redirect("home");

        } else {
            document.getElementById("create").style.display = "none";
        }
    }
}

