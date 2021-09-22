import React, { useState } from "react";
import styled from "styled-components";
import { CodeEditor } from "./components/CodeEditor";
import { Preview } from "./components/Preview";
import { bundle } from "./bundler";
import { GlobalStyles } from "./styles/GlobalStyles";
import { startingCode, showDomError } from "./utils";

export const App = () => {
  const [input, setInput] = useState<string>(startingCode());
  const [code, setCode] = useState<string>("");

  const onButtonClick = async () => {
    try {
      const bundledCode = await bundle(input);
      setCode(bundledCode);
    } catch (error: any) {
      setCode(showDomError(error));
    }
  };

  return (
    <AppContainer>
      <GlobalStyles />
      <EditorPreviewContainer>
        <CodeEditor initialValue={input} onChange={setInput} />
        <Preview code={code} />
      </EditorPreviewContainer>
      <div>
        <button type="submit" onClick={onButtonClick}>
          Submit
        </button>
      </div>
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
  margin-top: 3.5%;
  box-shadow: 1px 1px 3px black;
`;
