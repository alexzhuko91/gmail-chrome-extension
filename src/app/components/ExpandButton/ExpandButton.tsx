import React, { useEffect, useRef, useState } from "react";
import styles from "./ExpandButton.module.css";

export interface ExpandButtonProps {
  onExpand: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDrag: (offset: number) => void;
}

const settingsImageUrl = chrome.runtime.getURL("assets/settings.png");

const ExpandButton: React.FC<ExpandButtonProps> = ({ onExpand, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const offset = useRef(0);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsDragging(true);

    if (buttonRef.current) {
      const fixedOffset = 60;
      const { top } = buttonRef.current.getBoundingClientRect();
      offset.current = event.clientY - top + fixedOffset;
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      global.requestAnimationFrame(() => {
        if (isDragging) {
          onDrag(event.clientY - offset.current);
        }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    global.document.addEventListener("mousemove", handleMouseMove);
    global.document.addEventListener("mouseup", handleMouseUp);

    return () => {
      global.document.removeEventListener("mousemove", handleMouseMove);
      global.document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <button
      className={styles.root}
      type="button"
      onMouseDown={handleMouseDown}
      onClick={onExpand}
      ref={buttonRef}
    >
      <img className={styles.image} src={settingsImageUrl} draggable={false} />
    </button>
  );
};

export default ExpandButton;
