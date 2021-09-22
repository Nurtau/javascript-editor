import { SyntheticEvent } from "react";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import styled from "styled-components";
import "./styles.css";

interface ResizableProps {
  width: number;
  onResize: (event: SyntheticEvent, dimension: ResizeCallbackData) => void;
}

export const Resizable: React.FC<ResizableProps> = ({
  children,
  width,
  onResize,
}) => {
  return (
    <ResizableWrapper
      width={width}
      height={Infinity}
      axis="x"
      minConstraints={[window.innerWidth * 0.4, Infinity]}
      maxConstraints={[window.innerWidth * 0.7, Infinity]}
      onResize={onResize}
      resizeHandles={['e']}
    >
      {children}
    </ResizableWrapper>
  );
};

const ResizableWrapper = styled(ResizableBox)`
  height: 100%;
  /* flex: 3; */
  background: rgba(30, 30, 30);
  padding-top: 1rem;
  position: relative;
`;
