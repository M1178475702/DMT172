/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stuFormData', {
    dataId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'data_id'
    },
    formId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: ' form_id'
    },
    stuNo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'stu_no'
    },
    dataContent: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'data_content'
    },
    putTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'put_time'
    }
  }, {
    tableName: 'stu_form_data'
  });
};
