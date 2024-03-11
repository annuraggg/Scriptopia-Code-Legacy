const returnStarter = (
  language: string,
  starterFunction: string,
  starterVarArgs: { key: string; type: string }[]
) => {
  if (language === "python") {
    return `def ${starterFunction}(${starterVarArgs.join(", ")}):
    pass
`;
  } else if (language === "javascript") {
    return `/*
* @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
* @returns {any}
*/
    
function ${starterFunction}(${
      starterVarArgs.length > 0
        ? starterVarArgs.map((arg) => `${arg.key}`).join(", ")
        : ""
    }) {
  // Write your code here
}
`;
  }

  return "";
};

export default returnStarter;
