// By Cory
// https://cory.jcink.net/

export default function init({
    likes_dislikes_fid
}) {
    if (location.href.indexOf('showtopic') !== -1) {
        var tID = $('input[name="t"]').val();
        var likes_exists;
        var dislikes_exists;
        var likes_tID;
        var dislikes_tID;

        $('td[width="80%"]:has(a[href*="Post"]):eq(0)').parents('table').before('<div class="tableborder" style="float: right; margin: 10px 0 20px"><div class="row2" style="text-align: center; min-width: 250px"><a href="javascript: void(0);" id="like_topic">Like This Topic</a> - <a href="javascript: void(0);" id="dislike_topic">Dislike This Topic</a><br /><br /><span id="likes" style="font-weight: 700"><em>0</em></span> Likes - <span id="dislikes" style="font-weight: 700"><em>0</em></span> Dislikes</div></div>');

        $.get('/index.php?act=Search&q="' + tID + '-Likes"&f=' + likes_dislikes_fid + '&u=&rt=topics', function(sData) {
            $.get($('a', sData).attr('href'), function(nSData) {
                $('#search-topics a[href*="showtopic"]:not(a[href*="&view"])', nSData).each(function() {
                    if ($(this).text() === tID + '-Likes') {
                        likes_exists = 1;
                        likes_tID = $(this).attr('href').split('showtopic=')[1].split('&hl=')[0];
                        $('#likes').text(parseInt($(this).parents('tr').find('td.row4:last').text(), 10) + 1);
                    }
                });
            });
        });

        setTimeout(function() {
            $.get('/index.php?act=Search&q="' + tID + '-Dislikes"&f=' + likes_dislikes_fid + '&u=&rt=topics', function(sData) {
                $.get($('a', sData).attr('href'), function(nSData) {
                    $('#search-topics a[href*="showtopic"]:not(a[href*="&view"])', nSData).each(function() {
                        if ($(this).text() === tID + '-Dislikes') {
                            dislikes_exists = 1;
                            dislikes_tID = $(this).attr('href').split('showtopic=')[1].split('&hl=')[0];
                            $('#dislikes').text(parseInt($(this).parents('tr').find('td.row4:last').text(), 10) + 1);
                        }
                    });
                });
            });
        }, 5000);

        $('#like_topic').one('click', function() {
            if (localStorage.getItem('likes_dislikes_' + tID) !== 'true') {
                localStorage.setItem('likes_dislikes_' + tID, true);

                if (likes_exists === 1) {
                    $.get('/index.php?act=Post&CODE=02&f=' + likes_dislikes_fid + '&t=' + likes_tID + '&st=', function(data) {
                        var auth_key = $('input[name="auth_key"]', data).val();

                        $.post('/index.php?', {
                            st: '0',
                            act: 'Post',
                            f: likes_dislikes_fid,
                            auth_key: auth_key,
                            CODE: '03',
                            t: likes_tID,
                            Post: 'Content',
                            success: function() {
                                $('#likes').text(parseInt($('#likes').text(), 10) + 1);
                            }
                        });
                    });
                } else {
                    $.get('/index.php?act=Post&CODE=00&f=' + likes_dislikes_fid, function(data) {
                        var auth_key = $('input[name="auth_key"]', data).val();

                        $.post('/index.php?', {
                            st: '0',
                            act: 'Post',
                            f: likes_dislikes_fid,
                            auth_key: auth_key,
                            CODE: '01',
                            TopicTitle: tID + '-Likes',
                            Post: 'Content',
                            success: function() {
                                $('#likes').text(parseInt($('#likes').text(), 10) + 1);
                            }
                        });
                    });
                }
            } else {
                alert('You have already liked/disliked this topic');
            }
        });

        $('#dislike_topic').one('click', function() {
            if (localStorage.getItem('likes_dislikes_' + tID) !== 'true') {
                localStorage.setItem('likes_dislikes_' + tID, true);

                if (dislikes_exists === 1) {
                    $.get('/index.php?act=Post&CODE=02&f=' + likes_dislikes_fid + '&t=' + dislikes_tID + '&st=', function(data) {
                        var auth_key = $('input[name="auth_key"]', data).val();

                        $.post('/index.php?', {
                            st: '0',
                            act: 'Post',
                            f: likes_dislikes_fid,
                            auth_key: auth_key,
                            CODE: '03',
                            t: dislikes_tID,
                            Post: 'Content',
                            success: function() {
                                $('#dislikes').text(parseInt($('#dislikes').text(), 10) + 1);
                            }
                        });
                    });
                } else {
                    $.get('/index.php?act=Post&CODE=00&f=' + likes_dislikes_fid, function(data) {
                        var auth_key = $('input[name="auth_key"]', data).val();

                        $.post('/index.php?', {
                            st: '0',
                            act: 'Post',
                            f: likes_dislikes_fid,
                            auth_key: auth_key,
                            CODE: '01',
                            TopicTitle: tID + '-Dislikes',
                            Post: 'Content',
                            success: function() {
                                $('#dislikes').text(parseInt($('#dislikes').text(), 10) + 1);
                            }
                        });
                    });
                }
            } else {
                alert('You have already liked/disliked this topic');
            }
        });
    }

    $('#active-topics a[href*="showforum=' + likes_dislikes_fid + '"], #search-topics a[href*="showforum=' + likes_dislikes_fid + '"]').parent('td.row4').parent('tr').hide();
}
