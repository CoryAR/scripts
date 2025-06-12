// By Cory
// https://cory.jcink.net/

if (location.href.indexOf('showtopic=') !== -1 || location.href.indexOf('act=ST') !== -1) {
    $('img[alt="user posted image"]').each(function() {
        var uID = $(this).parents('td[class*="post"]').parent('tr').prev('tr').find('span.normalname a').attr('href').split('showuser=')[1];
        if ($('#modcp-link').length || uID === $('#logged-in-as').attr('href').split('showuser=')[1]) {
            $(this).css('vertical-align', 'top').after('<a href="javascript: void(0);" title="Remove Image" style="padding: 0 5px" class="remove_image">X</a>');
        }
    });
}

$('a.remove_image').click(function() {
    var $this = $(this);
    var iURL = $this.prev('img').attr('src');
    var main_url = location.href.split('?')[0];
    var fID = $this.parents('td[class*="post"]').parent('tr').prev('tr').find('a[href*="act=Post&CODE=06').attr('href').split('&f=')[1].split('&')[0];
    var tID = $this.parents('td[class*="post"]').parent('tr').prev('tr').find('a[href*="act=Post&CODE=06').attr('href').split('&t=')[1].split('&')[0];
    var pID = $this.parents('td[class*="post"]').parent('tr').prev('tr').find('a[href*="act=Post&CODE=06').attr('href').split('&p=')[1];

    $.get(main_url + '?act=Post&CODE=08&f=' + fID + '&t=' + tID + '&p=' + pID, function(data) {
        var auth_key = $('input[name="auth_key"]', data).val();
        var MAX_FILE_SIZE = $('input[name="MAX_FILE_SIZE"]', data).val();

        $.post(main_url + '?', {
            st: '0',
            act: 'Post',
            s: '',
            f: fID,
            auth_key: auth_key,
            MAX_FILE_SIZE: MAX_FILE_SIZE,
            CODE: '09',
            t: tID,
            p: pID,
            Post: $('textarea[name="Post"]', data).val().replace(iURL, '').replace(/\[img\]\[\/img\]/g, '').replace(/\[IMG\]\[\/IMG\]/g, ''),
            success: function() {
                $this.hide().prev('img').hide();
            }
        });
    });
});
