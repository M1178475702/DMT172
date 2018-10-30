new Vue({
    el: '#list',
    delimiters: ['${', '}'],
    data() {
        return {
            tableData: [],
        }
    },
    created() {
        this.listShow();
    },
    methods: {
        listShow: function () {
            var that = this;
            $.ajax({
                type: 'Get',
                url: FRONT_URL + "/form/getFormList",
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                success: function (resData) {
                    if (resData.retCode === API_SUCCEED_CODE) {
                        var reslist = resData.data.formList;
                        that.tableData = reslist;
                    }
                },
                error: function (xhr, errorType, error) {
                },
                complete: function () {
                }

            })
        },
        fillList: function (num) {
            location.replace('/front/details?formId=' + num);
        }
    }
});
document.write("Hi," + "<span style='color: #409EFF'>" + sessionStorage.stuName + "</span>" + "同学请尽快填写表格！！！");
