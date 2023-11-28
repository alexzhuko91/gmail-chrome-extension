import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { ExpandButton, LayoutInfoItem, SettingsButton } from "./components";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  layoutSettingSelector,
  toggleIsSettingsOpened,
  updateDensity,
  updateInboxType,
  updateReadingPane,
} from "./redux/gmailExtensionSlice";
import { useMutationObserver } from "./hooks";
import {
  isGmailSettingsContainerDecorator,
  iterateMutationRecords,
  iterateNodeList,
} from "./utils/mutationObserver";
import {
  getGmailDensitySettingsSelector,
  getGmailInboxTypeSettingsSelector,
  getGmailReadingPaneSettingsSelector,
  getGmailSettingsParentContainerSelector,
} from "./utils/selectors";
import styles from "./App.module.css";

const App = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const appElementRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { density, inboxType, readingPane } = useAppSelector(
    layoutSettingSelector
  );
  const shouldDisplayCurrentLayout = density && inboxType && readingPane;

  const handleExpand = useCallback(() => {
    setIsExpanded((prevState) => !prevState);
  }, [setIsExpanded]);

  const handleDrag = useCallback((top: number) => {
    const container = appElementRef.current as HTMLDivElement;
    const { height } = container.getBoundingClientRect();
    const shouldUpdatePosition = top >= 0 && top + height <= global.innerHeight;

    if (shouldUpdatePosition) {
      container.style.top = `${top}px`;
    }
  }, []);

  useMutationObserver(
    iterateMutationRecords(
      isGmailSettingsContainerDecorator(() => {
        dispatch(toggleIsSettingsOpened());
      }),
      isGmailSettingsContainerDecorator((node) => {
        const element = node as Element;
        dispatch(toggleIsSettingsOpened());
        iterateNodeList(
          element.querySelectorAll(getGmailDensitySettingsSelector()),
          (node) => {
            const element = node as HTMLInputElement;
            const { ariaLabel, checked } = element;
            if (checked) {
              const image = element.nextElementSibling?.nextElementSibling
                ?.nextElementSibling as HTMLImageElement;
              const imageUrl = image.src;
              dispatch(updateDensity({ imageUrl, value: ariaLabel as string }));
            }
            return checked;
          }
        );
        iterateNodeList(
          element.querySelectorAll(getGmailInboxTypeSettingsSelector()),
          (node) => {
            const element = node as HTMLInputElement;
            const { ariaLabel, checked } = element;
            if (checked) {
              const image = element.nextElementSibling?.nextElementSibling
                ?.nextElementSibling as HTMLImageElement;
              const imageUrl = image.src;
              dispatch(
                updateInboxType({ imageUrl, value: ariaLabel as string })
              );
            }
            return checked;
          }
        );
        iterateNodeList(
          element.querySelectorAll(getGmailReadingPaneSettingsSelector()),
          (node) => {
            const element = node as HTMLInputElement;
            const { ariaLabel, checked } = element;
            if (checked) {
              const image = element.nextElementSibling?.nextElementSibling
                ?.nextElementSibling as HTMLImageElement;
              const imageUrl = image.src;
              dispatch(
                updateReadingPane({ imageUrl, value: ariaLabel as string })
              );
            }
            return checked;
          }
        );
      })
    ),
    getGmailSettingsParentContainerSelector(),
    { childList: true }
  );

  return (
    <div
      className={clsx(styles.root, isExpanded && styles.rootExpanded)}
      ref={appElementRef}
    >
      <div className={styles.container}>
        <ExpandButton onDrag={handleDrag} onExpand={handleExpand} />
        <div className={styles.layoutInfo}>
          {density && inboxType && readingPane ? (
            <div className={styles.layoutInfoItems}>
              <LayoutInfoItem type="density" />
              <LayoutInfoItem type="inboxType" />
              <LayoutInfoItem type="readingPane" />
            </div>
          ) : null}
          <span className={styles.layoutInfoLabel}>
            {shouldDisplayCurrentLayout
              ? "Current Gmail Layout"
              : "Open Setting to get Gmail layout info"}
          </span>
        </div>
        <SettingsButton />
      </div>
    </div>
  );
};

export default App;
