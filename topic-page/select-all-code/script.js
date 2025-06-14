// By Cory
// https://cory.jcink.net/

$('#CODE-WRAP b').after('<a href="javascript: void(0)" class="select_all" style="float: right">Select All</a>');

$('td[id="CODE"]').each(function() {
   var height = $(this).height();
   $(this).wrapInner('<textarea readonly style="height: ' + height + 'px; width: 99%; background: none; border: 0; resize: none; color: inherit; outline: none; line-height: 20px; max-height: 400px; min-height: 20px"></textarea>');
   $(this).html($(this).html().replace(/<br>/gi, '\n').replace('<!--ec1-->', '').replace('<!--c2-->', ''));
});

$('a.select_all').click(function() {
   $(this).parent('td').parent('tr').next('tr').find('textarea').select();
});
