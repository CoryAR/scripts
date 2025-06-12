// By Cory
// https://cory.jcink.net/

if ($('title:contains([/)').length) {
   $('title').html($('title').html().replace(/\[(.+?)\]/gi, ''));
}

$('a[title="Go to the last post"] + a:contains([)').each(function() {
   var title = $(this).attr('title');
   $(this).text(title).removeAttr('title');
});

$('a:contains([/), .maintitle:contains([/)').each(function() {
   $(this).html($(this).html().replace(/\[color=(.+?)\](.+?)\[\/color]/gi, '<span style="color: $1">$2</span>').replace(/\[s\](.+?)\[\/s]/gi, '<del>$1</del>').replace(/\[b\](.+?)\[\/b]/gi, '<strong>$1</strong>').replace(/\[i\](.+?)\[\/i]/gi, '<em>$1</em>').replace(/\[u\](.+?)\[\/u]/gi, '<span style="text-decoration: underline">$1</span>'));
});
