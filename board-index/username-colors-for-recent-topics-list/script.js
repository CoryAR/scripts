if ($('#recent-topics').length) {
    $.get('/index.php?act=Members&max_results=1000', function(data) {
        $('#recent-topics a[href*="showuser"]').each(function() {
            let $this = $(this);

            $('span.username a', data).each(function() {
                if ($this.text() === $(this).text()) {
                    $this.css('color', $(this).find('span').css('color'));
                }
            });
        });
    });
}
