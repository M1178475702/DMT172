const path = require('path');
const fs = require('fs');
const xl = require('xlsx');
const schedule = require('node-schedule');
const StudentNumber = 37;

class Form {
    constructor(formId, formName, examplePath, resultPath,beginTime,endTime,maxSize) {
        this.formId = formId;
        this.name = formName;
        this.examplePath = path.join(appRoot,examplePath);
        this.resultPath = path.join(appRoot,resultPath);
        this.maxSize = maxSize||StudentNumber;
        this._data = [];

        this.s = schedule.scheduleJob(new Date(beginTime), () => {
            Form.begin.bind(this)();
        });
        this.e = schedule.scheduleJob(new Date(endTime), () => {
            Form.end.bind(this)();
        });

    }

    static usingFormList = [];

    static begin(){
        Form.usingFormList.push(this);
    }
    static  end(){
        Form.usingFormList.push(this)
    }


    push(pk, val) {
        let thePk = val[pk];
        for (let item of this._data) {
            if (item[pk] === thePk) {
                item = val;
                return 0;
            }
        }
        this._data.push(val);
    }

    delete(pk, val) {
        for (let i in this._data) {
            if (this._data[i][pk] === val) {
                delete this._data[i];
            }
        }
    }

    select(pk, val) {
        if (pk) {
            for (let i in this._data) {
                if (this._data[i][pk] === val) {
                    return this._data[i];
                }
            }
        }
        else {
            return this._data;
        }

    }

    export() {
        // if(this.maxSize < StudentNumber)
        //     throw new Error("表未填满");

        const sheets = xl.utils.json_to_sheet(data);
        let book = {
            SheetNames: ['sheet1'],
            Sheets: sheets
        };
        xl.writeFile(book, this.resultPath);
    }

    get size() {
        return this._data.length;
    }

    get isFull() {
        return this.size === this.maxSize;
    }
}

module.exports = Form;

let date= new Date("2018/10/30 1:01:04");
let j = schedule.scheduleJob(date,function () {
    console.log("a");
});

function makeForm(filePath)
{
    xl.readFile()
}
