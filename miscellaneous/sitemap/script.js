// By Cory
// https://cory.jcink.net/

export default function init({
    act
}) {
    if (act === 'idx') {
        $('body').append('<div id="sitemap" class="tableborder" style="display: none; width: auto; position: absolute; left: 50%; top: 50%; text-align: left"><div class="row4" style="padding: 10px"><div id="close_sitemap" style="cursor: pointer; float: right" title="Close Sitemap">X</div><ul></ul></div></div>');
        $('#submenu td[align]').append('<a href="javascript: void(0);" id="o_sitemap">Sitemap</a>');
        $('#sitemap').css('margin', '-' + $('#sitemap').height() + 'px 0 0 -' + $('#sitemap').width() + 'px');

        $('#o_sitemap').click(function() {
            $('#sitemap').stop().fadeTo('slow', 1);
        });

        $('#close_sitemap').click(function() {
            $('#sitemap').stop().fadeTo('slow', 0);
        });

        $('div.category a[href*="?c="], a.tooltip').each(function() {
            var aTitle = $(this).text();
            var aURL = $(this).attr('href');

            $('#sitemap ul').append('<li style="display: none; padding: 3px 0"><a href="' + aURL + '">' + aTitle + '</a></li>');
        });

        $('#sitemap li:has(a[href*="showforum"])').css('list-style-type', 'circle');
        $('#sitemap li:has(a[href*="?c="])').show().prepend('<span class="ex_coll" style="margin-right: 3px; cursor: pointer">+</span>');

        $('span.ex_coll').click(function() {
            if ($(this).text() === '+') {
                $(this).text('–');
                $(this).parent('li').nextUntil('li:has(a[href*="?c="])').show();
            } else {
                $(this).text('+');
                $(this).parent('li').nextUntil('li:has(a[href*="?c="])').hide();
            }
        });
    }
}
