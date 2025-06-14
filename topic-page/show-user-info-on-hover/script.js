// By Cory
// https://cory.jcink.net/

$('span.normalname').parent('td').each(function() {
   var width = $(this).next('td').find('span.postdetails').width() + 15;
   $(this).parent('tr').next('tr').find('div.postbit:not(:eq(0))').wrapAll('<div style="width: ' + width + 'px; display: none" class="user_info"></div>');
   $(this).hover(function() {
       var pos = $(this).position();
       var width = $(this).width();
       $(this).parent('tr').next('tr').find('div.user_info').css({
           'position': 'absolute',
           'top': parseInt(pos.top + 4, 10) + 'px',
           'left': parseInt(pos.left + width + 12, 10) + 'px'
       }).fadeIn('slow');
   }, function() {
       $(this).parent('tr').next('tr').find('div.user_info').fadeOut('slow');
   });
});
