$(document).ready(function () {

    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
        
        if ($target.parent().is($('.wizard .nav-tabs li').eq(-2))) {
            $(".next-step").hide();
        } else {
            $(".next-step").show();
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        $active.addClass('completed');
        nextTab($active);

        if ($active.next().is($('.wizard .nav-tabs li').eq(-2))) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });

    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);
    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}