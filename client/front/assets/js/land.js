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
                    {min: 10, max: 11, message: '长度在10个字符', trigger: 'blur'},
                ],
                stuName: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    {min: 2, max: 5, message: '长度在2到5个字符', trigger: 'blur'},
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
                        location.replace('/front/list')
                    }
                    else {

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