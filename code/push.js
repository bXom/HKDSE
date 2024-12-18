const axios = require("axios");

// 封装请求函数
async function sendPostRequest(data) {
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
  if("pic" in data) delete data["pic"];
  if("no" in data) delete data["no"];
  console.log(`data: ${JSON.stringify(data)}`);
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
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

const dataSet = [];

// 遍历 dataSet 并发送请求
dataSet.forEach(data => {
  sendPostRequest(data);
});
