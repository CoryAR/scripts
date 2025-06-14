// By Cory
// https://cory.jcink.net/

$(function() {
   var tZone;
   var yTZone = new Date().toString("hh:mm tt").split('(')[1].split(')')[0];

   if (new Date().toString("hh:mm tt").indexOf('30 (') !== -1) {
       tZone = parseFloat(new Date().toString("hh:mm tt").split('GMT')[1].split(' (')[0].replace('00', '').replace('30', '.5').replace('+', ''), 10);
   } else if (new Date().toString("hh:mm tt").indexOf('GMT+0000') !== -1) {
       tZone = 0;
   } else {
       tZone = parseFloat(new Date().toString("hh:mm tt").split('GMT')[1].split(' (')[0].replace('00', '').replace('+', ''), 10);
   }

   // Thanks for the DST snippet, Stack Overflow
   Date.prototype.stdTimezoneOffset = function() {
       var jan = new Date(this.getFullYear(), 0, 1);
       var jul = new Date(this.getFullYear(), 6, 1);
       return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
   };

   Date.prototype.isDstObserved = function() {
       return this.getTimezoneOffset() < this.stdTimezoneOffset();
   };

   var today = new Date();

   if (today.isDstObserved() === true && tZone.toString().includes('-')) {
       tZone = tZone - 1;
       $('input[name="DST"]').prop('checked', true);
   } else if (today.isDstObserved() === true && !tZone.toString().includes('-')) {
       tZone = tZone + 1;
       $('input[name="DST"]').prop('checked', true);
   } else if (today.isDstObserved() === false) {
       tZone = tZone;
       $('input[name="DST"]').prop('checked', false);
   }

   $('select[name="u_timezone"]').val(tZone).hide().after(yTZone);
});
