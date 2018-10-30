Vue.component('form-table', {
    props: ['list'],
    template:
        ' <el-form-item :label="list.cellName" prop="tableContent">' +
        '        <el-input v-model="list.value"></el-input>\n' +
        '        </el-form-item> '
});
new Vue({
    el: "#details",
    delimiter: ['${', '}'],
    data() {
        return {
            formTable: {},
            ruleForm:{tables:[]},
            rules: {
                tableContent: [
                    {required: false, message: '请输入内容', trigger: 'blur'},
                    {min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'}
                ],
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
                        var list=resData.data.columnList;
                        var newList=[];
                        for (var i=0;i<list.length;i++){
                            newList[i]={
                                id:i,
                                cellName:list[i],
                                value:''
                            }
                        }
                        console.log(newList);
                        that.ruleForm.tables = newList;
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
            var that=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    console.log(that.ruleForm.tables);
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