// By Cory
// https://cory.jcink.net/

export default function init({
    defaultAvatar
}) {
    var bName = location.href.split('.jcink.net')[0].split('https://')[1];
    $('form[name="subprofilemenu"]').hide();

    $('form[name="subprofilemenu"] option').each(function() {
        var uID = $(this).val();
        var uName = $(this).text().replace('»', '');

        if (uID !== '-------------------') {
            $(this).parents('form[name="subprofilemenu"]').before('<div id="u-' + uID + '" class="sub_div" title="' + uName + '" style="background: url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.png), url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.gif), url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.jpg), url(' + defaultAvatar + '); background-size: cover; width: 50px; height: 50px; display: inline-block; margin: 5px; cursor: pointer"></div>');
        }
    });

    $('div.sub_div').click(function() {
        var uID = $(this).attr('id').split('u-')[1];
        $('form[name="subprofilemenu"] select').val(uID);
        $('form[name="subprofilemenu"]').submit();
    });
}
