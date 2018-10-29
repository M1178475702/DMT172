new Vue({
    el: '#land',
    delimiters: ['${', '}'],
    data: {
        stuNo: "",
        stuName: ""
    },
    methods: {
        clearInput: function () {
            this.stuNo = "";
            this.stuName = "";
        },
        land: function () {
            that = this;
            var data = {
                stuNo: that.stuNo,
                stuName: that.stuName
            }
            console.log(data);
            $.ajax({
                type: 'Post',
                url: FRONT_URL + "/auth/login",
                data: JSON.stringify(data),
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                success: function (resData) {
                    if (resData.retCode === API_SUCCEED_CODE) {
location.replace('/land')
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