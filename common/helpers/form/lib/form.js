class Form {

    constructor(formName) {
       this.name = formName;
       this.data = [];
    }
    push(val){
        let stuNo = val.stuNo;
        for(let item of data)
        {
            if(item.stuNo === stuNo)
            {
                item = val;
                return 0;
            }
        }
        data.push(item);
    }



}