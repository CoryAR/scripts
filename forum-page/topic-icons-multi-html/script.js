// By Cory
// https://cory.jcink.net/

export default function init({
    tIcons
}) {
    if (location.href.indexOf('act=Post&CODE=00') !== -1 || location.href.indexOf('act=Post&CODE=08') !== -1) {
        $('#posting-form td.pformstrip:last').parent('tr').before('<tr id="icons"><td class="pformleft">Topic Icon</td><td class="pformleft"><form id="t_icons"><label><input type="radio" name="tic" value="0" checked="checked">No Text</label><label><input type="radio" name="tic" value="1">Add Text</label></form></td></tr>');

        for (var i = 0; i < tIcons.length; i++) {
            var index = tIcons.indexOf(tIcons[i]);
            $('#t_icons').append('<label><input type="checkbox" name="tic-' + index + '" value="[ti]' + index + '[/ti]"><span>' + tIcons[i] + '</span></label>');
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
            $(this).replaceWith('<span class="t-icon">' + tIcons[num] + '</span> ');
        });
    });

    $('#posting-form .maintitle:has(span) span').each(function() {
        var text = $(this).text();
        $('input[name="tic"][value="1"]').attr('checked', 'checked');
        $('#t_icons span:contains(' + text + ')').prev('input').attr('checked', 'checked');
    });

    if ($('title:contains([/ti])').length) {
        $('title:contains([/ti])').html($('title:contains([/ti])').html().replace(/\[ti\]([0-9]+)\[\/ti\]/gi, ''));
    }
}
