import { useEffect, useState } from "react";

const Logo = ({
  width = 24,
  height = 24,
}: {
  width?: number;
  height?: number;
}) => {
  const [fillColor, setFillColor] = useState<string>("black");

  useEffect(() => {
    const colorPalette = localStorage.getItem("colorPalette");
    if (colorPalette) {
      setFillColor(selectColor(colorPalette));
    }
  }, []);

  const selectColor = (color: string) => {
    switch (color) {
      case "zinc":
        return "hsl(240 5.9% 55%)";
      case "blue":
        return "hsl(221.2 83.2% 53.3%)";
      case "green":
        return "hsl(142.1 76.2% 36.3%)";
      case "orange":
        return "hsl(24.6 95% 53.1%)";
      case "rose":
        return "hsl(346.8 77.2% 49.8%)";
      case "purple":
        return "hsl(262.1 83.3% 57.8%)";
      case "yellow":
        return "hsl(47.9 95.8% 53.1%)";
      default:
        return "hsl(221.2 83.2% 53.3%)";
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 1500 314"
    >
      <g transform="matrix(1,0,0,1,-0.9090909090909918,-0.423942696466753)">
        <svg
          viewBox="0 0 396 83"
          data-background-color="#ffffff"
          preserveAspectRatio="xMidYMid meet"
          height="314"
          width="1500"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="tight-bounds"
            transform="matrix(1,0,0,1,0.2400000000000091,0.11206128600872489)"
          >
            <svg
              viewBox="0 0 395.52 82.77587742798254"
              height="82.77587742798254"
              width="395.52"
            >
              <g>
                <svg
                  viewBox="0 0 561.1612426951134 117.44188471547601"
                  height="82.77587742798254"
                  width="395.52"
                >
                  <g>
                    <rect
                      width="7.663553085142294"
                      height="101.97558730721504"
                      x="137.91603231902266"
                      y="7.733148704130485"
                      fill={fillColor}
                      opacity="1"
                      stroke-width="0"
                      stroke="transparent"
                      fill-opacity="1"
                      className="rect-qz-0"
                      data-fill-palette-color="primary"
                      rx="1%"
                      id="qz-0"
                      data-palette-color="#3c82f5"
                    ></rect>
                  </g>
                  <g transform="matrix(1,0,0,1,165.64124269511336,16.23111431306507)">
                    <svg
                      viewBox="0 0 395.52000000000004 84.97965608934587"
                      height="84.97965608934587"
                      width="395.52000000000004"
                    >
                      <g id="textblocktransform">
                        <svg
                          viewBox="0 0 395.52000000000004 84.97965608934587"
                          height="84.97965608934587"
                          width="395.52000000000004"
                          id="textblock"
                        >
                          <g>
                            <svg
                              viewBox="0 0 395.52000000000004 84.97965608934587"
                              height="84.97965608934587"
                              width="395.52000000000004"
                            >
                              <g transform="matrix(1,0,0,1,0,0)">
                                <svg
                                  width="395.52000000000004"
                                  viewBox="2.53 -31.67 195.85 42.09"
                                  height="84.97965608934587"
                                  data-palette-color="#3c82f5"
                                >
                                  <path
                                    d="M11.11 0.42L11.11 0.42Q8.33 0.42 6.09-0.69 3.85-1.81 2.53-3.4L2.53-3.4 3.68-8.19Q4.65-6.25 6.6-4.69 8.54-3.13 11.25-3.13L11.25-3.13Q13.72-3.13 15.33-4.69 16.94-6.25 16.94-8.54L16.94-8.54Q16.94-10.21 16.15-11.28 15.35-12.36 14.34-12.99 13.33-13.61 12.74-13.89L12.74-13.89 8.92-15.83Q8.02-16.32 6.68-17.19 5.35-18.06 4.34-19.58 3.33-21.11 3.33-23.54L3.33-23.54Q3.33-25.9 4.43-27.74 5.52-29.58 7.48-30.63 9.44-31.67 11.98-31.67L11.98-31.67Q14.48-31.67 16.39-30.78 18.3-29.9 19.38-28.96L19.38-28.96 18.23-24.17Q17.36-25.63 15.66-26.91 13.96-28.19 11.81-28.19L11.81-28.19Q9.72-28.19 8.47-26.96 7.22-25.73 7.22-23.92L7.22-23.92Q7.22-22.53 7.86-21.63 8.51-20.73 9.32-20.21 10.14-19.69 10.66-19.41L10.66-19.41 14.55-17.47Q15.24-17.12 16.3-16.49 17.36-15.87 18.4-14.84 19.44-13.82 20.14-12.34 20.83-10.87 20.83-8.78L20.83-8.78Q20.83-6.11 19.57-4.03 18.3-1.94 16.11-0.76 13.92 0.42 11.11 0.42ZM35.83 0.42L35.83 0.42Q32.78 0.42 30.28-1.04 27.78-2.5 26.28-4.97 24.79-7.43 24.79-10.42L24.79-10.42Q24.79-13.4 26.28-15.87 27.78-18.33 30.28-19.79 32.78-21.25 35.83-21.25L35.83-21.25Q38.09-21.25 40.07-20.45 42.05-19.65 43.54-18.33L43.54-18.33 42.39-13.61Q41.53-15.35 39.77-16.53 38.02-17.71 35.8-17.71L35.8-17.71Q33.78-17.71 32.13-16.72 30.48-15.73 29.51-14.08 28.54-12.43 28.54-10.42L28.54-10.42Q28.54-8.44 29.51-6.77 30.48-5.1 32.13-4.11 33.78-3.13 35.8-3.13L35.8-3.13Q38.02-3.13 39.77-4.27 41.53-5.42 42.39-7.22L42.39-7.22 43.54-2.5Q42.05-1.18 40.07-0.38 38.09 0.42 35.83 0.42ZM51.87 0L48.12 0 48.12-20.83 51.59-20.83 51.59-17.01Q52.7-18.85 54.54-19.95 56.38-21.04 58.92-21.04L58.92-21.04 59.86-17.29Q59.2-17.5 58.33-17.5L58.33-17.5Q55.41-17.5 53.64-15.64 51.87-13.78 51.87-10.35L51.87-10.35 51.87 0ZM67.49 0L63.74 0 63.74-20.83 67.49-20.83 67.49 0ZM65.62-24.58L65.62-24.58Q64.58-24.58 63.85-25.31 63.12-26.04 63.12-27.08L63.12-27.08Q63.12-28.16 63.85-28.87 64.58-29.58 65.62-29.58L65.62-29.58Q66.69-29.58 67.41-28.87 68.12-28.16 68.12-27.08L68.12-27.08Q68.12-26.04 67.41-25.31 66.69-24.58 65.62-24.58ZM77.91 10.42L74.16 10.42 74.16-20.83 77.63-20.83 77.63-18.09Q79.05-19.51 80.93-20.31 82.8-21.11 84.96-21.11L84.96-21.11Q87.84-21.11 90.18-19.67 92.52-18.23 93.93-15.8 95.34-13.37 95.34-10.42L95.34-10.42Q95.34-7.47 93.93-5.03 92.52-2.6 90.18-1.16 87.84 0.28 84.96 0.28L84.96 0.28Q82.91 0.28 81.1-0.45 79.3-1.18 77.91-2.47L77.91-2.47 77.91 10.42ZM84.47-3.13L84.47-3.13Q86.45-3.13 88.06-4.11 89.68-5.1 90.63-6.75 91.59-8.4 91.59-10.42L91.59-10.42Q91.59-12.43 90.63-14.08 89.68-15.73 88.06-16.72 86.45-17.71 84.47-17.71L84.47-17.71Q82.49-17.71 80.88-16.72 79.26-15.73 78.31-14.08 77.35-12.43 77.35-10.42L77.35-10.42Q77.35-8.4 78.31-6.75 79.26-5.1 80.88-4.11 82.49-3.13 84.47-3.13ZM106.72 0L102.97 0 102.97-17.71 98.25-17.71 98.25-20.83 103.08-20.83 103.08-27.78 106.62-27.78 106.62-20.83 111.79-20.83 111.79-17.71 106.72-17.71 106.72 0ZM125.68 0.42L125.68 0.42Q122.66 0.42 120.16-1.04 117.66-2.5 116.18-4.97 114.71-7.43 114.71-10.42L114.71-10.42Q114.71-13.44 116.18-15.89 117.66-18.33 120.16-19.79 122.66-21.25 125.68-21.25L125.68-21.25Q128.74-21.25 131.22-19.79 133.7-18.33 135.18-15.89 136.65-13.44 136.65-10.42L136.65-10.42Q136.65-7.43 135.18-4.97 133.7-2.5 131.22-1.04 128.74 0.42 125.68 0.42ZM125.68-3.13L125.68-3.13Q127.69-3.13 129.33-4.11 130.96-5.1 131.93-6.75 132.9-8.4 132.9-10.42L132.9-10.42Q132.9-12.43 131.93-14.08 130.96-15.73 129.33-16.72 127.69-17.71 125.68-17.71L125.68-17.71Q123.67-17.71 122.03-16.72 120.4-15.73 119.43-14.08 118.46-12.43 118.46-10.42L118.46-10.42Q118.46-8.4 119.43-6.75 120.4-5.1 122.03-4.11 123.67-3.13 125.68-3.13ZM145.61 10.42L141.86 10.42 141.86-20.83 145.33-20.83 145.33-18.09Q146.75-19.51 148.63-20.31 150.5-21.11 152.66-21.11L152.66-21.11Q155.54-21.11 157.88-19.67 160.23-18.23 161.63-15.8 163.04-13.37 163.04-10.42L163.04-10.42Q163.04-7.47 161.63-5.03 160.23-2.6 157.88-1.16 155.54 0.28 152.66 0.28L152.66 0.28Q150.61 0.28 148.8-0.45 147-1.18 145.61-2.47L145.61-2.47 145.61 10.42ZM152.17-3.13L152.17-3.13Q154.15-3.13 155.76-4.11 157.38-5.1 158.33-6.75 159.29-8.4 159.29-10.42L159.29-10.42Q159.29-12.43 158.33-14.08 157.38-15.73 155.76-16.72 154.15-17.71 152.17-17.71L152.17-17.71Q150.19-17.71 148.58-16.72 146.96-15.73 146.01-14.08 145.05-12.43 145.05-10.42L145.05-10.42Q145.05-8.4 146.01-6.75 146.96-5.1 148.58-4.11 150.19-3.13 152.17-3.13ZM171.99 0L168.24 0 168.24-20.83 171.99-20.83 171.99 0ZM170.12-24.58L170.12-24.58Q169.08-24.58 168.35-25.31 167.62-26.04 167.62-27.08L167.62-27.08Q167.62-28.16 168.35-28.87 169.08-29.58 170.12-29.58L170.12-29.58Q171.2-29.58 171.91-28.87 172.62-28.16 172.62-27.08L172.62-27.08Q172.62-26.04 171.91-25.31 171.2-24.58 170.12-24.58ZM187.58 0.28L187.58 0.28Q184.73 0.28 182.37-1.16 180.01-2.6 178.61-5.03 177.2-7.47 177.2-10.42L177.2-10.42Q177.2-13.37 178.61-15.8 180.01-18.23 182.37-19.67 184.73-21.11 187.58-21.11L187.58-21.11Q189.73-21.11 191.63-20.31 193.52-19.51 194.91-18.09L194.91-18.09 194.91-20.83 198.38-20.83 198.38 0 194.91 0 194.91-2.74Q193.52-1.35 191.63-0.54 189.73 0.28 187.58 0.28ZM188.07-3.13L188.07-3.13Q190.05-3.13 191.66-4.11 193.28-5.1 194.23-6.75 195.19-8.4 195.19-10.42L195.19-10.42Q195.19-12.43 194.23-14.08 193.28-15.73 191.66-16.72 190.05-17.71 188.07-17.71L188.07-17.71Q186.09-17.71 184.47-16.72 182.86-15.73 181.9-14.08 180.95-12.43 180.95-10.42L180.95-10.42Q180.95-8.4 181.9-6.75 182.86-5.1 184.47-4.11 186.09-3.13 188.07-3.13Z"
                                    opacity="1"
                                    transform="matrix(1,0,0,1,0,0)"
                                    fill={fillColor}
                                    className="wordmark-text-0"
                                    data-fill-palette-color="primary"
                                    id="text-0"
                                  ></path>
                                </svg>
                              </g>
                            </svg>
                          </g>
                        </svg>
                      </g>
                    </svg>
                  </g>
                  <g>
                    <svg
                      viewBox="0 0 117.85437502807426 117.44188471547601"
                      height="117.44188471547601"
                      width="117.85437502807426"
                    >
                      <g>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0.04199999999999804 24 23.916"
                          enable-background="new 0 0 24 24"
                          x="0"
                          y="0"
                          height="117.44188471547601"
                          width="117.85437502807426"
                          className="icon-icon-0"
                          data-fill-palette-color="accent"
                          id="icon-0"
                        >
                          <g fill={fillColor} data-fill-palette-color="accent">
                            <path
                              d="M20 20c-0.553 0-1-0.447-1-1v-15.958c0-0.552 0.447-1 1-1s1 0.448 1 1v15.958c0 0.553-0.447 1-1 1zM20 4.042c-0.553 0-1-0.448-1-1 0-0.551-0.448-1-1-1h-15c-0.552 0-1-0.448-1-1s0.448-1 1-1h15c1.654 0 3 1.346 3 3 0 0.552-0.447 1-1 1zM21 23.958c-0.553 0-1-0.447-1-1 0-0.552 0.447-1 1-1 0.552 0 1-0.448 1-1v-0.958h-13c-0.552 0-1-0.447-1-1 0-0.552 0.448-1 1-1h14c0.553 0 1 0.448 1 1v1.958c0 1.654-1.346 3-3 3zM7 23.958c-1.654 0-3-1.346-3-3 0-0.552 0.448-1 1-1s1 0.448 1 1 0.449 1 1 1 1-0.448 1-1v-1.958c0-0.552 0.448-1 1-1s1 0.448 1 1v1.958c0 1.654-1.346 3-3 3zM21 23.958h-14c-1.654 0-3-1.346-3-3v-14.958h-3c-0.552 0-1-0.448-1-1v-1.958c0-1.654 1.346-3 3-3s3 1.346 3 3v17.917c0 0.552 0.449 1 1 1h14c0.553 0 1 0.447 1 1 0 0.551-0.447 0.999-1 0.999z m-19-19.958h2v-0.958c0-0.551-0.449-1-1-1s-1 0.449-1 1v0.958zM16 11h-7c-0.552 0-1-0.448-1-1s0.448-1 1-1h7c0.553 0 1 0.448 1 1s-0.447 1-1 1zM16 7.06h-4c-0.55 0-1-0.45-1-1s0.45-1 1-1h4c0.55 0 1 0.45 1 1s-0.45 1-1 1z m-7 0c-0.55 0-1-0.45-1-1s0.45-1 1-1 1 0.45 1 1-0.45 1-1 1zM16 15h-7c-0.552 0-1-0.447-1-1s0.448-1 1-1h7c0.553 0 1 0.447 1 1s-0.447 1-1 1z"
                              fill={fillColor}
                              data-fill-palette-color="accent"
                            ></path>
                          </g>
                        </svg>
                      </g>
                    </svg>
                  </g>
                </svg>
              </g>
              <defs></defs>
            </svg>
            <rect
              width="395.52"
              height="82.77587742798254"
              fill="none"
              stroke="none"
              visibility="hidden"
            ></rect>
          </g>
        </svg>
      </g>
    </svg>
  );
};

export default Logo;
