const axios = require("axios");
// pic id write into picUUID.json
async function writeIntoFile(picArr) {
  const jsonFilePath = path.join(__dirname, 'picUUID.json');
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('读取文件失败:', err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      // 假设JSON结构中有一个数组，向数组中追加数据
      if (Array.isArray(jsonData)) {
        jsonData.push(picArr);
      }
      // 将更新后的JSON数据写回文件
      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('写入文件失败:', writeErr);
        }
      });
    } catch (parseErr) {
      console.error('解析JSON失败:', parseErr);
    }
  });
};
// 封装请求函数
async function sendPostRequest(paperNo, data, idArr) {
  if(!data["year"]) data["year"] = "";
  if(!data["category"]) data["category"] = "";
  if(!data["question_type"]) data["question_type"] = "";
  if(!data["question"]) data["question"] = "";
  if(!data["A"]) data["A"] = "";
  if(!data["B"]) data["B"] = "";
  if(!data["C"]) data["C"] = "";
  if(!data["D"]) data["D"] = "";
  if(!data["answer"]) data["answer"] = "";
  if(!data["analysis"]) data["analysis"] = "";
  if(!data["grade"]) data["grade"] = "";
  if(!data["question_context"]) data["question_context"] = "";
  if(!data["marks"]) data["marks"] = "";
  if("pic" in data) {
    if (data["pic"] === "1") {
      data["question"] = `#${data["no"]}@${paperNo}《${data["question"]}`;
    }
    delete data["pic"];
  }
  if("no" in data) delete data["no"];
  // console.log(`data: ${JSON.stringify(data)}`);
  const url = "https://www.hktrinityedu.com/service/saveaidata.ke";
  try {
    const response = await axios.post(url,
      { "id": "", data },
      {
        "headers": {
          "token": "",
          "Content-Type": "application/json",
        }
      }
    );
    if (data["question"].startsWith("#")) {
      console.log("pic Response:", response.data);
      idArr.push(response.data);
    }
    // else console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

const fs = require('fs');
const path = require('path');
const fileName = '19';
const jsonPath = path.join(__dirname, '../paper/simulation/economic/', fileName + '-1.json');
const dataSet = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
async function func() {
  let idArr = [];
  // 遍历 dataSet 并发送请求
  for (const data of dataSet) {
    await sendPostRequest(fileName, data, idArr);
  }
  console.log('idArr size: ', idArr.length);
  if (idArr && idArr.length != 0) writeIntoFile(idArr);
};
func();