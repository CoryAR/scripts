// By Cory
// https://cory.jcink.net/

export default function init({
    expandForum,
    collapseForum
}) {
    var before;
    var after;

    if (expandForum.indexOf('http://') !== -1 && collapseForum.indexOf('http://') !== -1) {
        before = '<img src="';
        after = '" alt="Expand/Collapse" title="Expand/Collapse" />';
    } else {
        before = '';
        after = '';
    }

    var exBef = '<tr><th colspan="5"><span style="float: left">';
    var exAft = '</span><span class="ex_coll" style="float: right; cursor: pointer">' + before + '' + expandForum + '' + after + '</span></th></tr>';

    $('tr.forum-row td.row4:has(b a)').prepend('<span class="coll_ex" style="float: right; cursor: pointer">' + before + '' + collapseForum + '' + after + '</span>');

    function ex_coll() {
        $('span.ex_coll').click(function() {
            var id = $(this).parent('th').parent('tr').next('tr.forum-row').find('td.row4:has(b a) b a').attr('href').split('showforum=')[1];
            localStorage.removeItem(id);
            $(this).parent('th').parent('tr').hide();
            $('tr.forum-row td.row4:has(b a[href*="showforum=' + id + '"]) b a[href*="showforum=' + id + '"]').parents('tr.forum-row').show();
        });
    }

    $('tr.forum-row td.row4:has(b a)').each(function() {
        var fURL = $(this).find('b a').attr('href');
        var fName = $(this).find('b a').text();
        var id = fURL.split('showforum=')[1];

        if (localStorage.getItem(id) === 'true') {
            $(this).parents('tr.forum-row').hide();
            $(this).parents('tr.forum-row').before(exBef + '<a href="' + fURL + '" style="font-weight: 400">' + fName + '</a>' + exAft);
        }
    });

    $('span.coll_ex').click(function() {
        var fURL = $(this).parent('td.row4').find('b a').attr('href');
        var fName = $(this).parent('td.row4').find('b a').text();
        var id = fURL.split('showforum=')[1];
        localStorage.setItem(id, true);
        $('tr.forum-row td.row4:has(b a[href*="showforum=' + id + '"]) b a[href*="showforum=' + id + '"]').parents('tr.forum-row').hide();
        $('tr.forum-row td.row4:has(b a[href*="showforum=' + id + '"]) b a[href*="showforum=' + id + '"]').parents('tr.forum-row').before(exBef + '<a href="' + fURL + '" style="font-weight: 400">' + fName + '</a>' + exAft);
        ex_coll();
    });

    ex_coll();
}
