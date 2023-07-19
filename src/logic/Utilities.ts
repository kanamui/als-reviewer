export const randomizeArray = (
  sourceArray: any[],
  limit: number = 10
): any[] => {
  // Copy the source array
  const copiedArray = [...sourceArray];

  // Randomize the order of elements
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }

  // Truncate the array if its length is greater than 10
  if (copiedArray.length > limit) {
    copiedArray.length = limit;
  }

  return copiedArray;
};

export const trimHTML = (html: string): string => {
  if (!html) return "";
  return html.replaceAll(/<\/?([a-zA-Z]+\d*)\b[^>]*>/g, "");
};

export const isNumeric = (str: string) => {
  return /^\d+$/.test(str);
}

export const getHourDifference = (date1: Date, date2: Date) => {
  if (!(date1 && date2)) return 0;
  const timeDifferenceMs = date2.getTime() - date1.getTime();
  const timeDifferenceDays = timeDifferenceMs / (1000 * 60 * 60);
  return timeDifferenceDays;
}
