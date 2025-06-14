// By Cory
// https://cory.jcink.net/

export default function init({
    FBForumID
}) {
    var main_url = location.href.split('?')[0];

    if (location.href.indexOf('showuser=') !== -1) {
        $('#skin_selector').before('<span class="pagination"></span><div class="tableborder" style="margin-top: 10px"><form id="feedback_form"><table id="feedback" style="width: 100%"><tbody><tr><td colspan="4" class="maintitle">Feedback</td></tr><tr><th colspan="4" class="titlemedium">Overall Rating From This Page: <a href="#" id="overall">#</a> (Positive: <a href="#" id="positive">#</a>, Neutral: <a href="#" id="neutral">#</a>, Negative: <a href="#" id="negative">#</a>)</th></tr><tr id="member_only"><td class="row4" colspan="4">Submit feedback: <input type="text" name="comment" size="80" /> <input type="radio" name="feed_rate" value="0" id="pos" /><label for="pos"><img src="https://files.jcink.net/uploads/cory//p1041333.png" alt="Positive" title="Positive" /></label> <input type="radio" name="feed_rate" value="1" id="neu" /><label for="neu"><img src="https://files.jcink.net/uploads/cory//p1041334.png" alt="Neutral" title="Neutral" /></label> <input type="radio" name="feed_rate" value="2" id="neg" /><label for="neg"><img src="https://files.jcink.net/uploads/cory//p1041332.png" alt="Negative" title="Negative" /></label> <button type="button" style="margin-left: 3px">Submit</button></td></tr><tr><th class="titlemedium" style="width: 20%">Rating</th><th class="titlemedium" style="width: 40%">Comment</th><th class="titlemedium" style="width: 20%">From</th><th class="titlemedium" style="width: 20%">Date</th></tr></tbody></table></form></div>');

        var profileID = location.href.split('showuser=')[1];
        var exists;
        var pagination;
        var topicID;
        jQuery.fn.reverse = [].reverse;

        if ($('#userlinks:contains(Logged in as:)').length === 0 || profileID === $('#userlinks a[href*="showuser="]').attr('href').split('showuser=')[1]) {
            $('#member_only').remove();
        }

        $.get(main_url + '?showforum=' + FBForumID, function(forum) {
            exists = $('tr.topic-row a:contains(showuser=' + profileID + ')', forum).length;

            function newFeedbackPage() {
                $('span.pagination a').click(function(e) {
                    e.preventDefault();

                    $.get($(this).attr('href'), function(nPage) {
                        $('tr:has(td.rating)').remove();

                        if (pagination) {
                            $('span.pagination').html($('span.pagination', nPage).html());
                        }

                        $('td[class*="post"]', nPage).parent('tr').reverse().each(function() {
                            var userID = $.trim($(this).parents('div.tableborder').find('span.topic-title').text());
                            var userHref = $(this).prev('tr').find('span.normalname a').attr('href');
                            var userText = $(this).prev('tr').find('span.normalname a').text();
                            var date = $.trim($(this).prev('tr').find('span.postdetails').text().split('Posted on')[1]) || $.trim($(this).prev('tr').find('span.postdetails').text().split('Posted:')[1]);
                            var rating = $(this).find('div.postcolor').text().trim().split('~')[0];
                            var comment = $(this).find('div.postcolor').text().trim().split('~')[1];
                            var editHref;
                            var deleteHref;

                            if ($(this).prev('tr').find('a[href*="act=Post&CODE=06"]').prev('a[onclick*="quickEdit"], a[href*="Post&CODE=08"]').length) {
                                var pID = $(this).prev('tr').find('a[href*="act=Post&CODE=06"]').attr('href').split('p=')[1];
                                editHref = main_url + '?act=Post&CODE=08&f=' + FBForumID + '&t=' + topicID + '&p=' + pID;
                            } else {
                                editHref = '';
                            }

                            if ($(this).prev('tr').find('a[href*="delete_post"]').length) {
                                deleteHref = $(this).prev('tr').find('a[href*="delete_post"]').attr('href').split('delete_post(\'')[1].split('\')')[0];
                            } else {
                                deleteHref = '';
                            }

                            if ('showuser=' + profileID === userID) {
                                $('#feedback tbody').append('<tr><td class="rating row4">' + rating + '</td><td class="comment row4">' + comment + ' <span class="staff">(<a href="' + editHref + '">Edit</a>) (<a href="' + deleteHref + '">Delete</a>)</span></td><td class="user row4"><a href="' + userHref + '">' + userText + '</a></td><td class="date row4">' + date + '</td></tr>');
                            }
                        });
                        newFeedbackPage();
                    });
                });
            }

            if (exists === 1) {
                topicID = $('tr.topic-row a:contains(showuser=' + profileID + ')', forum).attr('href').split('showtopic=')[1];

                $.get(main_url + '?showtopic=' + topicID + '&st=0', function(topic) {
                    pagination = $('span.pagination', topic).length;

                    if (pagination) {
                        $('span.pagination').html($('span.pagination', topic).html());
                    }

                    $('td[class*="post"]', topic).parent('tr').reverse().each(function() {
                        var userID = $.trim($(this).parents('div.tableborder').find('span.topic-title').text());
                        var userHref = $(this).prev('tr').find('span.normalname a').attr('href');
                        var userText = $(this).prev('tr').find('span.normalname a').text();
                        var date = $.trim($(this).prev('tr').find('span.postdetails').text().split('Posted on')[1]) || $.trim($(this).prev('tr').find('span.postdetails').text().split('Posted:')[1]);
                        var rating = $(this).find('div.postcolor').text().trim().split('~')[0];
                        var comment = $(this).find('div.postcolor').text().trim().split('~')[1];
                        var editHref;
                        var deleteHref;

                        if ($(this).prev('tr').find('a[href*="act=Post&CODE=06"]').prev('a[onclick*="quickEdit"], a[href*="Post&CODE=08"]').length) {
                            var pID = $(this).prev('tr').find('a[href*="act=Post&CODE=06"]').attr('href').split('p=')[1];
                            editHref = main_url + '?act=Post&CODE=08&f=' + FBForumID + '&t=' + topicID + '&p=' + pID;
                        } else {
                            editHref = '';
                        }

                        if ($(this).prev('tr').find('a[href*="delete_post"]').length) {
                            deleteHref = $(this).prev('tr').find('a[href*="delete_post"]').attr('href').split('delete_post(\'')[1].split('\')')[0];
                        } else {
                            deleteHref = '';
                        }

                        if ('showuser=' + profileID === userID) {
                            $('#feedback tbody').append('<tr><td class="rating row4">' + rating + '</td><td class="comment row4">' + comment + ' <span class="staff">(<a href="' + editHref + '">Edit</a>) (<a href="' + deleteHref + '">Delete</a>)</span></td><td class="user row4"><a href="' + userHref + '">' + userText + '</a></td><td class="date row4">' + date + '</td></tr>');
                        }
                    });
                    newFeedbackPage();
                });
            } else {
                $.get(main_url + '?act=Search&q="showuser=' + profileID + '"&f=' + FBForumID + '&u=&rt=topics', function(sData) {
                    $.get($('a', sData).attr('href'), function(nSData) {
                        topicID = $('#search-topics a:contains(showuser=' + profileID + ')', nSData).attr('href').split('showtopic=')[1].split('&hl')[0];

                        $.get(main_url + '?showtopic=' + topicID + '&st=0', function(topic) {
                            pagination = $('span.pagination', topic).length;

                            if (pagination) {
                                $('span.pagination').html($('span.pagination', topic).html());
                            }

                            $('td[class*="post"]', topic).parent('tr').reverse().each(function() {
                                var userID = $.trim($(this).parents('div.tableborder').find('span.topic-title').text());
                                var userHref = $(this).prev('tr').find('span.normalname a').attr('href');
                                var userText = $(this).prev('tr').find('span.normalname a').text();
                                var date = $.trim($(this).prev('tr').find('span.postdetails').text().split('Posted on')[1]) || $.trim($(this).prev('tr').find('span.postdetails').text().split('Posted:')[1]);
                                var rating = $(this).find('div.postcolor').text().trim().split('~')[0];
                                var comment = $(this).find('div.postcolor').text().trim().split('~')[1];
                                var editHref;
                                var deleteHref;

                                if ($(this).prev('tr').find('a[href*="act=Post&CODE=06"]').prev('a[onclick*="quickEdit"], a[href*="Post&CODE=08"]').length) {
                                    var pID = $(this).prev('tr').find('a[href*="act=Post&CODE=06"]').attr('href').split('p=')[1];
                                    editHref = main_url + '?act=Post&CODE=08&f=' + FBForumID + '&t=' + topicID + '&p=' + pID;
                                } else {
                                    editHref = '';
                                }

                                if ($(this).prev('tr').find('a[href*="delete_post"]').length) {
                                    deleteHref = $(this).prev('tr').find('a[href*="delete_post"]').attr('href').split('delete_post(\'')[1].split('\')')[0];
                                } else {
                                    deleteHref = '';
                                }

                                if ('showuser=' + profileID === userID) {
                                    $('#feedback tbody').append('<tr><td class="rating row4">' + rating + '</td><td class="comment row4">' + comment + ' <span class="staff">(<a href="' + editHref + '">Edit</a>) (<a href="' + deleteHref + '">Delete</a>)</span></td><td class="user row4"><a href="' + userHref + '">' + userText + '</a></td><td class="date row4">' + date + '</td></tr>');
                                }
                            });
                            newFeedbackPage();
                        });
                    });
                });
            }
        });

        $('#feedback button').click(function() {
            if ($('input[name="comment"]').val().length > 0 && $('input[name="feed_rate"]').is(':checked')) {
                var description = $('input[name="comment"]').val();
                var rating = $('input[name="feed_rate"]:checked').val();

                if (exists === 1) {
                    $.get(main_url + '?act=Post&CODE=02&f=' + FBForumID + '&t=' + topicID, function(data) {
                        var auth_key = $('input[name="auth_key"]', data).val();
                        var MAX_FILE_SIZE = $('input[name="MAX_FILE_SIZE"]', data).val();

                        $.post(main_url + '?', {
                            st: '0',
                            act: 'Post',
                            s: '',
                            f: FBForumID,
                            auth_key: auth_key,
                            MAX_FILE_SIZE: MAX_FILE_SIZE,
                            CODE: '03',
                            t: topicID,
                            Post: rating + '~' + description
                        });
                    });
                } else {
                    $.get(main_url + '?act=Post&CODE=00&f=' + FBForumID, function(data) {
                        var auth_key = $('input[name="auth_key"]', data).val();
                        var MAX_FILE_SIZE = $('input[name="MAX_FILE_SIZE"]', data).val();

                        $.post(main_url + '?', {
                            st: '0',
                            act: 'Post',
                            s: '',
                            f: FBForumID,
                            auth_key: auth_key,
                            MAX_FILE_SIZE: MAX_FILE_SIZE,
                            CODE: '01',
                            TopicTitle: 'showuser=' + profileID,
                            Post: rating + '~' + description
                        });
                    });
                }
                var confirm = window.confirm('Feedback successfully submitted!');
                if (confirm === true) {
                    window.location.reload();
                } else {
                    return false;
                }
            } else {
                alert('Please fill out the fields');
            }
        });
    }

    $(document).one('ajaxStop', function() {
        $('span.pagination a:last').click();
    });

    $(document).ajaxSuccess(function() {
        $('span.staff a[href*="Mod&CODE"]').click(function(e) {
            e.preventDefault();
            if (window.confirm('Are you sure you want to delete this message?')) {
                location.href = $(this).attr('href');
            } else {
                alert('Ok, no action has been taken');
            }
        });

        var positive = $('#feedback tbody tr:gt(1) td:first-child:contains(0)').length;
        var neutral = $('#feedback tbody tr:gt(1) td:first-child:contains(1)').length;
        var negative = $('#feedback tbody tr:gt(1) td:first-child:contains(2)').length;
        var overall = positive - negative;

        $('#positive').text(positive);
        $('#neutral').text(neutral);
        $('#negative').text(negative);
        $('#overall').text(overall);

        $('#overall, #positive, #neutral, #negative').click(function(e) {
            e.preventDefault();
        });

        $('#overall').click(function() {
            $('#feedback tr').show();
        });

        $('#positive').click(function() {
            $('td.rating:has(img[alt="Neutral"]), td.rating:has(img[alt="Negative"])').parent('tr').hide();
            $('td.rating:has(img[alt="Positive"])').parent('tr').show();
        });

        $('#neutral').click(function() {
            $('td.rating:has(img[alt="Positive"]), td.rating:has(img[alt="Negative"])').parent('tr').hide();
            $('td.rating:has(img[alt="Neutral"])').parent('tr').show();
        });

        $('#negative').click(function() {
            $('td.rating:has(img[alt="Positive"]), td.rating:has(img[alt="Neutral"])').parent('tr').hide();
            $('td.rating:has(img[alt="Negative"])').parent('tr').show();
        });

        $('td.rating:contains(0)').html('<img src="https://files.jcink.net/uploads/cory//p1041333.png" alt="Positive" title="Positive" />');
        $('td.rating:contains(1)').html('<img src="https://files.jcink.net/uploads/cory//p1041334.png" alt="Neutral" title="Neutral" />');
        $('td.rating:contains(2)').html('<img src="https://files.jcink.net/uploads/cory//p1041332.png" alt="Negative" title="Negative" />');

        if ($('#modcp-link').length !== 1) {
            $('span.staff').remove();
        }
    });

    $('#active-topics a[href*="showforum=' + FBForumID + '"], #search-topics a[href*="showforum=' + FBForumID + '"]').parent('td.row4').parent('tr').hide();
}
