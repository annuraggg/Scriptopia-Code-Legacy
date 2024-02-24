const runJS = async (code, fnName, cases) => {
  const jsCode = createJSFunction(code, fnName, cases);
  const result = await fetchOutput(jsCode);

  return result;
};

const createJSFunction = (code, fnName, cases) => {
  let jsCodeString = "";
  jsCodeString += `${code}\n\n`;
  jsCodeString += `const resultArr = [];\n`;
  cases.forEach((testCase, index) => {
    jsCodeString += `
    resultArr.push(${fnName}(${JSON.stringify(...testCase.input)}));`;
  });
  jsCodeString += `console.log(resultArr);`;

  return jsCodeString;
};

const fetchOutput = async (code) => {
  try {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "js",
        input: "",
        code: code,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch output");
    }

    const data = await response.json();
    const dataObj = {
      timeStamp: data.timeStamp,
      status: data.status,
      output: convertStringToArray(data.output.trim()),
      error: data.error,
      language: data.language,
      info: data.info,
    };

    return dataObj;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function convertStringToArray(string) {
  var trimmedString = string.slice(1, -1);
  var array = trimmedString.split(",").map(function (item) {
    return item.trim().replace(/^'|'$/g, "");
  });

  return array;
}

export default runJS;
