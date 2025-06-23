
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const personTypes = [
  { value: 'individual', label: 'حقیقی' },
  { value: 'mosque', label: 'مسجد' },
  { value: 'heyat', label: 'هیئت' },
  { value: 'mawkab', label: 'موکب' },
  { value: 'public_institution', label: 'نهاد عمومی' },
  { value: 'hosseiniyeh', label: 'حسینیه' },
  { value: 'hotel', label: 'هتل' },
  { value: 'residence', label: 'اقامتگاه' },
  { value: 'imamzadeh', label: 'امام‌زاده' },
  { value: 'other', label: 'سایر' },
];

export default function RoleSelectionPage() {
  const [role, setRole] = useState<'guest' | 'host' | null>(null);
  const [hostForm, setHostForm] = useState({
    phone: '',
    nationalId: '',
    personType: '',
    otherTypeDescription: '',
    address: '',
    hasParking: '' as 'yes' | 'no' | '',
    parkingCount: '',
    capacity: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    accommodationType: 'family',
  });
  const [guestForm, setGuestForm] = useState({
    phone: '',
    nationalId: '',
    name: '',
    guests: '',
  });
  const [openCombobox, setOpenCombobox] = useState(false);
  const [isHostDialogOpen, setIsHostDialogOpen] = useState(false);
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const router = useRouter();

  const validateHostForm = () => {
    return (
      hostForm.phone &&
      hostForm.nationalId &&
      hostForm.personType &&
      (hostForm.personType !== 'other' || hostForm.otherTypeDescription) &&
      hostForm.address &&
      hostForm.hasParking &&
      (hostForm.hasParking !== 'yes' || hostForm.parkingCount) &&
      hostForm.capacity 
      
    //   hostForm.startDate &&
    //   hostForm.endDate
    );
  };

  const validateGuestForm = () => {
    return guestForm.phone && guestForm.nationalId && guestForm.name && guestForm.guests;
  };

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateHostForm()) {
      toast.error('لطفاً تمام فیلدها را پر کنید.', {
        description: 'همه فیلدهای فرم الزامی هستند.',
      });
      return;
    }
    setIsHostDialogOpen(true);
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGuestForm()) {
      toast.error('لطفاً تمام فیلدها را پر کنید.', {
        description: 'همه فیلدهای فرم الزامی هستند.',
      });
      return;
    }
    setIsGuestDialogOpen(true);
  };

  const handleHostVerify = () => {
    if (!verificationCode) {
      toast.error('لطفاً کد تأیید را وارد کنید.', {
        description: 'کد تأیید الزامی است.',
      });
      return;
    }
    console.log('فرم میزبان:', hostForm, 'کد تأیید:', verificationCode);
    setIsHostDialogOpen(false);
    setVerificationCode('');
    router.push('/success');
  };

  const handleGuestVerify = () => {
    if (!verificationCode) {
      toast.error('لطفاً کد تأیید را وارد کنید.', {
        description: 'کد تأیید الزامی است.',
      });
      return;
    }
    console.log('فرم مهمان:', guestForm, 'کد تأیید:', verificationCode);
    setIsGuestDialogOpen(false);
    setVerificationCode('');
    router.push('/success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        {/* انتخاب نقش */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-green-700 mb-4">انتخاب نقش</h1>
          <p className="text-lg text-gray-600 mb-6">لطفاً مشخص کنید که مهمان هستید یا میزبان</p>
          <RadioGroup
            value={role || ''}
            onValueChange={(value: 'guest' | 'host') => setRole(value)}
            className="flex justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="guest" id="guest" />
              <Label htmlFor="guest" className="text-lg text-gray-800 cursor-pointer">
                مهمان
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="host" id="host" />
              <Label htmlFor="host" className="text-lg text-gray-800 cursor-pointer">
                میزبان
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* فرم میزبان */}
        {role === 'host' && (
          <>
            <form
              onSubmit={handleHostSubmit}
              className="bg-white p-8 rounded-2xl shadow-lg space-y-6 animate-fade-in"
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-6">فرم میزبان</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-800">
                    شماره موبایل
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={hostForm.phone}
                    onChange={(e) => setHostForm({ ...hostForm, phone: e.target.value })}
                    placeholder="شماره موبایل"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalId" className="text-gray-800">
                    کد ملی
                  </Label>
                  <Input
                    id="nationalId"
                    value={hostForm.nationalId}
                    onChange={(e) => setHostForm({ ...hostForm, nationalId: e.target.value })}
                    placeholder="کد ملی"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personType" className="text-gray-800">
                    نوع شخص
                  </Label>
                  <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCombobox}
                        className="w-full justify-between text-right"
                      >
                        {hostForm.personType
                          ? personTypes.find((type) => type.value === hostForm.personType)?.label
                          : 'انتخاب نوع شخص'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="جستجوی نوع شخص..." className="text-right" />
                        <CommandEmpty>نوع شخصی یافت نشد.</CommandEmpty>
                        <CommandGroup>
                          {personTypes.map((type) => (
                            <CommandItem
                              key={type.value}
                              value={type.value}
                              onSelect={(currentValue) => {
                                setHostForm({ ...hostForm, personType: currentValue });
                                setOpenCombobox(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'ml-2 h-4 w-4',
                                  hostForm.personType === type.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {type.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {hostForm.personType === 'other' && (
                  <div className="space-y-2">
                    <Label htmlFor="otherTypeDescription" className="text-gray-800">
                      توضیحات سایر
                    </Label>
                    <Input
                      id="otherTypeDescription"
                      value={hostForm.otherTypeDescription}
                      onChange={(e) =>
                        setHostForm({ ...hostForm, otherTypeDescription: e.target.value })
                      }
                      placeholder="توضیحات نوع شخص"
                      className="text-right"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-800">
                    آدرس
                  </Label>
                  <Input
                    id="address"
                    value={hostForm.address}
                    onChange={(e) => setHostForm({ ...hostForm, address: e.target.value })}
                    placeholder="آدرس محل اقامت"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-800">پارکینگ</Label>
                  <RadioGroup
                    value={hostForm.hasParking}
                    onValueChange={(value: 'yes' | 'no') =>
                      setHostForm({
                        ...hostForm,
                        hasParking: value,
                        parkingCount: value === 'no' ? '' : hostForm.parkingCount,
                      })
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="parkingYes" />
                      <Label htmlFor="parkingYes" className="text-gray-800 cursor-pointer">
                        دارد
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="parkingNo" />
                      <Label htmlFor="parkingNo" className="text-gray-800 cursor-pointer">
                        ندارد
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                {hostForm.hasParking === 'yes' && (
                  <div className="space-y-2">
                    <Label htmlFor="parkingCount" className="text-gray-800">
                      تعداد پارکینگ
                    </Label>
                    <Input
                      id="parkingCount"
                      type="number"
                      value={hostForm.parkingCount}
                      onChange={(e) => setHostForm({ ...hostForm, parkingCount: e.target.value })}
                      placeholder="تعداد پارکینگ"
                      className="text-right"
                      min="1"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-gray-800">
                    ظرفیت (نفر)
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={hostForm.capacity}
                    onChange={(e) => setHostForm({ ...hostForm, capacity: e.target.value })}
                    placeholder="تعداد نفرات"
                    className="text-right"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-800">تاریخ شروع</Label>
                  <DatePicker
                    selected={hostForm.startDate}
                    onSelect={(date) => date && setHostForm({ ...hostForm, startDate: date })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-800">تاریخ پایان</Label>
                  <DatePicker
                    selected={hostForm.endDate}
                    onSelect={(date) => date && setHostForm({ ...hostForm, endDate: date })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-800">نوع اسکان</Label>
                  <RadioGroup
                    value={hostForm.accommodationType}
                    onValueChange={(value) =>
                      setHostForm({ ...hostForm, accommodationType: value })
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="family" id="family" />
                      <Label htmlFor="family" className="text-gray-800 cursor-pointer">
                        خانوادگی
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="text-gray-800 cursor-pointer">
                        انفرادی
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 !text-white hover:bg-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ارسال
              </Button>
            </form>

            {/* مدال تأیید برای میزبان */}
            <Dialog open={isHostDialogOpen} onOpenChange={setIsHostDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-right">وارد کردن کد تأیید</DialogTitle>
                  <DialogDescription className="text-right">
                    لطفاً کد تأیید ارسال‌شده به شماره موبایل خود را وارد کنید.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="verificationCode" className="text-right col-span-1">
                      کد تأیید
                    </Label>
                    <Input
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="col-span-3 text-right"
                      placeholder="کد تأیید"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsHostDialogOpen(false);
                      setVerificationCode('');
                    }}
                  >
                    لغو
                  </Button>
                  <Button
                    type="button"
                    className="bg-emerald-600 !text-white hover:bg-emerald-500"
                    onClick={handleHostVerify}
                  >
                    تأیید
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* فرم مهمان */}
        {role === 'guest' && (
          <>
            <form
              onSubmit={handleGuestSubmit}
              className="bg-white p-8 rounded-2xl shadow-lg space-y-6 animate-fade-in"
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-6">فرم مهمان</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-800">
                    شماره موبایل
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={guestForm.phone}
                    onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                    placeholder="شماره موبایل"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalId" className="text-gray-800">
                    کد ملی
                  </Label>
                  <Input
                    id="nationalId"
                    value={guestForm.nationalId}
                    onChange={(e) => setGuestForm({ ...guestForm, nationalId: e.target.value })}
                    placeholder="کد ملی"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-800">
                    نام و نام خانوادگی
                  </Label>
                  <Input
                    id="name"
                    value={guestForm.name}
                    onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                    placeholder="نام کامل"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-gray-800">
                    تعداد نفرات
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    value={guestForm.guests}
                    onChange={(e) => setGuestForm({ ...guestForm, guests: e.target.value })}
                    placeholder="تعداد مهمان‌ها"
                    className="text-right"
                    min="1"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 !text-white hover:bg-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ارسال
              </Button>
            </form>

            {/* مدال تأیید برای مهمان */}
            <Dialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-right">وارد کردن کد تأیید</DialogTitle>
                  <DialogDescription className="text-right">
                    لطفاً کد تأیید ارسال‌شده به شماره موبایل خود را وارد کنید.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="verificationCode" className="text-right col-span-1">
                      کد تأیید
                    </Label>
                    <Input
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="col-span-3 text-right"
                      placeholder="کد تأیید"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsGuestDialogOpen(false);
                      setVerificationCode('');
                    }}
                  >
                    لغو
                  </Button>
                  <Button
                    type="button"
                    className="bg-emerald-600 !text-white hover:bg-emerald-500"
                    onClick={handleGuestVerify}
                  >
                    تأیید
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}
