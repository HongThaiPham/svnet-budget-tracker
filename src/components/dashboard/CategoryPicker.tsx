"use client";

import useCategories from "@/hooks/use-categories";
import { TransactionType } from "@/types/Transaction.type";
import { Category } from "@prisma/client";
import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import CategoryRow from "./CategoryRow";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { CommandGroup } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  type: TransactionType;
  onChange: (category: string) => void;
};

const CategoryPicker: React.FC<Props> = ({ type, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);
  const categories = useCategories(type);
  const selectedCategory = categories.data?.find(
    (category: Category) => category.name === selected
  );

  useEffect(() => {
    if (!selected) return;
    onChange(selected);
  }, [onChange, selected]);

  const onSuccessCallback = React.useCallback(
    (category: Category) => {
      setSelected(category.name);
      setOpen((prev) => !prev);
    },
    [setSelected, setOpen]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Select a category"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category ..." />
          <CreateCategoryDialog
            type={type}
            successCallback={onSuccessCallback}
          />
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: Create a new category
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categories.data?.map((category: Category) => (
                <CommandItem
                  key={category.name}
                  onSelect={() => {
                    setSelected(category.name);
                    setOpen((prev) => !prev);
                  }}
                >
                  <CategoryRow category={category} />
                  <Check
                    className={cn(
                      "mr-2 w-4 h-4 opacity-0",
                      selected === category.name && "opacity-100"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryPicker;
