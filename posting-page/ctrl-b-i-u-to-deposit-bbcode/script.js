// By Cory
// https://cory.jcink.net/

function wrapText(elementID, openTag, closeTag) {
    var textArea = $(elementID);
    var len = textArea.val().length;
    var start = textArea[0].selectionStart;
    var end = textArea[0].selectionEnd;
    var selectedText = textArea.val().substring(start, end);
    var replacement = openTag + selectedText + closeTag;
    textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
}

$('#qr_open textarea[name="Post"], td.pformright textarea[name="Post"]').bind('keydown', function(e) {
    if (e.ctrlKey && e.which === 66) {
        e.preventDefault();
        wrapText(this, '[b]', '[/b]');
    } else if (e.ctrlKey && e.which === 73) {
        e.preventDefault();
        wrapText(this, '[i]', '[/i]');
    } else if (e.ctrlKey && e.which === 85) {
        e.preventDefault();
        wrapText(this, '[u]', '[/u]');
    }
});

$('a[onclick*="quickEdit"]').click(function() {
    setTimeout(function() {
        $('div.quick-edit textarea[name="Post"]').bind('keydown', function(e) {
            if (e.ctrlKey && e.which === 66) {
                e.preventDefault();
                wrapText(this, '[b]', '[/b]');
            } else if (e.ctrlKey && e.which === 73) {
                e.preventDefault();
                wrapText(this, '[i]', '[/i]');
            } else if (e.ctrlKey && e.which === 85) {
                e.preventDefault();
                wrapText(this, '[u]', '[/u]');
            }
        });
    }, 1000);
});
