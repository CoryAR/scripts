// By Cory
// https://cory.jcink.net/

$('body').append(`<div id="jcink_console" style="position: fixed; z-index: 999; bottom: 10px; right: 10px; width: 67px"><div id="jcink_console-open" class="tableborder" style="cursor: pointer; border-radius: 10px; text-align: center"><div class="row2" style="border-radius: 10px">Open Jcink Console</div></div><div style="display: none" id="jcink_console-main" class="tableborder"><div class="maintitle" style="text-align: left">Jcink Console <span id="jcink_console-close" style="float: right; cursor: pointer">Close</span></div><div class="row2"><textarea cols="100" rows="100" style="width: 98%; height: 250px" id="jcink_console-textarea" class="textinput"></textarea><br><br><input type="button" id="jcink_console-button" class="forminput" value="Run Code" style="cursor: pointer"><select id="jcink_console-select" class="forminput" style="float: left"><option value="0">Select one:</option><option value="1">HTML</option><option value="2">CSS</option><option value="3">JavaScript</option></select><input type="button" id="jcink_console-clear" class="forminput" style="float: right; cursor: pointer" value="Clear"></div></div></div>`);

$('#jcink_console-open').click(function() {
    $('#jcink_console').css('width', '700px');
    $(this).hide();
    $('#jcink_console-main').show();
});

$('#jcink_console-close').click(function() {
    $('#jcink_console-main').hide().parent('#jcink_console').css('width', '67px');
    $('#jcink_console-open').fadeIn('slow');
});

$('#jcink_console-clear').click(function() {
    $('#jcink_console-textarea').val('');
});

$('#jcink_console-button').click(function() {
    $('#jcink_console-html, #jcink_console-css, #jcink_console-js').remove();
    var textarea = $('#jcink_console-textarea').val();

    if ($('#jcink_console-select').val() === '0') {
        alert('Please select an option');
    } else if ($('#jcink_console-select').val() === '1') {
        $('#innerwrapper').prepend('<span id="jcink_console-html">' + textarea + '</span>');
        $(window).scrollTop(0);
    } else if ($('#jcink_console-select').val() === '2') {
        $('head').append('<style id="jcink_console-css">' + textarea + '</style>');
    } else if ($('#jcink_console-select').val() === '3') {
        $('body').append('<scr' + 'ipt id="jcink_console-js">' + textarea + '</scr' + 'ipt>');
    }
});
