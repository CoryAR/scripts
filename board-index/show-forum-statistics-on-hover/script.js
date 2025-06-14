// By Cory
// https://cory.jcink.net/

$('tr.forum-subheader').find('th.titlemedium[width="7%"]').hide();

$('tr.forum-row').each(function() {
   $(this).find('td.row2[align]').hide();
   var t = $(this).find('td.row2[align]:eq(0)').html();
   var r = $(this).find('td.row2[align]:eq(1)').html();

   $(this).find('td.row4:eq(1)').prepend('<div class="show_stats" style="float: right; display: none">Topics: ' + t + ' Â· Replies: ' + r + '</div>');

   $(this).find('td.row4:eq(1)').mouseover(function() {
       $(this).find('div.show_stats').show();
   });

   $(this).find('td.row4:eq(1)').mouseout(function() {
       $(this).find('div.show_stats').hide();
   });
});
