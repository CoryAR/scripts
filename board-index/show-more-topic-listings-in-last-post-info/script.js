// By Cory
// https://cory.jcink.net/

$('div.category td.row2[nowrap]').append('<a href="javascript: void(0)" class="more" style="float: right">Show more...</a>');

$('a.more').click(function() {
    if ($(this).text() === 'Show less...') {
        $(this).next('#toggle_topics').hide();
        $(this).text('Show more...');
    } else {
        $(this).next('#toggle_topics').show();
        $(this).text('Show less...');
    }

    if (!$(this).hasClass('toggle')) {
        var fURL = $(this).parent('td.row2[nowrap]').parent('tr.forum-row').find('b a[href*="showforum"]').attr('href');
        var $this = $(this);

        $.get(fURL, function(data) {
            var tURL1 = $('#topic-list tr.topic-row td.row4 > a[href*="showtopic"]:eq(1)', data).attr('href');
            var tText1 = $('#topic-list tr.topic-row td.row4 > a[href*="showtopic"]:eq(1)', data).text();
            var uURL1 = $('#topic-list tr.topic-row td.row2 > a[href*="showuser"]:eq(1)', data).attr('href');
            var uText1 = $('#topic-list tr.topic-row td.row2 > a[href*="showuser"]:eq(1)', data).text();
            var dText1 = $('#topic-list tr.topic-row td.row2:has(a[href*="getlastpost"]):eq(1)', data).text().split('Last Post by:')[0];
            var tURL2 = $('#topic-list tr.topic-row td.row4 > a[href*="showtopic"]:eq(2)', data).attr('href');
            var tText2 = $('#topic-list tr.topic-row td.row4 > a[href*="showtopic"]:eq(2)', data).text();
            var uURL2 = $('#topic-list tr.topic-row td.row2 > a[href*="showuser"]:eq(2)', data).attr('href');
            var uText2 = $('#topic-list tr.topic-row td.row2 > a[href*="showuser"]:eq(2)', data).text();
            var dText2 = $('#topic-list tr.topic-row td.row2:has(a[href*="getlastpost"]):eq(2)', data).text().split('Last Post by:')[0];

            $($this).parent('td.row2[nowrap]').append('<span id="toggle_topics"><hr />' + dText1 + '<br />In: <a href="' + tURL1 + '">' + tText1 + '</a><br />By: <a href="' + uURL1 + '">' + uText1 + '</a><hr />' + dText2 + '<br />In: <a href="' + tURL2 + '">' + tText2 + '</a><br />By: <a href="' + uURL2 + '">' + uText2 + '</a></span>');
        });
        $(this).addClass('toggle').text('Show less...');
    }
});
