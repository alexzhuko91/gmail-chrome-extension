import React from "react";
import {
  ExtenstionState,
  densitySelector,
  inboxTypeSelector,
  readingPaneSelector,
} from "../../redux/gmailExtensionSlice";
import { useAppSelector } from "../../redux/hooks";
import styles from "./LayoutInfoItem.module.css";

export interface LayoutInfoItemProps {
  type: keyof Omit<ExtenstionState, "isSettingsOpened">;
}

const layoutSettingsMap = {
  density: {
    reduxSelector: densitySelector,
    title: "Density",
  },
  inboxType: {
    reduxSelector: inboxTypeSelector,
    title: "Inbox type",
  },
  readingPane: {
    reduxSelector: readingPaneSelector,
    title: "Reading pane",
  },
};

const LayoutInfoItem: React.FC<LayoutInfoItemProps> = ({ type }) => {
  const { reduxSelector, title } = layoutSettingsMap[type];
  const data = useAppSelector(reduxSelector);

  if (!data) {
    return null;
  }

  return (
    <div className={styles.root}>
      <span className={styles.title}>{title}</span>
      <img className={styles.image} src={data.imageUrl} />
      <span className={styles.value}>{data.value}</span>
    </div>
  );
};

export default LayoutInfoItem;
