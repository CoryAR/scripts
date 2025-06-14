// By Cory
// https://cory.jcink.net/

$('span.forum-desc').each(function() {
   var borderColor = $(this).parents('div.tableborder').css('border-left-color');
   var backgroundColor = $(this).parents('td.row4').css('background-color');
   var aWidth = $(this).parents('td.row4').find('b:eq(0) a').width() + 10;
   var aHeight = $(this).parents('td.row4').find('b:eq(0) a').height() + 5;
   $(this).css({
       'display': 'none',
       'position': 'absolute',
       'background': backgroundColor,
       'border': '1px solid ' + borderColor + '',
       'padding': '5px',
       'border-radius': '10px',
       'margin': '-' + aHeight + 'px 0 0 ' + aWidth + 'px'
   });
});

$('span.forum-desc').parents('td.row4').hover(function() {
   $(this).find('span.forum-desc').stop().fadeTo('slow', 1);
}, function() {
   $(this).find('span.forum-desc').fadeTo('slow', 0);
});
