import { useState } from "react";
import { App } from "antd";
import {
  downloadBlob,
  getFilenameFromDisposition,
  readBlobErrorMessage,
} from "@/utils/download";
import type { IFileResponse } from "@/interfaces/IApiResponse";

export const useExportExcel = <P,>(
  request: (params: P) => Promise<IFileResponse>,
  fallbackFilename: string,
) => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const exportExcel = async (params: P) => {
    setLoading(true);
    try {
      const { blob, disposition } = await request(params);
      downloadBlob(
        blob,
        getFilenameFromDisposition(disposition, fallbackFilename),
      );
      message.success("Reporte generado");
    } catch (error) {
      message.error(
        await readBlobErrorMessage(error, "No se pudo generar el reporte"),
      );
    } finally {
      setLoading(false);
    }
  };

  return { exportExcel, loading };
};
