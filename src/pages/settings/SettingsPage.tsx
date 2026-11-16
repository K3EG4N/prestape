import { useEffect } from "react";
import {
  Button,
  Empty,
  Flex,
  Form,
  InputNumber,
  Spin,
  Switch,
  TimePicker,
} from "antd";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { PageHeader } from "@/components/PageHeader";
import {
  EMPTY_SETTINGS_VALUES,
  SETTINGS_DAY_LABELS,
  SETTINGS_MINUTE_STEP,
  SETTINGS_TIME_FORMAT,
} from "@/constants/settings";
import { useSettings } from "@/hooks/settings/useSettings";
import { useUpdateSettings } from "@/hooks/settings/useUpdateSettings";
import { formatDateTime } from "@/utils/date";
import {
  settingsSchema,
  type SettingsSchema,
} from "@/schemas/settings/settings.schema";
import {
  getWeeklyHoursSummary,
  toSettingsFormValues,
  toUpdateSettingsRequest,
} from "@/utils/settings";
import { SettingsPanel } from "./components/SettingsPanel";
import { SettingsGroup } from "./components/SettingsGroup";
import { SettingsRow } from "./components/SettingsRow";

type DeadlineField =
  | "toleranceMinutes"
  | "maxDurationDays"
  | "minAdvanceHours"
  | "autoCancelHours";
type RoleLimitField = "maxEquipments" | "maxActiveLoans";

