import React from "react";
import { getGmailOpenSettingsButtonSelector } from "../../utils/selectors";
import { useAppSelector } from "../../redux/hooks";
import { isSettingsOpenedSelector } from "../../redux/gmailExtensionSlice";
import styles from "./SettingsButton.module.css";

const BUTTON_TEXT = {
  OPEN: "Open Settings",
  CLOSE: "Close Settings",
};

const SettingsButton: React.FC = () => {
  const isSettingsOpened = useAppSelector(isSettingsOpenedSelector);

  const handleClick = () => {
    const settingsButton = global.document.querySelector(
      getGmailOpenSettingsButtonSelector()
    ) as HTMLElement;

    if (settingsButton) {
      settingsButton.click();
    }
  };

  return (
    <button className={styles.root} type="button" onClick={handleClick}>
      {isSettingsOpened ? BUTTON_TEXT.CLOSE : BUTTON_TEXT.OPEN}
    </button>
  );
};

export default SettingsButton;
