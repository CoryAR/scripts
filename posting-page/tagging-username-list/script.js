// By Cory
// https://cory.jcink.net/

$('body').append('<div id="uNamesFound" style="display: none"></div>');
$('#qr_open').css('position', 'static');

$('#posting-form textarea[name="Post"], #qr_open textarea[name="Post"]').keypress(function(e) {
   var clicked;
   var len;

   if (String.fromCharCode(e.which) === '@') {
       $('#posting-form textarea[name="Post"], #qr_open textarea[name="Post"]').keyup(function(s) {
           var uNameData = $('textarea[name="Post"]').val().substring($('textarea[name="Post"]').val().lastIndexOf("@") + 1, $('textarea[name="Post"]').val().length);

           if (uNameData !== undefined && uNameData !== '' && clicked !== true && len !== 0 && !uNameData.match(/  /g)) {
               $.get('/index.php?act=Members&max_results=1000&name=' + uNameData, function(data) {
                   data = data.replace(/src=/g, 'data-src=');
                   len = $('span.username', data).length;
                   $('#uNamesFound').html('');

                   $('span.username', data).each(function() {
                       $('#uNamesFound').append('<a href="javascript: void(0)">' + $(this).text() + '</a><br>');
                   });

                   var BGColor = $('td.pformright, #qr_open div.tableborder').css('background-color');
                   var bColor = $('td.pformright, #qr_open div.tableborder').css('border-top-color');

                   if ($('#uNamesFound').text() !== '') {
                       $('#uNamesFound').css({
                           'display': 'block',
                           'padding': '5px',
                           'background': BGColor,
                           'border': '1px solid ' + bColor,
                           'position': 'fixed',
                           'top': '50%',
                           'left': '50%',
                           'transform': 'translate(-50%, -50%)'
                       });
                   }

                   $('#uNamesFound a').click(function() {
                       clicked = true;
                       var uName = $(this).text();
                       $('textarea[name="Post"]').val($('textarea[name="Post"]').val().replace('@' + uNameData, '@[' + uName + ']'));
                       $('#uNamesFound').html('').hide();
                   });
               });
           }
       });
   }
});
