import { useToast } from "@/hooks/use-toast";

export const useToastAlert = () => {
  const { toast } = useToast();

  const showToast = (title: string, duration = 3000) => {
    toast({
      title,
      duration,
      variant: "destructive",
      className: "fixed bottom-5 z-50 max-h-screen w-full flex-col-reverse p-4 sm:left-[50%] sm:translate-x-[-50%] sm:flex-col md:max-w-[420px] bg-black text-white rounded-md border-black",
    });
  };

  return showToast;
};
