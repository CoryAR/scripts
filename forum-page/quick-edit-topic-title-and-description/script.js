// By Cory
// https://cory.jcink.net/

if (location.href.indexOf('showforum') !== -1) {
    var main_url = location.href.split('?')[0];
    $('tr.topic-row').each(function() {
        var uID = parseInt($(this).find('td.row2:eq(1) a').attr('href').split('showuser=')[1], 10);
        var mid = $('#logged-in-as').attr('href').split('showuser=')[1];
        if (uID === mid || $('#modcp-link').length) {
            $(this).find('td.row4:eq(1)').wrapInner('<span class="c_cat-inner"></span>').append('<span class="qe_show" style="display: none"><input type="text" value="" name="qe_title" /><br /><input type="text" value="" name="qe_desc" style="margin: 5px 0" /><br /><button type="button">Submit</button></span>').find('span.desc').prev('br').prev('a').after('<span class="qe_topic" style="cursor: pointer; position: relative; left: 10px">Edit</span>');
        }
    });

    $('span.qe_topic').click(function() {
        var title = $(this).parent('span.c_cat-inner').children('a').text();
        var desc = $(this).parent('span.c_cat-inner').children('span.desc').text();
        $(this).parent('span.c_cat-inner').next('span.qe_show').find('input[name="qe_title"]').val(title);
        $(this).parent('span.c_cat-inner').next('span.qe_show').find('input[name="qe_desc"]').val(desc);
        $(this).parent('span.c_cat-inner').hide();
        $(this).parent('span.c_cat-inner').next('span.qe_show').show();
    });

    $('span.qe_show button').click(function() {
        var button = $(this);
        var qet = $(this).parent('span.qe_show').find('input[name="qe_title"]').val();
        var qed = $(this).parent('span.qe_show').find('input[name="qe_desc"]').val();
        var fID = window.location.href.split('showforum=')[1];
        var tID = $(this).parents('td.row4').find('span.c_cat-inner').children('a').attr('href').split('showtopic=')[1];

        $.get(main_url + '?showtopic=' + tID, function(tData) {
            var pID = $('a[href*="?act=Post&CODE=06"]', tData).attr('href').split('&p=')[1];

            $.get(main_url + '?act=Post&CODE=08&f=' + fID + '&t=' + tID + '&p=' + pID, function(data) {
                var auth_key = $('input[name="auth_key"]', data).val();
                var MAX_FILE_SIZE = $('input[name="MAX_FILE_SIZE"]', data).val();
                var post = $('textarea[name="Post"]', data).val();

                $.post(main_url + '?', {
                    act: 'Post',
                    s: '',
                    f: fID,
                    auth_key: auth_key,
                    MAX_FILE_SIZE: MAX_FILE_SIZE,
                    CODE: '09',
                    t: tID,
                    p: pID,
                    st: '0',
                    TopicTitle: qet,
                    TopicDesc: qed,
                    Post: post,
                    success: function() {
                        $(button).parent('span.qe_show').hide();
                        $(button).parents('td.row4').find('span.c_cat-inner').children('a').text(qet);
                        $(button).parents('td.row4').find('span.c_cat-inner').children('span.desc').text(qed);
                        $(button).parents('td.row4').find('span.c_cat-inner').show();
                    }
                });
            });
        });
    });
}
