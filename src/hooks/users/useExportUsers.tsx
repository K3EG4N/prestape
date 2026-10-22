import { useState } from "react";
import { App } from "antd";
import { UserService } from "@/services/UserService";
import { buildUserFilterParams } from "@/utils/user";
import {
  downloadBlob,
  getFilenameFromDisposition,
  readBlobErrorMessage,
} from "@/utils/download";
import type { IUserFilters } from "@/interfaces/IUser";

export const useExportUsers = () => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const exportUsers = async (filters: IUserFilters) => {
    setLoading(true);
    try {
      const { blob, disposition } = await UserService.exportExcel(
        buildUserFilterParams(filters),
      );
      downloadBlob(
        blob,
        getFilenameFromDisposition(disposition, "usuarios.xlsx"),
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

  return { exportUsers, loading };
};
