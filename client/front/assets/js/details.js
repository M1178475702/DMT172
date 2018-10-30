Vue.component('form-table', {
    props: ['list', 'tables'],
    template:
        ' <el-form-item :label="list.cellName" prop="tableContent">' +
        ' <el-input v-model="tables[list.cellName]" placeholder="请填写内容" prefix-icon="el-icon-edit"></el-input>\n' +
        ' </el-form-item> '
});
new Vue({
    el: "#details",
    delimiter: ['${', '}'],
    data() {
        return {
            formTable: [],
            ruleForm: {},
            rules: {
                tableContent: [
                    {required: false, message: '请输入内容', trigger: 'blur'},
                    {min: 0, max: 3, message: '长度在 0 到 50 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this.showForm();
    },
    methods: {
        showForm: function () {
            var that = this;
            var formId = dt.getQueryString("formId");
            $.ajax({
                type: 'Get',
                url: FRONT_URL + "/form/getUserForm?formId=" + formId,
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                success: function (resData) {
                    if (resData.retCode === API_SUCCEED_CODE) {
                        var list = resData.data.columnList;
                        var newList = [];
                        for (var i = 0; i < list.length; i++) {
                            newList[i] = {
                                id: i,
                                cellName: list[i],
                            }
                            that.ruleForm[list[i]] = '';
                        }
                        that.formTable = newList;
                    } else {
                        console.log(resData.error);
                    }
                },
                error: function (xhr, errorType, error) {
                },
                complete: function () {
                }
            })
        },
        submitForm: function (formName) {
            var falg = false;
            var that = this;
            var formId = dt.getQueryString("formId");
            $.each(that.ruleForm, function (idx, obj) {
                if (obj === '') {
                    that.alertShow();
                    falg = true;
                    return false;
                }
            })
            if (falg === true) {
                return false;
            }

            this.$refs[formName].validate((valid) => {

                if (valid) {
                    var data = {
                        "formId": formId,
                        "dataContent": JSON.stringify(that.ruleForm)
                    }
                    console.log(data)
                    $.ajax({
                        type: 'Post',
                        url: FRONT_URL + "/form/putFormData",
                        data: JSON.stringify(data),
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        success: function (resData) {
                            if (resData.retCode === API_SUCCEED_CODE) {
                                location.replace('/front/success')
                            } else {
                                console.log(resData.error);
                            }
                        },
                        error: function (xhr, errorType, error) {
                        },
                        complete: function () {
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            // var that=this;
            // $.each(that.ruleForm, function (idx, obj) {
            //     console.log(that.ruleForm)
            //     alert(idx);
            //     obj='';
            //     }
            // )
            // that.ruleForm['序号']='';
            $('input').val('');
        },
        alertShow() {
            this.$notify({
                title: '警告',
                message: '必须全部填写才可以提交',
                type: 'warning'
            });
        },
    }
})