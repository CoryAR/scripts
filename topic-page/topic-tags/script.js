// By Cory
// https://cory.jcink.net/

$(function() {
   if (location.href.indexOf('Post&CODE=00') !== -1 || location.href.indexOf('Post&CODE=08') !== -1) {
       $('#topic-desc').after('<tr id="topic-tags"><td class="pformleft">Topic Tags<br /><small>Separate with a comma (,)</small></td><td class="pformright"><input type="text" size="40" name="TopicTags" class="forminput" /></td></tr>');

       if ($('textarea[name="Post"]').val().includes('[tags]')) {
           $('#topic-tags input').val($('textarea[name="Post"]').val().match(/\[tags\](.+?)\[\/tags\]/g).toString().replace('[tags]', '').replace('[/tags]', ''));
           $('textarea[name="Post"]').val($('textarea[name="Post"]').val().replace(/\[tags\](.+?)\[\/tags\]/i, ''));
       }

       $('input[value="Post New Topic"], input[value="Submit Modified Post"]').click(function() {
           if ($('#topic-tags input').val() !== '') {
               $('textarea[name="Post"]').val($('textarea[name="Post"]').val() + '[tags]' + $('#topic-tags input').val() + '[/tags]');
           }
       });
   }

   if ($('div.postcolor:contains([tags])').length) {
       if (location.href.indexOf('st=0') !== -1 || location.href.indexOf('st=') === -1) {
           $('td.miniprofile:eq(0)').parent('tr').before('<tr id="tags"><td class="row4"></td></tr>');
           $('span.normalname:eq(0)').parent('td').attr('rowspan', '2');
           $('div.postcolor:contains([tags]):eq(0)').html($('div.postcolor:contains([tags]):eq(0)').html().replace(/\[tags\](.+?)\[\/tags\]/i, '<span id="tTags" style="display: none">$1</span>'));

           if ($('#tTags').length) {
               var tags = $('#tTags').html().split(',');

               $(tags).each(function(i) {
                   $('<a href="/index.php?act=Search&q=' + tags[i] + '&f=&u=&rt=posts">' + tags[i] + '</a>').appendTo('#tags td');
               });
           }

           $('#tags td').prepend('<strong>Topic Tags</strong>: ').find('a:not(:last)').after(', ');
       }
   }
});
