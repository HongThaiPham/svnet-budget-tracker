import { ComboboxCurencyItemType } from "@/types/ComboboxItem.type";
import { NavBarItemType } from "@/types/NavBarItem.type";

export const NAVBAR_ITEMS: NavBarItemType[] = [
  {
    label: "Dashboard",
    link: "/",
  },
  {
    label: "Transactions",
    link: "/transactions",
  },
  {
    label: "Manage",
    link: "/manage",
  },
];

export const CURRENCY_OPTIONS: ComboboxCurencyItemType[] = [
  {
    value: "VND",
    label: "₫ Viet Nam Dong",
    locale: "vi-VN",
  },
  {
    value: "USD",
    label: "$ Dollar",
    locale: "en-US",
  },
  {
    value: "EUR",
    label: "€ Euro",
    locale: "de-DE",
  },
  {
    value: "JPY",
    label: "¥ Yen",
    locale: "ja-JP",
  },
  {
    value: "GBP",
    label: "£ Pound",
    locale: "en-GB",
  },
];
