// By Cory
// https://cory.jcink.net/

export default function init({
    defaultAvatar
}) {
    var bName = location.href.split('.jcink.net')[0].split('https://')[1];

    $('#subacct_link').appendTo('#subacct_clip').find('a').click().end().find('form').hide().end().html($('#subacct_link').html().replace(' · ', '')).end().find('option').each(function() {
        var uID = $(this).val();
        var uName = $(this).text().replace('Â»', '');

        if (uID !== '------------') {
            $(this).parents('#subacct_link').append('<div id="u-' + uID + '" title="' + uName + '" style="background: url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.png), url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.gif), url(https://files.jcink.net/uploads/' + bName + '//av-' + uID + '.jpg), url(' + defaultAvatar + '); background-position: center; background-size: cover; width: 50px; height: 50px; display: inline-block; margin: 5px; cursor: pointer"></div>');
        }
    });

    $('#subacct_link div').click(function() {
        var uID = $(this).attr('id').split('u-')[1];
        $('#subacct_link select').val(uID);
        $('#subacct_link form').submit();
    });
}
