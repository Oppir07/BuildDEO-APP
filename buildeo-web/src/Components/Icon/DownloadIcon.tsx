
import { FC } from "react";

interface DownloadIconProps{
     width?:number,
     height?:number,
     color?:string,
}

const DownloadIcon: FC<DownloadIconProps>= ({width,height,color})=>(

     <svg  width={width} height={height}
     viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1_2618_4151" fill="white">
<path d="M0 12H21V20H0V12Z"/>
</mask>
<path d="M21 20V21.5C21.8284 21.5 22.5 20.8284 22.5 20H21ZM0 20H-1.5C-1.5 20.8284 -0.828427 21.5 0 21.5L0 20ZM19.5 12V20H22.5V12H19.5ZM21 18.5H0V21.5H21V18.5ZM1.5 20V12H-1.5V20H1.5Z" fill={color} mask="url(#path-1-inside-1_2618_4151)"/>
<path d="M13.7887 7.81641L10.5008 11.1043L7.21289 7.81641" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 1.89453V11.0108" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

export default DownloadIcon;
