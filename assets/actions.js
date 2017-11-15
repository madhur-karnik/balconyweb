var tStart = 0 // Start transition from top
  , tEnd = 3277   // End at 500px
  , cStart = [204, 0, 0]// [255, 99, 71]  // Gold
  , cEnd = [0, 0, 0]// [66, 66, 132]   // Lime
  , cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[1] - cStart[0]];

$(document).ready(function() {
    $(this).scrollTop(0);
    /*$(document).scroll(function() {
        var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
        p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
        var cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
        $("body").css('background-color', 'rgb(' + cBg.join(',') +')');
    });*/
	
    $("#txt-name").change(function() {
        $("#ig-name").removeClass("has-error");
    });

    $("#txt-mobile").change(function() {
        $("#ig-mobile").removeClass("has-error");
    });

    $("#txt-email").change(function() {
        $("#ig-email").removeClass("has-error");
    });
});

function sendInviteRequest(details) {
    $.ajax({
        url: "https://test.quikwallet.com/api/edenred/sendbcmail",
        header: {
            "Content-Type": "application/json"
        },
        method: "POST",
        data: details,
        dataType: "json",
        rejectUnauthorized:  false,
        crossDomain: true,
        error: function (res) {
            console.log("Error",res);
        },
        success: function (res) {
            $(".form-control").val('');
            $(".rbtn-chk").prop("checked",false);
            $("#submit-modal").show();
        }
    });
}

function validateInputs() {
    isValid = true;
    var name, email, mobile, gender;
    $(".err-mark").hide();
    name = $("#txt-name").val().trim();
    email = $("#txt-email").val().trim();
    mobile = $("#txt-mobile").val().trim();
    gender = $("input[name='rbtn-gender']:checked").val();
    tnc = $("#chk-tnc:checked").val();
    emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(name === '' || name.length < 3) {
        isValid = false;
        $("#ig-name").addClass("has-error");
    } else if(mobile === '' || isNaN(Number(mobile)) || mobile.length !== 10) {
        isValid = false;
        $("#ig-mobile").addClass("has-error");
    } else if(email === '' || !(emailRegEx.test(email))) {
        isValid = false;
        $("#ig-email").addClass("has-error");
    } else if(typeof gender === "undefined" || (gender !== 'M' && gender !== 'F')) {
        isValid = false;
        $("#err-gender").show();
    } else if(typeof tnc === "undefined") {
        isValid = false;
        $("#err-tnc").show();
    }

    if(isValid){
        details = {
            "name": name,
            "email": email,
            "mobile": mobile,
            "gender": gender
        };
        sendInviteRequest(details);
    }
}
