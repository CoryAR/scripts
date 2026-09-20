// By Cory
// https://cory.jcink.net/

export default function init({
    defaultAvatar,
    width,
    height
}) {
    var bName = $('#newest_member a').attr('href').split('.jcink.net')[0].split('//')[1];
    var uID = $('#newest_member a').attr('href').split('showuser=')[1];
    $('#newest_member a').after(' <div style="display: inline-block; width: ' + width + 'px; height: ' + height + 'px; background-image: url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.png), url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.gif), url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.jpg), url(' + defaultAvatar + '); background-size: contain"></div>');

    if (localStorage.getItem('newest_member_img') && uID === localStorage.getItem('newest_member_id')) {
        $('#newest_member div').css('background-image', 'url(' + localStorage.getItem('newest_member_img') + ')');
    } else {
        $.get($('#newest_member a').attr('href'), function(data) {
            if ($('#avatar img', data).length) {
                var iURL = $('#avatar img', data).attr('src');
                localStorage.setItem('newest_member_img', $('#avatar img', data).attr('src'));
                localStorage.setItem('newest_member_id', $('#newest_member a').attr('href').split('showuser=')[1]);
                $('#newest_member div').css('background-image', 'url(' + iURL + ')');
            }
        });
    }
}
