$(function() {
    var forms = ["corsobaby", "corsobabyfantasy", "corsofantasy", "corsokidmom", "danzaclassica", "corsofun", "corsomoderno", "zumba", "step", "fitnessmusicale", "fitnessorientale", "pilates", "zumbatango", "salsacubanabachata", "salsacubanabachatafusion", "salsacubanabachatajunior", "danzastandard", "danzalatina", "corsiindividuali", "musical", "danzasportiva", "fitrelax"]
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var domain = "2";
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://mail.daniil.it/",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                    domain: domain
                },
                cache: false,
                success: function(data) {
                    $("#btnSubmit").attr("disabled", false);
                    if(data == "ok") {
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Il messaggio &egrave; stato inviato. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    } else {
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Scusa " + firstName + ", sembra che ci sia stato un errore. Prego riprova pi&ugrave; tardi!</strong>");
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                },
                error: function() {
                    $("#btnSubmit").attr("disabled", false);
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Scusa " + firstName + ", sembra che ci sia stato un errore. Prego riprova pi&ugrave; tardi!</strong>");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },


        filter: function() {
            return $(this).is(":visible");
        },
    });
    $.each(forms, function( index, value ) {
        $("#contact"+value+" input,#contact"+value+" textarea").jqBootstrapValidation({
            preventSubmit: true,
            submitError: function($form, event, errors) {
                // additional error messages or events
            },
            submitSuccess: function($form, event) {
                // Prevent spam click and default submit behaviour
                $("#btnSubmit"+value).attr("disabled", true);
                event.preventDefault();
                
                // get values from FORM
                var name = $("input#name"+value).val();
                var email = $("input#email"+value).val();
                var message = $("textarea#message"+value).val();
                var domain = "6";
                var fromform = value;
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }
                $.ajax({
                    url: "https://mail.daniil.it/",
                    type: "POST",
                    data: {
                        name: name,
                        email: email,
                        message: message,
                        fromform: fromform,
                        domain: domain
                    },
                    cache: false,
                    success: function(data) {
                        $("#btnSubmit"+value).attr("disabled", false);
                        if(data == "ok") {
                            // Success message
                            $('#success'+value).html("<div class='alert alert-success'>");
                            $('#success'+value+' > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success'+value+' > .alert-success')
                                .append("<strong>Il messaggio &egrave; stato inviato. </strong>");
                            $('#success'+value+' > .alert-success')
                                .append('</div>');
                            //clear all fields
                            $('#contact'+value).trigger("reset");
                        } else {
                            // Fail message
                            $('#success'+value).html("<div class='alert alert-danger'>");
                            $('#success'+value+' > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success'+value+' > .alert-danger').append("<strong>Scusa " + firstName + ", sembra che ci sia stato un errore. Prego riprova pi&ugrave; tardi!</strong>");
                            $('#success'+value+' > .alert-danger').append('</div>');
                            //clear all fields
                            $('#contact'+value).trigger("reset");
                        }
                    },
                    error: function() {
                        $("#btnSubmit"+value).attr("disabled", false);
                        // Fail message
                        $('#success'+value).html("<div class='alert alert-danger'>");
                        $('#success'+value+' > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success'+value+' > .alert-danger').append("<strong>Scusa " + firstName + ", sembra che ci sia stato un errore. Prego riprova pi&ugrave; tardi!</strong>");
                        $('#success'+value+' > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contact'+value).trigger("reset");
                    },
                })
            },


            filter: function() {
                return $(this).is(":visible");
            },
        });

    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
