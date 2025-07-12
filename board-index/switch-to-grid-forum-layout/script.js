// By Cory
// https://cory.jcink.net/

$('div.category:eq(0)').before('<div style="text-align: right; padding: 10px 0"><a href="javascript: void(0)" id="switch-view">Switch to Grid Forum Layout</a></div>');

function onGridSwitch() {
    if ($('div.grid-layout').is(':visible')) {
        $('#subforum-list').css({
            'display': 'flex',
            'flex-wrap': 'wrap'
        });

        $('div.category, #subforum-list').css({
            'background': 'none',
            'margin-bottom': '20px'
        });

        $('div.category > div.maintitle + div, #subforum-list').css('padding', '12px');
    } else {
        $('#subforum-list').css('display', 'block');
        $('div.category, #subforum-list').removeAttr('style');
        $('#subforum-list').css('margin-bottom', '10px');
        $('div.category div.maintitle + div').css('padding', '0');
    }
}

$('#switch-view').click(function() {
    if ($(this).text() === 'Switch to Grid Forum Layout') {
        localStorage.setItem('grid-view', true);
        $('div.grid-layout').show();
        $('table.non-grid-layout').hide();
        $(this).text('Switch to Classic Forum Layout');
        onGridSwitch();
    } else {
        localStorage.removeItem('grid-view');
        $('div.grid-layout').hide();
        $('table.non-grid-layout').show();
        $(this).text('Switch to Grid Forum Layout');
        onGridSwitch();
    }
});

if (localStorage.getItem('grid-view') === 'true') {
    $('div.grid-layout').show();
    $('table.non-grid-layout').hide();
    $('#switch-view').text('Switch to Classic Forum Layout');
}

$('div.category, #subforum-list').each(function() {
    $(this).find('table.non-grid-layout:eq(0)').prepend(`<tr class='forum-subheader'>
    <th align="center" width="2%" class='titlemedium'></th>
    <th align="left" width="59%" class='titlemedium'>Forum</th>
    <th align="center" width="7%" class='titlemedium'>Topics</th>
    <th align="center" width="7%" class='titlemedium'>Replies</th>
    <th align="left" width="25%" class='titlemedium'>Last Post Info</th>
</tr>`);

    $(this).find('table.non-grid-layout:not(:eq(0)) tr.forum-row').appendTo($(this).find('table.non-grid-layout:eq(0)'));
    $(this).find('div.tf-row').wrapAll('<div class="cat-flex"></div>');
});

$('div.last-activity:contains(----)').html('<div style="text-align: center"><em>There are no topics yet in this forum</em></div>');

onGridSwitch();
