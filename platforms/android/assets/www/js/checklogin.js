var userId = window.localStorage.userId;
var clientId = window.localStorage.clientId;
if(!userId||!clientId){
    window.location.href = "login.html";
}
