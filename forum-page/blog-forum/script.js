// By Cory
// https://cory.jcink.net/

export default function init({
    blog_FID
}) {
    if (location.href.indexOf('showforum=' + blog_FID) !== -1) {
        $('a[href*="Post&CODE=10"], tr:has(td.darkrow1), div.wrapmini:eq(1), span.small').hide();
        $('a[href*="Post&CODE=00"]').text('New Blog Entry').wrap('<div class="tableborder" style="border-radius: 5px; width: max-content"><div class="titlemedium" style="padding: 5px; border-radius: 5px"></div></div>').css('text-decoration', 'none');
        $('th.titlemedium:contains(Topic Title)').text('Blog Title');
        $('th.titlemedium:contains(Replies)').text('Comments');
        $('th.titlemedium:contains(Starter)').text('Blog Starter');
        $('a[href*="view=getlastpost"]').text('Last Comment by:');
        $('div.darkrow2:contains(topics sorted by)').html($('div.darkrow2:contains(topics sorted by)').html().replace('topics', 'blog entries'));
        $('div.wrapmini').html($('div.wrapmini').html().replace(/Topic/ig, 'Blog').replace(/replies/ig, 'comments'));
    }

    if (location.href.indexOf('Post&CODE=00') !== -1 && location.href.indexOf('&f=' + blog_FID) !== -1) {
        $('#post-options, #post-icon-options, #upload-files-header, #upload-files').hide();
        $('#topic-settings-header td.pformstrip').text('Blog Settings');
        $('#topic-title td.pformleft').text('Blog Title');
        $('#topic-desc td.pformleft').text('Blog Description');
        $('input[name="submit"]').val('Post New Blog Entry');
        $('#posting-form td.maintitle').html($('#posting-form td.maintitle').html().replace('new topic', 'new blog'));
        document.title = document.title.replace('Topic', 'Blog Entry');
    }

    if ($('#navstrip a[href*="showforum=' + blog_FID + '"]').length) {
        jQuery.fn.reverse = [].reverse;
        $('div.postlinksbar, form[action*="act=Poll"], div.bar, div.bar + br + div, div.activeuserstrip, div.activeuserstrip + div.row2, span.post-normal').hide();

        if (location.href.indexOf('showtopic=') !== -1) {
            $('td[align="left"][width="20%"][nowrap="nowrap"]').parents('table').hide();
        }

        $.get($('span.pagination:eq(0) a:last').attr('href'), function(data) {
            $('span.post-normal:not(:eq(0))', data).reverse().each(function() {
                var username = $(this).find('span.normalname a').text();
                var username_href = $(this).find('span.normalname a').attr('href');
                var content = $(this).find('div.postcolor').html();
                var time_stamp = $(this).find('span.postdetails:eq(0)').html().split('</b>')[1];
                var report_href = $(this).find('a[href*="act=report"]').attr('href');
                var delete_link = '';

                if ($('#modcp-link').length) {
                    delete_link = '(<a href="' + $(this).find('a[href*="delete_post"]').attr('href') + '" title="Delete">X</a>)';
                }

                $('span.post-normal:eq(1)').before('<div class="row4 comment"><a href="' + username_href + '">' + username + '</a>: ' + content + ' (<a href="' + report_href + '">Report</a>) ' + delete_link + '<br /><small><em>' + time_stamp + '</em></small></div>');
            });
        });

        var op_username = $('span.post-normal:eq(0)').find('span.normalname a').text();
        var op_username_href = $('span.post-normal:eq(0)').find('span.normalname a').attr('href');
        var op_content = $('span.post-normal:eq(0)').find('div.postcolor').html();
        var op_time_stamp = $('span.post-normal:eq(0)').find('span.postdetails:eq(0)').html().split('</b>')[1];
        var op_report_href = $('span.post-normal:eq(0)').find('a[href*="act=report"]').attr('href');

        $('span.post-normal:eq(0)').hide().after('<div class="row4 entry" style="padding: 0"><div class="titlemedium" style="padding: 5px">Blog Entry By: <a href="' + op_username_href + '">' + op_username + '</a></div><br /><div style="padding: 5px">' + op_content + '</div><br /><div class="darkrow2" style="padding: 5px">Posted <em>' + op_time_stamp + '</em><span style="float: right"><a href="' + op_report_href + '">Report Entry</a></span></div></div><div class="maintitle">Comments <span id="load_all" style="float: right; cursor: pointer">Load All Comments</span></div><div id="after_load_all" class="titlemedium" style="padding: 5px">Leave a comment: <input class="forminput" type="text" name="comment" size="40" /> <input class="forminput" type="submit" value="Submit" /></div>');

        $('input[name="comment"]').next('input').click(function() {
            var comment = $(this).prev('input[name="comment"]').val();
            var tID = location.href.split('showtopic=')[1];

            $.get('/index.php?act=Post&CODE=02&f=' + blog_FID + '&t=' + tID, function(data) {
                $.post('/index.php?', {
                    st: '0',
                    act: 'Post',
                    s: '',
                    f: blog_FID,
                    auth_key: $('input[name="auth_key"]', data).val(),
                    MAX_FILE_SIZE: $('input[name="MAX_FILE_SIZE"]', data).val(),
                    CODE: '03',
                    t: tID,
                    Post: comment,
                    success: function() {
                        $('div.comment').hide();
                        $('input[name="comment"]').val('');

                        $.get($('span.pagination:eq(0) a:last').attr('href'), function(nData) {
                            $('span.post-normal:not(:eq(0))', nData).reverse().each(function() {
                                var username = $(this).find('span.normalname a').text();
                                var username_href = $(this).find('span.normalname a').attr('href');
                                var content = $(this).find('div.postcolor').html();
                                var time_stamp = $(this).find('span.postdetails:eq(0)').html().split('</b>')[1];
                                var report_href = $(this).find('a[href*="act=report"]').attr('href');
                                var delete_link = '';

                                if ($('#modcp-link').length) {
                                    delete_link = '(<a href="' + $(this).find('a[href*="delete_post"]').attr('href') + '" title="Delete">X</a>)';
                                }

                                $('span.post-normal:eq(1)').before('<div class="row4 comment"><a href="' + username_href + '">' + username + '</a>: ' + content + ' (<a href="' + report_href + '">Report</a>) ' + delete_link + '<br /><small><em>' + time_stamp + '</em></small></div>');
                            });
                        });
                    }
                });
            });
        });

        $('#load_all').one('click', function() {
            var tID = location.href.split('showtopic=')[1];
            $.get('/index.php?act=Print&client=printer&f=1&t=' + tID, function(data) {
                $('div.comment').hide();
                $('<div></div>').append(data).find('font:contains(Posted by:), font[size="3"]').insertAfter('#after_load_all');

                $('font[face="arial"][size="3"], font[face="arial"][size="2"]:eq(0)').hide();

                $('font[face="arial"][size="2"]:not(:eq(0))').each(function() {
                    var username = $(this).find('b').html().split('Posted by: ')[1];
                    var content = $(this).next('font[face="arial"][size="3"]').html();
                    var time_stamp = $(this).html().split('</b>')[1];
                    $(this).replaceWith('<div class="row4 comment"><span class="username">' + username + '</span>: ' + content + '<br /><small><em>' + time_stamp + '</em></small>');
                });
                $.get('/index.php?s=&act=Stats&CODE=who&t=' + tID, function(data) {
                    $('a[href*="showuser"]', data).each(function() {
                        var username = $(this).text();
                        var href = $(this).attr('href');

                        $('span.username').each(function() {
                            if (username === $(this).text()) {
                                $(this).wrap('<a href="' + href + '"></a>');
                            }
                        });
                    });
                });
                $(document).ajaxStop(function() {
                    $('#after_load_all').after('<div id="new_after_load_all"></div>');

                    $('div.comment').reverse().each(function() {
                        $(this).appendTo('#new_after_load_all');
                    });
                });
            });
        });

        var reading_blog = $('div.activeuserstrip + div.row2').html();
        var topic_starter = $('div.tableborder:has(div.postlinksbar) a[href*="showuser"]:eq(0)').text();

        $('div.tableborder:has(div.postlinksbar)').before('<div id="blog_sidebar" style="width: 200px; margin-left: 10px; float: right"><a href="/index.php?act=Search&q=&f=' + blog_FID + '&u=' + topic_starter + '&matchtopics=1&rt=topics" style="display: block; text-align: center"><h3>View All My Blog Entries</h3></a></a><div class="tableborder"><div class="titlemedium">User\'s Reading This Blog</div><div class="row2">' + reading_blog + '</div></div></div>').css('margin-right', '210px');
    }
}
