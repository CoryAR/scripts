// By Cory
// https://cory.jcink.net/

export function addExp(field, pID, href, src) {
   if (location.href.indexOf('act=UserCP&CODE=01') !== -1 || $('#registration-form').length) {
       $('tr[id*="field_"] td:contains(' + field + '), fieldset legend:contains(' + field + ')').next('td, table').find('input').hide();
       var input = $('tr[id*="field_"] td:contains(' + field + '), fieldset legend:contains(' + field + ')').next('td, table').find('input');
       $('tr[id*="field_"] td:contains(' + field + ')').next('td').append('<span id="' + pID + '" style="cursor: pointer; opacity: 0.5; padding-left: 5px"><img src="' + src + '" alt="" title="' + pID + '"></span>');
       $('fieldset legend:contains(' + field + ')').next('table').find('td:last').append('<span id="' + pID + '" style="cursor: pointer; opacity: 0.5; padding-left: 5px"><img src="' + src + '" alt="" title="' + pID + '"></span>');

       if (input.val().match(pID)) {
           $('span:has(img[title="' + pID + '"])').css('opacity', '1.0');
       }

       $('#' + pID).click(function() {
           if (input.val().match(pID)) {
               $(this).css('opacity', '0.5');
               input.val(input.val().split(' ' + pID)[0] + input.val().split(' ' + pID)[1]);
           } else {
               $(this).css('opacity', '1.0');
               input.val(input.val() + ' ' + pID);
           }
       });
   }

   if ($('div.multi-selection:contains(' + field + ')').length) {
       $('div.multi-selection:contains(' + field + ')').each(function() {
           $(this).html($(this).html().replace(pID, '<a href="' + href + '" target="_blank" class="dd_icon"><img src="' + src + '" alt="" title="' + pID + '"></a>'));
       });
   }
}
