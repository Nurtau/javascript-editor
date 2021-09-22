import React, { useRef, useEffect } from "react";
import styled from "styled-components";

interface PreviewProps {
  code: string;
}

const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					window.addEventListener("message", (event) => {
						try {
							document.body.innerHTML = "<div id='root'></div>";
							eval(event.data);
						} catch(err) {
              console.log(err.message);
							document.querySelector("#root").innerHTML = '<div style="color: red"><h3>Runtime Error</h3>' + err.message + '</div>';
						}
					})
				</script>
			</body>
			</html>
	`;

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    iframe.current?.contentWindow?.postMessage(code, "*");
  }, [code]);

  return (
    <PreviewWrapper>
      <IframeContainer
        className="preview-wrapper"
        style={{ background: "white" }}
        ref={iframe}
        width={Infinity}
        height={Infinity}
        sandbox="allow-scripts"
        title="preview"
        srcDoc={html}
      />
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled.div`
  height: 100%;
  position: relative;
  flex: 2;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
  }
`;

const IframeContainer = styled("iframe")`
  background: white;
  width: 100%;
  height: 100%;
  border: 0;
`;
