// By Cory
// https://cory.jcink.net/

var post_value = '';
var fID = $('a[href*="Post&CODE=02"]:eq(0)').attr('href').split('&f=')[1].split('&t=')[0];
var tID = $('a[href*="Post&CODE=02"]:eq(0)').attr('href').split('&t=')[1].split('&st=')[0];

$('div.posting_form').find('input[value="Submit"]').click(function() {
    let $this = $(this).parents('div.posting_form');
    $this.find('td.row4:first-child:not(:has(input))').each(function() {
        var field_title = $(this).text();
        var field_value = $(this).next('td.row4').find('input, select, textarea').val();
        post_value += '[b]' + field_title + '[/b] ' + field_value + '\n';
    });

    if ($('#logged-in-as').length) {
        $.post('/index.php?', {
            st: '0',
            act: 'Post',
            s: '',
            f: fID,
            auth_key: PFormAuthKey,
            CODE: '03',
            t: tID,
            Post: post_value,
            success: function() {
                $this.find('td.row4:has(input[value="Submit"])').text('Form sent!');
                post_value = '';
            }
        });
    }
});
