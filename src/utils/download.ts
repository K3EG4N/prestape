export const getFilenameFromDisposition = (
  disposition: string | undefined,
  fallback: string,
): string => {
  const match = disposition?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  return match ? decodeURIComponent(match[1]) : fallback;
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const readBlobErrorMessage = async (
  error: unknown,
  fallback: string,
): Promise<string> => {
  const data = (error as { response?: { data?: unknown } })?.response?.data;
  if (!(data instanceof Blob)) return fallback;

  try {
    const body = JSON.parse(await data.text()) as { message?: string };
    return body.message ?? fallback;
  } catch {
    return fallback;
  }
};
