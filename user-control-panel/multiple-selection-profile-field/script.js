// By Cory
// https://cory.jcink.net/

function addExp(field, pID, href, src) {
    if (location.href.indexOf('act=UserCP&CODE=01') !== -1) {
        $('tr[id*="field_"] td:contains(' + field + ')').next('td').find('input').hide();
        var input = $('tr[id*="field_"] td:contains(' + field + ')').next('td').find('input');
        $('tr[id*="field_"] td:contains(' + field + ')').next('td').append('<span id="' + pID + '" style="cursor: pointer; opacity: 0.5; padding-left: 5px"><img src="' + src + '" alt="" title="' + pID + '" /></span>');

        if (input.val().match(pID)) {
            $('span:has(img[title="' + pID + '"])').css('opacity', '1.0');
        }

        $('#' + pID).click(function() {
            if (input.val().match(pID)) {
                $(this).css('opacity', '0.5');
                input.val(input.val().split(' ' + pID)[0] + input.val().split(' ' + pID)[1]);
            } else {
                $(this).css('opacity', '1.0');
                input.val(input.val() + ' ' + pID);
            }
        });
    }

    if ($('td.profile-left div.row2:contains(' + field + ')').length || $('span.postdetails:contains(' + field + ')').length) {
        $('td.profile-left div.row2:contains(' + field + '), span.postdetails:contains(' + field + ')').html($('td.profile-left div.row2:contains(' + field + '), span.postdetails:contains(' + field + ')').html().replace(pID, '<a href="' + href + '" target="_blank" class="dd_icon"><img src="' + src + '" alt="" title="' + pID + '" /></a>'));
    }
