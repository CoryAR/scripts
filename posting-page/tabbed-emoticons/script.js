// By Cory
// https://cory.jcink.net/

export default function init({
    primaryEmot,
    emots
}) {
    let keys = Object.keys(emots);

    if ($('#code-buttons').length) {
        $('#enter-your-post-header + tr td.pformleft').hide();
        $('#enter-your-post-header + tr td.pformright').attr('colspan', '2').css('text-align', 'center');

        if ($('#enter-your-post').length === 0) {
            $('#enter-your-post-header + tr td.pformleft:has(a[href*="CheckLength"]) + td').append('<br><br><a href="javascript:CheckLength()">Check Post Length</a>');
        } else {
            $('#enter-your-post td.pformright').append('<br><br>' + $('#enter-your-post div.desc').html());
        }

        $('#bbcode-buttons').append('<img id="primary_emot" src="' + primaryEmot + '" alt="Emoticons" title="Emoticons" style="cursor: pointer"><div id="emoticons" style="display: none; width: 200px; height: 200px; position: absolute; top: 50%; left: 50%; transform: translate(-50%; -50%)"><div id="emot_exit" style="padding: 5px; float: right; cursor: pointer" title="Close">X</div><div id="emot_categories" style="display: flex; flex-wrap: wrap; gap: 5px; padding: 5px; justify-content: center"></div><div id="emot_list" style="display: none; padding: 5px; max-height: 200px; overflow: auto"></div></div>');

        $(keys).each(function(i) {
            $('#emot_categories').append('<img src="' + emots[keys[i]].images[0] + '" alt="' + keys[i] + '" title=" ' + keys[i] + '" style="cursor: pointer">');
            $('#emot_list').append('<div></div>');

            $(emots[keys[i]].images).each(function(x) {
                $('#emot_categories img').each(function() {
                    if ($(this).attr('title').includes(keys[i])) {
                        let index = $(this).index();
                        $('#emot_list div:eq(' + index + ')').append('<img src="' + emots[keys[i]].images[x] + '" alt="' + emots[keys[i]].text[x] + '" style="cursor: pointer">');
                    }
                });
            });
        });

        let background = $('#code-buttons td.pformright').css('background');
        let border = $('#code-buttons td.pformright').css('border-top-color');
        let pos = $('#primary_emot').offset();
        let width = $('#primary_emot').width();
        let height = $('#primary_emot').height() + 5;

        $('#emot_categories, #emot_list, #emot_exit').css({
            'background': background,
            'border': '1px solid ' + border
        });

        $('#emoticons').css({
            top: pos.top + height + 'px',
            left: pos.left - 200 + width + 'px'
        });

        $('#primary_emot').click(function() {
            $('#emoticons').slideDown('slow');

            $('#emot_exit').css({
                'line-height': $('#emot_categories').height() + 'px',
                'border-left': '0'
            });

            $('#emot_exit').click(function() {
                $('#emoticons').slideUp('slow');
            });

            $('#emot_categories img').click(function() {
                $('#emot_list').show().find('div').hide();
                let index = $(this).index();
                $('#emot_categories').css('border-bottom', '0');
                $('#emot_list div:eq(' + index + ')').css({
                    'display': 'flex',
                    'flex-wrap': 'wrap',
                    'gap': '5px'
                });
            });
        });

        $('#emot_list img').click(function() {
            jBBCode.addTag(' ' + $(this).attr('alt') + ' ');
            $('#emoticons').hide();
        });
    }

    function parseEmot() {
        $('div.postcolor, td[class*="post"], #ucpcontent p, td[id="QUOTE"], div.box').each(function() {
            let $this = $(this);
            $(keys).each(function(i) {
                $(emots[keys[i]].images).each(function(x) {
                    if ($this.html().includes(emots[keys[i]].text[x])) {
                        let reg = new RegExp(emots[keys[i]].text[x], 'g');
                        $this.html($this.html().replace(reg, '<img src="' + emots[keys[i]].images[x] + '" alt="' + emots[keys[i]].text[x] + '">'));
                    }
                });
            });
        });
    }

    parseEmot();

    $('#tab2').one('click', function() {
        $(document).ajaxStop(function() {
            parseEmot();
        });
    });

    $('a[onclick*="quickEdit.edit"]').click(function() {
        let stateCheck = setInterval(() => {
            if ($('div.quick-edit textarea[name="Post"]').val().length > 0) {
                clearInterval(stateCheck);
                $('input[name="save"]').click(function() {
                    let id = $(this).parents('form[id^="qe-form-"]').attr('id');
                    let newCheck = setInterval(() => {
                        if ($('#' + id).length === 0) {
                            clearInterval(newCheck);
                            parseEmot();
                        }
                    }, 100);
                });
            }
        }, 100);
    });
}
