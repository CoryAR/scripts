// By Cory
// https://cory.jcink.net/

$(function() {
    $('div.tableborder[id*="cat-"] + br.cat-lb + div.tableborder[id*="cat-"]').hide();
    $('div.tableborder[id*="cat-"]:eq(0)').before('<div id="cat_selection" style="margin: 10px 0"></div>');

    $('div.tableborder[id*="cat-"]').each(function() {
        var h2Text = $.trim($(this).find('div.maintitle').text());

        $('#cat_selection').append('<input type="button" class="forminput" value="' + h2Text + '" style="margin: 10px 2.5px 0" />');
    });

    $('#cat_selection').append('<input type="button" id="show_all" class="forminput" value="Show All" style="margin: 10px 2.5px 0" />');

    var showForum = function(index) {
        $('div.tableborder[id*="cat-"], div.tableborder[id*="cat-"] + br.cat-lb:not(:last)').hide();
        $('div.tableborder[id*="cat-"]:eq(' + index + ')').fadeIn('slow');
        $('div.tableborder[id*="cat-"]:eq(' + index + ')').prev('br.cat-lb:not(:first)').show();
        localStorage.setItem('buttonClick', index);
    };

    var showAll = function() {
        $('div.tableborder[id*="cat-"]').fadeIn('slow');
        $('br.cat-lb').show();
        localStorage.setItem('buttonClick', 'all');
    };

    $('#cat_selection input').not('#show_all').click(function() {
        showForum($(this).index());
    });

    $('#show_all').click(showAll);

    var buttonClick = localStorage.getItem('buttonClick');
    if (buttonClick === 'all') {
        showAll();
    } else if ($.isNumeric(buttonClick)) {
        showForum(buttonClick);
    }
});
