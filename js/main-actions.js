(function ($) {
    $('#knowledge-unit-section').find('[data-toggle="tooltip"]').on('click', function () {
        var ele = $(this);

        var id = ele.data('id');

        $('#learningObjectManagement')
            .unbind("show.bs.modal")
            .bind('show.bs.modal', function (e) {
                console.log("Call Api To bind data")
            })
            .modal({
                keyboard: false,
                backdrop: 'static'
            });
    });

    $("#add-new-knowledge-area")
        .on("click", function () {
            $('#learningObjectManagement')
                .unbind("show.bs.modal")
                .bind('show.bs.modal', function (e) {
                    console.log("Call Api To bind data")
                })
                .modal({
                    keyboard: false,
                    backdrop: 'static'
                });
        });

    $("#add_new_assessment")
        .on("click", function () {
            $('#assessmentsManagement')
                .unbind("show.bs.modal")
                .bind('show.bs.modal', function (e) {
                    console.log("Call Api To bind data")
                })
                .modal({
                    keyboard: false,
                    backdrop: 'static'
                });
        });

    $('.glyphicon-trash').on('click', function () {
        alertify.confirm("Remove this question","Are you sure you want to remove?", function(){
            alertify.success('Accepted');
        },function(){
            alertify.error('Declined');
        }).setting('labels',{'ok':'Accept', 'cancel': 'Decline'});
    });
})(jQuery);