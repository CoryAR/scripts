// By Cory
// https://cory.jcink.net/

$('td.store-shop tr:eq(0)').append('<td class="pformstrip" align="center" width="10%"><a href="javascript: void(0)" id="multi-buy">Multi-Buy</a></td>');
$('td.store-shop tr:not(:first, :last, :has(td.pformleft))').append('<td class="row4" align="center"><input type="checkbox" name="multibuy" class="checkbox"></td>');

if ($('td.pformleft:contains(Inventory Empty)').length === 0) {
    $('td.store-inventory tr:has(td.pformstrip)').append('<td class="pformstrip" align="center" width="10%"><a href="javascript: void(0)" id="multi-use">Multi-Use</a></td>');
    $('td.store-inventory tr:gt(2)').append('<td class="row4" align="center"><input type="checkbox" name="multiuse" class="checkbox"></td>');
    $('td.store-inventory td.pformleft:last-child').attr('colspan', '4');
}

$('#multi-buy').click(function() {
    if ($('input[name="multibuy"]:checked').length) {
        let areYouSure = confirm('Are you sure you want to buy all of the selected items?');

        if (areYouSure) {
            let fetches = [];
            $('input[name="multibuy"]').each(function() {
                if ($(this).is(':checked')) {
                    fetches.push(fetch($(this).parent().parent().find('a[href*="act=store&code=buyitem"]').attr('href')));
                }
            });
            Promise.all(fetches).then(function(responses) {
                $('input[name="multibuy"]').prop('checked', false);
                alert('All items have been purchased');
            }).catch(function(error) {
                alert('An error occurred while purchasing items, not all items were purchased.');
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
            let fetches = [];
            $('input[name="multiuse"]').each(function() {
                if ($(this).is(':checked')) {
                    fetches.push(fetch($(this).parent().prev().find('a:first').attr('href')));
                }
            });
            Promise.all(fetches).then(function(responses) {
                $('input[name="multiuse"]').prop('checked', false);
                alert('All items have been used');
            }).catch(function(error) {
                alert('An error occurred while using items, not all items were used.');
            });
        }
    } else {
        alert('You did not select a checkbox');
    }
});
