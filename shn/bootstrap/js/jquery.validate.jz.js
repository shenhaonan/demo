$(function () {
    $(".jzyd_nav .nav .list-group-item").hover(function () {
        $(".jzyd_nav .nav .list-group-item a").css("border-top", "1px dashed #cdcdcd");
        $(".jzyd_nav .list-group-item:first-child a").css("border-top", "1px dashed transparent");
        $(this).children("a").css("border-top", "1px dashed transparent");
        $(this).next().children("a").css("border-top", "1px dashed transparent");
    })
})
$().ready(function () {
    var validator = $("#signupForm").validate({
        rules: {
            phone: {
                required: true,
                minlength: 11,
                digits: true,
                isPhone: true
            },
            identifying_code: {
                required: true,
                minlength: 6,
                digits: true
            },
            user: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 18
            },
            confirm_pass: {
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            phone: {
                required: "手机号不能为空！",
                minlength: "请正确填写您的手机号！",
                digits: "请正确填写您的手机号！"
            },
            identifying_code: {
                required: "验证码不能为空！",
                minlength: "短信验证码错误！",
                digits: "验证码必须是数字！"
            },
            user: {
                required: "论坛名不能为空！",
                minlength: jQuery.validator.format("论坛名不能小于{0}个字符！")
            },
            password: {
                required: "密码不能为空！",
                minlength: "密码不能小于6个字符！",
                maxlength: "密码不能大于18个字符！"
            },
            confirm_pass: {
                required: "确认的密码不能为空！",
                equalTo: "两次输入的密码不相同！"
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        }
    });
    jQuery.validator.addMethod("isPhone", function (value, element) {
        var length = value.length;
        var mobile = /^(1\d{10})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码！");
});