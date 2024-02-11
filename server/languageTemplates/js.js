const runJS = (func, input) => {
  const realCode = `function main() { 
    let input = "${input}";
    let inputArr = input.split('\\n');
    let func = ${func};
    console.log(func(...inputArr))} main()`;

  return realCode;
};

export default runJS;
