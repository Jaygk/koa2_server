/**
 * students.js 用户信息文件处理模块
 * 功能:
 *      对用户文件进行处理
 *      1.数据查询
 *      2.添加数据
 *      3.更新数据
 *      4.删除数据
 */
const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(__dirname, "./db.json");

/**
 * 查询用户
 */
exports.find = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      // console.log(data)
      resolve(JSON.parse(data).students);
    });
  });
};

/**
 * 添加用户
 */
exports.addData = (students, student) => {
  return new Promise((resolve, reject) => {
    function getID(length) {
      return Number(Math.random().toString() + Date.now())
        .toString(36)
        .substr(2, length);
    }

    student.id = getID(9);
    students.push(student);

    fs.writeFile(
      dbPath,
      JSON.stringify({
        students
      }),
      err => {
        if (err) {
          reject(err);
        }
        resolve(null);
      }
    );
  });
};

/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
// exports.findById = (students, id) => {
//   return new Promise(resolve => {
//     const ret = students.find(item => item.id === parseInt(id))
//     resolve(ret);
//   });
// };

/**
 * 更新用户信息
 */
exports.upload = (students, student) => {
  return new Promise((resolve, reject) => {
    // student.id = parseInt(student.id);

    const stu = students.find(item => item.id === student.id);

    // 遍历拷贝对象
    for (let key in student) {
      stu[key] = student[key];
    }

    // 把对象数据转换为字符串
    const fileData = JSON.stringify({
      students
    });

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        // 错误就是把错误对象传递给它
        reject(err);
      }
      // 成功就没错，所以错误对象是 null
      resolve(null);
    });
  });
};

/**
 * 删除用户
 */
exports.delete = (students, id) => {
  return new Promise((resolve, reject) => {
    // findIndex 方法专门用来根据条件查找元素的下标
    const index = students.findIndex(item => item.id === id);

    // 根据下标从数组中删除对应的学生对象
    students.splice(index, 1);

    fs.writeFile(
      dbPath,
      JSON.stringify({
        students
      }),
      err => {
        if (err) {
          reject(err);
        }
        resolve(null);
      }
    );
  });
};
