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
# @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")}}
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
// @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
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
// @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
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
// @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
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
* @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
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

    case "csharp":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
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

    case "go":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
// @returns {${starterReturnType}}

func ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key} ${arg.type}`).join(", ")
          : ""
      }) ${starterReturnType} {
  // Write your code here
}
`;

    // !-------------------------------

    case "kotlin":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")}}
// @returns {${starterReturnType}}

fun ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")
          : ""
      }): ${starterReturnType} {
  // Write your code here
}
`;

    // !-------------------------------

    case "ruby":
      return `
# @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")}}
# @returns {${starterReturnType}}

def ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}`).join(", ")
          : ""
      })
  # Write your code here
end
`;

    // !-------------------------------

    case "swift":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")}}
// @returns {${starterReturnType}}

func ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")
          : ""
      }) -> ${starterReturnType} {
  // Write your code here
}
`;

    // !-------------------------------

    case "rust":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")}}
// @returns {${starterReturnType}}

fn ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")
          : ""
      }) -> ${starterReturnType} {
  // Write your code here
}
`;

    // !-------------------------------

    case "scala":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")}}
// @returns {${starterReturnType}}

def ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")
          : ""
      }): ${starterReturnType} = {
  // Write your code here
}
`;

    // !-------------------------------

    case "perl":
      return `
    # @param {${starterVarArgs
      .map((arg) => `${arg.key}: ${arg.type}`)
      .join(", ")}}
    # @returns {${starterReturnType}}
    
    sub ${starterFunction} {
      my ($_) = @_;
      # Write your code here
    }
    `;

    // !-------------------------------

    case "r":
      return `
# @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")}}
# @returns {${starterReturnType}}

${starterFunction} <- function(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}`).join(", ")
          : ""
      }) {
  # Write your code here
}
`;

    // !-------------------------------

    case "lua":
      return `
-- @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join(", ")}}
-- @returns {${starterReturnType}}

function ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}`).join(", ")
          : ""
      })
  -- Write your code here
end
`;

    // !-------------------------------

    case "haskell":
      return `
-- @param {${starterVarArgs
        .map((arg) => `${arg.key} :: ${arg.type}`)
        .join(", ")}}
-- @returns {${starterReturnType}}

${starterFunction} :: ${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}`).join(" -> ")
          : ""
      } -> ${starterReturnType}
${starterFunction} ${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}`).join(" ")
          : ""
      } = do
  -- Write your code here
`;

    // !-------------------------------

    case "objectiveC":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
// @returns {${starterReturnType}}

+ (${starterReturnType})${starterFunction} ${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `:${arg.type}${arg.key}`).join(" ")
          : ""
      } {
  // Write your code here
}
`;

    // !-------------------------------

    case "pascall":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join("; ")}}
// @returns {${starterReturnType}}

function ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key}: ${arg.type}`).join("; ")
          : ""
      }): ${starterReturnType};
begin
  // Write your code here
end.
`;

    // !-------------------------------

    case "vb":
      return `
' @param {${starterVarArgs
        .map((arg) => `${arg.key} As ${arg.type}`)
        .join("; ")}}
' @returns {${starterReturnType}}

Function ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.key} As ${arg.type}`).join("; ")
          : ""
      }) As ${starterReturnType}
  ' Write your code here
End Function
`;

    // !-------------------------------

    case "dart":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
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

    case "groovy":
      return `
// @param {${starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")}}
// @returns {${starterReturnType}}

static ${starterReturnType} ${starterFunction}(${
        starterVarArgs.length > 0
          ? starterVarArgs.map((arg) => `${arg.type} ${arg.key}`).join(", ")
          : ""
      }) {
  // Write your code here
}
`;

    // !-------------------------------

    default:
      return "";
  }
};

export default returnStarter;
