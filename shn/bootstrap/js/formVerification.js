$(function () {
    var oDiv = $('.jz_zc .panel-body form');
    //验证手机号码
    oDiv.find("input[name='phone']").bind('blur', function () {
        var mobile = $.trim($(this).val());
        var phoneReg = /^0?1[3584][0-9][0-9]{8}$/;
        if (!phoneReg.test(mobile)) {
            $('.phone_error').css('display', 'block');
            return false;
        } else {
            $('.phone_error').css('display', 'none');
        }
    })

    //验证验证码
    oDiv.find("input[name='identifying_code']").bind('blur', function () {
        var ident = $.trim($(this).val());
        var identReg = /^0?[1-9][0-9]{5}$/;
        if (!identReg.test(ident)) {
            $('.ident_error').css('display', 'block');
            return false;
        } else {
            $('.ident_error').css('display', 'none');
        }
    })

    //验证密码
    oDiv.find("input[name='pass']").bind('blur', function () {
        var oVal = $.trim($(this).val());
        var passReg = /^0?[a-zA-Z0-9_]{6,18}$/;
        if (!passReg.test(oVal)) {
            $('.pass_error').css('display', 'block');
            return false;
        } else {
            $('.pass_error').css('display', 'none');
        }
    })

    //验证确认密码
    oDiv.find("input[name='confirm_pass']").bind('blur', function () {
        if ($(this).val() != oDiv.find("input[name='pass']").val() ) {
            $('.confirm_error').css('display', 'block');
            return false;
        } else {
            $('.confirm_error').css('display', 'none');
        }
    })
})