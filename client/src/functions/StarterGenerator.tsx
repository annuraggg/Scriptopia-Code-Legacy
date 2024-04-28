const returnStarter = (
  language: string,
  starterFunction: string,
  starterReturnType: string,
  starterVarArgs: {
    key: string;
    type: string | boolean | number | Array<never>;
  }[]
) => {
  switch (language) {
    case "javascript":
return `/*
* @param {${starterVarArgs
?.map((arg) => `${arg?.type} ${arg?.key}`)
?.join(", ")}}    
* @returns {${starterReturnType}}
*/
        
function ${starterFunction}(${
starterVarArgs?.length > 0
? starterVarArgs?.map((arg) => `${arg?.key}`)?.join(", ")
: ""
}) {
  // Write your code here
}
    `;

    // !-------------------------------

    case "python":
return `
# @param {${starterVarArgs
.map((arg) => `${arg.key}: ${arg.type}`)
.join(", ")}}
# @returns {${starterReturnType}}

def ${starterFunction}(${
starterVarArgs.length > 0
? starterVarArgs.map((arg) => `${arg.key}`).join(", ")
: ""
}):
  # Write your code here
`;

    // !-------------------------------

    case "java":
return `
// @param {${starterVarArgs
.map((arg) => `${arg.type} ${arg.key}`)
.join(", ")}}
// @returns {${starterReturnType}}

public static ${starterReturnType} ${starterFunction}(${
starterVarArgs.length > 0
? starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")
: ""
}) {
  // Write your code here
}
`;

    // !-------------------------------

    case "c":
return `
// @param {${starterVarArgs
.map((arg) => `${arg.type} ${arg.key}`)
.join(", ")}}
// @returns {${starterReturnType}}

${starterReturnType} ${starterFunction}(${
starterVarArgs.length > 0
? starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")
: ""
}) {
  // Write your code here
}
`;

    // !-------------------------------

    case "cpp":
      return `
// @param {${starterVarArgs
.map((arg) => `${arg.type} ${arg.key}`)
.join(", ")}}
// @returns {${starterReturnType}}

${starterReturnType} ${starterFunction}(${
starterVarArgs.length > 0
? starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")
: ""
}) {
  // Write your code here
}

`;

    // !-------------------------------

    case "typescript":
      return `
/*
* @param {${starterVarArgs
.map((arg) => `${arg.type} ${arg.key}`)
.join(", ")}}
* @returns {${starterReturnType}}
*/

function ${starterFunction}(${
starterVarArgs.length > 0
? starterVarArgs.map((arg) => `${arg.key}`).join(", ")
: ""
}: ${starterVarArgs
.map((arg) => `${arg.type}`)
.join(", ")}): ${starterReturnType} {
  // Write your code here
}
`;

    // !-------------------------------

    default:
      return "";
  }
};

export default returnStarter;
