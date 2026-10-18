export const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const normalize = (value: unknown): string => {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
};

export const truncate =(text: string, maxLength: number): string => {
  return text.length > maxLength
    ? `${text.slice(0, maxLength)}...`
    : text;
};

export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{3})(?=\d)/g, "$1 ");
};
