// By Cory
// https://cory.jcink.net/

export default function init({
    bMarkField,
    bMarkIMG,
    bMarkAuthKey
}) {
    if ($('#logged-in-as').length) {
        if ($('span.msg-normal').length === 0) {
            $('div.post-buttons-top').append('<img src="' + bMarkIMG + '" class="bMark-post" style="margin: 0 5px; opacity: 0.5; cursor: pointer" alt="Bookmark This Post" title="Bookmark This Post">');
        }

        $('a[href*="UserCP&CODE=50"] + br').after('&middot; <a href="/index.php?act=UserCP&CODE=01&bookmarks">View Post Bookmarks</a>');
        $('td.pformleft:contains(Bookmarks)').parent('tr').hide();
    }

    if (location.href.indexOf('UserCP&CODE=01&bookmarks') !== -1) {
        $('form[name="theForm"] *').hide().parent('form[name="theForm"]').append('<div style="text-align: right; padding: 5px"><a href="javascript: void(0)" id="reset">Reset Labels</a></div><div class="tableborder"><table id="post-bookmarks" cellpadding="4" cellspacing="1" width="100%"><tbody><tr><th class="titlemedium">Post Link</th><th class="titlemedium">Post Author</th><th class="titlemedium">Date Bookmarked</th><th class="titlemedium">Label</th><th class="titlemedium">Message</th></tr></tbody></table></div>');

        var bInfo = $('td.pformleft:contains(Bookmarks)').next('td.pformright').find('textarea').val().split('\n');

        for (var i = 0; i < bInfo.length; i++) {
            var tID = bInfo[i].split('~')[1];
            var pID = bInfo[i].split('~')[2];
            var bLabel = bInfo[i].split('~')[3];
            var bMessage = bInfo[i].split('~')[4];
            var tTitle = bInfo[i].split('~')[5];
            var pAuthor = bInfo[i].split('~')[6];
            var date = bInfo[i].split('~')[7];

            if (tID !== undefined) {
                $('#post-bookmarks tbody').append('<tr class="filter"><td class="row1">From: <a href="/index.php?showtopic=' + tID + '&view=findpost&p=' + pID + '">' + tTitle + '</a></td><td class="row1">' + pAuthor + '</td><td class="row1">' + date + '</td><td class="row1"><a href="javascript: void(0)" class="label null">' + bLabel + '</a></td><td class="row1 null">' + bMessage + '</td></tr>');
            }
        }

        $('a.label').click(function() {
            var text = $(this).text();

            $('a.label').each(function() {
                if ($(this).text() !== text) {
                    $(this).parents('tr.filter').hide();
                }
            });
        });

        $('#reset').click(function() {
            $('tr.filter').show();
        });

        $('.null').each(function() {
            if ($(this).text() === 'null') {
                $(this).text('N/A');
            }
        });
    }

    function opacity() {
        if (bMarkField !== '') {
            var lBreak = bMarkField.split('\n');

            for (var i = 0; i < lBreak.length; i++) {
                var fID = lBreak[i].split('~')[0];
                var tID = lBreak[i].split('~')[1];
                var pID = lBreak[i].split('~')[2];

                $('div.post-buttons-top a[href*="Post&CODE=06&f=' + fID + '&t=' + tID + '&p=' + pID + '"]').parents('div.post-buttons-top').find('img.bMark-post').css('opacity', '1').addClass('opacity');
            }
        }
    }

    opacity();

    $('img.bMark-post').hover(function() {
        $(this).css('opacity', '1');
    }, function() {
        $(this).css('opacity', '0.5');
        opacity();
    });

    $('img.bMark-post').one('click', function() {
        var $this = $(this);
        var fID = $(this).parents('div.post-buttons-top').find('a[href*="Post&CODE=06"]').attr('href').split('&f=')[1].split('&t=')[0];
        var tID = $(this).parents('div.post-buttons-top').find('a[href*="Post&CODE=06"]').attr('href').split('&t=')[1].split('&p=')[0];
        var pID = $(this).parents('div.post-buttons-top').find('a[href*="Post&CODE=06"]').attr('href').split('&p=')[1];

        if ($(this).hasClass('opacity')) {
            var unbookmark = confirm('Do you want to unbookmark this post?');

            if (unbookmark) {
                var re = new RegExp('' + fID + '~' + tID + '~' + pID + '\.*', 'g');

                $.get('/index.php?act=UserCP&CODE=01', function(data) {
                    var string = $('td.pformleft:contains(Bookmarks)', data).next('td.pformright').find('textarea').val();
                    var replace = string.replace(re, '');

                    $.post('/index.php?auth_key=' + bMarkAuthKey, $('form[name="theForm"]', data).serialize() + '&' + $('td.pformleft:contains(Bookmarks)', data).next('td.pformright').find('textarea').attr('name') + '=' + replace, function() {
                        $this.css('opacity', '0.5');
                    });
                });
            }
        } else {
            var label = prompt('Insert a label for this bookmark', '');
            var message = prompt('Insert a short message for this bookmark', '');
            var tTitle = $('span.topic-title').text();
            var pAuthor = $this.parents('span.post-normal').find('span.normalname').text();
            var month = new Date().getMonth() + 1;
            var date = new Date().getDate();
            var year = new Date().getFullYear();

            $.get('/index.php?act=UserCP&CODE=01', function(data) {
                $.post('/index.php?auth_key=' + bMarkAuthKey, $('form[name="theForm"]', data).serialize() + '&' + $('td.pformleft:contains(Bookmarks)', data).next('td.pformright').find('textarea').attr('name') + '=' + $('td.pformleft:contains(Bookmarks)', data).next('td.pformright').find('textarea').val() + '\n' + fID + '~' + tID + '~' + pID + '~' + label + '~' + message + '~' + tTitle + '~' + pAuthor + '~' + month + '/' + date + '/' + year, function() {
                    $this.css('opacity', '1');
                });
            });
        }
    });
}
