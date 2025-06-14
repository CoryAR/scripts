// By Cory
// https://cory.jcink.net/

export default function init({
    onlineUserContainer,
    avatarImgURL,
    width,
    height
}) {
    $.get('/index.php?act=Members&max_results=1000', function(data) {
        data = data.replace(/src=/g, "data-src=");
        let doc = new DOMParser().parseFromString(data, 'text/html');
        $('span.username', doc).each(function() {
            let username = $(this).text();
            let avatar = $(this).next('span.avatar').text();

            if (avatar === '') {
                avatar = avatarImgURL;
            }

            $(onlineUserContainer + ' a').each(function() {
                let username2 = $(this).text();

                if (username === username2) {
                    $(this).html('<img src="' + avatar + '" title="' + username2 + '" alt="' + username2 + '" style="width: ' + width + 'px; height: ' + height + 'px">');
                }
            });
        });
    });

    $(onlineUserContainer).html($(onlineUserContainer).html().replace(/,/g, ' '));
}
