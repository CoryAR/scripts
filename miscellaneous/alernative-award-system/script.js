// Originally by Quozzo of Zathyus Networks
// Converted by Cory

$(function() {
    var main_url = location.href.split('?')[0];

    $('td.miniprofile').each(function() {
        $(this).append('<div class="awards"></div>');
        for (var i = 0; i < a; i++) {
            if ($(this).parent('tr').prev('tr').find('span.normalname a').text() === awards[i][0]) {
                $(this).find('div.awards').append('<a href="' + main_url + '?act=Pages&pid=' + pgID + '" title="' + awards[i][1] + '"><img src="' + awards[i][2] + '" alt="' + awards[i][1] + '" width="' + awardswidth + '" height="' + awardsheight + '" /></a>');
            }
        }
    });

    if (location.href.indexOf('showuser=') !== -1) {
        $('#skin_selector').before('<div class="tableborder" style="margin-top: 10px"><div class="maintitle">Awards</div><table id="awards" style="width: 100%"><tbody><tr><td class="titlemedium">Award</td><td class="titlemedium">Name</td><td class="titlemedium">Date Awarded</td><td class="titlemedium">Reason</td></tr></tbody></table>');

        for (var i = 0; i < a; i++) {
            if ($('#profile-header h3').text() === awards[i][0]) {
                $('#awards tbody').append('<tr><td class="row2"><a href="' + main_url + '?act=Pages&pid=' + pgID + '"><img src="' + awards[i][2] + '" alt="' + awards[i][1] + '" width="' + awardswidth + '" height="' + awardsheight + '" /></a></td><td class="row2">' + awards[i][1] + '</td><td class="row2">' + awards[i][3] + '</td><td class="row2">' + awards[i][4] + '</td></tr>');
            }
        }
    }

    if (location.href.indexOf('act=Pages&pid=' + pgID) !== -1) {
        for (var i = 0; i < a; i++) {
            if ($('#awards img[src="' + awards[i][2] + '"]').length === 0) {
                $('#awards tbody').append('<tr><td class="row2" colspan="3"><big><strong>' + awards[i][1] + '</strong></big></td></tr><tr><td class="row2" colspan="3"><img src="' + awards[i][2] + '" alt="' + awards[i][1] + '" /></td></tr><tr><td class="titlemedium">Awarded To</td><td class="titlemedium">Date Awarded</td><td class="titlemedium">Reason</td></tr>');
            }

            $('#awards img').each(function() {
                if ($(this).attr('src') === awards[i][2]) {
                    $(this).parent('td.row2').parent('tr').next('tr').after('<tr><td class="row2">' + awards[i][0] + '</td><td class="row2">' + awards[i][3] + '</td><td class="row2">' + awards[i][4] + '</td></tr>');
                }
            });
        }
    }
});
