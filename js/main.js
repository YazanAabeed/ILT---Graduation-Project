(function ($) {

    var windowLocatio = window.location.href.split("/");

    var offset = $("#" + windowLocatio[windowLocatio.length - 1]).offset() || {top: 0};

    $('html, body').stop().animate({
        scrollTop: offset.top - 54
    }, 1500, 'easeInOutExpo');

    $('.page-scroll a').on('click',function(event) {

        event.preventDefault();

        var $anchor = $(this);

        var length = $anchor.attr('href').split("/").length;

        if ($anchor.attr('href').split("/")[length - 1].indexOf("profile") > -1 ) {
            return;
        }

        $('html, body').stop().animate({
            scrollTop: $("#" + $anchor.attr('href').split("/")[length - 1]).offset().top - 54
        }, 1500, 'easeInOutExpo');

        window.history.pushState({}, "", $anchor.attr('href'));
    });

    $('.search-icon').on('click', function (event) {
        var $parent = $(this).parent();

        var inputSearch = $parent.find('input');

        if (inputSearch.hasClass("shown")) {
            inputSearch.hide(200);
        } else {
            inputSearch.show(200);
        }

        inputSearch.toggleClass("shown");
    });

    $(document).mouseup(function (e) {

        var ele = $(".search-container").find('input');

        var isDisabled = ele.prop('disabled');

        if (!ele.is(e.target) && ele.has(e.target).length === 0 && !$(e.target).hasClass("search-icon") && !isDisabled) {
            ele.hide(200);
            ele.toggleClass("shown");
        }
    });

    $('#search-input').keypress(function (e) {
        var inputSearch = $(this);

        inputSearch.removeClass("error");

        if (e.which == 13) {
            if (inputSearch.val() == "") {
                inputSearch.addClass("error");
                return;
            }

            inputSearch.prop('disabled', true);

            setTimeout(function () {
                inputSearch.prop('disabled', false);
                window.location.href = "/assets/views/home/result.html";
            }, 1000);

            return false;
        }
    });



    $(document).on('submit', 'form', function(e) {
        alertify.dismissAll();

        e.preventDefault();
        var name = $.trim($('#InputName').val());
        var email = $.trim($('#InputEmail').val());
        var message = $.trim($('#InputMessage').val());
        var errors = [];

        if (name == '' || name == null) {
            $('#InputName').parent().addClass('has-error');
            $('#req1').addClass('show');
            errors.push(true);
        } else {
            $('#InputName').parent().removeClass('has-error');
            $('#req1').removeClass('show');
            $('#req1').addClass('hide');
            errors.push(false);
        }

        if (email == '' || email == null || !emailValidat(email)) {

            var errorText, reqText;

            errorText = 'Email please example@example.sth';
            reqText = 'Email Field Is requierd !';

            if (!emailValidat(email) && email != '' && email != null)
                $('#req2').text(errorText);
            else
                $('#req2').text(reqText);

            $('#InputEmail').parent().addClass('has-error');
            $('#req2').addClass('show');
            errors.push(true);
        } else {
            $('#InputEmail').parent().removeClass('has-error');
            $('#req2').removeClass('show');
            $('#req2').addClass('hide');
            errors.push(false);
        }

        if (message == '' || message == null) {
            $('#InputMessage').parent().addClass('has-error');
            $('#req3').addClass('show');
            errors.push(true);
        } else {
            $('#InputMessage').parent().removeClass('has-error');
            $('#req3').removeClass('show');
            $('#req3').addClass('hide');
            errors.push(false);
        }

        var errorNoti, errorAcord, success;

        errorNoti = "Error notification";

        if ($.inArray(true, errors) == -1) {
            var data = $('form').serialize();

            window.location = 'mailto:' + email + '?body=' + "Name: " + name + "%0AEmail: " + email + "%0AMessage:" + message;
        } else {
            alertify.notify(errorNoti, 'error', 10);
        }

    });

    var emailValidat = function(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };


    //Date for the calendar events (dummy data)
    var date = new Date();
    var d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear();

    //Calendar
    $('#calendar').fullCalendar({
        editable: true, //Enable drag and drop
        events: [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1),
                backgroundColor: "#3c8dbc", //light-blue
                borderColor: "#3c8dbc" //light-blue
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                backgroundColor: "#f39c12", //yellow
                borderColor: "#f39c12" //yellow
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                backgroundColor: "#0073b7", //Blue
                borderColor: "#0073b7" //Blue
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                backgroundColor: "#00c0ef", //Info (aqua)
                borderColor: "#00c0ef" //Info (aqua)
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                backgroundColor: "#00a65a", //Success (green)
                borderColor: "#00a65a" //Success (green)
            },
            {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/',
                backgroundColor: "#f56954", //red
                borderColor: "#f56954" //red
            }
        ],
        header: {
            left: 'title',
            center: '',
            right: 'prev,next'
        }
    });

    $('#inner-content-div').slimScroll({
        height: '450px',
        color: '#00A65A'
    });

    $('.knowledge-unit-body').find('.tab-pane').find('.tab-scroll').slimScroll({
        height: '135px',
        color: '#00A65A'
    });

    $('[data-toggle="tooltip"]').tooltip({
        'selector': '',
        'placement': 'top',
        'container':'body'
    });

})(jQuery);