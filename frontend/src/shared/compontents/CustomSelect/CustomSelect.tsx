'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { values } from "lodash";
import { useState } from "react";


type Props = {
  items: Item[],
  title: string | undefined,
  onChange: (e: any) => void,
  value: string,
}

type Item = {
  name: string
  id: string,
}

export const CustomSelect:React.FC<Props> = ({items, title, value, onChange}) => {

  const [isOpen, setOpen] = useState(false) as any;    

  return (
    <Select defaultValue={value} value={value}  onValueChange={onChange} open={isOpen} onOpenChange={() => setOpen((prev: boolean) => !prev)}>
      <SelectTrigger   className="select w-fit bg-[#FFFFFF] rounded-[16px] max-[425px]:!mb-[0px] max-[425px]:mt-[24px]">
        <SelectValue placeholder={title} />
        {
          !isOpen ?
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.432 7.11381C14.9214 6.7311 15.6285 6.81762 16.0112 7.30708C16.3939 7.79653 16.3074 8.50357 15.8179 8.88629L10.6971 12.8904C10.2901 13.2086 9.71866 13.2087 9.31153 12.8906L4.18657 8.88656C3.69697 8.50403 3.61016 7.79703 3.99269 7.30743C4.37521 6.81782 5.08221 6.73102 5.57182 7.11354L10.0039 10.5763L14.432 7.11381Z" fill="#46454E"/>
          </svg>
          :
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.56802 12.8862C5.07857 13.2689 4.37153 13.1824 3.98881 12.6929C3.6061 12.2035 3.69262 11.4964 4.18208 11.1137L9.30288 7.10963C9.70989 6.79138 10.2813 6.79126 10.6885 7.10935L15.8134 11.1134C16.303 11.496 16.3898 12.203 16.0073 12.6926C15.6248 13.1822 14.9178 13.269 14.4282 12.8865L9.99613 9.42373L5.56802 12.8862Z" fill="#46454E"/>
</svg>

        }
      </SelectTrigger>
      <SelectContent className="select min-w-[214px] border-[#7C8092] border-[1px] rounded-[16px]">
        <SelectGroup>
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

export default CustomSelect
