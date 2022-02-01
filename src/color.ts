import ColorThief from "colorthief";

export type StolenColor = {
  backGroundColor: string;
  contentColor: "black" | "white";
};

function getColor(url: string): Promise<StolenColor> {
  return new Promise((resolve) => {
    const colorThief = new ColorThief();
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      const pickedColor = colorThief.getColor(image);
      const contentColor =
        (pickedColor[1] * 587 + pickedColor[1] * 114 + pickedColor[2] * 144) /
          1000 >
        125
          ? "black"
          : "white";
      const color: StolenColor = {
        backGroundColor: rgbToHex(pickedColor),
        contentColor: contentColor,
      };
      return resolve(color);
    };
    image.src = url;
  });
}

function rgbToHex(rgb: [number, number, number]): string {
  return (
    "#" +
    rgb
      .map(function (value) {
        return ("0" + value.toString(16)).slice(-2);
      })
      .join("")
  );
}

export { getColor };
