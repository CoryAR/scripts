// By Cory
// https://cory.jcink.net/

$('span.subforums:has(a)').find('a').hide().end().find('br').hide().end().css('color', 'transparent').prepend('<br><select class="forminput"><option>Subforums:</option></select>').find('select').change(function() {
   location.href = $(this).val();
});

$('span.subforums a[href*="showforum"]:not(.subforums-macro)').each(function() {
   var href = $(this).attr('href');
   var text = $(this).text();
   $(this).parent('span.subforums').find('select').append('<option value="' + href + '">' + text + '</option>');
});
