// By Cory
// https://cory.jcink.net/

$(function() {
    $('#post-options td.pformright').prepend('<select name="posting_template" class="forminput"><option>Posting Template</option></select><br />');

    if ($('select[name="posting_template"]').length) {
        $.get('/index.php?act=UserCP&CODE=01', function(data) {
            var len = 1;
            $('tr[id*="field_"] label:contains(Template)', data).each(function() {
                $('select[name="posting_template"]').append('<option>Template ' + len++ + '</option>');
            });
        });
    }

    $('select[name="posting_template"]').change(function() {
        $.get('/index.php?act=UserCP&CODE=01', function(data) {
            var len = $('select[name="posting_template"] option:selected').index() - 1;
            var value = $('tr[id*="field_"] label:contains(Template):eq(' + len + ')', data).parent('td').next('td').find('textarea').val();
            $('textarea[name="Post"]').val(value);
        });
    });
});
