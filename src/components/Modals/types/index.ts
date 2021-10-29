export type ModalProps = {
  small?: boolean;
  large?: boolean;
  position?: "top" | "middle" | "bottom";
  onClose: () => void;
  hide: boolean;
  onUpdate: (value: any) => void;
  updateButtonLabel?: string;
};
