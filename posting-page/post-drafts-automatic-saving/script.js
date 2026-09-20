// By Cory
// https://cory.jcink.net/

export default function init({
    act,
    t
}) {
    if (act === 'Post') {
        var seconds_in = 30;

        $('#enter-your-post-header td').append('<span id="post_drafts" style="float: right"><input type="button" class="forminput" name="saved_draft" value="Insert Last Saved Post Draft" /></span>');

        setInterval(function() {
            seconds_in -= 1;
            $('#post_draft-saving').remove();

            if (seconds_in === 0) {
                seconds_in = 30;
            }

            $('textarea[name="Post"]').after('<span id="post_draft-saving"><br /><br />Post draft saving in ' + seconds_in + ' seconds</span>');
        }, 1000);

        setInterval(function() {
            if ($('textarea[name="Post"]').val() !== '') {
                localStorage.setItem('t=' + t, $('textarea[name="Post"]').val());
            }
        }, 30000);
    }

    $('input[name="saved_draft"]').click(function() {
        if (localStorage.getItem('t=' + t) !== null) {
            $('textarea[name="Post"]').val(localStorage.getItem('t=' + t));
        } else {
            alert('There is no saved post draft for this topic');
        }
    });
}
