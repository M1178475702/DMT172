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
        }

    }
});
// document.write("<p style='color: red'>hi</p>");
