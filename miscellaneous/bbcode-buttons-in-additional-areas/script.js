// By Cory
// https://cory.jcink.net/

if ($('#chatroom').length === 0) {
    $(function() {
        $('form[name="GSHOUT"]').before('<div style="margin-bottom: 5px"><button id="ShoutB" type="button"><strong>B</strong></button> <button id="ShoutI" type="button"><em>I</em></button> <button id="ShoutU" type="button"><u>U</u></button> <button id="ShoutS" type="button"><del>S</del></button> <select id="ShoutC"><option value="0" selected="selected">Color</option><option value="#000">Black</option><option value="#fff">White</option><option value="#ee4a2d">Red</option><option value="#fb8a00">Orange</option><option value="#fe0">Gold</option><option value="#090">Green</option><option value="#80a0ff">Light Blue</option><option value="#5a70b3">Blue</option><option value="#9300C4">Purple</option></select></div>');
        $('#qr_open textarea').before('<div style="margin-bottom: 5px"><button id="QuickB" type="button"><strong>B</strong></button> <button id="QuickI" type="button"><em>I</em></button> <button id="QuickU" type="button"><u>U</u></button> <button id="QuickS" type="button"><del>S</del></button> <select id="QuickC"><option value="0" selected="selected">Color</option><option value="#000">Black</option><option value="#fff">White</option><option value="#ee4a2d">Red</option><option value="#fb8a00">Orange</option><option value="#fe0">Gold</option><option value="#090">Green</option><option value="#80a0ff">Light Blue</option><option value="#5a70b3">Blue</option><option value="#9300C4">Purple</option></select></div>');

        function ShoutBBC(elementID, openTag, closeTag) {
            var textArea = $(elementID);
            var len = textArea.val().length;
            var start = textArea[0].selectionStart;
            var end = textArea[0].selectionEnd;
            var selectedText = textArea.val().substring(start, end);
            var replacement = openTag + selectedText + closeTag;
            textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
        }

        $('#ShoutB').click(function() {
            ShoutBBC('input.sbinputbox', '[b]', '[/b]');
        });

        $('#ShoutI').click(function() {
            ShoutBBC('input.sbinputbox', '[i]', '[/i]');
        });

        $('#ShoutU').click(function() {
            ShoutBBC('input.sbinputbox', '[u]', '[/u]');
        });

        $('#ShoutS').click(function() {
            ShoutBBC('input.sbinputbox', '[s]', '[/s]');
        });

        $('#ShoutC').change(function() {
            var color = $(this).val();
            ShoutBBC('input.sbinputbox', '[color=' + color + ']', '[/color]');
            $(this).val('0');
        });

        $('#QuickB').click(function() {
            ShoutBBC('#qr_open textarea', '[b]', '[/b]');
        });

        $('#QuickI').click(function() {
            ShoutBBC('#qr_open textarea', '[i]', '[/i]');
        });

        $('#QuickU').click(function() {
            ShoutBBC('#qr_open textarea', '[u]', '[/u]');
        });

        $('#QuickS').click(function() {
            ShoutBBC('#qr_open textarea', '[s]', '[/s]');
        });

        $('#QuickC').change(function() {
            var color = $(this).val();
            ShoutBBC('#qr_open textarea', '[color=' + color + ']', '[/color]');
            $(this).val('0');
        });
    });
}
