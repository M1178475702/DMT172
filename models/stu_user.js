/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stuUser', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id'
    },
    stuName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'stu_name'
    },
    stuNo: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'stu_no'
    }
  }, {
    tableName: 'stu_user'
  });
};
