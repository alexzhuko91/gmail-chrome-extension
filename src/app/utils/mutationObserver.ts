import { getGmailSettingsContainerSelector } from "./selectors";

export type IterationCallback = (node: Node) => boolean | void;

export const iterateNodeList = (
  nodeList: NodeList,
  callback: IterationCallback
) => {
  for (const node of nodeList) {
    const shouldBreak = callback(node);
    if (shouldBreak) break;
  }
};

export const iterateMutationRecords =
  (
    addedNodeHandler: IterationCallback,
    removedNodeHandler: IterationCallback
  ) =>
  (records: MutationRecord[]) => {
    for (const { addedNodes, removedNodes } of records) {
      iterateNodeList(addedNodes, addedNodeHandler);
      iterateNodeList(removedNodes, removedNodeHandler);
    }
  };

const getIsSettingsContainer = (element: HTMLElement) => {
  const settingsClassName = getGmailSettingsContainerSelector().replace(
    ".",
    ""
  );
  return element.classList.contains(settingsClassName);
};

export const isGmailSettingsContainerDecorator =
  (callback: IterationCallback) => (node: Node) => {
    const isSettingsContainer = getIsSettingsContainer(node as HTMLElement);
    if (isSettingsContainer) {
      callback(node);
    }
    return isSettingsContainer;
  };
