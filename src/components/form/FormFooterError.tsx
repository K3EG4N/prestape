export const FormFooterError = ({
  message,
}: {
  message: string | undefined;
}) => {
  return <span className="text-xs">{message}</span>;
};
