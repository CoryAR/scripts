//Add Labels to Inputs
//Originally by Cory of jCodes
//Heavily modified and added to by kjSage @ ATF, CTTW, RPGD, RPGI, ShadowPlay, Sourced & WeCode

//Adds pformleft and pformright to form elements in the UCP that seem to have missed them
$('form:not([name="REG"], [name="LOGIN"], [name="REPLIER"], [name="mutliact"], [name="jump"]):has(input:not([value="03"], [value="do_alerts_settings"]))').each(function() {
    $(this).find('td:not([class]):nth-child(2):has(input, select, textarea)').attr('class', 'pformright').prev().attr('class', 'pformleft');
    $(this).find('td.row1:has(input, select, textarea)').attr('class', 'pformright').prev().attr('class', 'pformleft');
    $(this).find('td.row2:has(input, select, textarea)').attr('class', 'pformright').prev().attr('class', 'pformleft');
});

//Various UCP settings pages
$('form:has(input[value="03"]) tr:has(input:visible)').each(function() {
    $(this).find('input').attr('id', $(this).find('input:visible').attr('name'));
    $(this).find('b').wrapAll("<label for=" + $(this).find('input:visible').attr('id') + "></label>");
});
$('input:not([id]) + b, input:not([id]) + strong').each(function() {
    $(this).prev().addBack().wrapAll('<label></label>');
});
$('td.pformright:has(input:not([id]), select:not([id]), textarea:not([id]))').each(function() {
    var designateThis = 'input:not(input[type="button"][onclick], input[type="checkbox"], input[type="radio"], input[type="hidden"]), select, textarea';
    $(this).not(':has(select[name="ffont"], textarea[name="Post"])').find(designateThis).attr('id', $(this).find('input, select, textarea').attr('name'));
    if ($(this).not(':has(select[name="ffont"], textarea[name="Post"])').prev('td:has(:not(label):has(b)').length) {
        $(this).not(':has(select[name="ffont"], textarea[name="Post"])').prev('td').find('b').wrapInner('<label for="' + $(this).find(designateThis).attr('name') + '"></label>');
    } else {
        $(this).not(':has(select[name="ffont"], textarea[name="Post"])').prev('td').wrapInner('<label for="' + $(this).find(designateThis).attr('name') + '"></label>');
    }
    $(this).prev('td:has(label[for="undefined"])').find('label').wrapInner('<span></span>').find('span').unwrap();
});

//Generic checkboxes and radio buttons
$('strong:has(input:not([id]))').wrapInner('<label></label>');

//Registration Form
$('form[name="REG"] input[name="UserName"]').attr('id', 'UserName');
$('input[name="allow_admin_mail"]').attr('id', 'allow_admin_mail');
$('input[name="allow_member_mail"]').attr('id', 'allow_member_mail');
$('input[name="agree"]').attr('id', 'agree');
$('input[name="Privacy"]').attr('id', 'Privacy');
$('select[name="time_offset"]').attr('id', 'time_offset');

if ($('form[name="REG"]:has(:not("#ResendName"))').length) {
    $('form[name="REG"] fieldset:has(input[type="checkbox"])').html($('form[name="REG"] fieldset:has(input[type="checkbox"])').html().replace('Receive email from administrators', '<label for="allow_admin_mail">Receive email from administrators</label>').replace('Receive email from other members', '<label for="allow_member_mail">Receive email from other members</label>'));
    $('form[name="REG"] div.desc:has(input[type="checkbox"])').html($('form[name="REG"] div.desc:has(input[type="checkbox"])').html().replace('I agree to the terms of this registration, I am at least 13 years of age, and wish to proceed.', '<label for="agree">I agree to the terms of this registration, I am at least 13 years of age, and wish to proceed.</label>'));
    $('form[name="REG"] div.desc:has(input[type="checkbox"])').html($('form[name="REG"] div.desc:has(input[type="checkbox"])').html().replace('I agree to the terms of this registration and wish to proceed.', '<label for="agree">I agree to the terms of this registration and wish to proceed.</label>'));
    $('form[name="REG"] fieldset table:has(#UserName)').html($('form[name="REG"] fieldset table:has(#UserName)').html().replace('Enter your desired username', '<label for="UserName">Enter your desired username</label>'));
    $('form[name="REG"] fieldset:has(select[name="time_offset"])').html($('form[name="REG"] fieldset:has(select[name="time_offset"])').html().replace('You can adjust the default time zone setting below', '<label for="time_offset">You can adjust the default time zone setting below</label>'));
    $('form[name="REG"] fieldset table:has(#password-one)').html($('form[name="REG"] fieldset table:has(#password-one)').html().replace('Enter your password', '<label for="password-one">Enter password</label>'));
    $('form[name="REG"] fieldset table:has(#password-two)').html($('form[name="REG"] fieldset table:has(#password-two)').html().replace('Confirm Password', '<label for="password-two">Confirm password</label>'));
    $('form[name="REG"] fieldset table:has(#email-one)').html($('form[name="REG"] fieldset table:has(#email-one)').html().replace('Enter your Email Address', '<label for="email-one">Enter Email</label>'));
    $('form[name="REG"] fieldset table:has(#email-two)').html($('form[name="REG"] fieldset table:has(#email-two)').html().replace('Confirm Email Address', '<label for="email-two">Confirm Email</label>'));
}

//Login Form
$('input[name="CookieDate"][value="1"]').attr('id', 'CookieDate1');
$('input[name="CookieDate"][value="0"]').attr('id', 'CookieDate0');

