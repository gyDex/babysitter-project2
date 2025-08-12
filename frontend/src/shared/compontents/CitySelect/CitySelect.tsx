'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeCity } from "@/shared/api/parentApi";
import { useRouter } from "next/navigation";
import { useState } from "react";


type Props = {
  items: Item[],
  title: string | undefined,
}

type Item = {
  name: string
  id: string,
}

export const CitySelect:React.FC<Props> = ({items, title}) => {

  const [isOpen, setOpen] = useState(false) as any;    

  const router = useRouter()

  return (
    <Select  open={isOpen} onValueChange={async(e) => {
        await changeCity(e);
        window.location.reload()
    }} onOpenChange={() => setOpen((prev: boolean) => !prev)}>
        <SelectTrigger   className="border-none p-[0px] !text-[white]">
            <SelectValue className="!text-[white]" placeholder={title} />
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_591_10549)">
                    <path d="M8 5.5C8.29667 5.5 8.58668 5.58797 8.83336 5.7528C9.08003 5.91762 9.27229 6.15189 9.38582 6.42598C9.49935 6.70006 9.52906 7.00166 9.47118 7.29264C9.4133 7.58361 9.27044 7.85088 9.06066 8.06066C8.85088 8.27044 8.58361 8.4133 8.29264 8.47118C8.00167 8.52906 7.70007 8.49935 7.42598 8.38582C7.15189 8.27229 6.91762 8.08003 6.7528 7.83336C6.58797 7.58668 6.5 7.29667 6.5 7C6.5 6.60218 6.65804 6.22064 6.93934 5.93934C7.22065 5.65804 7.60218 5.5 8 5.5ZM8 4.5C7.50555 4.5 7.0222 4.64662 6.61108 4.92133C6.19995 5.19603 5.87952 5.58648 5.6903 6.04329C5.50108 6.50011 5.45157 7.00277 5.54804 7.48773C5.6445 7.97268 5.8826 8.41814 6.23223 8.76777C6.58187 9.1174 7.02732 9.3555 7.51228 9.45196C7.99723 9.54843 8.4999 9.49892 8.95671 9.3097C9.41353 9.12048 9.80397 8.80005 10.0787 8.38893C10.3534 7.9778 10.5 7.49445 10.5 7C10.5 6.33696 10.2366 5.70107 9.76777 5.23223C9.29893 4.76339 8.66304 4.5 8 4.5Z" fill="white"/>
                    <path d="M8 2.49997C9.17333 2.4839 10.3053 2.93297 11.1485 3.74902C11.9918 4.56507 12.4776 5.68174 12.5 6.85497C12.5003 7.79877 12.1853 8.71562 11.605 9.45997L8 14.73L4.425 9.49997C3.82547 8.7488 3.49927 7.81605 3.5 6.85497C3.52235 5.68174 4.00824 4.56507 4.85146 3.74902C5.69469 2.93297 6.82667 2.4839 8 2.49997ZM8 1.49997C6.56069 1.48128 5.17286 2.03484 4.14153 3.03898C3.11019 4.04312 2.51976 5.41568 2.5 6.85497C2.50126 8.01876 2.88809 9.14933 3.6 10.07L8 16.5L12.4 10.07C13.1119 9.14933 13.4987 8.01876 13.5 6.85497C13.4802 5.41568 12.8898 4.04312 11.8585 3.03898C10.8271 2.03484 9.43931 1.48128 8 1.49997Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_591_10549">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                    </defs>
                </svg>
        </SelectTrigger>
        <SelectContent className="select  !w-fit  right-[15px] z-[400] max-h-[300px] border-[#7C8092] border-[1px] rounded-[16px]">
            <SelectGroup className="">
            {
                items.map((item, i) => <>
                    <SelectItem key={i} className="!text-[#7C8092]  bg-transparent focus-within:!bg-transparent hover:!bg-transparent flex justify-between items-center" value={item.id}>
                        {item.name}
                    </SelectItem>
                </>)
            }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}