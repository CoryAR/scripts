export default function init({
    inputAct
}) {
    if (inputAct === 'Pages' && $('#innerwrapper').html().indexOf('field_') !== -1) {
        $('#innerwrapper').html($('#innerwrapper').html().replace(/<!-- \|field_([0-9]+)\| -->/g, '<span class="field_$1"></span>'));

        $.get('/index.php?act=UserCP&CODE=01', function(data) {
            $('span[class*="field_"]').each(function() {
                var $this = $(this);
                var val;
                $('#' + $(this).attr('class'), data).each(function() {
                    if ($(this).find('textarea, input').length) {
                        val = $(this).find('textarea, input').val();
                    } else {
                        val = $(this).find('select option:selected').text();
                    }

                    $this.html(val);
                });
            });
        });
    }
}
