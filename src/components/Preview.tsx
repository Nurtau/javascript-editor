import React, { useRef, useEffect } from "react";

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
    <>
      <iframe
        style={{ background: "white" }}
        ref={iframe}
        width={Infinity}
        sandbox="allow-scripts"
        title="preview"
        srcDoc={html}
      />
    </>
  );
};
