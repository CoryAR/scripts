// By Cory
// https://cory.jcink.net/
export default function init({
    form_enable_pm,
    form_enable_topic,
    form_pm_user,
    form_pm_title,
    form_FID,
    form_topic_title,
    form_topic_desc
}) {
    var main_url = location.href.split('index.php')[0];
    var post_value = '';

    $('#form input[value="Submit"]').click(function() {
        $('#form td.row4:first-child:not(:has(input))').each(function() {
            var field_title = $(this).text();
            var field_value = $(this).next('td.row4').find('input, select, textarea').val();
            post_value += '[b]' + field_title + '[/b] ' + field_value + '\n';
        });

        if (form_enable_topic === true && $('#userlinks a[href*="showuser"]').length) {
            $.get(main_url + 'index.php?act=Post&CODE=00&f=' + form_FID, function(data) {
                var auth_key = $('input[name="auth_key"]', data).val();
                var MAX_FILE_SIZE = $('input[name="MAX_FILE_SIZE"]', data).val();

                $.post(main_url + 'index.php?', {
                    st: '0',
                    act: 'Post',
                    s: '',
                    f: form_FID,
                    auth_key: auth_key,
                    MAX_FILE_SIZE: MAX_FILE_SIZE,
                    CODE: '01',
                    TopicTitle: form_topic_title,
                    TopicDesc: form_topic_desc,
                    Post: post_value,
                    success: function() {
                        $('#form td.row4:has(input[value="Submit"])').text('Form sent!');
                    }
                });
            });
        }

        if (form_enable_pm === true && $('#userlinks a[href*="showuser"]').length) {
            $.get(main_url + 'index.php?act=Msg&CODE=04', function(data) {
                var auth_key = $('input[name="auth_key"]', data).val();

                $.post(main_url + 'index.php?', {
                    act: 'Msg',
                    CODE: '04',
                    MODE: '01',
                    OID: '',
                    auth_key: auth_key,
                    entered_name: form_pm_user,
                    msg_title: form_pm_title,
                    Post: post_value,
                    success: function() {
                        $('#form td.row4:has(input[value="Submit"])').text('Form sent!');
                    }
                });
            });
        }
    });
}
