import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useUserSettings = () => {
  return useQuery<UserSettings>({
    queryKey: ["user-settings"],
    queryFn: async () => fetch("/api/user/settings").then((res) => res.json()),
  });
};
export default useUserSettings;
