// By Cory
// https://cory.jcink.net/

if (location.href.indexOf('Msg&CODE=03') !== -1) {
    $('#ucpcontent div.pformstrip').after('<div id="quick_reply" class="tableborder" style="background: none; text-align: center; margin: 10px"><div class="titlemedium">Quick reply</div><br /><textarea rows="15" cols="70"></textarea><br /><input type="button" value="Send Message" class="forminput" /></div>');

    $('#quick_reply input').click(function() {
        var main_url = location.href.split('?')[0];
        var MSID = location.href.split('MSID=')[1];
        var MID = $('span.normalname a').attr('href').split('showuser=')[1];
        var reply = $('#quick_reply textarea').val();

        $.get(main_url + '?CODE=04&act=Msg&MID=' + MID + '&MSID=' + MSID, function(data) {
            var auth_key = $('input[name="auth_key"]', data).val();
            var entered_name = $('input[name="entered_name"]', data).val();
            var msg_title = $('input[name="msg_title"]', data).val();
            var textarea = $('textarea[name="Post"]', data).val();

            $.post(main_url + '?', {
                act: 'Msg',
                CODE: '04',
                MODE: '01',
                OID: '',
                auth_key: auth_key,
                entered_name: entered_name,
                msg_title: msg_title,
                Post: textarea + reply,
                success: function() {
                    location.href = main_url + '?act=Msg&CODE=01&VID=in';
                }
            });
        });
    });
}
