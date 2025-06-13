// Originally by Quozzo of ZetaBoards
// Converted by Cory of jCodes

export default function init({
    tIcons
}) {
    if ($('input[name="TopicTitle"]').length) {
        $('#posting-form td.pformstrip:last').parent('tr').before('<tr><td class="pformleft">Topic Icon</td><td class="pformleft"><form id="t_icons"><label><input type="radio" name="tic" value="" checked="checked" />No Icon</label></form></td></tr>');

        for (let i = 0, l = tIcons.length; i < l; ++i) {
            var index = tIcons.indexOf(tIcons[i]);
            $('#t_icons').append('<label><input type="radio" name="tic" value="[ti]' + index + '[/ti]" /><img src="' + tIcons[i] + '" alt="Topic Icon" /></label>');
        }

        $('input[name="TopicTitle"]').val($('input[name="TopicTitle"]').val().replace(/\[ti\]([0-9]+)\[\/ti\]/gi, ''));

        $('form[name="REPLIER"]').submit(function() {
            var ticVal = $('#t_icons input:checked').val();
            $('input[name="TopicTitle"]').val(ticVal + $('input[name="TopicTitle"]').val());
        });
    }

    $('a:contains([/ti]), .maintitle:contains([/ti])').each(function() {
        $(this).html($(this).html().replace(/\[ti\]([0-9]+)\[\/ti\]/gi, '<span class="t_icon">$1</span>'));
        var num = $(this).find('span.t_icon').text();
        $(this).find('span.t_icon').replaceWith('<img src="' + tIcons[num] + '" alt="Topic Icon" /> ');
    });

    var src = $('#posting-form .maintitle:has(img) img').attr('src');
    $('#t_icons img[src="' + src + '"]').prev('input').attr('checked', 'checked');

    if ($('title:contains([/ti])').length) {
        $('title:contains([/ti])').html($('title:contains([/ti])').html().replace(/\[ti\]([0-9]+)\[\/ti\]/gi, ''));
    }
}
