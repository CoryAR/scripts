// By Cory
// https://cory.jcink.net/

export default function init({
    fieldID,
    fields
}) {
    $(fields).each(function() {
        $('#field_' + fieldID + ' .pformright').append('<label><input type="checkbox" style="vertical-align: middle"><span></span></label><br>');
    });

    $('#field_' + fieldID + ' span').each(function(i) {
        $(this).text(fields[i]);
    });

    $('#field_' + fieldID + '_input').hide();
    const textExists = $('#field_' + fieldID + '_input').val().split(', ');

    $(textExists).each(function(i) {
        $('#field_' + fieldID + ' input[type="checkbox"]').each(function() {
            if (textExists[i] === $(this).parent().text()) {
                $(this).attr('checked', true);
            }
        });
    });

    $('form[name="theForm"]').submit(function() {
        const isChecked = [];

        $('#field_' + fieldID + ' label').each(function() {
            if ($(this).find('input').is(':checked')) {
                isChecked.push($(this).text());
            } else {
                const index = isChecked.indexOf($(this).text());

                if (index !== -1) {
                    isChecked.splice(index, 1);
                }
            }
        });

        if (isChecked.length > 0) {
            $('#field_' + fieldID + '_input').val(isChecked);
        }

        $('#field_' + fieldID + '_input').val($('#field_' + fieldID + '_input').val().replace(/,/g, ', '));
    });
}
