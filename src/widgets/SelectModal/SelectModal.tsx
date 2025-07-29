'use client'

import * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Props = {
  items: Item[]
  title: string
  className?: string,
  description?: boolean | string,
  callbackChange: (name: string) => void;
}

type Item = {
  name: string
  id: string
}

export function SelectModal({ items, title, className, callbackChange, description = false }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const triggerRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button ref={triggerRef}
          variant="outline"
          role="combobox"
          className={cn(
            `select !font-normal !w-full shadow-none !border-[1px] border-[#D4D4DD] w-full justify-between min-h-[60px] rounded-[16px] text-[18px] !text-[#D9D9D9] ${className}`
          )}
        >
          <div className='flex flex-col'>
            <span className={'font-[onest] leading-[18px] text-[14px] text-start  font-normal'}>
              {
                description && description
              }
            </span>
            <div>
              {
                value ? items.find((item) => item.id === value)?.name : title
              }
            </div>
          </div>
          {
            !open ?
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.56802 7.11381C5.07857 6.7311 4.37153 6.81762 3.98881 7.30708C3.6061 7.79653 3.69262 8.50357 4.18208 8.88629L9.30288 12.8904C9.70989 13.2086 10.2813 13.2087 10.6885 12.8906L15.8134 8.88656C16.303 8.50403 16.3898 7.79703 16.0073 7.30743C15.6248 6.81782 14.9178 6.73102 14.4282 7.11354L9.99613 10.5763L5.56802 7.11381Z" fill="#D9D9D9"/>
              </svg>

            :
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.56802 12.8862C5.07857 13.2689 4.37153 13.1824 3.98881 12.6929C3.6061 12.2035 3.69262 11.4964 4.18208 11.1137L9.30288 7.10963C9.70989 6.79138 10.2813 6.79126 10.6885 7.10935L15.8134 11.1134C16.303 11.496 16.3898 12.203 16.0073 12.6926C15.6248 13.1822 14.9178 13.269 14.4282 12.8865L9.99613 9.42373L5.56802 12.8862Z" fill="#D9D9D9"/>
            </svg>
            }
         
        </Button>
      </PopoverTrigger>
<PopoverContent
  style={{ width: triggerRef.current?.offsetWidth }}
  className={cn(
    'p-0 bg-white z-[1000] rounded-[16px] border-[#D4D4DD]',
    'max-h-[300px] overflow-hidden' // важно: скрыть переполнение здесь
  )}
>
  <Command className="w-full">
    {/* Фиксированный поиск */}
    <div className="sticky top-0 z-10 bg-white px-3 py-2 border-[#D4D4DD]">
      <CommandInput placeholder="Поиск..." />
    </div>

    <CommandEmpty className="px-3 py-2">Ничего не найдено</CommandEmpty>

    {/* Прокручиваемый список */}
    <div className="max-h-[250px] overflow-auto px-1">
      <CommandGroup>
        {items.map((item) => (
          <CommandItem
            className="text-[#7C8092] text-[16px] font-normal"
            key={item.id}
            value={item.name}
            onSelect={() => {
              setValue(item.id)
              callbackChange(item.name)
              setOpen(false)
            }}
          >
            {item.name}
            {value === item.id && (
              <Check className="ml-auto text-[#7C8092] h-4 w-4" />
            )}
          </CommandItem>
        ))}
      </CommandGroup>
    </div>
  </Command>
</PopoverContent>
    </Popover>
  )
}
