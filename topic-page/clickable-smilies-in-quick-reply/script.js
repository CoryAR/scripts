$('#qr_open div.tablepad').prepend('<div id="emots" class="tableborder" style="max-width: 150px; max-height: 250px; overflow: auto; margin-right: 10px"><div class="row2" style="display: flex; justify-content: space-evenly; flex-wrap: wrap; gap: 7.5px"></div></div>');

function wrapText(element, openTag, closeTag) {
   var textArea = $(element);
   var len = textArea.val().length;
   var start = textArea[0].selectionStart;
   var end = textArea[0].selectionEnd;
   var selectedText = textArea.val().substring(start, end);
   var replacement = openTag + selectedText;
   textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
}

if ($('#emots').length) {
   $('#emots').next('textarea').addBack().wrapAll('<div style="display: flex; justify-content: center"></div>');

   $.get('/index.php?act=sbextras&CODE=emoticons2&s=', function(data) {
       $('#emots div.row2').prepend('<strong>Clickable Smilies</strong><div style="flex-basis: 100%"></div>');

       $('tr:not(:eq(0))', data).each(function() {
           let html = $(this).find('td:eq(1)').html();
           $('#emots div.row2').append(html);
        });

       $('#emots a').click(function() {
           let shortcut = $(this).attr('onclick').split('add_smilie("')[1].split('")')[0];
           wrapText('textarea[name="Post"]', ' ' + shortcut);
       });
   });
}
