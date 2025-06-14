// By Cory
// https://cory.jcink.net/

export default function init({
    bgImages
}) {
    $(bgImages).each(function(i) {
        $('#bg_images').append('<img src="' + bgImages[i] + '" alt="" style="width: 150px; height: 150px; cursor: pointer">');
    });

    $('#bg_popout').css({
        'background': $('#userlinks').css('background-color'),
        'border': '1px solid ' + $('#userlinks').css('border-left-color')
    });

    $('#bg_changer').click(function() {
        $('#bg_popout').fadeIn('slow');
    });

    $('#close_popout').click(function() {
        $('#bg_popout').fadeOut('slow');
    });

    $('#remove_bgi').click(function() {
        localStorage.removeItem('background-image');
        $('#bg_popout').fadeOut('slow');
        $('body').css('background-image', 'none');
    });

    $('#bg_images img').css('margin', '0 5px').click(function() {
        localStorage.setItem('background-image', $(this).attr('src'));
        $('#bg_popout').fadeOut('slow');
        $('body').css({
            'background-image': 'url(' + $(this).attr('src') + ')',
            'background-size': '100% 100%'
        });
    });

    if (localStorage.getItem('background-image').indexOf('http') !== -1) {
        $('body').css({
            'background-image': 'url(' + localStorage.getItem('background-image') + ')',
            'background-size': '100% 100%'
        });
    } else {
        $('body').css('background-image', 'none');
    }
}
