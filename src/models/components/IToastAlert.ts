export interface IToastAlert {
  title: string;
  status: "success" | "error" | "info" | "warning";
  onClose?: () => void;
}