if ($('form[name="LOGIN"]').length) {
    $('form[name="LOGIN"] td.pformright:has(input[type="radio"])').html($('form[name="LOGIN"] td.pformright:has(input[type="radio"])').html().replace('Yes', '<label for="CookieDate1">Yes</label>').replace('No', '<label for="CookieDate0">No</label>'));
    $('form[name="LOGIN"] td.pformright:has(input[type="checkbox"])').html($('form[name="LOGIN"] td.pformright:has(input[type="checkbox"])').html().replace('Don\'t add me to the active users list', '<label for="Privacy">Don\'t add me to the active users list</label>'));
}

//Password Protected Forum
$('input[name="f_password"]').attr('id', 'f_password');

if ($('form:has(#f_password)').length) {
    $('form:has(#f_password)').html($('form:has(#f_password)').html().replace('<strong>Forum Password</strong>', '<label for="f_password"><strong>Forum Password</strong></label>'));
}

//UCP Notepad
$('textarea[name="notes"]').attr('id', 'notes');
$('select[name="ta_size"]').attr('id', 'ta_size');

if ($('form:has(#ta_size)').length) {
    $('#ucpcontent:has(#notes) div:nth-child(6)').html($('#ucpcontent:has(#notes) div:nth-child(6)').html().replace('Your personal note pad', '<label for="notes">Your personal note pad</label>'));
    $('form:has(#ta_size)').html($('form:has(#ta_size)').html().replace('Notepad size:&nbsp;', '<label for="ta_size">Notepad size:</label>'));
}

//Compose Message - New Topic-Post-Poll Form
$('form[name="REPLIER"]:has(#entered_name) textarea[name="Post"]').attr('id', 'writeMessage');
$('form[name="REPLIER"]:has(#posting-form) textarea[name="Post"]').attr('id', 'writePost');

if ($('form[name="REPLIER"]:has(#writeMessage)').length) {
    $('form[name="REPLIER"]:has(#writeMessage)').html($('form[name="REPLIER"]:has(#writeMessage)').html().replace('Enter your Post', '<label for="writeMessage">Enter Your Message</label>'));
}
if ($('form[name="REPLIER"]:has(#writePost)').length) {
    $('form[name="REPLIER"]:has(#writePost)').html($('form[name="REPLIER"]:has(#writePost)').html().replace('Enter your Post', '<label for="writePost">Enter Your Post</label>'));
}
if ($('form[name="REPLIER"]:has(#post_as_menu)').length) {
    $('form[name="REPLIER"]:has(#post_as_menu)').html($('form[name="REPLIER"]:has(#post_as_menu)').html().replace('Select sub-account author...', '<label for="post_as_menu">Select sub-account author...</label>'));
}
if ($('form[name="REPLIER"]:has(#forminput)').length) {
    $('form[name="REPLIER"]:has(#forminput)').html($('form[name="REPLIER"]:has(#forminput)').html().replace('After posting...', '<label for="forminput">After posting...</label>'));
}
if ($('form[name="REPLIER"]:has(#message)').length) {
    $('form[name="REPLIER"]:has(#message)').html($('form[name="REPLIER"]:has(#message)').html().replace('<b>Enter your report</b>', '<label for="message"><b>Enter your report</b></label>'));
}

//board settings timezone
$('select[name="u_timezone"]').attr('id', 'u_timezone');

if ($('form:has(#u_timezone)').length) {
    $('form:has(#u_timezone)').html($('form:has(#u_timezone)').html().replace('<b>You may adjust the base time zone</b>', '<label for="u_timezone"><b>Adjust Base Timezone</b></label>'));
}

//Search Page
$('select[name="forums[]').attr('id', 'search_forums');

$('td:has(#namesearch)').prev('td:has(label[for="namesearch"])').find('label[for="namesearch"]').wrapInner('<span></span>').find('span').unwrap();
$('td:has(#sort_key)').prev('td:has(label[for="sort_key"])').find('label[for="sort_key"]').wrapInner('<span></span>').find('span').unwrap();
if ($('form:has(#namesearch)').length) {
    $('form:has(#namesearch)').html($('form:has(#namesearch)').html().replace('Filter by Member Name (optional)', '<label for="namesearch">Filter by Member Name (optional)</label>'));
}
if ($('form:has(#search_forums)').length) {
    $('form:has(#search_forums)').html($('form:has(#search_forums)').html().replace('Search Where', '<label for="search_forums">Search Where</label>'));
}

//Mod CP
$('select[name="mark').attr('id', 'mark');
$('select[name="ptype"]').attr('id', 'ptype');
$('select[name="search_string"]').attr('id', 'viewreport');

if ($('form:has(#dropdown)').length) {
    $('form:has(#dropdown)').html($('form:has(#dropdown)').html().replace('With Selected:', '<label for="dropdown">With Selected:</label>'));
}
if ($('form:has(#ptype)').length) {
    $('form:has(#ptype)').html($('form:has(#ptype)').html().replace('View:', '<label for="ptype">View:</label>'));
}
if ($('form:has(#viewreport)').length) {
    $('form:has(#viewreport)').html($('form:has(#viewreport)').html().replace('View:', '<label for="viewreport">View:</label>'));
}
if ($('.pformstrip > div:has(#mark)').length) {
    $('.pformstrip > div:has(#mark)').html($('.pformstrip > div:has(#mark)').html()
        .replace('With selected posts:', '<label for="mark">With selected posts:</label>')
        .replace('With selected reports:', '<label for="mark">With selected reports:</label>')
    );
}
