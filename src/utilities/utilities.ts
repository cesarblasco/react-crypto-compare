export const thousand = 1000;
export const million = 1000000;
export const billion = 1000000000;

export const generateRandomHexColor = (): string => {
  return "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 12)).toString(16);
  });
};

export const hexToRGBA = (hex: any, alpha: any): string => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255},${alpha})`;
  }
  throw new Error("Bad Hex");
};

export const transformNumberToReadableFormat = (
  number: number,
  hideUnit?: boolean
): string => {
  let newFormattedNumber = "0";

  if (number >= thousand && number < million) {
    newFormattedNumber = `${Number(number / thousand).toFixed(2)}${
      !hideUnit ? "k" : ""
    }`;
  } else if (number >= million && number < billion) {
    newFormattedNumber = `${Number(number / million).toFixed(2)}${
      !hideUnit ? "m" : ""
    }`;
  } else if (number >= billion) {
    newFormattedNumber = `${Number(number / billion).toFixed(2)}${
      !hideUnit ? "b" : ""
    }`;
  } else {
    newFormattedNumber = `${Number(number).toFixed(2)}`;
  }

  return newFormattedNumber;
};
