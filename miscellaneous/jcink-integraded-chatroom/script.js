// By Cory
// https://cory.jcink.net/

export default function init({
    topicID,
    maxChar,
    crWidth,
    crHeight,
    maxImageWidth,
    maxImageHeight
}) {
    var main_url = location.href.split('index.php')[0];
    if (location.href.endsWith('showtopic=' + topicID) || location.href.includes('showtopic=' + topicID + '&')) {
        var shoutsPerPage = 15;
        var forumID = $('input[name="f"]').val();
        $('div.bar, input[name="preview"], input[name="qrc"], #qr_open div.maintitle, a[href="javascript:emo_pop();"], input[name="enableemo"], input[name="enablesig"], #qr_open br, td[align="right"][width="80%"], a[title="Open Topic Options"]').hide();
        $('form[name="jumpmenu"]').parent('div').hide();
        $('div.postlinksbar').parent('div.tableborder').hide();
        $('span.goto-firstunread a').text('Go to first unread shout');

        $('a[name="top"] + table').after(`<br />
<div class="tableborder">
<table id="chatroom" style="width: ' + crWidth + '; height: ' + crHeight + '">
<tr>
<td id="chats" class="row2" style="width: 80%; vertical-align: top; line-height: 15px; padding: 10px">
<div style="height: 400px; overflow: auto"></div>
</td>
<td id="online" class="row2" rowspan="2" style="width: 20%; vertical-align: top; padding: 0 5px">
<div style="text-align: center; font-size: 130%">Online, in Chatroom:</div>
</td>
</tr>
<tr>
<td id="chatInput" class="row2" style="height: 100px; padding: 0 10px"><span id="seconds" style="float: right"></span>
<div><button id="ChatB" class="forminput" type="button"><strong>B</strong></button> <button id="ChatI" class="forminput" type="button"><em>I</em></button> <button id="ChatU" class="forminput" type="button"><span style="text-decoration: underline">U</span></button> <button id="ChatS" class="forminput" type="button"><del>S</del></button> <select id="Color" style="margin: 0">
<option value="" selected="selected">Color</option>
<option value="#000">Black</option>
<option value="#fff">White</option>
<option value="#ee4a2d">Red</option>
<option value="#fb8a00">Orange</option>
<option value="#fe0">Gold</option>
<option value="#090">Green</option>
<option value="#80a0ff">Light Blue</option>
<option value="#5a70b3">Blue</option>
<option value="#9300C4">Purple</option>
</select> <select id="Font" style="margin: 0">
<option value="" selected="selected">Font</option>
<option style="font-family: Verdana" value="Verdana">Verdana</option>
<option style="font-family: \'Times New Roman\'" value="Times New Roman">Times New Roman</option>
<option style="font-family: Arial" value="Arial">Arial</option>
<option style="font-family: Georgia" value="Georgia">Georgia</option>
<option style="font-family: Monaco" value="Monaco">Monaco</option>
</select><br /><br /></div>
</div>
</td>
</tr>
</table>
</div>`);

        $('div.row2[style="padding:6px"] a').each(function() {
            var html = $(this).html();
            var href = $(this).attr('href');

            $('#online').append('<a href="' + href + '">' + html + '</a><br />');
        });

        $('#qr_open').html($('#qr_open').html().replace(/\|/ig, '').replace('Enable Smilies', '').replace('Enable Signature', ''));

        $('#qr_open').appendTo('#chatInput div:eq(0)').show();
        $('#qr_open div.tableborder').css('border', '0');
        $('#qr_open div.tablepad').css('text-align', 'left');

        $('#qr_open textarea').css({
            'width': '70%',
            'height': '20px',
            'resize': 'none',
            'display': 'inline',
            'margin': '0'
        }).attr('id', 'textarea').keypress(function(e) {
            if (e.which === 13) {
                e.preventDefault();
                $('#qr_open input[name="submit"]').click();
            }
        });
        $('#qr_open input[name="submit"]').val('Submit').after(' <input type="button" value="Smilies" onclick="emo_pop()" style="cursor: pointer" /> <input type="button" value="Refresh" onclick="location.reload()" style="cursor: pointer" />');

        $('#qr_open input[name="submit"]').click(function(e) {
            e.preventDefault();
            var textarea = $('#textarea').val();
            var post;

            if (textarea.length > maxChar) {
                alert('You are only allowed to have up to ' + maxChar + ' characters per shout');
            } else if (textarea.length > 0) {
                $.get(window.location.href + '&view=getnewpost', function(con) {
                    var fCon = $('span.post-normal:last', con).find('a[onclick*="link_to_post"]').attr('onclick').split('(')[1].split(')')[0];

                    $.get(main_url + 'index.php?act=Post&CODE=02&f=' + forumID + '&t=' + topicID, function(data) {
                        var auth_key = $('input[name="auth_key"]', data).val();
                        var MAX_FILE_SIZE = $('input[name="MAX_FILE_SIZE"]', data).val();

                        $.post(main_url + 'index.php?', {
                            st: '0',
                            act: 'Post',
                            s: '',
                            f: forumID,
                            auth_key: auth_key,
                            MAX_FILE_SIZE: MAX_FILE_SIZE,
                            CODE: '03',
                            t: topicID,
                            Post: textarea,
                            enableemo: 'yes',
                            success: function() {
                                setTimeout(function() {
                                    $.get(window.location.href + '&view=getnewpost', function(data) {
                                        var username = $('span.post-normal:last', data).find('span.normalname').html();
                                        var time = $('span.post-normal:last', data).find('span.postdetails:eq(0)').text().split('Posted:')[1];
                                        if ($('span.post-normal:last', data).find('a[onclick*="link_to_post"]').attr('onclick').split('(')[1].split(')')[0] !== fCon) {
                                            post = $('span.post-normal:last', data).find('div.postcolor').html();
                                        }
                                        if ($('#chatroom span.username').length >= shoutsPerPage) {
                                            var pNum = parseInt(window.location.href.split('st=')[1], 10);
                                            var nNum = parseInt(pNum + shoutsPerPage, 10);
                                            window.location.href = main_url + 'index.php?showtopic=' + topicID + '&st=' + nNum;
                                            post = '<em>Redirecting to next page</em> ';
                                        }
                                        var deleteHref = $('span.post-normal:last', data).find('a[href*="javascript:delete_post"]').attr('href');
                                        var color = $('#foot td').css('color');

                                        $('#chats > div').append('<span style="color: ' + color + '"><em><small>' + time + '</small></em></span>:<br /><span class="username">' + username + '</span>: ' + post + ' <span class="delete">(<a href="' + deleteHref + '" title="Delete Shout">X</a>)</span><br />');
                                        $('#chats > div').scrollTop(9999999);
                                        $('#textarea').val('');
                                    });
                                }, 100);
                            }
                        });
                    });
                });
            }
        });

        $('#chats img').each(function() {
            var img = $(this).attr('src');
            $(this).css({
                'max-width': '' + maxImageWidth + 'px',
                'max-height': '' + maxImageHeight + 'px'
            });
            if ($(this).width() >= maxImageWidth || $(this).height() >= maxImageHeight) {
                $(this).after('<br /><a href="' + img + '" target="_blank"><em>See full-sized image</em></a>');
            }
        });
    }

    function addChat() {
        if (location.href.endsWith('showtopic=' + topicID) || location.href.includes('showtopic=' + topicID + '&')) {
            $('#chats div').html('');

            $.get(window.location.href, function(data) {
                $('span.post-normal', data).each(function() {
                    var username = $(this).find('span.normalname').html();
                    var time = $(this).find('span.postdetails:eq(0)').text().split('Posted:')[1];
                    var post = $(this).find('div.postcolor').html();
                    var deleteLink = '';

                    if ($(this).find('a[href*="javascript:delete_post"]').length) {
                        var deleteHref = $(this).find('a[href*="javascript:delete_post"]').attr('href');
                        deleteLink = '<span class="delete">(<a href="' + deleteHref + '" title="Delete Shout">X</a>)</span>';
                    }

                    $('#chats div').append('<em><small>' + time + '</small></em>:<br /><span class="username">' + username + '</span>: ' + post + ' ' + deleteLink + '<br />');
                });
                $('span.edit').hide();
                $('hr').replaceWith('<br />');
                $('#chats > div').scrollTop(9999999);
            });
        }
    }

    var ns = 30;

    function sInt() {
        if (location.href.endsWith('showtopic=' + topicID) || location.href.includes('showtopic=' + topicID + '&')) {
            ns = ns - 1;

            if (ns <= 0) {
                ns = 30;
            }

            $('#seconds').text(ns + ' Seconds Until Auto-Refresh');
        }
    }

    function returnPage() {
        if ($('#chatroom span.username').length > shoutsPerPage) {
            var pNum = parseInt(window.location.href.split('st=')[1], 10);
            var nNum = parseInt(pNum + 15, 10);
            window.location.href = main_url + 'index.php?showtopic=' + topicID + '&st=' + nNum;
        }
    }

    addChat();
    window.setInterval(addChat, 30000);
    window.setInterval(returnPage, 31000);
    window.setInterval(sInt, 1000);

    $(document).ajaxStop(function() {
        if ($('#chats > div').html() === '') {
            var pgNum = parseInt(location.href.split('&st=')[1] - shoutsPerPage, 10);
            location.href = main_url + 'index.php?showtopic=' + topicID + '&st=' + pgNum;
        }
    });

    $('#submenu td[align="right"]').append('<a href="' + main_url + 'index.php?showtopic=' + topicID + '&view=getnewpost">Chatroom</a>');
}

function wrapText(elementID, openTag, closeTag) {
    var textArea = $('#' + elementID);
    var len = textArea.val().length;
    var start = textArea[0].selectionStart;
    var end = textArea[0].selectionEnd;
    var selectedText = textArea.val().substring(start, end);
    var replacement = openTag + selectedText + closeTag;
    textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
}

$('#ChatB').click(function() {
    wrapText('textarea', '[b]', '[/b]');
});

$('#ChatI').click(function() {
    wrapText('textarea', '[i]', '[/i]');
});

$('#ChatU').click(function() {
    wrapText('textarea', '[u]', '[/u]');
});

$('#ChatS').click(function() {
    wrapText('textarea', '[s]', '[/s]');
});

$('#Color').change(function() {
    var color = $('select[id="Color"]').val();
    wrapText('textarea', '[color=' + color + ']', '[/color]');

});

$('#Font').change(function() {
    var font = $('select[id="Font"]').val();
    wrapText('textarea', '[font=' + font + ']', '[/font]');
});

$('#ChatB, #ChatI, #ChatU, #ChatS').click(function() {
    $('#textarea').focus();
});

$('#Color, #Font').change(function() {
    $('select[id="Color"], select[id="Font"]').val('');
    $('#textarea').focus();
});
