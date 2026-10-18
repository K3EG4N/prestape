export interface IDisclosure {
  open: boolean;
  onClose: () => void;
  reload?: () => void;
}
