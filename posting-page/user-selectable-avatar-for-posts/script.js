// By Cory
// https://cory.jcink.net/

$('#post-icon-options').after('<tr id="post-avatar-selection"><td class="pformleft">Select an avatar for this post</td><td class="pformright"><select class="forminput" style="vertical-align: top"><option value="-1">Choose Avatar</option></select></td></tr>');

function addAvatar(aName, aURL) {
   $('#post-avatar-selection select').append('<option value="' + aURL + '">' + aName + '</option>');
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
   $(this).html($(this).html().replace(/ \[AI=(.+?)\]/i, '<span class="my_avatar" style="display: none">$1</span>'));
   var myAvatar = $(this).find('span.my_avatar').text();

   if ($(this).prev('td.miniprofile').find('div[align="center"] img').length) {
       $(this).prev('td.miniprofile').find('div[align="center"] img').attr('src', myAvatar);
   } else {
       $(this).prev('td.miniprofile').find('div[align="center"]').prepend('<img src="' + myAvatar + '" alt="">');
   }
});
