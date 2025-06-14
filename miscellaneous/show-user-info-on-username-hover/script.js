// By Cory
// https://cory.jcink.net/

$('a[href*="showuser="]').one('hover', function() {
    let username = $(this).html();
    let id = $(this).attr('href').split('showuser=')[1];
    let pos = $(this).position();
    let height = $(this).height() + 5;

    $.get($(this).attr('href'), function(data) {
        let avatar = $('#grab-avatar', data).text();
        let group = $('#grab-group', data).text();
        let title = $('#grab-title', data).text();
        let joined = $('#grab-joined', data).text();
        let lastActivity = $('#grab-last_activity', data).text();
        let activity = $('#grab-activity', data).text();
        let posts = $('#grab-posts', data).text();
        let pm = $('#grab-pm', data).text();

        if ($('#user-' + id).length === 0) {
            $('body').append('<div id="user-' + id + '" class="user-popup tableborder" style="display: none; position: absolute"><div class="row2" style="display: flex"><div style="padding-right: 10px"><img src="' + avatar + '" alt="Avatar"></div><div style="text-align: left"><big>' + username + '</big><br>' + title + '<br><br><strong>Group</strong>: ' + group + '<br><strong>Joined</strong>: ' + joined + '<br><strong>Last Activity</strong>: ' + lastActivity + ' ' + activity + '<br><strong>Posts</strong>: ' + posts + '</div><a href="' + pm + '">Send Message</a></div></div>');
        }

        $('#user-' + id).css({
            'top': pos.top + height + 'px',
            'left': pos.left + 'px'
        }).fadeIn('slow');

        $('div.user-popup').mouseleave(function() {
            $(this).fadeOut('slow');
        });
    });
});

$('a[href*="showuser="]').hover(function() {
    let pos = $(this).position();
    let id = $(this).attr('href').split('showuser=')[1];
    let height = $(this).height() + 5;
    $('div.user-popup:not(#user-' + id + ')').hide();

    $('#user-' + id).css({
        'top': pos.top + height + 'px',
        'left': pos.left + 'px'
    }).fadeIn('slow');

    $('div.user-popup').mouseleave(function() {
        $(this).fadeOut('slow');
    });
});
