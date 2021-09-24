import { SyntheticEvent, useRef, useState } from "react";
import styled from "styled-components";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { ResizeCallbackData } from "react-resizable";
import { Resizable } from "./Resizable";

interface CodeEditorProps {
  initialValue: string;
  onChange: (input: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const ref = useRef<any>(null);
  const onEditorChange: OnChange = (value, event) => {
    if (value) {
      onChange(value);
      ref.current.getModel().setValue(value);
      ref.current
        .getModel()
        .forceTokenization(ref.current.getModel().getLineCount());
    }
  };

  const onFormatClick = () => {
    const formatted = prettier.format(initialValue, {
      parser: "babel",
      semi: true,
      bracketSpacing: false,
      plugins: [parser],
    });
    onChange(formatted.replace(/\n$/, ""));
  };

  const [width, setWidth] = useState<number>(window.innerWidth * 0.5);

  const onResize = (event: SyntheticEvent, { size }: ResizeCallbackData) => {
    setWidth(size.width);
    console.log(width);
  };
  const fontSize = width > 512 ? 17 : 15;
  return (
    <Resizable width={width} onResize={onResize}>
      <EditorContainer>
        <MonacoEditor
          onMount={(editor, monaco) => (ref.current = editor)}
          onChange={onEditorChange}
          value={initialValue}
          height="100%"
          language="javascript"
          theme="vs-dark"
          width="100%"
          options={{
            minimap: { enabled: false },
            fontSize: fontSize,
            fontLigatures: true,
            fontFamily: "monospace",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            folding: false,
            lineNumbersMinChars: 3,
            showUnused: false,
            tabSize: 2,
            automaticLayout: true,
          }}
        />
        <button onClick={onFormatClick}>Format</button>
      </EditorContainer>
    </Resizable>
  );
};

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  button {
    opacity: 0;
    position: absolute;
    right: 1.5rem;
    top: 0;
    padding: 0.5rem 1.2rem;
    background: none;
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 1px white;
    transition: all 0.3s ease;
    font-size: 15px;

    &:active {
      transform: translateY(-5%);
      box-shadow: 3px 3px 5px white;
    }
  }
  &:hover button {
    opacity: 1;
  }
  @media (max-width: 768px) {
    button {
      font-size: 12px;
      padding: 0.3rem 1.0rem;
      right: 0.8rem;
    }
  }
`;
