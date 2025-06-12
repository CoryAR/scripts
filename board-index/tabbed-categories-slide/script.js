// By Cory
// https://cory.jcink.net/

$('div.category:not(:eq(0))').hide();
$('div.category:eq(0)').before('<div id="cat_selection" style="margin: 10px 0"></div>');
$('#innerwrapper').css('overflow', 'hidden');

$('div.category').each(function() {
    var h2Text = $.trim($(this).find('div.maintitle').text());
    $('#cat_selection').append('<input type="button" class="forminput" value="' + h2Text + '" style="margin: 10px 2.5px 0" />');
});

var showForum = function(index) {
    $('div.category').css({
        'position': 'relative',
        'left': $('#innerwrapper').width() + 'px'
    }).hide();

    $('div.category:eq(' + index + ')').animate({
        left: '0'
    }, 1500).show();
};

$('#cat_selection input').click(function() {
    showForum($(this).index());
});
