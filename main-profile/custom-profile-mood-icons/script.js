// By Cory
// https://cory.jcink.net/

export default function init({
    disableAnimated
}) {
    var moodN = ['None', 'Aggressive', 'Amazed', 'Amused', 'Angelic', 'Angry', 'Artistic', 'Asleep', 'Bashful', 'Blah', 'Bored', 'Breezy', 'Brooding', 'Busy', 'Buzzed', 'Chatty', 'Cheeky', 'Cheerful', 'Cloud_9', 'Cold', 'Coldturkey', 'Confused', 'Cool', 'Crappy', 'Curious', 'Cynical', 'Daring', 'Dead', 'Depressed', 'Devilish', 'Doh', 'Doubtful', 'Drunk', 'Energetic', 'Fiendish', 'Fine', 'Flirty', 'Gloomy', 'Goofy', 'Grumpy', 'Hot', 'Hungover', 'In-Love', 'Innocent', 'Inpain', 'Inspired', 'Lonely', 'Lurking', 'Mellow', 'Mischievious', 'Nerdly', 'Nerdy', 'Notworthy', 'Paranoid', 'Pensive', 'Psychedelic', 'Question', 'Relaxed', 'Roflmao', 'Sad', 'Scared', 'Shocked', 'Sick', 'Sleepy', 'Sneaky', 'Snobbish', 'Spaced', 'Stressed', 'Sunshine', 'Sweettooth', 'Thinking', 'Tired', 'Twisted', 'Veggedout', 'Worried', 'Yeehaw'];
    var moodI = ['https://files.jcink.net/uploads/cory//p478599.png', 'https://files.jcink.net/uploads/cory//p478511.gif', 'https://files.jcink.net/uploads/cory//p478512.gif', 'https://files.jcink.net/uploads/cory//p478513.gif', 'https://files.jcink.net/uploads/cory//p478514.gif', 'https://files.jcink.net/uploads/cory//p478515.gif', 'https://files.jcink.net/uploads/cory//p478516.gif', 'https://files.jcink.net/uploads/cory//p478517.gif', 'https://files.jcink.net/uploads/cory//p478518.gif', 'https://files.jcink.net/uploads/cory//p478520.gif', 'https://files.jcink.net/uploads/cory//p478521.gif', 'https://files.jcink.net/uploads/cory//p478522.gif', 'https://files.jcink.net/uploads/cory//p478523.gif', 'https://files.jcink.net/uploads/cory//p478524.gif', 'https://files.jcink.net/uploads/cory//p478525.gif', 'https://files.jcink.net/uploads/cory//p478526.gif', 'https://files.jcink.net/uploads/cory//p478527.gif', 'https://files.jcink.net/uploads/cory//p478528.gif', 'https://files.jcink.net/uploads/cory//p478529.gif', 'https://files.jcink.net/uploads/cory//p478530.gif', 'https://files.jcink.net/uploads/cory//p478531.gif', 'https://files.jcink.net/uploads/cory//p478532.gif', 'https://files.jcink.net/uploads/cory//p478533.gif', 'https://files.jcink.net/uploads/cory//p478534.gif', 'https://files.jcink.net/uploads/cory//p478535.gif', 'https://files.jcink.net/uploads/cory//p478536.gif', 'https://files.jcink.net/uploads/cory//p478537.gif', 'https://files.jcink.net/uploads/cory//p478538.gif', 'https://files.jcink.net/uploads/cory//p478539.gif', 'https://files.jcink.net/uploads/cory//p478540.gif', 'https://files.jcink.net/uploads/cory//p478541.gif', 'https://files.jcink.net/uploads/cory//p478542.gif', 'https://files.jcink.net/uploads/cory//p478543.gif', 'https://files.jcink.net/uploads/cory//p478544.gif', 'https://files.jcink.net/uploads/cory//p478545.gif', 'https://files.jcink.net/uploads/cory//p478546.gif', 'https://files.jcink.net/uploads/cory//p478547.gif', 'https://files.jcink.net/uploads/cory//p478548.gif', 'https://files.jcink.net/uploads/cory//p478549.gif', 'https://files.jcink.net/uploads/cory//p478550.gif', 'https://files.jcink.net/uploads/cory//p478553.gif', 'https://files.jcink.net/uploads/cory//p478554.gif', 'https://files.jcink.net/uploads/cory//p478555.gif', 'https://files.jcink.net/uploads/cory//p478556.gif', 'https://files.jcink.net/uploads/cory//p478557.gif', 'https://files.jcink.net/uploads/cory//p478558.gif', 'https://files.jcink.net/uploads/cory//p478559.gif', 'https://files.jcink.net/uploads/cory//p478560.gif', 'https://files.jcink.net/uploads/cory//p478561.gif', 'https://files.jcink.net/uploads/cory//p478562.gif', 'https://files.jcink.net/uploads/cory//p478564.gif', 'https://files.jcink.net/uploads/cory//p478565.gif', 'https://files.jcink.net/uploads/cory//p478566.gif', 'https://files.jcink.net/uploads/cory//p478567.gif', 'https://files.jcink.net/uploads/cory//p478568.gif', 'https://files.jcink.net/uploads/cory//p478569.gif', 'https://files.jcink.net/uploads/cory//p478570.gif', 'https://files.jcink.net/uploads/cory//p478571.gif', 'https://files.jcink.net/uploads/cory//p478572.gif', 'https://files.jcink.net/uploads/cory//p478573.gif', 'https://files.jcink.net/uploads/cory//p478574.gif', 'https://files.jcink.net/uploads/cory//p478575.gif', 'https://files.jcink.net/uploads/cory//p478576.gif', 'https://files.jcink.net/uploads/cory//p478577.gif', 'https://files.jcink.net/uploads/cory//p478578.gif', 'https://files.jcink.net/uploads/cory//p478579.gif', 'https://files.jcink.net/uploads/cory//p478580.gif', 'https://files.jcink.net/uploads/cory//p478581.gif', 'https://files.jcink.net/uploads/cory//p478582.gif', 'https://files.jcink.net/uploads/cory//p478583.gif', 'https://files.jcink.net/uploads/cory//p478584.gif', 'https://files.jcink.net/uploads/cory//p478585.gif', 'https://files.jcink.net/uploads/cory//p478586.gif', 'https://files.jcink.net/uploads/cory//p478587.gif', 'https://files.jcink.net/uploads/cory//p478588.gif', 'https://files.jcink.net/uploads/cory//p478589.gif'];

    $('span.mood').each(function() {
        for (var x = 0; x < moodN.length; x++) {
            if (moodN[x] === $(this).text()) {
                $(this).html("<img src='" + moodI[x] + "' alt='" + moodN[x] + "'>");
            }
        }
    });

    $('form[onsubmit*="ValidateProfile"] td.pformleft:contains(Mood)').next('td').append('<a href="javascript: void(0);" id="moods-open">Choose Mood</a><div id="moods" style="display: none"></div>');

    $('form[onsubmit*="ValidateProfile"] td.pformleft:contains(Mood)').next('td').find('option').each(function() {
        $(this).parent('select').hide();

        for (var x = 0; x < moodN.length; x++) {
            if (moodN[x] === $(this).text()) {
                $('#moods').append("<img src='" + moodI[x] + "' alt='" + moodN[x] + "' style='cursor: pointer; display: inline-block; padding: 2px; opacity: 0.5' /> ");
            }
        }

        if (disableAnimated === true) {
            $('#moods img[src*="Angelic.gif"], #moods img[src*="Angry.gif"], #moods img[src*="Asleep.gif"], #moods img[src*="Bitching.gif"], #moods img[src*="Chatty.gif"], #moods img[src*="Cheeky.gif"], #moods img[src*="Cloud_9.gif"], #moods img[src*="Cold.gif"], #moods img[src*="Coldturkey.gif"], #moods img[src*="Dead.gif"], #moods img[src*="Doh.gif"], #moods img[src*="Drunk.gif"], #moods img[src*="Energetic.gif"], #moods img[src*="Fiendish.gif"], #moods img[src*="Flirty.gif"], #moods img[src*="Horny.gif"], #moods img[src*="Hot.gif"], #moods img[src*="Hungover.gif"], #moods img[src*="Notworthy.gif"], #moods img[src*="Roflmao.gif"], #moods img[src*="Scared.gif"], #moods img[src*="Shocked.gif"], #moods img[src*="Sleepy.gif"], #moods img[src*="Sneaky.gif"], #moods img[src*="Spaced.gif"], #moods img[src*="Stressed.gif"], #moods img[src*="Sunshine.gif"], #moods img[src*="Thinking.gif"], #moods img[src*="Worried.gif"], #moods img[src*="Yeehaw.gif"]').hide();
        }

        $('#moods-open').click(function() {
            var pos = $('#moods').position();
            $(window).scrollTop(pos.top);
            $(this).hide();
            $('#moods').fadeIn('slow');
        });

        $('#moods img').click(function() {
            $('#moods img').css('opacity', '0.5');
            $(this).css('opacity', '1.0');
            var index = $(this).attr('alt');
            $(this).parent('#moods').parent('td').find('select').val(index);
        });
    });

    var mood = $('form[onsubmit*="ValidateProfile"] td.pformleft:contains(Mood)').next('td').find('select').val();
    var nMood = mood;
    $('form[onsubmit*="ValidateProfile"] td.pformleft:contains(Mood)').next('td').find('#moods img[alt="' + nMood + '"]').css('opacity', '1.0');
}
