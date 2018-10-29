/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stuForm', {
    formId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'form_id'
    },
    formName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'form_name'
    },
    formPath: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'form_path'
    },
    formResultPath: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'form_result_path'
    },
    beginTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'begin_time'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_time'
    },
    formStatus: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      field: 'form_status'
    }
  }, {
    tableName: 'stu_form'
  });
};
