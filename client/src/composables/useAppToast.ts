import { useToast } from "primevue/usetoast";

type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

export function useAppToast() {
  const toast = useToast();

 const showToast = (severity: ToastSeverity, summary: string, detail: string) => {
    toast.add({ severity, summary, detail, life: 3000 });
  };

 
  const successToast = (summary: string, detail: string) => {
    showToast('success', summary, detail);
  };

  const errorToast = (summary: string, detail: string) => {
    showToast('error', summary, detail);
  };

 const infoToast = (summary: string, detail: string, life?: number) =>
    showToast('info', summary, detail)

  const warnToast = (summary: string, detail: string, life?: number) =>
    showToast('warn', summary, detail)


  return{
    successToast,
    errorToast,
    infoToast,
    warnToast
  };
}