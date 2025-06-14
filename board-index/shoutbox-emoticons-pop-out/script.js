// By Cory
// https://cory.jcink.net/

$('body').append('<div id="emots" class="tableborder" style="display: none; position: absolute; max-width: 150px; max-height: 250px; overflow: auto; z-index: 999"><div class="row2" style="display: flex; justify-content: space-evenly; flex-wrap: wrap; gap: 7.5px"></div></div>');

$('#shoutbox input[value="Smilies"]').removeAttr('onclick').click(function() {
    let pos = $(this).position();
    $('#emots div.row2').empty();

    $('#emots').css({
        'top': pos.top + 'px',
        left: pos.left + 'px'
    });

    $.get('/index.php?act=sbextras&CODE=emoticons2&s=', function(data) {
        $('#emots div.row2').prepend('<strong>Clickable Smilies</strong><span id="close" title="Close" style="float: right; cursor: pointer">X</span>');

        $('tr:not(:eq(0))', data).each(function() {
            let html = $(this).find('td:eq(1)').html();
            $('#emots div.row2').append(html);
            $('#emots').show();
        });

        $('#emots a').click(function() {
            let shortcut = $(this).attr('onclick').split('add_smilie("')[1].split('")')[0];
            $('input.sbinputbox').val($('input.sbinputbox').val() + ' ' + shortcut);
            $('#emots').hide();
        });

        $('#close').click(function() {
            $('#emots').hide();
        });
    });
});
