// By Cory
// https://cory.jcink.net/

export default function init({
    act,
    c
}) {
    let catIDs = [];
    let forumNames = [];
    let forumLinks = [];
    let forumIDs = [];
    let parentIDs = [];
    let subforumNames = [];
    let subforumLinks = [];
    let bColor = $('#sidebar').css('border-top-color');
    let navBar = $('#nav-bar');

    function renderNav() {
        navBar.find('li').append('<ul class="row2"></ul>');

        navBar.find('li').each(function() {
            let $this = $(this);

            $(forumNames).each(function(i) {
                if (catIDs[i] === $this.attr('class')) {
                    $this.find('ul').append('<li class="forum' + forumIDs[i] + '"><a href="' + forumLinks[i] + '">' + forumNames[i] + '</a></li>');
                }
            });
        });

        navBar.find('ul ul li').append('<ul class="row2"></ul>');

        navBar.find('ul ul li').each(function() {
            let $this = $(this);

            $(subforumNames).each(function(i) {
                if ('forum' + parentIDs[i] === $this.attr('class')) {
                    $this.find('ul').append('<li><a href="' + subforumLinks[i] + '">' + subforumNames[i] + '</a></li>');
                }
            });
        });

        navBar.find('ul ul ul:empty').remove();
        navBar.find('ul ul ul a').prepend('&middot; ');

        if ($('#sidebar').height() > $(window).height()) {
            $('#sidebar').css({
                'max-height': $(window).height() - 20 + 'px',
                'overflow': 'auto'
            });
        }

        sessionStorage.setItem('nav-bar-sidebar', navBar.html());
    }

    function inventory(base) {
        base.find('div.category').each(function() {
            let categoryID = $(this).attr('id');
            let catName = $(this).find('div.maintitle a:last').text();
            let catLink = $(this).find('div.maintitle a:last').attr('href');

            navBar.find('ul').append('<li class="' + categoryID + '"><a class="titlemedium" style="border-top: 1px solid ' + bColor + '; border-bottom: 1px solid ' + bColor + '" href="' + catLink + '">' + catName + '</a></li>');
        });

        base.find('#sidebar a.titlemedium:eq(0)').css('border-top', '0');

        base.find('div.category b a.tooltip').each(function() {
            catIDs.push($(this).parents('div.category').attr('id'));
            forumNames.push($(this).text());
            forumLinks.push($(this).attr('href'));
            forumIDs.push($(this).attr('href').split('showforum=')[1]);
        });

        base.find('span.subforums a.tooltip').each(function() {
            parentIDs.push($(this).parents('tr.forum-row').find('b a.tooltip').attr('href').split('showforum=')[1]);
            subforumNames.push($(this).text());
            subforumLinks.push($(this).attr('href'));
        });
    }

    if (act === 'idx' && !$.isNumeric(c)) {
        inventory($(document.body));
        renderNav();
    } else if (sessionStorage.getItem('nav-bar-sidebar') === null || sessionStorage.getItem('nav-bar-sidebar').length === '') {
        $.get('/index.php', function(data) {
            inventory($(document.createElement('div')).html(data));
            renderNav();
        });
    } else {
        navBar.html(sessionStorage.getItem('nav-bar-sidebar'));
    }
}
