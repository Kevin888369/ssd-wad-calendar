import { LocalStorage, TDateCell } from "@utils/types";

export function getRandomColor(): string {
  const allEventColors = getAllLocalEvent().flatMap(dateCell => dateCell.events.map(event => event.color))
  // Generate random RGB values
  var r = Math.floor(Math.random() * 180);
  var g = Math.floor(Math.random() * 180);
  var b = Math.floor(Math.random() * 180);

  // Create a CSS color string using the RGB values
  var color = 'rgb(' + r + ',' + g + ',' + b + ')';

  if (allEventColors.includes(color)) {
    return getRandomColor()
  } else {
    return color
  }
}

export function getAllLocalEvent(): TDateCell[] {
  return typeof window !== "undefined" ? JSON.parse(localStorage.getItem(LocalStorage.E_LOCAL_EVENT) ?? "[]") : null
}

export function setAllLocalEvent(events: TDateCell[]) {
  localStorage.setItem(LocalStorage.E_LOCAL_EVENT, JSON.stringify(events))
}