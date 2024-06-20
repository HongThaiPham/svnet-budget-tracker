"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ComboboxCurencyItemType } from "@/types/ComboboxItem.type";
import { CURRENCY_OPTIONS } from "@/lib/constants";
import useUserSettings from "@/hooks/use-user-settings";
import SkeletonWapper from "./commons/SkeletonWapper";
import useUpdateUserCurrency from "@/hooks/use-update-user-currency";
import { toast } from "sonner";
import { UserSettings } from "@prisma/client";

export default function CurrencyCombobox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<ComboboxCurencyItemType | null>(null);

  const userSettings = useUserSettings();

  React.useEffect(() => {
    if (!userSettings.data) return;
    setSelectedCurrency(
      CURRENCY_OPTIONS.find(
        (priority) => priority.value === userSettings.data.currency
      ) || null
    );
  }, [userSettings.data]);

  const mutation = useUpdateUserCurrency();

  const selecteOption = React.useCallback(
    (currency: ComboboxCurencyItemType | null) => {
      if (!currency) {
        toast.error("Please select a currency");
        return;
      }
      toast.loading("Updating currency...", {
        id: "update-currency",
      });

      mutation.mutate(currency.value, {
        onSuccess: (data: UserSettings) => {
          toast.success("Currency updated successfully", {
            id: "update-currency",
          });

          setSelectedCurrency(
            CURRENCY_OPTIONS.find(
              (priority) => priority.value === data.currency
            ) || null
          );
        },
        onError: (e) => {
          toast.error("Something went wrong, please try again", {
            id: "update-currency",
          });
        },
      });
    },
    [mutation]
  );

  if (isDesktop) {
    return (
      <SkeletonWapper isLoading={userSettings.isLoading}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start"
              disabled={mutation.isPending}
            >
              {selectedCurrency ? (
                <>{selectedCurrency.label}</>
              ) : (
                <>Set currency</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={selecteOption}
            />
          </PopoverContent>
        </Popover>
      </SkeletonWapper>
    );
  }

  return (
    <SkeletonWapper isLoading={userSettings.isLoading}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={mutation.isPending}
          >
            {selectedCurrency ? (
              <>{selectedCurrency.label}</>
            ) : (
              <>Set currency</>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <div className="mt-4 border-t">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={selecteOption}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWapper>
  );
}

function CurrencyList({
  setOpen,
  setSelectedCurrency,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrency: (currency: ComboboxCurencyItemType | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {CURRENCY_OPTIONS.map((currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value: string) => {
                setSelectedCurrency(
                  CURRENCY_OPTIONS.find(
                    (priority) => priority.value === value
                  ) || null
                );
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
