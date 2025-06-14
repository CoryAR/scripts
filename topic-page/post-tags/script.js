$(function() {
   if (location.href.indexOf('Post&CODE=02') !== -1 || location.href.indexOf('Post&CODE=08') !== -1) {
       $('#enter-your-post-header').after('<tr id="post-tags"><td class="pformleft">Post Tags<br /><small>Separate with a comma (,)</small></td><td class="pformright"><input type="text" size="40" name="PostTags" class="forminput" /></td></tr>');

       if ($('textarea[name="Post"]').val().includes('[tags]')) {
           $('#post-tags input').val($('textarea[name="Post"]').val().match(/\[tags\](.+?)\[\/tags\]/g).toString().replace('[tags]', '').replace('[/tags]', ''));
           $('textarea[name="Post"]').val($('textarea[name="Post"]').val().replace(/\[tags\](.+?)\[\/tags\]/i, ''));
       }

       $('input[value="Add Reply"], input[value="Submit Modified Post"]').click(function() {
           if ($('#post-tags input').val() !== '') {
               $('textarea[name="Post"]').val($('textarea[name="Post"]').val() + '[tags]' + $('#post-tags input').val() + '[/tags]');
           }
       });
   }

   $('div.postcolor:contains([tags])').each(function() {
       var $this = $(this);
       $(this).parent('td[class*="post"]').parent('tr').prev('tr').find('span.normalname').parent('td').attr('rowspan', '2');
       $(this).parent('td[class*="post"]').prev('td.miniprofile').parent('tr').before('<tr class="tags"><td class="row4"></td></tr>');

       $(this).html($(this).html().replace(/\[tags\](.+?)\[\/tags\]/i, '<span class="pTags" style="display: none">$1</span>'));

       var tags = $(this).find('span.pTags').html().split(',');

       $(tags).each(function(i) {
           $('<a href="/index.php?act=Search&q=' + tags[i] + '&f=&u=&rt=posts">' + tags[i] + '</a>').appendTo($this.parent('td[class*="post"]').parent('tr').prev('tr.tags').find('td'));
       });

       $(this).parent('td[class*="post"]').parent('tr').prev('tr.tags').find('td').prepend('<strong>Post Tags</strong>: ').find('a:not(:last)').after(', ');
   });

   $('span.post-normal').each(function() {
       if ($(this).has('input[onclick*="select_post"]').length) {
           $(this).find('tr.tags td').attr('colspan', '2');
       }
   });
});
