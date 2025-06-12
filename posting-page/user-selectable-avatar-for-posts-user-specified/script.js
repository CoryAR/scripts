// By Cory
// https://cory.jcink.net/

$('#post-icon-options').after('<tr id="post-avatar-selection"><td class="pformleft">Select an avatar for this post</td><td class="pformright"><select class="forminput" style="vertical-align: top"><option value="-1">Choose Avatar</option></select></td></tr>');

if ($('#post-avatar-selection').length) {
   $.get('/index.php?act=UserCP&CODE=01', function(data) {
       var textarea = $('td.pformleft:contains(Post Avatars) + td textarea', data).val().split('\n');

       $(textarea).each(function(i) {
           var avatar_name = textarea[i].split('~')[0];
           var avatar_url = textarea[i].split('~')[1];
           $('#post-avatar-selection select').append('<option value="' + avatar_url + '">' + avatar_name + '</option>');
       });
   });
}

$('#post-avatar-selection select').change(function() {
   if ($(this).val() !== '-1') {
       var nameVal = $(this).find('option:selected').text();
       var URLVal = $(this).val();
       $(this).next('img').remove();
       $(this).after(' <img src="' + URLVal + '" alt="' + nameVal + '" style="max-width: 100px; max-height: 100px">');

       if ($('textarea[name="Post"]').val().indexOf('[AI=') !== -1) {
           $('textarea[name="Post"]').val($('textarea[name="Post"]').val().replace(/ \[AI=(.+?)\]/i, ''));
       }

       $('textarea[name="Post"]').val($('textarea[name="Post"]').val() + ' [AI=' + URLVal + ']');
   }
});

$('td[id*="pid_"]:contains([AI=)').each(function() {
   $(this).html($(this).html().replace(/\[AI=(.+?)\]/i, '<span class="my_avatar" style="display: none">$1</span>'));
   var myAvatar = $(this).find('span.my_avatar').text();
   $(this).prev('td.miniprofile').find('div[align="center"] img').attr('src', myAvatar);
});
