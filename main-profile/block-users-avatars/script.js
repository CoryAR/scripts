// By Cory
// https://cory.jcink.net/

$('#profile-heading img:eq(0), span.post-normal div.postbit:nth-child(1) img').each(function() {
    var pos = $(this).position();
    var aWidth = pos.left + $(this).width() + 3;

    $(this).before('<a href="javascript: void(0);" class="block_avatar" style="margin-bottom: -10px; font-size: 14px; position: absolute; left: ' + aWidth + 'px" title="Block This Avatar">X</a>');
});

$('#profile-heading img:eq(0), span.post-normal div.postbit:nth-child(1) img').after('<a href="javascript: void(0);" class="unblock_avatar" style="display: none">Unblock This Avatar</a>');

$('span.post-normal').each(function() {
    if ($(this).find('span.normalname a').attr('href').split('showuser=')[1] === localStorage.getItem('block_avatar')) {
        $(this).find('div.postbit:eq(0) img').hide();
        $(this).find('div.postbit:eq(0) img').prev('a.block_avatar').hide();
        $(this).find('a.unblock_avatar').show();
    }
});

if (location.href.indexOf('showuser=' + localStorage.getItem('block_avatar')) !== -1) {
    $('#profile-heading img:eq(0)').hide().prev('a.block_avatar').hide();
    $('a.unblock_avatar').show();
}

function blockA() {
    $('a.block_avatar').click(function() {
        var uID;
        $(this).hide().next('img').hide();
        $(this).next('img').next('a.unblock_avatar').show();

        if (location.href.indexOf('showuser=') !== -1) {
            uID = location.href.split('showuser=')[1];
        } else {
            uID = $(this).parents('span.post-normal').find('span.normalname a').attr('href').split('showuser=')[1];
        }

        localStorage.setItem('block_avatar', uID);
        unblockA();
    });
}

function unblockA() {
    $('a.unblock_avatar').click(function() {
        $(this).hide();
        $(this).next('a.block_avatar').show().next('img').show();
        $(this).prev('img').show().prev('a.block_avatar').show();
        localStorage.removeItem('block_avatar');
        blockA();
    });
}

blockA();
unblockA();
