const returnStarter = (
  language: string,
  starterFunction: string,
  starterVarArgs: [string]
) => {
  if (language === "python") {
    return `def ${starterFunction}(${starterVarArgs.join(", ")}):
    pass
`;
  } else if (language === "javascript") {
    return `function ${starterFunction}(${starterVarArgs.join(", ")}) {
    // Write your code here
}
`;
  }

  return "";
};

export default returnStarter;
