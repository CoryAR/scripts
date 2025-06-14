// By Cory
// https://cory.jcink.net/

$('#ucpmenu a[href*="javascript"]').after(' - <a href="javascript: void(0);" id="block_user">Block User</a>');

$('#block_user').click(function() {
    if ($('#block_console').length === 0) {
        $('body').append('<div id="block_console" class="tableborder row2" style="width: auto; position: fixed; top: 50%; left: 50%; padding: 10px"><input type="text" size="20" class="forminput" value="Enter username..." onfocus="this.value=\'\'" /><br /><br />Block Users Posts: <input name="b_posts" type="checkbox" style="vertical-align: middle" /><br /><br />Block Users Avatar: <input name="b_avatar" type="checkbox" style="vertical-align: middle" /><br /><br />Block Users Signature: <input name="b_sig" type="checkbox" style="vertical-align: middle" /><br /><br /><input type="button" value="Update" class="forminput" /> <input type="button" value="Close" class="forminput" /></div>');
    }

    $('#block_console').css({
        'margin-top': '-' + $('#block_console').height() + 'px',
        'margin-left': '-' + $('#block_console').width() + 'px'
    }).find('input[value="Update"]').click(function() {
        $('#block_console input[type="checkbox"]').each(function() {
            var b_item = $(this).attr('name');
            var username = $('#block_console input[type="text"]').val();

            if ($(this).is(':checked')) {
                localStorage.setItem(b_item + '-' + username, true);
            } else {
                localStorage.removeItem(b_item + '-' + username);
            }
        });

        $('#block_console').remove();
    });

    $('#block_console input[value="Close"]').click(function() {
        $('#block_console').remove();
    });
});

$('span.normalname').each(function() {
    var username = $(this).text();

    if (localStorage.getItem('b_posts-' + username) === 'true') {
        $(this).parent('td').parent('tr').next('tr').find('div.postcolor').text('Content blocked. Unblock content via the UCP.');
    }

    if (localStorage.getItem('b_avatar-' + username) === 'true') {
        $(this).parent('td').parent('tr').next('tr').find('span.postdetails img[width][height][alt=""]').replaceWith('Content blocked. Unblock content via the UCP.<br />');
    }

    if (localStorage.getItem('b_sig-' + username) === 'true') {
        $(this).parent('td').parent('tr').next('tr').find('div.signature').text('Content blocked. Unblock content via the UCP.');
    }
});

$('table[id="QUOTE-WRAP"]').each(function() {
    var username = $(this).find('tr:first-child td').text().split(' (')[1].split(' @')[0];

    if (localStorage.getItem('b_posts-' + username) === 'true') {
        $(this).find('td[id="QUOTE"]').text('Content blocked. Unblock content via the UCP.');
    }
});

if (location.href.indexOf('showuser') !== -1) {
    var username = $('#profile-header h3').text();

    if (localStorage.getItem('b_posts-' + username) === 'true') {
        $('div.box div[style="margin:5px"]').text('Content blocked. Unblock content via the UCP.');

        $('#tab2').click(function() {
            $(document).ajaxSuccess(function() {
                $('div.box div[style="margin:5px"]').text('Content blocked. Unblock content via the UCP.');
            });
        });
    }

    if (localStorage.getItem('b_avatar-' + username) === 'true') {
        $('#profile-heading td[width="1%"] img').replaceWith('Content blocked. Unblock content via the UCP.<br />');
    }

    if (localStorage.getItem('b_sig-' + username) === 'true') {
        $('#sig_popup td.row2').text('Content blocked. Unblock content via the UCP.');
    }
}

$('#topic-summary td[class*="post"]:first-child').each(function() {
    var username = $(this).text();

    if (localStorage.getItem('b_posts-' + username) === 'true') {
        $(this).parent('tr').next('tr').find('div.postcolor').text('Content blocked. Unblock content via the UCP.');
    }
});