export const SettingsPage = () => {
  const { settings, loading, reload } = useSettings();
  const { updateSettings, loading: saving } = useUpdateSettings();
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: EMPTY_SETTINGS_VALUES,
    mode: "onTouched",
  });
  const [roleLimits, businessHours] = useWatch({
    control,
    name: ["roleLimits", "businessHours"],
  });

  useEffect(() => {
    if (settings) reset(toSettingsFormValues(settings));
  }, [settings, reset]);

  const submit = handleSubmit((data) =>
    updateSettings(toUpdateSettingsRequest(data), reload),
  );

  const renderDeadline = (
    name: DeadlineField,
    unit: string,
    min: number,
    max: number,
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputNumber<number>
          min={min}
          max={max}
          status={fieldState.error ? "error" : undefined}
          value={field.value ?? null}
          onChange={(value) => field.onChange(value)}
          onBlur={field.onBlur}
          suffix={unit}
          className="w-full!"
        />
      )}
    />
  );

  const renderLimit = (index: number, field: RoleLimitField, unit: string) => (
    <Controller
      name={`roleLimits.${index}.${field}`}
      control={control}
      render={({ field: input, fieldState }) => (
        <InputNumber<number>
          min={1}
          max={10}
          status={fieldState.error ? "error" : undefined}
          value={input.value ?? null}
          onChange={(value) => input.onChange(value)}
          onBlur={input.onBlur}
          suffix={unit}
          className="w-full!"
        />
      )}
    />
  );

  return (
    <section className="flex h-full min-h-0 flex-col gap-4">
      <div>
        <AppBreadcrumb />
        <PageHeader
          title="Configuración"
          text="Reglas de préstamo y horario de atención del laboratorio."
        />
      </div>

      {!settings ? (
        <Flex flex={1} align="center" justify="center">
          {loading ? (
            <Spin />
          ) : (
            <Empty description="No se pudo cargar la configuración">
              <Button onClick={reload}>Reintentar</Button>
            </Empty>
          )}
        </Flex>
      ) : (
        <Form
          layout="vertical"
          onFinish={submit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="grid items-start gap-3.5 xl:grid-cols-[minmax(0,1fr)_500px]">
              <SettingsPanel
                title="Préstamos"
                description="Plazos, tolerancia y cuánto puede solicitar cada rol."
                icon="loans"
              >
                <SettingsGroup title="Plazos y tolerancia">
                  <SettingsRow
                    title="Tolerancia de retraso"
                    description="Minutos de gracia antes de marcar una devolución como atrasada."
                    error={errors.toleranceMinutes?.message}
                  >
                    {renderDeadline("toleranceMinutes", "min", 0, 240)}
                  </SettingsRow>
                  <SettingsRow
                    title="Duración máxima"
                    description="Tiempo máximo entre el recojo y la devolución programados."
                    error={errors.maxDurationDays?.message}
                  >
                    {renderDeadline("maxDurationDays", "días", 1, 30)}
                  </SettingsRow>
                  <SettingsRow
                    title="Anticipación mínima"
                    description="Con cuánta anticipación se debe programar un recojo."
                    error={errors.minAdvanceHours?.message}
                  >
                    {renderDeadline("minAdvanceHours", "horas", 0, 72)}
                  </SettingsRow>
                  <SettingsRow
                    title="Cancelación automática"
                    description="Si no se recoge pasado este tiempo, se cancela y los equipos se liberan."
                    error={errors.autoCancelHours?.message}
                  >
                    {renderDeadline("autoCancelHours", "horas", 1, 72)}
                  </SettingsRow>
                </SettingsGroup>

                <SettingsGroup title="Límites por rol">
                  <div className="mt-1 overflow-hidden rounded-lg border border-stone-200">
                    <div className="grid grid-cols-[1fr_144px_144px] gap-4 bg-stone-50 px-4 py-2.5 text-[13px] font-medium text-stone-500">
                      <span>Rol</span>
                      <span>Equipos por préstamo</span>
                      <span>Préstamos activos</span>
                    </div>
                    {roleLimits.map((role, index) => (
                      <div
                        key={role.roleId}
                        className="grid grid-cols-[1fr_144px_144px] items-center gap-4 border-t border-stone-200 px-4 py-2.5"
                      >
                        <span className="text-sm font-medium text-stone-800">
                          {role.roleLabel}
                        </span>
                        {renderLimit(index, "maxEquipments", "equipos")}
                        {renderLimit(index, "maxActiveLoans", "activos")}
                      </div>
                    ))}
                  </div>
                </SettingsGroup>
              </SettingsPanel>

              <SettingsPanel
                title="Horario de atención"
                description="El recojo y la devolución solo se programan en este horario."
                icon="clock"
                footer={
                  <span className="text-[13px] text-stone-500">
                    {getWeeklyHoursSummary(businessHours)}
                  </span>
                }
              >
                <div className="-my-2 flex flex-col">
                  {businessHours.map((day, index) => (
                    <Controller
                      key={day.day}
                      name={`businessHours.${index}`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex justify-between h-13 items-center gap-3 border-b border-stone-100 last:border-b-0">
                          <div className="flex gap-4 items-center justify-center">
                            <Switch
                              size="small"
                              checked={field.value.open}
                              onChange={(open) =>
                                field.onChange({ ...field.value, open })
                              }
                            />
                            <span
                              className={`w-24 text-sm font-medium ${
                                field.value.open
                                  ? "text-stone-800"
                                  : "text-stone-400"
                              }`}
                            >
                              {SETTINGS_DAY_LABELS[field.value.day]}
                            </span>
                          </div>
                          {field.value.open ? (
                            <TimePicker.RangePicker
                              allowClear={false}
                              format={SETTINGS_TIME_FORMAT}
                              minuteStep={SETTINGS_MINUTE_STEP}
                              value={[
                                dayjs(
                                  field.value.opensAt,
                                  SETTINGS_TIME_FORMAT,
                                ),
                                dayjs(
                                  field.value.closesAt,
                                  SETTINGS_TIME_FORMAT,
                                ),
                              ]}
                              onChange={(range) => {
                                if (!range?.[0] || !range[1]) return;
                                field.onChange({
                                  ...field.value,
                                  opensAt:
                                    range[0].format(SETTINGS_TIME_FORMAT),
                                  closesAt:
                                    range[1].format(SETTINGS_TIME_FORMAT),
                                });
                              }}
                              className="ml-auto w-52"
                            />
                          ) : (
                            <span className="ml-auto text-sm text-stone-400">
                              Cerrado
                            </span>
                          )}
                        </div>
                      )}
                    />
                  ))}
                </div>
              </SettingsPanel>
            </div>
          </div>

          <Flex
            justify="space-between"
            align="center"
            gap={16}
            wrap
            className="mt-3.5 border-t border-stone-200 pt-3!"
          >
            <span className="text-[13px] text-stone-500">
              {errors.businessHours?.message ??
                errors.businessHours?.root?.message ??
                (settings.updatedBy
                  ? `Última modificación por ${settings.updatedBy} el ${formatDateTime(settings.updatedAt)}`
                  : "Configuración inicial del sistema")}
            </span>
            <Flex gap={8}>
              <Button disabled={!isDirty || saving} onClick={() => reset()}>
                Descartar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isDirty}
                loading={saving}
              >
                Guardar cambios
              </Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </section>
  );
};
