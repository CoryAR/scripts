// By Cory
// https://cory.jcink.net/

$('div.g_profiles').each(function() {
    var PlayStation = $(this).find('span.PlayStation').text();
    var Xbox = $(this).find('span.Xbox').text();
    var Switch = $(this).find('span.Switch').text();
    var Steam = $(this).find('span.Steam').text();
    var Discord = $(this).find('span.Discord').text();
    var Twitch = $(this).find('span.Twitch').text();
    var YouTube = $(this).find('span.YouTube').text();
    var Guilded = $(this).find('span.Guilded').text();
    var Facebook = $(this).find('span.Facebook').text();

    $(this).find('span.PlayStation').html('<a href="https://gamercards.exophase.com/psn/user/' + PlayStation + '" title="' + PlayStation + '" target="_blank"><img src="https://files.jcink.net/uploads/cory//PlayStation.png" width="20" height="20" alt="PlayStation" /></a>');
    $(this).find('span.Xbox').html('<a href="https://gamercards.exophase.com/xbox/user/' + Xbox + '" title="' + Xbox + '" target="_blank"><img src="https://files.jcink.net/uploads/cory//Xbox.png" width="20" height="20" alt="Xbox" /></a>');
    $(this).find('span.Switch').html('<img src="https://files.jcink.net/uploads/cory//nintendo_switch.png" width="20" height="20" title="' + Switch + '" alt="Switch" />');
    $(this).find('span.Steam').html('<a href="https://gamercards.exophase.com/steam/user/' + Steam + '" title="' + Steam + '" target="_blank"><img src="https://files.jcink.net/uploads/cory//Steam.png" width="20" height="20" alt="Steam" /></a>');
    $(this).find('span.Discord').html('<img src="https://files.jcink.net/uploads/cory//discord_logo_smaller.png" width="20" height="20" title="' + Discord + '" alt="Discord" />');
    $(this).find('span.Twitch').html('<a href="https://www.twitch.tv/' + Twitch + '" title="' + Twitch + '" target="_blank"><img src="https://files.jcink.net/uploads/cory//Twitch.png" width="20" height="20" alt="Twitch" /></a>');
    $(this).find('span.YouTube').html('<a href="https://www.youtube.com/user/' + YouTube + '" title="' + YouTube + '" target="_blank"><img src="https://files.jcink.net/uploads/cory//YouTube.png" width="20" height="20" alt="YouTube" /></a>');
    $(this).find('span.Guilded').html('<a href="https://guilded.gg/' + Guilded + '" title="' + Guilded + '" target="_blank"><img src="https://files.jcink.net/uploads/cory//Guilded.png" width="20" height="20" alt="Guilded" /></a>');
    $(this).find('span.Facebook').html('<a href="https://www.facebook.com/gaming/' + Facebook + '" title="' + Facebook + '" target="_blank"><img src="https://files.jcink.net/uploads/cory//Facebook.png" width="20" height="20" alt="Facebook" /></a>');

    $(this).find('span').each(function() {
        if ($(this).find('a, img[title]').attr('title') === '') {
            $(this).hide();
        }
    });
});

$('div[id*="field_"]').each(function() {
    $(this).html($(this).html().replace(/PlayStation: (.+$)/i, 'PlayStation: <a href="https://gamercards.exophase.com/psn/user/$1" title="$1" target="_blank"><img src="https://files.jcink.net/uploads/cory//PlayStation.png" width="20" height="20" alt="PlayStation" /></a>').replace(/Xbox: (.+$)/i, 'Xbox: <a href="https://gamercards.exophase.com/xbox/user/$1" title="$1" target="_blank"><img src="https://files.jcink.net/uploads/cory//Xbox.png" width="20" height="20" alt="Xbox" /></a>').replace(/Switch: (.+$)/i, 'Switch: <img src="https://files.jcink.net/uploads/cory//nintendo_switch.png" width="20" height="20" title="$1" alt="Switch" />').replace(/Steam: (.+$)/i, 'Steam: <a href="https://gamercards.exophase.com/steam/user/$1" title="$1" target="_blank"><img src="https://files.jcink.net/uploads/cory//Steam.png" width="20" height="20" alt="Steam" /></a>').replace(/Discord: (.+$)/i, 'Discord: <img src="https://files.jcink.net/uploads/cory//discord_logo_smaller.png" width="20" height="20" title="$1" alt="Discord" />').replace(/Twitch: (.+$)/i, 'Twitch: <a href="https://www.twitch.tv/$1" title="$1" target="_blank"><img src="https://files.jcink.net/uploads/cory//Twitch.png" width="20" height="20" alt="Twitch" /></a>').replace(/YouTube: (.+$)/i, 'YouTube: <a href="https://www.youtube.com/user/$1" title="$1" target="_blank"><img src="https://files.jcink.net/uploads/cory//YouTube.png" width="20" height="20" alt="YouTube" /></a>').replace(/Guilded: (.+$)/i, 'Guilded: <a href="https://guilded.gg/$1" title="$1" target="_blank"><img src="https://files.jcink.net/uploads/cory//Guilded.png" width="20" height="20" alt="Guilded" /></a>').replace(/Facebook Gaming: (.+$)/i, 'Facebook Gaming: <a href="https://www.facebook.com/gaming/$1" title="$1" target="_blank"><img src="https://files.jcink.net/uploads/cory//Facebook.png" width="20" height="20" alt="Facebook" /></a>'));

    if ($(this).find('a, img').attr('title') === '<i>No Information</i>') {
        $(this).hide();
    }
});
