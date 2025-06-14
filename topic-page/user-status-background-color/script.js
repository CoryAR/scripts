// By Cory
// https://cory.jcink.net/

$('div.status').each(function() {
   if ($(this).text() === 'Online') {
       $(this).parents('td.miniprofile').parent('tr').prev('tr').find('td.row4[width="1%"]').css('background', 'green').attr('title', 'Online');
   } else {
       $(this).parents('td.miniprofile').parent('tr').prev('tr').find('td.row4[width="1%"]').css('background', 'red').attr('title', 'Offline');
   }
});
