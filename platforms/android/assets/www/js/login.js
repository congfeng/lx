
$(document).on("pageInit","#login",function(e, pageId, $page) {
    $('#login4user').click(function(){
        window.localStorage.userId = 'cf';
        window.localStorage.clientId = 'ddddddddddd6';
        window.location.href = "index.html";
    });
    $('#login4sy').click(function(){
        window.localStorage.userId = 'sy';
        window.localStorage.clientId = 'ddddddddddd8';
        window.location.href = "index.html";
    });
    $('#register4sy').click(function(){
        window.localStorage.userId = '';
        window.localStorage.clientId = '';
        $.router.load('register.html');
    });
});
