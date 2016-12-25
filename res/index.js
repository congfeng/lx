
$(document).on("pageInit","#index",function(e, pageId, $page) {
    $('#logout').click(function(){
        window.localStorage.userId = '';
        window.localStorage.clientId = '';
        window.location.href = "login.html";
    });
});
