
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DayPicker } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import 'react-day-picker/dist/style.css'; // وارد کردن استایل‌های پیش‌فرض

interface DatePickerProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
}

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-right font-normal',
            !selected && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="ml-2 h-4 w-4" />
          {selected ? format(selected, 'PPP') : <span>انتخاب تاریخ</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DayPicker
          mode="single"
          selected={selected}
        //   onSelect={onSelect}
          initialFocus
          dir="rtl"
          formatters={{
            formatCaption: (month: Date | undefined) =>
              month
                ? [
                    'فروردین',
                    'اردیبهشت',
                    'خرداد',
                    'تیر',
                    'مرداد',
                    'شهریور',
                    'مهر',
                    'آبان',
                    'آذر',
                    'دی',
                    'بهمن',
                    'اسفند',
                  ][month.getMonth()]
                : 'انتخاب ماه',
            formatWeekdayName: (weekday: Date) =>
              ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][weekday.getDay()],
          }}
          labels={{
            labelPrevious: () => 'ماه قبلی',
            labelNext: () => 'ماه بعدی',
            labelDay: () => 'روز',
            labelMonthDropdown: () => 'انتخاب ماه',
            labelYearDropdown: () => 'انتخاب سال',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
