// By Cory
// https://cory.jcink.net/

export default function init({
    monthlyPostersForum,
    floodControlSeconds,
    numberOfPosters,
    auth_key
}) {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (sessionStorage.getItem('monthlyTopPostersHTML')) {
        $('#monthly-top-posters').html(sessionStorage.getItem('monthlyTopPostersHTML'));
    } else {
        $.get('/index.php?act=Search&q="' + months[month] + '"&f=' + monthlyPostersForum + '&u=&rt=topics', function(sData) {
            $.get($('a', sData).attr('href'), function(nSData) {
                $('#search-topics a[href*="showtopic"]:not(a[href*="&view"])', nSData).each(function() {
                    if ($(this).text() === months[month] && Number($(this).parents('.row4').find('.desc').text()) === year) {
                        const topicID = $(this).attr('href').split('showtopic=')[1].split('&hl=')[0];
                        localStorage.setItem('topic-ID', topicID);

                        $.get('/index.php?s=&act=Stats&CODE=who&t=' + topicID, function(data) {
                            $('a[href*="showuser"]:lt(' + numberOfPosters + ')', data).each(function() {
                                const username = $(this).text();
                                const userID = $(this).attr('href').split('showuser=')[1];
                                const posts = $(this).parent().next().find('a').text();
                                $('#monthly-top-posters').append('<div class="row2" style="width: calc(50% - 11px); margin-right: 1px; margin-bottom: 1px"><a href="/index.php?showuser=' + userID + '">' + username + '</a></div><div class="row2" style="width: calc(50% - 10px); margin-bottom: 1px">' + posts + '</div>');
                            });
                            sessionStorage.setItem('monthlyTopPostersHTML', $('#monthly-top-posters').html());
                        });
                    }
                });
            });
        });
    }

    setTimeout(function() {
        if (localStorage.getItem('add-reply') === 'true') {
            $.post('/index.php?', {
                st: '0',
                act: 'Post',
                f: monthlyPostersForum,
                auth_key: auth_key,
                CODE: '03',
                t: localStorage.getItem('topic-ID'),
                Post: 'Content'
            }, function() {
                localStorage.removeItem('add-reply');
            });
        } else if (localStorage.getItem('new-topic') === 'true') {
            $.post('/index.php?', {
                st: '0',
                act: 'Post',
                f: monthlyPostersForum,
                auth_key: auth_key,
                CODE: '01',
                TopicTitle: months[month],
                TopicDesc: year,
                Post: 'Content'
            }, function() {
                localStorage.removeItem('new-topic');
            });
        }
    }, floodControlSeconds);

    $('#qr_open input[name="submit"], #posting-form input[name="submit"]').on('click', function() {
        if (localStorage.getItem('topic-ID')) {
            localStorage.setItem('add-reply', true);
        } else {
            localStorage.setItem('new-topic', true);
        }
    });

    $('#active-topics a[href*="showforum=' + monthlyPostersForum + '"], #search-topics a[href*="showforum=' + monthlyPostersForum + '"]').parent('td.row4').parent('tr').hide();
}
