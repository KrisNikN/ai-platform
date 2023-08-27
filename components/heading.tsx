import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const Heading = ({ description, icon: Icon, title, bgColor, iconColor }: HeadingProps) => {
  return (
    <div className='mb-8 flex items-center gap-x-3 px-4 lg:px-8'>
      <div className={cn("w-fit rounded-md p-2", bgColor)}>
        <Icon className={cn("h-10 w-10 ", iconColor)} />
      </div>
      <div>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
    </div>
  );
};

export default Heading;
