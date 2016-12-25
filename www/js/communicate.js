$(document).on("pageInit","#communicate",function(e, pageId, $page) {
    var curCards;
    var maxCards = 20;
    var loading = false;
    
    function addCard(name){
        var card = $('.card-template').clone();
        card.removeClass('card-template');
        card.addClass('card');
        card.appendTo('.card-container');
        card.find('.name').text(name);
    }
    
    function initCard(){
        $('.card').remove();
        addCard('老王1');
        addCard('老王2');
        addCard('老王3');
    }
    
    $(document).on('infinite', '.infinite-scroll-bottom',function() {
        if (loading) return;
        loading = true;
        setTimeout(function() {
            curCards = $('.card-container .card').length;
            if (curCards >= maxCards) {
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                $.detachInfiniteScroll($('.infinite-scroll'));
                // 删除加载提示符
                $('.infinite-scroll-preloader').remove();
                return ;
            }
            addCard('老王'+(curCards+1));
            loading = false;
        },1500);
    });
    
    $(document).on('refresh', '.pull-to-refresh-content',function(e) {
        setTimeout(function() {
            initCard();
            $.pullToRefreshDone('.pull-to-refresh-content');
        },1500);
    });
    
    initCard();
    
    $(".content").on('scroll',function(){
        $('.community-container').hide();
        $('.comment-input').blur();
        $('.comment-input').val('');
    });
    
    $('.bang').live('click',function(){
        $('.community-container').hide();
        $('.comment-input').blur();
        $('.comment-input').val('');
        $('.bang-container').show();
        setTimeout(function() {
            $('.bang-container').hide();
        },2000);
    });
    $('.comment-send').live('click',function(){
        $.toast('发送评论：'+$('.comment-input').val());
        $('.community-container').hide();
        $('.comment-input').blur();
        $('.comment-input').val('');
    });
    $('.comment').live('click',function(){
        $('.community-container').show();
        $('.comment-input').focus();
    });
        
});