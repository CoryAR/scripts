// By Cory
// https://cory.jcink.net/

$(function() {
    var countryN = ['None', 'Afghanistan', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Denmark', 'Egypt', 'Ethiopia', 'France', 'Germany', 'Ghana', 'Greece', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Italy', 'Jamaica', 'Japan', 'Korea', 'Lebanon', 'Malaysia', 'Mexico', 'Morocco', 'Mozambique', 'Nepal', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Russia', 'Saudi Arabia', 'South Africa', 'Spain', 'Sudan', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'Uganda', 'Ukraine', 'United Kingdom', 'United States', 'Venezuela', 'Vietnam', 'Yemen'];
    var countryI = ['https://files.jcink.net/uploads/cory//None.png', 'https://files.jcink.net/uploads/cory//Afghanistan.png', 'https://files.jcink.net/uploads/cory//Algeria.png', 'https://files.jcink.net/uploads/cory//Argentina_Flag_32.png', 'https://files.jcink.net/uploads/cory//Australia_Flag_32.png', 'https://files.jcink.net/uploads/cory//Austria_Flag_32.png', 'https://files.jcink.net/uploads/cory//Belgium_Flag_32.png', 'https://files.jcink.net/uploads/cory//Brazil_Flag_32.png', 'https://files.jcink.net/uploads/cory//Canada_Flag_32.png', 'https://files.jcink.net/uploads/cory//Chile_Flag_32.png', 'https://files.jcink.net/uploads/cory//China_Flag_32.png', 'https://files.jcink.net/uploads/cory//Colombia.png', 'https://files.jcink.net/uploads/cory//Denmark_Flag_32.png', 'https://files.jcink.net/uploads/cory//Egypt.png', 'https://files.jcink.net/uploads/cory//Ethiopia.png', 'https://files.jcink.net/uploads/cory//France_Flag_32.png', 'https://files.jcink.net/uploads/cory//Germany_Flag_32.png', 'https://files.jcink.net/uploads/cory//Ghana.png', 'https://files.jcink.net/uploads/cory//Greece_Flag_32.png', 'https://files.jcink.net/uploads/cory//Hong_Kong_Flag_32.png', 'https://files.jcink.net/uploads/cory//India_Flag_32.png', 'https://files.jcink.net/uploads/cory//Indonesia.png', 'https://files.jcink.net/uploads/cory//Iran.png', 'https://files.jcink.net/uploads/cory//Iraq.png', 'https://files.jcink.net/uploads/cory//Ireland_Flag_32.png', 'https://files.jcink.net/uploads/cory//Italy_Flag_32.png', 'https://files.jcink.net/uploads/cory//Jamaica_Flag_32.png', 'https://files.jcink.net/uploads/cory//Japan_Flag_32.png', 'https://files.jcink.net/uploads/cory//Korea_Flag_32.png', 'https://files.jcink.net/uploads/cory//Lebanon_Flag_32.png', 'https://files.jcink.net/uploads/cory//Malaysia_Flag_32.png', 'https://files.jcink.net/uploads/cory//Mexico_Flag_32.png', 'https://files.jcink.net/uploads/cory//Morocco.png', 'https://files.jcink.net/uploads/cory//Mozambique.png', 'https://files.jcink.net/uploads/cory//Nepal.png', 'https://files.jcink.net/uploads/cory//Netherlands_Flag_32.png', 'https://files.jcink.net/uploads/cory//New_Zealand_Flag_32.png', 'https://files.jcink.net/uploads/cory//Nigeria.png', 'https://files.jcink.net/uploads/cory//Norway_Flag_32.png', 'https://files.jcink.net/uploads/cory//Pakistan.png', 'https://files.jcink.net/uploads/cory//Peru.png', 'https://files.jcink.net/uploads/cory//Philippines_Flag_32.png', 'https://files.jcink.net/uploads/cory//Poland_Flag_32.png', 'https://files.jcink.net/uploads/cory//Portugal_Flag_32.png', 'https://files.jcink.net/uploads/cory//Russia_Flag_32.png', 'https://files.jcink.net/uploads/cory//Saudi_Arabia.png', 'https://files.jcink.net/uploads/cory//South_Africa.png', 'https://files.jcink.net/uploads/cory//Spain_Flag_32.png', 'https://files.jcink.net/uploads/cory//Sudan.png', 'https://files.jcink.net/uploads/cory//Sweden_Flag_32.png', 'https://files.jcink.net/uploads/cory//Switzerland_Flag_32.png', 'https://files.jcink.net/uploads/cory//Taiwan_Flag_32.png', 'https://files.jcink.net/uploads/cory//Thailand_Flag_32.png', 'https://files.jcink.net/uploads/cory//Turkey_Flag_32.png', 'https://files.jcink.net/uploads/cory//Uganda.png', 'https://files.jcink.net/uploads/cory//Ukraine.png', 'https://files.jcink.net/uploads/cory//United_Kingdom_flag_32.png', 'https://files.jcink.net/uploads/cory//United_States.png', 'https://files.jcink.net/uploads/cory//Venezuela_Flag_32.png', 'https://files.jcink.net/uploads/cory//Vietnam_Flag_32.png', 'https://files.jcink.net/uploads/cory//Yemen.png'];

    $('span.country').each(function() {
        for (var x = 0; x < countryN.length; x++) {
            if (countryN[x] === $(this).text()) {
                $(this).html('<img src="' + countryI[x] + '" alt="' + countryN[x] + '" title="' + countryN[x] + '" />');
            }
        }
    });

    $('form[onsubmit*="ValidateProfile"] td.pformleft:contains(Country)').next('td').append('<a href="javascript: void(0);" id="countries-open">Choose Country</a><div id="countries" style="display: none"></div>');

    $('form[onsubmit*="ValidateProfile"] td.pformleft:contains(Country)').next('td').find('option').each(function() {
        $(this).parent('select').hide();

        for (var x = 0; x < countryN.length; x++) {
            if (countryN[x] === $(this).text()) {
                $('#countries').append('<img src="' + countryI[x] + '" alt="' + countryN[x] + '" title="' + countryN[x] + '" style="cursor: pointer; opacity: 0.5; display: inline-block; padding: 5px 10px" />');
            }
        }

        $('#countries-open').click(function() {
            var pos = $('#countries').position();
            $(window).scrollTop(pos.top);
            $(this).hide();
            $('#countries').fadeIn('slow');
        });

        $('#countries img').click(function() {
            $('#countries img').css('opacity', '0.5');
            $(this).css('opacity', '1.0');
            var index = $(this).attr('alt');
            $(this).parent('#countries').parent('td').find('select').val(index);
        });
    });

    var country = $('form[onsubmit*="ValidateProfile"] td.pformleft:contains(Country)').next('td').find('select').val();
    var nCountry = country;
    $('form[onsubmit*="ValidateProfile"] td.pformleft:contains(Country)').next('td').find('#countries img[alt="' + nCountry + '"]').css('opacity', '1.0');
});
