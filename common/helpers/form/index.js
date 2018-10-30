const path = require('path');
const fs = require('fs');
const xl = require('xlsx');
const schedule = require('node-schedule');
const Models = require(path.join(appRoot, '/models/index'));
const formEndJobArr = new Set();
const formStartJobArr = new Set();

class FormJob {
    constructor(formId, job, time) {
        this.formId = formId;
        this.job = job;
        this.time = time;
    }
}

async function makeForm(formName, formPath, formResultPath, beginTime, endTime) {
    try {
        //开始仅设置，不触发触发器的后续代码
        const formObj = {
            formName: formName,
            formPath: formPath,
            formResultPath: formResultPath,
            beginTime: beginTime,
            endTime: endTime,
            formStatus: 1
        };
        const result = await Models.stuForm.create(formObj);
        const formId = result.get('formId');
        let now = new Date();
        //进行任务设置（此次为初始化）
        if (beginTime > now) {
            setStartJob(formId, beginTime, now);
        }
        setEndJob(formId, endTime, now);
    }
    catch (e) {
        console.log(e.message);
        throw e;
    }
}

function setStartJob(formId, beginTime, now) {
    deleteFormJob(formStartJobArr, formId);
    if (beginTime < now)
        return 0;

    setFormStatus(formId, 0);
    let date = new Date(beginTime);
    let j = schedule.scheduleJob(date, () => {
        setFormStatus(formId, 1);
    });
    let endJob = new FormJob(formId, j, beginTime);
    formStartJobArr.add(endJob);
}

function setEndJob(formId, endTime, now) {
    deleteFormJob(formEndJobArr, formId);
    if (endTime < now){
        setFormStatus(formId,0);
        return 0;
    }
    setFormStatus(formId, 1);
    let date = new Date(endTime);
    let j = schedule.scheduleJob(date, () => {
        setFormStatus(formId, 0);
    });
    let endJob = new FormJob(formId, j, endTime);
    formEndJobArr.add(endJob);
}

function setFormStatus(formId, status) {
    const updateObj = {
        formStatus: status
    };
    const updateWhere = {
        where: {
            formId: formId
        }
    };
    return Models.stuForm.update(updateObj, updateWhere);
}

function deleteFormJob(formJobArr, formId) {
    for (let item of formJobArr) {
        if (item.formId === formId) {
            formJobArr.delete(item);
            break;
        }
    }
}

exports.makeForm = makeForm;
exports.setEndJob = setEndJob;
exports.setStartJob = setStartJob;