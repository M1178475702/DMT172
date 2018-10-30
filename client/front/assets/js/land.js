new Vue({
    el: '#land',
    delimiters: ['${', '}'],
    data() {
        return {
            ruleForm: {
                stuNo: "",
                stuName: ""
            },
            rules: {
                stuNo: [
                    {required: true, message: '请输入学号', trigger: 'blur'},
                    {min: 10, max: 11, message: '请输入正确学号', trigger: 'blur'},
                ],
                stuName: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    {min: 2, max: 5, message: '请输入正确姓名', trigger: 'blur'},
                ],
            }

        }
    },
    methods: {
        submitForm(formName) {
            var that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    that.land();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        clearInput: function () {
            this.stuNo = "";
            this.stuName = "";
        },
        land: function () {
            that = this;
            var data = {
                stuNo: that.ruleForm.stuNo,
                stuName: that.ruleForm.stuName
            }
            $.ajax({
                type: 'Post',
                url: FRONT_URL + "/auth/login",
                data: JSON.stringify(data),
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                success: function (resData) {
                    if (resData.retCode === API_SUCCEED_CODE) {
                        sessionStorage.stuName = resData.data.stuName;
                        location.replace('/front/list');
                    }
                    else {
                       location.replace('/front/falseLoad')
                    }
                },
                error: function (xhr, errorType, error) {
                },
                complete: function () {
                }

            })
        }

    }
});