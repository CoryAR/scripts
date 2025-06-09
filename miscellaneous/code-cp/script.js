// By Cory
// https://cory.jcink.net/

$('#ucpmenu a[href*="act=UserCP&CODE=04"]').after('<br />· <a href="' + CCPURL + '">Code Settings</a>');

function addCode(cName, cValue) {
    $('#code_cp tbody tbody').append('<tr><td>' + cName + '</td><td><label><input type="radio" checked="checked" value="1" name="' + cValue + '" style="vertical-align: top" /> Enable</label><label style="margin-left: 20px"><input type="radio" value="0" name="' + cValue + '" style="vertical-align: top" /> Disable</label></td></tr>');
}

if (location.href === CCPURL) {
    $.get(CCPURL.split('?')[0] + '?act=UserCP&CODE=00', function(data) {
        $('#ucpmenu', data).insertBefore('#spacer');
    });
}

$('#code_cp tbody tbody').append('<tr><td>Enable/Disable All Codes</td><td><button id="enable_all" type="button">Enable All Codes</button> <button id="disable_all" type="button">Disable All Codes</button></td></tr>');

$(function() {
    $('#code_cp input[value="0"]').each(function() {
        if (localStorage.getItem($(this).attr('name')) === 'true') {
            $(this).attr('checked', 'checked');
        }
    });

    $('#code_cp tbody tbody').append('<tr><td colspan="2"><button type="button" id="submit_settings">Save Settings</button></td></tr>');

    $('#disable_all').click(function() {
        $('#code_cp input').each(function() {
            localStorage.setItem($(this).attr('name'), true);
        });
        window.location.href = CCPURL;
    });

    $('#enable_all').click(function() {
        $('#code_cp input').each(function() {
            localStorage.removeItem($(this).attr('name'));
        });
        window.location.href = CCPURL;
    });

    $('#submit_settings').click(function() {
        $('#code_cp input').each(function() {
            if ($(this).val() === '0' && $(this).is(':checked')) {
                localStorage.setItem($(this).attr('name'), true);
            } else if ($(this).val() === '1' && $(this).is(':checked')) {
                localStorage.removeItem($(this).attr('name'));
            }
        });
        window.location.href = CCPURL;
    });
});
