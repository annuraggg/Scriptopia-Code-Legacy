import { langs } from "@uiw/codemirror-extensions-langs";

const getExtension = (language: string) => {
  switch (language) {
    case "javascript":
      return langs.javascript({ jsx: true });
    case "python":
      return langs.python();
    case "java":
      return langs.java();
    case "c":
      return langs.c();
    case "cpp":
      return langs.cpp();
    case "csharp":
      return langs.csharp();
    case "go":
      return langs.go();
    case "kotlin":
      return langs.kotlin();
    case "ruby":
      return langs.ruby();
    case "swift":
      return langs.swift();
    case "typescript":
      return langs.typescript();
    case "rust":
      return langs.rust();
    case "scala":
      return langs.scala();
    case "perl":
      return langs.perl();
    case "r":
      return langs.r();
    case "lua":
      return langs.lua();
    case "haskell":
      return langs.haskell();
    case "objective-c":
      return langs.objectiveC();
    case "pascal":
      return langs.pascal();
    case "vbnet":
      return langs.vb();
    case "dart":
      return langs.dart();
    case "groovy":
      return langs.groovy();
    default:
      return langs.javascript({ jsx: true });
  }
};

export default getExtension;
