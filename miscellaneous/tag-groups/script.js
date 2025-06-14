// By Cory
// https://cory.jcink.net/

export default function init({
    fID,
    gTitle
}) {
    $('input[onclick="tag_username()"]').after('<input type="button" value=" @TAG GROUP  " class="codebuttons" name="taggroup" />');

    function wrapText(elementID, openTag, closeTag) {
        var textArea = $(elementID);
        var len = textArea.val().length;
        var start = textArea[0].selectionStart;
        var end = textArea[0].selectionEnd;
        var selectedText = textArea.val().substring(start, end);
        var replacement = openTag + selectedText + closeTag;
        textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
    }

    $('input[name="taggroup"]').click(function() {
        var group = window.prompt('Enter the full group name of the group you wish to tag/alert.', '');

        if (group !== null) {
            wrapText('textarea[name="Post"]', '[tag=' + group + ']', '');
        }
    });

    if (location.href.indexOf('Post&CODE=02') !== -1 || location.href.indexOf('Post&CODE=00') !== -1) {
        $('input[name="submit"]').click(function() {
            if ($('textarea[name="Post"]').val().indexOf('[tag=') !== -1) {
                localStorage.setItem('tagGroup', true);
            }
        });
    }

    $('div.postcolor').each(function() {
        $(this).html($(this).html().replace(/\[tag=([a-zA-Z]+)\]/ig, '<span class="tag-group">$1</span>'));
    });

    if (localStorage.getItem('tagGroup') === 'true') {
        $('div.postcolor:last span.tag-group').each(function() {
            var gName = $(this).text();
            var tID = location.href.split('showtopic=')[1].split('&st')[0];
            var pID = $('a[onclick*="link_to_post"]:last').attr('onclick').split('link_to_post(')[1].split(')')[0];

            $.get('/index.php?act=Post&CODE=00&f=' + fID, function(data) {
                $.post('/index.php?', {
                    st: '0',
                    act: 'Post',
                    s: '',
                    f: fID,
                    auth_key: $('input[name="auth_key"]', data).val(),
                    MAX_FILE_SIZE: $('input[name="MAX_FILE_SIZE"]', data).val(),
                    CODE: '01',
                    TopicTitle: gName,
                    TopicDesc: tID + '-' + pID,
                    Post: 'Content',
                    success: function() {
                        localStorage.removeItem('tagGroup');
                    }
                });
            });
        });
    }

    $.get('/index.php?showforum=' + fID, function(data) {
        $('tr.topic-row a[href*="showtopic"]:nth-child(1)', data).each(function() {
            if ($(this).text() === gTitle && localStorage.getItem('last_read-' + $(this).next('br').next('span.desc').text().split('-')[1]) !== 'true') {
                var tID = $(this).next('br').next('span.desc').text().split('-')[0];
                var pID = $(this).next('br').next('span.desc').text().split('-')[1];
                var aCount = parseInt($('#alerts-indicator').text().match(/[0-9]+/i), 10) + $(this).length;

                $('#alerts-indicator').html($('#alerts-indicator').html().replace(/[0-9]+/i, aCount));

                if (parseInt($('#alerts-indicator').text().match(/[0-9]+/i), 10) > 0) {
                    $('#alerts-indicator').css('font-weight', '700');
                }

                $('#alerts-indicator').one('click', function() {
                    $(document).ajaxStop(function() {
                        $('#recent-alerts-data').append('<div style="height: 1px"></div><div class="row2"><div class="recent-alerts-msg">Your group has been alerted in <a class="g-alert" href="/index.php?showtopic=' + tID + '&view=findpost&p=' + pID + '" target="_blank">this post</a>. This is a one-time alert.<br></div></div>');
                        if ($('div.recent-alerts-msg:contains(No new alerts to display.)').length && $('#recent-alerts-data div.row2:contains(Your group has been alerted)').length) {
                            $('div.recent-alerts-msg:contains(No new alerts to display.)').parent('div.row2').hide().prev().hide();
                        }

                        $('a.g-alert').each(function() {
                            localStorage.setItem('last_read-' + $(this).attr('href').split('p=')[1], true);
                        });

                        $('a[href*="read_alerts()"]').click(function() {
                            $('#alerts-indicator').css('font-weight', '400');
                        });
                    });
                });
            }
        });
    });

    $('#active-topics a[href*="showforum=' + fID + '"], #search-topics a[href*="showforum=' + fID + '"]').parent('td.row4').parent('tr').hide();
}
