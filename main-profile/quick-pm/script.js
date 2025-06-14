// By Cory
// https://cory.jcink.net/

$(function() {
    if (location.href.indexOf('showuser=') !== -1) {
        $('form[name="skin"]').before('<div id="quick_pm" class="tableborder" style="margin: 10px 0"><div class="maintitle">Quick PM</div><table width="100%" cellspacing="1" cellpadding="4"><tbody><tr><td class="row2" style="text-align: center; width: 25%">Message Title</td><td class="row2"><input type="text" class="forminput" name="msg_title" size="40" /></td></tr><tr><td class="row2" colspan="2"><textarea style="width: 99%" rows="15"></textarea><br /><input type="button" class="forminput" value="Submit" /></td></tr></tbody></table>');
    }

    var main_url = location.href.split('?')[0];

    $('#quick_pm input[type="button"]').click(function() {
        $.get(main_url + '?act=Msg&CODE=04&MID=1', function(data) {
            $.post(main_url + '?', {
                act: 'Msg',
                CODE: '04',
                MODE: '01',
                OID: '',
                auth_key: $('input[name="auth_key"]', data).val(),
                entered_name: $('#profile-header h3, #profilename').text(),
                msg_title: $('#quick_pm input[name="msg_title"]').val(),
                Post: $('#quick_pm textarea').val(),
                success: function() {
                    alert('PM sent!');
                }
            });
        });
    });
});
