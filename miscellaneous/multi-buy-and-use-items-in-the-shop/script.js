// By Cory
// https://cory.jcink.net/

$('td.store-shop tr:eq(0)').append('<td class="pformstrip" align="center" width="10%"><a href="javascript: void(0)" id="multi-buy">Multi-Buy</a></td>');
$('td.store-inventory tr:has(td.pformstrip)').append('<td class="pformstrip" align="center" width="10%"><a href="javascript: void(0)" id="multi-use">Multi-Use</a></td>');
$('td.store-shop tr:not(:first, :last, :has(td.pformleft))').append('<td class="row4" align="center"><input type="checkbox" name="multibuy" class="checkbox"></td>');
$('td.store-inventory tr:gt(2)').append('<td class="row4" align="center"><input type="checkbox" name="multiuse" class="checkbox"></td>');
$('td.store-inventory td.pformleft:last-child').attr('colspan', '4');

$('#multi-buy').click(function() {
    if ($('input[name="multibuy"]:checked').length) {
        let areYouSure = confirm('Are you sure you want to buy all of the selected items?');

        if (areYouSure) {
            $('input[name="multibuy"]').each(function() {
                if ($(this).is(':checked')) {
                    $.get($(this).parent().prev().prev().find('a').attr('href'), function() {});
                }
            });
            $(document).ajaxStop(function() {
                $('input[name="multibuy"]').prop('checked', false);
                alert('All items have been purchased');
            });
        }
    } else {
        alert('You did not select a checkbox');
    }
});

$('#multi-use').click(function() {
    if ($('input[name="multiuse"]:checked').length) {
        let areYouSure = confirm('Are you sure you want to use all of the selected items?');

        if (areYouSure) {
            $('input[name="multiuse"]').each(function() {
                if ($(this).is(':checked')) {
                    $.get($(this).parent().prev().find('a:first').attr('href'), function() {});
                }
            });
            $(document).ajaxStop(function() {
                $('input[name="multiuse"]').prop('checked', false);
                alert('All items have been used');
            });
        }
    } else {
        alert('You did not select a checkbox');
    }
});
