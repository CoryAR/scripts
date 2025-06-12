// By Cory
// https://cory.jcink.net/

$(function() {
    $('#sig_popup td.row2, div.signature').wrapInner('<div class="sig_content"></div>').prepend('<div class="block_sig" style="float: right"><a href="javascript: void(0);">Block This User\'s Signature</a></div>');

    var uID;

    if (location.href.indexOf('showuser=') !== -1) {
        uID = location.href.split('showuser=')[1];

        if (localStorage.getItem('block_sig-' + uID) === uID) {
            $('div.sig_content').hide();
        }

        $('div.block_sig').click(function() {
            if ($(this).find('a').text() === 'Block This User\'s Signature') {
                localStorage.setItem('block_sig-' + uID, uID);
                location.reload();
            } else {
                localStorage.removeItem('block_sig-' + uID);
                location.reload();
            }
        });
    } else if ($('div.signature').length) {
        $('div.signature').each(function() {
            uID = $(this).parents('td[id*="pid_"]').parent('tr').prev('tr').find('span.normalname a').attr('href').split('showuser=')[1];

            if (localStorage.getItem('block_sig-' + uID) === uID) {
                $(this).find('div.sig_content').hide();
            }
        });

        $('div.block_sig').click(function() {
            if ($(this).find('a').text() === 'Block This User\'s Signature') {
                uID = $(this).parents('td[id*="pid_"]').parent('tr').prev('tr').find('span.normalname a').attr('href').split('showuser=')[1];
                localStorage.setItem('block_sig-' + uID, uID);
                location.reload();
            } else {
                localStorage.removeItem('block_sig-' + uID);
                location.reload();
            }
        });
    }

    function sigContent() {
        $('div.sig_content').each(function() {
            if ($(this).is(':hidden')) {
                $(this).prev('div.block_sig').find('a').text('Unblock This User\'s Signature');
            } else {
                $(this).prev('div.block_sig').find('a').text('Block This User\'s Signature');
            }
        });
    }

    sigContent();

    $('a[onclick*="sig_popup"]').click(function() {
        sigContent();
    });
});
