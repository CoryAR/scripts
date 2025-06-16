// By Cory
// https://cory.jcink.net/

$(function() {
    let catID = [];
    let forumName = [];
    let forumLink = [];
    let forumID = [];
    let parentID = [];
    let subforumName = [];
    let subforumLink = [];
    let bColor = $('#sidebar').css('border-top-color');

    function getNav() {
        $('#nav-bar li').append('<ul class="row2"></ul>');

        $('#nav-bar li').each(function() {
            let $this = $(this);

            $(forumName).each(function(i) {
                if (catID[i] === $this.attr('class')) {
                    $this.find('ul').append('<li class="forum' + forumID[i] + '"><a href="' + forumLink[i] + '">' + forumName[i] + '</a></li>');
                }
            });
        });

        $('#nav-bar ul ul li').append('<ul class="row2"></ul>');

        $('#nav-bar ul ul li').each(function() {
            let $this = $(this);

            $(subforumName).each(function(i) {
                if ('forum' + parentID[i] === $this.attr('class')) {
                    $this.find('ul').append('<li><a href="' + subforumLink[i] + '">' + subforumName[i] + '</a></li>');
                }
            });
        });

        $('#nav-bar ul ul ul:empty').remove();
        $('#nav-bar ul ul ul a').prepend('· ');

        if ($('#sidebar').height() > $(window).height()) {
            $('#sidebar').css({
                'max-height': $(window).height() - 20 + 'px',
                'overflow': 'auto'
            });
        }

        localStorage.setItem('nav-bar-sidebar-length', $('#nav-bar a').length);

        if (localStorage.getItem('nav-bar-sidebar-length') !== $('#nav-bar a').length) {
            localStorage.removeItem('nav-bar-sidebar');
        }

        localStorage.setItem('nav-bar-sidebar', $('#nav-bar').html());
    }

    if (act === 'idx' && !$.isNumeric(' + c + ')) {
        $('div.category').each(function() {
            let categoryID = $(this).attr('id');
            let catName = $(this).find('div.maintitle a:last').text();
            let catLink = $(this).find('div.maintitle a:last').attr('href');

            $('#nav-bar ul').append('<li class="' + categoryID + '"><a class="titlemedium" style="border-top: 1px solid ' + bColor + '; border-bottom: 1px solid ' + bColor + '" href="' + catLink + '">' + catName + '</a></li>');
        });

        $('#sidebar a.titlemedium:eq(0)').css('border-top', '0');

        $('div.category b a.tooltip').each(function() {
            catID.push($(this).parents('div.category').attr('id'));
            forumName.push($(this).text());
            forumLink.push($(this).attr('href'));
            forumID.push($(this).attr('href').split('showforum=')[1]);
        });

        $('span.subforums a.tooltip').each(function() {
            parentID.push($(this).parents('tr.forum-row').find('b a.tooltip').attr('href').split('showforum=')[1]);
            subforumName.push($(this).text());
            subforumLink.push($(this).attr('href'));
        });

        getNav();
    } else if (localStorage.getItem('nav-bar-sidebar') === null || localStorage.getItem('nav-bar-sidebar').length === '') {
        $.get('/index.php', function(data) {
            $('div.category', data).each(function() {
                let categoryID = $(this).attr('id');
                let catName = $(this).find('div.maintitle a:last').text();
                let catLink = $(this).find('div.maintitle a:last').attr('href');

                $('#nav-bar ul').append('<li class="' + categoryID + '"><a class="titlemedium" style="border-top: 1px solid ' + bColor + '; border-bottom: 1px solid ' + bColor + '" href="' + catLink + '">' + catName + '</a></li>');
            });

            $('#sidebar a.titlemedium:eq(0)').css('border-top', '0');

            $('div.category b a.tooltip', data).each(function() {
                catID.push($(this).parents('div.category').attr('id'));
                forumName.push($(this).text());
                forumLink.push($(this).attr('href'));
                forumID.push($(this).attr('href').split('showforum=')[1]);
            });

            $('span.subforums a.tooltip', data).each(function() {
                parentID.push($(this).parents('tr.forum-row').find('b a.tooltip').attr('href').split('showforum=')[1]);
                subforumName.push($(this).text());
                subforumLink.push($(this).attr('href'));
            });

            getNav();
        });
    } else {
        $('#nav-bar').html(localStorage.getItem('nav-bar-sidebar'));
    }
});
