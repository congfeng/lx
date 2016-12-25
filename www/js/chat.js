
$(document).on("pageInit","#chat",function(e, pageId, $page) {
    var d = WKIT.init({
        container: document.getElementById('container-chat'),
        uid: 'test1',
        appkey: '23555011',
        credential: 'ddddd1',
        touid: 'test2',
        onLoginSuccess:function(){
            $('input[type=file]').prop('accept','image/*');
        },
        onMsgReceived:function(){
            alert('data');
        }
    });
    $('.wkit-msg-item').live('click',function(){
        $(this).addClass('open-popup').data('popup','.show-image');
        $('#myImg').prop('src',$(this).find('img').prop('src'));
    });
    
});
