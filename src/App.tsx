import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CodeEditor } from "./components/CodeEditor";
import { Preview } from "./components/Preview";
import { bundle } from "./bundler";
import { GlobalStyles } from "./styles/GlobalStyles";
import { startingCode, showDomError } from "./utils";
import { useDebounce } from "./hooks/useDebounce";

export const App = () => {
  const [input, setInput] = useState<string>(startingCode());
  const [code, setCode] = useState<string>("");
  const debouncedCode = useDebounce(input, 500);

  const runCode = async (unbundledCode: string) => {
    try {
      const bundledCode = await bundle(unbundledCode);
      setCode(bundledCode);
    } catch (error: any) {
      setCode(showDomError(error));
    }
  };

  useEffect(() => {
    runCode(debouncedCode);
  }, [debouncedCode]);

  return (
    <AppContainer>
      <GlobalStyles />
      <EditorPreviewContainer>
        <CodeEditor initialValue={input} onChange={setInput} />
        <Preview code={code} />
      </EditorPreviewContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const EditorPreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  height: 90%;
  width: 95%;
  margin: 2.5%;
  /* margin-top: 1.5%; */
  margin-bottom: 2%;
  margin-top: 2%;
  box-shadow: 1px 1px 4px black;
  position: relative;
  z-index: 20;
`;
