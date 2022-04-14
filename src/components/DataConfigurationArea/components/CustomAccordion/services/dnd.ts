import { colors } from "@dhis2/ui";

export const getDraggedDom = (draggableId: string) => {
  const domQuery = `[data-rbd-draggable-id='${draggableId}']`;
  return document.querySelector(domQuery);
};

export function getListStyle(isDragging: boolean) {
  return {
    background: isDragging ? colors.grey100 : "",
    width: "100%",
    height: "100%",
    border: isDragging ? `1px dashed ${colors.grey500}` : "none",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  };
}

export function dragUpdate(event: any): { top: number; left: number; width: number; height: number } | undefined {
  const draggedDOM = getDraggedDom(event.draggableId);

  const destinationIndex = event.destination.index;
  const sourceIndex = event.source.index;
  if (!draggedDOM) {
    return;
  }
  const { clientHeight, clientWidth } = draggedDOM;

  const childrenArray = [...(draggedDOM?.parentNode?.children ?? [])];
  const movedItem = childrenArray[sourceIndex];
  childrenArray.splice(sourceIndex, 1);

  const updatedArray = [...childrenArray.slice(0, destinationIndex), movedItem, ...childrenArray.slice(destinationIndex + 1)];

  const top =
    // @ts-ignore
    parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
    updatedArray.slice(0, destinationIndex).reduce((total, curr: any) => {
      const style = curr.currentStyle || window.getComputedStyle(curr);
      const marginBottom = parseFloat(style.marginBottom);
      return total + curr.clientHeight + marginBottom;
    }, 0);

  return {
    height: clientHeight,
    width: clientWidth,
    top,
    left: parseFloat(window.getComputedStyle(<Element>draggedDOM.parentNode).paddingLeft),
  };
}

export function dragStart(event: any): { top: number; left: number; width: number; height: number } | undefined {
  const draggedDOM = getDraggedDom(event.draggableId);
  if (!draggedDOM) {
    return;
  }
  const { clientHeight, clientWidth } = draggedDOM;

  const top =
    parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element).paddingTop) +
    [...(draggedDOM?.parentNode?.children ?? [])].slice(0, event.source.index).reduce((total, curr: any) => {
      const style = curr.currentStyle || window.getComputedStyle(curr);
      const marginBottom = parseFloat(style.marginBottom);
      return total + curr.clientHeight + marginBottom;
    }, 0);

  return {
    height: clientHeight,
    width: clientWidth,
    top,
    left: parseFloat(window.getComputedStyle(<Element>draggedDOM.parentNode).paddingLeft),
  };
}
