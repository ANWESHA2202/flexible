import Image from "next/image";
import { MouseEventHandler } from "react";

type Props={
    title:string;
    type?:'button'|'submit';
    leftIcon?:string| null;
    isSubmitting?:boolean;
    rightIcon?:string| null;
    handleClick?:MouseEventHandler;
    bgColor?:string;
    textColor?:string;
}
const Button = ({title,type,leftIcon,rightIcon,isSubmitting,handleClick,bgColor,textColor}:Props) => {
  return (
    <button
        type={type||'button'}
        disabled={isSubmitting}
        onClick={handleClick}
        className={`flexCenter gap-3 px-4 py-3
        ${textColor?textColor:'text-white'}
        ${isSubmitting?'bg-black/50':bgColor?bgColor:'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full
        `}
    >
        {leftIcon && <Image
            src={leftIcon}
            alt='leftIcon'
            width={14}
            height={14}
        />}
        {title}
        {rightIcon && <Image
            src={rightIcon}
            alt='rightIcon'
            width={14}
            height={14}
        />}

    </button>
  )
}

export default Button