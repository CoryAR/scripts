// By Cory
// https://cory.jcink.net/

$(function() {
    $('#navi').after('<div style="margin: 10px 0"><div class="maintitle">Recent Updates - <em id="reload" class="cu">Reload</em> <span id="ex_col" style="float: right; cursor: pointer">Collapse</span></div><table id="recent_updates" class="tableborder" width="100%"><tbody><tr><th id="top_ten" style="text-align: center" class="cu titlemedium">Today\'s Top 10 Posters</th><th id="overall_ten" style="text-align: center" class="cu titlemedium">Overall Top 10 Posters</th><th id="recent" style="text-align: center" class="cu titlemedium">Active Topics</th><th id="new_posts" style="text-align: center" class="cu titlemedium">New Posts</th><th id="online" style="text-align: center" class="cu titlemedium">Online Users</th></tr><tr><td class="row4" colspan="5" style="padding: 1px"><div id="recent_content" style="overflow: auto; height: 150px"><div id="message" style="text-align: center; font-style: italic; line-height: 150px">Please select an option</div></div></td></tr></tbody></table></div>');

    $('#ex_col').click(function() {
        if ($(this).text() === 'Collapse') {
            $('#recent_updates').hide();
            $(this).text('Expand');
            localStorage.setItem('ex_col', true);
        } else {
            $('#recent_updates').show();
            $(this).text('Collapse');
            localStorage.removeItem('ex_col');
        }
    });

    if (localStorage.getItem('ex_col') === 'true') {
        $('#recent_updates').hide();
        $('#ex_col').text('Expand');
    }

    var main_url = location.href.split('?')[0];
    $('em.cu, th.cu').css('cursor', 'pointer');

    $('th.cu').css('width', '20%').click(function() {
        $('th.cu').css('font-weight', '400');
        $(this).css('font-weight', '700');
    });

    $('#top_ten').one('click', function() {
        $.get(main_url + '?act=Stats', function(data) {
            var html = $('div.maintitle:contains(Todays Top 10 Posters)', data).parent('div.tableborder').html();
            $('#recent_content').append('<div id="top_ten-table" class="tableborder">' + html + '</div>');
        });
    });

    $('#overall_ten').one('click', function() {
        $.get(main_url + '?act=Members&max_results=10&sort_key=posts&sort_order=desc', function(data) {
            var html = $('#member-list', data).html();
            $('#recent_content').append('<div id="overall_ten-table" class="tableborder">' + html + '</div>');
        });
    });

    $('#recent').one('click', function() {
        $.get(main_url + '?act=Search&CODE=getactive', function(data) {
            var html = $('div.maintitle:contains(Active Topics)', data).parent('div.tableborder').html();
            $('#recent_content').append('<div id="recent-table" class="tableborder">' + html + '</div>');
        });
    });

    $('#new_posts').one('click', function() {
        $.get(main_url + '?act=Search&CODE=getnew', function(data) {
            var html;

            if ($('div.maintitle:contains(View New Posts)', data).length) {
                html = $('div.maintitle:contains(View New Posts)', data).parent('div.tableborder').html();
                $('#recent_content').append('<div id="new_posts-table" class="tableborder">' + html + '</div>');
            } else {
                $.get($('#redirect-screen a', data).attr('href'), function(nData) {
                    html = $('div.maintitle:contains(Your topics)', nData).parent('div.tableborder').html();
                    $('#recent_content').append('<div id="new_posts-table" class="tableborder">' + html + '</div>');
                });
            }
        });
    });

    $('#online').one('click', function() {
        $.get(main_url + '?act=Online&CODE=listall&sort_key=click', function(data) {
            var html = $('div.maintitle:contains(Online Users)', data).parent('div.tableborder').html();
            $('#recent_content').append('<div id="online-table" class="tableborder">' + html + '</div>');
        });
    });

    $('th.cu').click(function() {
        $('#recent_content div.tableborder, #message').hide();
    });

    $('#top_ten').click(function() {
        $('#top_ten-table').show();
    });

    $('#overall_ten').click(function() {
        $('#overall_ten-table').show();
    });

    $('#recent').click(function() {
        $('#recent-table').show();
    });

    $('#new_posts').click(function() {
        $('#new_posts-table').show();
    });

    $('#online').click(function() {
        $('#online-table').show();
    });

    $('#reload').click(function() {
        location.reload();
    });
});
