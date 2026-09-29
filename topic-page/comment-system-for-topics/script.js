// By Cory, with the assistance of Nicket
// https://cory.jcink.net/

export default function init({
    commentFormForumId,
    floodControlSeconds,
    uID,
    uName,
    inputT,
    inputF,
    authKey
}) {
    let startTime;
    let endTime;
    let secondsPassed;

    $('#comment-form input[type="button"]').on('click', function() {
        const comment = $(this).prev().val();
        const data = {
            id: uID,
            username: uName
        };

        startTime = performance.now();

        $(document).ajaxStop(function() {
            endTime = performance.now();
        });

        secondsPassed = Math.floor((startTime - endTime) / 1000);

        if (comment.length >= 2) {
            if (secondsPassed >= floodControlSeconds || isNaN(secondsPassed)) {
                $.get('/index.php?act=Search&q="[CF_' + inputT + ']"&f=' + commentFormForumId + '&u=&rt=topics', function(sData) {
                    if ($('#board-message', sData).length) {
                        $.post('/index.php?', {
                            st: '0',
                            act: 'Post',
                            f: commentFormForumId,
                            auth_key: authKey,
                            CODE: '01',
                            TopicTitle: '[CF_' + inputT + '] ' + $('.topic-title').text(),
                            Post: `[CODE]${JSON.stringify(data)}[/CODE][QUOTE]${comment}[/QUOTE]`,
                            function() {
                                $('#comment-form .comment-placeholder em:contains(No comments found)').remove();
                                $('#comment-form .comment-placeholder').append('<a href="/index.php?showuser=' + uID + '">' + uName + '</a>: ' + comment + '<br>');
                                $('#comment-form input[type="text"]').val('');
                            }
                        });
                    } else {
                        $.get($('a', sData).attr('href'), function(nSData) {
                            const tID = $('#search-topics a[href*="showtopic"]:first', nSData).attr('href').split('showtopic=')[1].split('&hl=')[0];
                            $.post('/index.php?', {
                                st: '0',
                                act: 'Post',
                                f: commentFormForumId,
                                auth_key: authKey,
                                CODE: '03',
                                t: tID,
                                Post: `[CODE]${JSON.stringify(data)}[/CODE][QUOTE]${comment}[/QUOTE]`,
                                function() {
                                    $('#comment-form .comment-placeholder').append('<a href="/index.php?showuser=' + uID + '">' + uName + '</a>: ' + comment + '<br>');
                                    $('#comment-form input[type="text"]').val('');
                                }
                            });
                        });
                    }
                });
            } else {
                alert('Flood control is enabled. Please wait to comment again in ' + floodControlSeconds + ' seconds');
            }
        } else {
            alert('Comments must be at least 2 characters long');
        }
    });

    if ($('#comment-form').length) {
        $('.comment-placeholder').css({
            'max-height': $(window).height() / 2 + 'px',
            'overflow': 'auto'
        }).html('<em class="loading">Loading...</em>');

        $(document).ajaxStop(function() {
            $('.comment-placeholder').scrollTop($('.comment-placeholder')[0].scrollHeight);
            $('.comment-placeholder .loading').remove();
        });

        $.get('/index.php?act=Search&q="[CF_' + inputT + ']"&f=' + commentFormForumId + '&u=&rt=topics', function(sData) {
            if ($('#board-message', sData).length) {
                $('#comment-form .comment-placeholder').append('<em>No comments found</em>');
            } else {
                $.get($('a', sData).attr('href'), function(nSData) {
                    const tID = $('#search-topics a[href*="showtopic"]:first', nSData).attr('href').split('showtopic=')[1].split('&hl=')[0];
                    $.get('/index.php?act=Print&client=printer&f=' + commentFormForumId + '&t=' + tID, function(data) {
                        $('font[size="3"]', data).each(function() {
                            const codeBoxContent = $(this).find('td[id="CODE"]').text();
                            const cData = JSON.parse(codeBoxContent);
                            const comment = $(this).find('td[id="QUOTE"]').html();
                            $('#comment-form .comment-placeholder').append('<a href="/index.php?showuser=' + cData.id + '">' + cData.username + '</a>' + ': ' + comment + '<br>');
                        });

                        if ($('.pagination', data).length) {
                            const pagination = $('.pagination:first', data).html();
                            $('#comment-form .comment-placeholder').before('<span class="pagination" style="float: right">' + pagination + '</span>');

                            function pPagination() {
                                $('#comment-form .pagination a').each(function() {
                                    $(this).attr('data-href', $(this).attr('href'));
                                    $(this).attr('href', '');
                                    $(this).on('click', function(e) {
                                        e.preventDefault();
                                        $('#comment-form .comment-placeholder, .pagination').empty();
                                        $.get($(this).attr('data-href'), function(nData) {
                                            $('font[size="3"]', nData).each(function() {
                                                const codeBoxContent = $(this).find('td[id="CODE"]').text();
                                                const cData = JSON.parse(codeBoxContent);
                                                const comment = $(this).find('td[id="QUOTE"]').html();
                                                $('#comment-form .comment-placeholder').append('<a href="/index.php?showuser=' + cData.id + '">' + cData.username + '</a>' + ': ' + comment + '<br>');
                                            });

                                            const nPagination = $('.pagination:first', nData).html();
                                            $('#comment-form .pagination').html(nPagination);
                                            pPagination();
                                        });
                                    });
                                });
                            }

                            pPagination();
                        }
                    });
                });
            }
        });
    }

    if (Number(inputF) !== commentFormForumId) {
        $('a:contains([CF_)').each(function() {
            const tID = $(this).text().split('[CF_')[1].split(']')[0];
            const tTitle = $(this).text().split('] ')[1];
            $(this).attr('href', $(this).attr('href').replace(/showtopic=([0-9]+)/i, 'showtopic=' + tID)).text(tTitle);
        });
    }

    $('#active-topics a[href*="showforum=' + commentFormForumId + '"], #search-topics a[href*="showforum=' + commentFormForumId + '"]').parent('td.row4').parent('tr').hide();
    $('#recent-topics tr:has(a[href$="showforum=' + commentFormForumId + '"]').hide();
}
