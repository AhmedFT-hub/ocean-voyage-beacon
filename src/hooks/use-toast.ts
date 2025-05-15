
import { toast as sonnerToast } from "sonner";
import { type ToastProps } from "@/components/ui/toast";

export function toast(props: ToastProps) {
  sonnerToast(props.title, {
    description: props.description,
  });
}

export const useToast = () => {
  return {
    toast: (props: ToastProps) => {
      sonnerToast(props.title, {
        description: props.description,
      });
    },
  };
};

export default { useToast, toast };
