// By Cory
// https://cory.jcink.net/

$('#bbcode-buttons').append(' <input type="button" value=" TOOLTIP " id="tooltip" class="codebuttons" name="TOOLTIP">');

$('#tooltip').click(function() {
    var tooltipClass = prompt('Tooltip title:', '');

    if (tooltipClass) {
        $('textarea[name="Post"]').val($('textarea[name="Post"]').val() + ' [tooltip=' + tooltipClass + '][/tooltip]');
    }
});

if ($('div.postcolor:contains([/tooltip])').length) {
    var rad = parseInt($('td[class*="post"]').css('font-size').split('px'), 10) + 6;
    var tdBG = $('td[class*="post"]').css('background-color');
    var tdB = $('td[class*="post"]').css('border-left-color');

    $('div.postcolor:contains([/tooltip])').each(function() {
        $(this).html($(this).html().replace(/\[tooltip=(.+?)\](.+?)\[\/tooltip\]/gi, '<a href="javascript: void(0)" class="tooltip-anchor">$1</a> <div style="margin-top: ' + rad + 'px; background: ' + tdBG + '; border: 1px solid ' + tdB + '; display: none; position: absolute; padding: 10px; border-radius: 5px; min-width: 100px; margin-left: 5px" class="tooltip">$2 <br/><span class="close-tooltip" style="font-style: italic; float: right; cursor: pointer">Close</span></div>'));
    });

    if (TTState === 'click') {
        $('a.tooltip-anchor').click(function() {
            $(this).next('div.tooltip').fadeIn().css('display', 'inline');
        });
    } else if (TTState === 'hover') {
        $('a.tooltip-anchor').hover(function() {
            $(this).next('div.tooltip').fadeIn().css('display', 'inline');
        });
    }

    $('span.close-tooltip').click(function() {
        $(this).parent('div.tooltip').fadeOut();
    });
}
