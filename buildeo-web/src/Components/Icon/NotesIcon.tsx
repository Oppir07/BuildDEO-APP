import { FC } from "react";

interface NotesIconProps{
     width?:number,
     height?:number,
     color?:string,
}

const NotestIcon: FC<NotesIconProps>= ({width,height,color})=>(

     <svg  width={width} height={height}
     viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22H15.5C20.5 22 22.5 20 22.5 15V13" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M16.5399 3.02025L8.65988 10.9003C8.35988 11.2003 8.05988 11.7903 7.99988 12.2203L7.56988 15.2303C7.40988 16.3203 8.17988 17.0803 9.26988 16.9303L12.2799 16.5003C12.6999 16.4403 13.2899 16.1403 13.5999 15.8403L21.4799 7.96025C22.8399 6.60025 23.4799 5.02025 21.4799 3.02025C19.4799 1.02025 17.8999 1.66025 16.5399 3.02025Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M15.4102 4.15039C16.0802 6.54039 17.9502 8.41039 20.3502 9.09039" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>
);

export default NotestIcon;

