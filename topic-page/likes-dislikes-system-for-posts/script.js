// By Cory
// https://cory.jcink.net/

$(function() {
   if (location.href.indexOf('showtopic') !== -1) {
       var likes_exists;
       var dislikes_exists;
       var likes_tID;
       var dislikes_tID;

       $('div.postcolor').append('<div class="like_dislikes_container" style="margin: 10px 0"><a href="javascript: void(0)" class="like">Like This Post</a> - <a href="javascript: void(0)" class="dislike">Dislike This Post</a><br><span class="reveal"><span class="text" style="font-style: italic">Hover over this text to reveal likes/dislikes</span><span class="info" style="display: none"><strong class="likes">0</strong> Likes - <strong class="dislikes">0</strong> Dislikes</span></span></div>');

       $('span.reveal').one('mouseenter', function() {
           var pID = $(this).parents('td[id^="pid_"]').attr('id').split('pid_')[1];
           var $this = $(this);

           $.get('/index.php?act=Search&q="' + pID + '-Likes"&f=' + likes_dislikes_fid + '&u=&rt=topics', function(sData) {
               $.get($('a', sData).attr('href'), function(nSData) {
                   $('#search-topics a[href*="showtopic"]:not(a[href*="&view"])', nSData).each(function() {
                       if ($(this).text() === pID + '-Likes') {
                           likes_exists = 1;
                           likes_tID = $(this).attr('href').split('showtopic=')[1].split('&hl=')[0];
                           $this.parents('div.postcolor').find('strong.likes').text(parseInt($(this).parents('tr').find('td.row4:last').text(), 10) + 1);
                       }
                   });
               });
           });

           setTimeout(function() {
               $.get('/index.php?act=Search&q="' + pID + '-Dislikes"&f=' + likes_dislikes_fid + '&u=&rt=topics', function(sData) {
                   $.get($('a', sData).attr('href'), function(nSData) {
                       $('#search-topics a[href*="showtopic"]:not(a[href*="&view"])', nSData).each(function() {
                           if ($(this).text() === pID + '-Dislikes') {
                               dislikes_exists = 1;
                               dislikes_tID = $(this).attr('href').split('showtopic=')[1].split('&hl=')[0];
                               $this.parents('div.postcolor').find('strong.dislikes').text(parseInt($(this).parents('tr').find('td.row4:last').text(), 10) + 1);
                           }
                       });
                   });
               });
           }, 5000);

           $(this).find('span.info').fadeTo('slow', 1);
           $(this).find('span.text').hide();
       });

       $('div.postcolor').each(function() {
           $(this).find('a.like').one('click', function() {
               var pID = $(this).parents('td[id^="pid_"]').attr('id').split('pid_')[1];
               var $this = $(this);

               if (localStorage.getItem('likes_dislikes_' + pID) !== 'true') {
                   localStorage.setItem('likes_dislikes_' + pID, true);

                   if (likes_exists === 1) {
                       $.get('/index.php?act=Post&CODE=02&f=' + likes_dislikes_fid + '&t=' + likes_tID + '&st=', function(data) {
                           var auth_key = $('input[name="auth_key"]', data).val();

                           $.post('/index.php?', {
                               st: '0',
                               act: 'Post',
                               f: likes_dislikes_fid,
                               auth_key: auth_key,
                               CODE: '03',
                               t: likes_tID,
                               Post: 'Content',
                               success: function() {
                                   $this.parents('div.postcolor').find('strong.likes').text(parseInt($this.parents('div.postcolor').find('strong.likes').text(), 10) + 1);
                                   $this.parents('div.postcolor').find('span.reveal span.info').fadeTo('slow', 1);
                                   $this.parents('div.postcolor').find('span.reveal span.text').hide();
                               }
                           });
                       });
                   } else {
                       $.get('/index.php?act=Post&CODE=00&f=' + likes_dislikes_fid, function(data) {
                           var auth_key = $('input[name="auth_key"]', data).val();

                           $.post('/index.php?', {
                               st: '0',
                               act: 'Post',
                               f: likes_dislikes_fid,
                               auth_key: auth_key,
                               CODE: '01',
                               TopicTitle: pID + '-Likes',
                               Post: 'Content',
                               success: function() {
                                   $this.parents('div.postcolor').find('strong.likes').text(parseInt($this.parents('div.postcolor').find('strong.likes').text(), 10) + 1);
                                   $this.parents('div.postcolor').find('span.reveal span.info').fadeTo('slow', 1);
                                   $this.parents('div.postcolor').find('span.reveal span.text').hide();
                               }
                           });
                       });
                   }
               } else {
                   alert('You have already liked/disliked this post');
               }
           });

           $(this).find('a.dislike').one('click', function() {
               var pID = $(this).parents('td[id^="pid_"]').attr('id').split('pid_')[1];
               var $this = $(this);

               if (localStorage.getItem('likes_dislikes_' + pID) !== 'true') {
                   localStorage.setItem('likes_dislikes_' + pID, true);

                   if (dislikes_exists === 1) {
                       $.get('/index.php?act=Post&CODE=02&f=' + likes_dislikes_fid + '&t=' + dislikes_tID + '&st=', function(data) {
                           var auth_key = $('input[name="auth_key"]', data).val();

                           $.post('/index.php?', {
                               st: '0',
                               act: 'Post',
                               f: likes_dislikes_fid,
                               auth_key: auth_key,
                               CODE: '03',
                               t: dislikes_tID,
                               Post: 'Content',
                               success: function() {
                                   $this.parents('div.postcolor').find('strong.dislikes').text(parseInt($this.parents('div.postcolor').find('strong.dislikes').text(), 10) + 1);
                                   $this.parents('div.postcolor').find('span.reveal span.info').fadeTo('slow', 1);
                                   $this.parents('div.postcolor').find('span.reveal span.text').hide();
                               }
                           });
                       });
                   } else {
                       $.get('/index.php?act=Post&CODE=00&f=' + likes_dislikes_fid, function(data) {
                           var auth_key = $('input[name="auth_key"]', data).val();

                           $.post('/index.php?', {
                               st: '0',
                               act: 'Post',
                               f: likes_dislikes_fid,
                               auth_key: auth_key,
                               CODE: '01',
                               TopicTitle: pID + '-Dislikes',
                               Post: 'Content',
                               success: function() {
                                   $this.parents('div.postcolor').find('strong.dislikes').text(parseInt($this.parents('div.postcolor').find('strong.dislikes').text(), 10) + 1);
                                   $this.parents('div.postcolor').find('span.reveal span.info').fadeTo('slow', 1);
                                   $this.parents('div.postcolor').find('span.reveal span.text').hide();
                               }
                           });
                       });
                   }
               } else {
                   alert('You have already liked/disliked this post');
               }
           });
       });
   }

   $('#active-topics a[href*="showforum=' + likes_dislikes_fid + '"], #search-topics a[href*="showforum=' + likes_dislikes_fid + '"]').parent('td.row4').parent('tr').hide();
});
