Vue.component('form-table', {
    props: ['list', 'tables'],
    template:
        ' <el-form-item :label="list.cellName" prop="tableContent">' +
        ' <el-input v-model="tables[list.cellName]" ></el-input>\n' +
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
        submitForm(formName) {
            var that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var data = that.ruleForm;
                    $.ajax({
                        type: 'Post',
                        url: FRONT_URL + "/form/putFormData",
                        data: JSON.stringify(data),
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        success: function (resData) {
                            if (resData.retCode === API_SUCCEED_CODE) {
                                alert("ok");
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
})