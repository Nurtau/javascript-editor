import { useRef } from "react";
import styled from "styled-components";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

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

  return (
    <ContainerWrapper>
      <EditorContainer>
        <MonacoEditor
          onMount={(editor, monaco) => (ref.current = editor)}
          onChange={onEditorChange}
          value={initialValue}
          height="100%"
          language="javascript"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 18,
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
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(30, 30, 30);
  padding-top: 1rem;
`;

const EditorContainer = styled.div`
  flex: 1;
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
`;
