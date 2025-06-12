// By Cory
// https://cory.jcink.net/

$('div.postcolor:contains([/tabs])').each(function() {
    var bColor = $('div.tableborder').css('border-left-color');

    $(this).html($(this).html().replace(/\[tabs\](.+?)\[\/tabs\]/gi, '<div class="tab-container">$1<div class="tabs"></div><div class="contents"></div></div>').replace(/\[tabs=(.+?)\](.+?)\[\/tabs\]/gi, '<div class="tab-container" style="width: $1">$2<div class="tabs"></div><div class="contents"></div></div>').replace(/\[tab=(.+?)\](.+?)\[\/tab\]/gi, '<div class="tab" style="cursor: pointer; display: inline-block; padding: 5px 10px; border: 1px solid ' + bColor + '">$1</div><div class="content" style="display: none; padding: 5px 10px; border: 1px solid ' + bColor + '">$2</div>'));

    $('div.tab-container > br, div.tabs br').hide();

    $('div.tab-container').each(function() {
        $(this).find('div.tab:eq(0)').css('font-weight', '700');
        $(this).find('div.content:eq(0)').show();
        $(this).find('div.tab').appendTo($(this).find('div.tabs'));
        $(this).find('div.content').appendTo($(this).find('div.contents'));
    });

    $('div.tab').click(function() {
        var index = $(this).index();
        $(this).parents('div.tab-container').find('div.content').hide();
        $(this).parents('div.tab-container').find('div.content:eq(' + index + ')').show();
        $(this).parents('div.tab-container').find('div.tab').css('font-weight', '400');
        $(this).css('font-weight', '700');
    });
});
