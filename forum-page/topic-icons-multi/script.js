// By Cory
// https://cory.jcink.net/

export default function init({
    tIcons
}) {
    if ($('input[name="TopicTitle"]').length) {
        $('#posting-form td.pformstrip:last').parent('tr').before('<tr id="icons"><td class="pformleft">Topic Icon</td><td class="pformleft"><form id="t_icons"><label><input type="radio" name="tic" value="0" checked="checked">No Icon</label><label><input type="radio" name="tic" value="1">Add Icon</label></form></td></tr>');

        for (let i = 0, l = tIcons.length; i < l; ++i) {
            var index = tIcons.indexOf(tIcons[i]);
            $('#t_icons').append('<label><input type="checkbox" name="tic-' + index + '" value="[ti]' + index + '[/ti]"><img src="' + tIcons[i] + '" alt="Topic Icon" /></label>');
        }

        if ($('input[name="TopicTitle"]').length === 0) {
            $('#icons').hide();
        }

        $('input[name="TopicTitle"]').val($('input[name="TopicTitle"]').val().replace(/\[ti\]([0-9]+)\[\/ti\]/gi, ''));

        $('form[name="REPLIER"]').submit(function() {
            if ($('input[name="tic"][value="1"]').is(':checked')) {
                var ticVal = '';
                $('#t_icons input[name^="tic-"]:checked').each(function() {
                    ticVal += $(this).val();
                });
                $('input[name="TopicTitle"]').val(ticVal + $('input[name="TopicTitle"]').val());
            } else {
                $('input[name="TopicTitle"]').val($('input[name="TopicTitle"]').val().replace(/\[ti\]([0-9]+)\[\/ti\]/gi, ''));
            }
        });
    }

    $('a:contains([/ti]), .maintitle:contains([/ti])').each(function() {
        $(this).html($(this).html().replace(/\[ti\]([0-9]+)\[\/ti\]/gi, '<span class="t_icon">$1</span>'));

        $(this).find('span.t_icon').each(function() {
            var num = $(this).text();
            $(this).replaceWith('<img src="' + tIcons[num] + '" alt="Topic Icon" /> ');
        });
    });

    $('#posting-form .maintitle:has(img) img').each(function() {
        var src = $(this).attr('src');
        $('input[name="tic"][value="1"]').attr('checked', 'checked');
        $('#t_icons img[src="' + src + '"]').prev('input').attr('checked', 'checked');
    });

    if ($('title:contains([/ti])').length) {
        $('title:contains([/ti])').html($('title:contains([/ti])').html().replace(/\[ti\]([0-9]+)\[\/ti\]/gi, ''));
    }
}
