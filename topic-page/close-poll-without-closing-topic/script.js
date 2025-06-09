// By Cory
// https://cory.jcink.net/

$(function() {
    if ($('#modcp-link').length) {
        var main_url = location.href.split('?')[0];
        var color = $('a[href*="Mod&CODE=20"]').css('color');
        $('a[href*="Mod&CODE=20"]').after(' - <span class="close_poll" style="cursor: pointer; font-weight: 700; color: ' + color + '">Close Poll</span>');

        $('span.close_poll').each(function() {
            if ($(this).parent('div.pformstrip').next('div.tablepad').find('b:contains([Closed])').length === 1) {
                $(this).text('Open Poll').attr('class', 'open_poll');
            }
        });

        $('span.close_poll').click(function() {
            var fID = $('a[href*="Mod&CODE=20"]').attr('href').split('&f=')[1].split('&t=')[0];
            var tID = $('a[href*="Mod&CODE=20"]').attr('href').split('&t=')[1].split('&auth_key=')[0];

            $.get($('a[href*="Mod&CODE=20"]').attr('href'), function(fData) {
                var auth_key = $('input[name="auth_key"]', fData).val();
                var POLL_0 = $('input[name="POLL_0"]', fData).val();
                var POLL_1 = $('input[name="POLL_1"]', fData).val();
                var POLL_2 = $('input[name="POLL_2"]', fData).val();
                var POLL_3 = $('input[name="POLL_3"]', fData).val();
                var POLL_4 = $('input[name="POLL_4"]', fData).val();
                var POLL_5 = $('input[name="POLL_5"]', fData).val();
                var POLL_6 = $('input[name="POLL_6"]', fData).val();
                var POLL_7 = $('input[name="POLL_7"]', fData).val();
                var POLL_8 = $('input[name="POLL_8"]', fData).val();
                var POLL_9 = $('input[name="POLL_9"]', fData).val();
                var POLL_10 = $('input[name="POLL_10"]', fData).val();
                var question = $('input[name="poll_question"]', fData).val();
                var pollonly = $('input[name="pollonly"]', fData).val();

                $.post(main_url + '?', {
                    st: '0',
                    act: 'Mod',
                    s: '',
                    auth_key: auth_key,
                    CODE: '21',
                    t: tID,
                    f: fID,
                    POLL_0: POLL_0,
                    POLL_1: POLL_1,
                    POLL_2: POLL_2,
                    POLL_3: POLL_3,
                    POLL_4: POLL_4,
                    POLL_5: POLL_5,
                    POLL_6: POLL_6,
                    POLL_7: POLL_7,
                    POLL_8: POLL_8,
                    POLL_9: POLL_9,
                    POLL_10: POLL_10,
                    poll_question: question + ' [Closed]',
                    pollonly: pollonly,
                    success: function() {
                        alert('This poll is now closed');
                        window.location.href = window.location.href;
                    }
                });
            });
        });

        $('span.open_poll').click(function() {
            var fID = $('a[href*="Mod&CODE=20"]').attr('href').split('&f=')[1].split('&t=')[0];
            var tID = $('a[href*="Mod&CODE=20"]').attr('href').split('&t=')[1].split('&auth_key=')[0];

            $.get($('a[href*="Mod&CODE=20"]').attr('href'), function(fData) {
                var auth_key = $('input[name="auth_key"]', fData).val();
                var POLL_0 = $('input[name="POLL_0"]', fData).val();
                var POLL_1 = $('input[name="POLL_1"]', fData).val();
                var POLL_2 = $('input[name="POLL_2"]', fData).val();
                var POLL_3 = $('input[name="POLL_3"]', fData).val();
                var POLL_4 = $('input[name="POLL_4"]', fData).val();
                var POLL_5 = $('input[name="POLL_5"]', fData).val();
                var POLL_6 = $('input[name="POLL_6"]', fData).val();
                var POLL_7 = $('input[name="POLL_7"]', fData).val();
                var POLL_8 = $('input[name="POLL_8"]', fData).val();
                var POLL_9 = $('input[name="POLL_9"]', fData).val();
                var POLL_10 = $('input[name="POLL_10"]', fData).val();
                var question = $('input[name="poll_question"]', fData).val().split(' [Closed]')[0];
                var pollonly = $('input[name="pollonly"]', fData).val();

                $.post(main_url + '?', {
                    st: '0',
                    act: 'Mod',
                    s: '',
                    auth_key: auth_key,
                    CODE: '21',
                    t: tID,
                    f: fID,
                    POLL_0: POLL_0,
                    POLL_1: POLL_1,
                    POLL_2: POLL_2,
                    POLL_3: POLL_3,
                    POLL_4: POLL_4,
                    POLL_5: POLL_5,
                    POLL_6: POLL_6,
                    POLL_7: POLL_7,
                    POLL_8: POLL_8,
                    POLL_9: POLL_9,
                    POLL_10: POLL_10,
                    poll_question: question,
                    pollonly: pollonly,
                    success: function() {
                        alert('This poll is now open');
                        window.location.href = window.location.href;
                    }
                });
            });
        });
    }

    $('div.tablepad b:contains([Closed])').parents('div.tablepad').find('input').attr('disabled', 'disabled');
    $('div.tablepad b:contains([Closed])').parents('div.tablepad').next('div.pformstrip').find('input[type="submit"]').remove();
});
