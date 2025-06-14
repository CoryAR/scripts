// By Cory
// https://cory.jcink.net/

export default function init({
    videoWidth,
    videoHeight
}) {
    $('#bbcode-buttons input:last').after(' <input type="button" id="video" class="codebuttons" value=" VIDEO ">');

    $('#video').click(function() {
        $('#video-container').remove();
        $('body').append('<div id="video-container" class="tableborder" style="text-align: left; position: fixed"><div class="pformstrip">Insert a Video:</div><div class="row2">Video Type:<br><select class="forminput"><option value="-1">Select One</option><option>Dailymotion</option><option>Facebook</option><option>TikTok</option><option>Twitch</option><option>Vimeo</option><option>YouTube</option></select><br><br>Video URL:<br><input type="text" class="forminput"></div><div class="pformstrip"><input type="button" class="forminput" value="Submit"> <input type="button" class="forminput" value="Cancel"></div></div>');

        $('#video-container').css({
            'top': 'calc(50% - ' + $('#video-container').height() / 2 + 'px',
            'left': 'calc(50% - ' + $('#video-container').width() / 2 + 'px'
        });

        $('#video-container input[value="Cancel"]').click(function() {
            $('#video-container').remove();
        });

        $('#video-container input[value="Submit"]').click(function() {
            let type = $('#video-container select').val();
            let video = $('#video-container input[type="text"]').val();
            $('#video-container').remove();

            if (type !== '-1') {
                jBBCode.addTag('[VIDEO=' + type + ']' + video + '[/VIDEO]');
            }
        });
    });

    function parseVideo() {
        $('div.postcolor').each(function() {
            $(this).html($(this).html().replace(/\[VIDEO=(.+?)\](.+?)\[\/VIDEO\]/g, '<span class="video $1">$2</span>'));

            $(this).find('span.video').each(function() {
                let vType = $(this).attr('class').split('video ')[1];
                let vID;

                if (vType === 'Dailymotion') {
                    vID = $(this).text().split('/video/')[1];
                    $(this).replaceWith(`<iframe src="https://geo.dailymotion.com/player.html?video=${vID}" style="width:${videoWidth}px; height:${videoHeight}px; overflow:hidden; border:none;" allowfullscreen title="Dailymotion Video Player" allow="web-share"></iframe>`);
                } else if (vType === 'Facebook') {
                    vID = $(this).text().split('/videos/')[1].split('/?')[0];
                    $(this).replaceWith(`<div class="fb-video" data-href="https://www.facebook.com/facebook/videos/${vID}/" data-width="${videoWidth}" data-height="${videoHeight}" ata-show-text="false"></div><div id="fb-root"></div>`);
                } else if (vType === 'TikTok') {
                    vID = $(this).text().split('/video/')[1].split('?')[0];
                    let channel = $(this).text().split('.com/')[1].split('/')[0];
                    $(this).replaceWith(`<blockquote class="tiktok-embed" cite="https://www.tiktok.com/${channel}/video/${vID}" data-video-id="${vID}" data-embed-from="embed_page"><section></section></blockquote>`);
                } else if (vType === 'Twitch') {
                    vID = $(this).text().split('.tv/')[1];
                    let loc = location.href.split('https://')[1].split('/')[0];
                    $(this).replaceWith(`<iframe src="https://player.twitch.tv/?video=v${vID}3&parent=${loc}&autoplay=false" height="${videoHeight}" width="${videoWidth}" allowfullscreen></iframe>`);
                } else if (vType === 'Vimeo') {
                    vID = $(this).text().substring($(this).text().lastIndexOf('/') + 1, $(this).text().length);
                    $(this).replaceWith(`<iframe src="https://player.vimeo.com/video/${vID}" width="${videoWidth}" height="${videoHeight}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`);
                } else if (vType === 'YouTube') {
                    vID = $(this).text().split('?v=')[1];
                    $(this).replaceWith(`<iframe width="${videoWidth}" height="${videoHeight}" src="https://www.youtube.com/embed/${vID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
                }
            });
        });

        let script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0';
        document.body.appendChild(script);
        $.getScript('https://www.tiktok.com/embed.js');
    }

    parseVideo();

    $('a[onclick*="quickEdit.edit"]').click(function() {
        var stateCheck = setInterval(() => {
            if ($('div.quick-edit textarea[name="Post"]').val().includes('[VIDEO=')) {
                $('input[name="save"]').click(function() {
                    var newCheck = setInterval(() => {
                        if ($('div.postcolor').text().includes('[VIDEO=')) {
                            clearInterval(stateCheck);
                            clearInterval(newCheck);
                            parseVideo();
                        }
                    }, 100);
                });
            }
        }, 100);
    });
}
