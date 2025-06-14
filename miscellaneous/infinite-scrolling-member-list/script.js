// By Cory
// https://cory.jcink.net/

export default function init({
    act
}) {
    var st;

    if (location.href.indexOf('st=') !== -1) {
        st = parseInt(location.href.split('st=')[1], 10);
    } else {
        st = 0;
    }

    function pageScroll() {
        var scrollLoad = true;
        if (act === 'Members' && scrollLoad === true && localStorage.getItem('mLen') !== '0' || localStorage.getItem('mLen') === null) {
            scrollLoad = false;

            $.get('/index.php?&act=Members&photoonly=&name=&name_box=all&max_results=20&filter=ALL&sort_order=asc&sort_key=name&st=' + st + '&memlistajax=1', function(data) {
                $('#member-list tr:has(td.name)', data).insertAfter('#member-list tr:has(td.name):last');
                scrollLoad = true;
                localStorage.setItem('mLen', $('#member-list tr:has(td.name)', data).length);
            });
        }
    }

    $(window).scroll(function() {
        if (Math.ceil($(window).scrollTop() + $(window).height()) === Math.ceil($(document).height())) {
            st += 20;
            pageScroll();
        }
    });

    $(window).unload(function() {
        localStorage.removeItem('mLen');
    });
}
