import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tabs,
  Typography,
} from "antd";
import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Field } from "@/components/ui/Field";
import { FormSelect } from "@/components/form/FormSelect";
import { FormDatePicker } from "@/components/form/FormDatePicker";
import { FormTextArea } from "@/components/form/FormTextArea";
import { FormFooterError } from "@/components/form/FormFooterError";
import { DATE_TIME_DISPLAY_FORMAT } from "@/constants/date";
import {
  CREATE_LOAN_DEFAULT_VALUES,
  LOAN_MAX_EQUIPMENTS,
  LOAN_MINUTE_STEP,
} from "@/constants/loan";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants/roles";
import { useAuthContext } from "@/context/useAuthContext";
import { useCreateLoan } from "@/hooks/loan/useCreateLoan";
import { useLoanOptions } from "@/hooks/loan/useLoanOptions";
import { useLendableEquipments } from "@/hooks/loan/useLendableEquipments";
import { useLoanRules } from "@/hooks/loan/useLoanRules";
import { buildCreateLoanSchema } from "@/schemas/loan/create.loan.schema";
import { hasAnyRole } from "@/utils/auth";
import {
  getBusinessDisabledTime,
  getSelectedLoanItems,
  isClosedDay,
} from "@/utils/loan";
import { LOAN_ITEM_COLUMNS } from "../columns/loanItemColumns";
import type { CreateLoanSchema } from "@/schemas/loan/create.loan.schema";
import type { IDisclosure } from "@/interfaces/IDisclosure";

export const CreateLoanModal = ({ open, onClose, reload }: IDisclosure) => {
  const { profile } = useAuthContext();
  const canManage = hasAnyRole(profile, [ADMIN_ROLE, SUPERVISOR_ROLE]);
  const { createLoan, loading } = useCreateLoan();
  const { options, loading: loadingOptions } = useLoanOptions(open, canManage);
  const { rules } = useLoanRules(open);
  const schema = useMemo(
    () => buildCreateLoanSchema(rules, canManage),
    [rules, canManage],
  );
  const {
    equipments,
    loading: loadingEquipments,
    search: searchEquipments,
    findByIds,
  } = useLendableEquipments(open);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLoanSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...CREATE_LOAN_DEFAULT_VALUES,
      requesterId: canManage ? undefined : profile?.userId,
    },
    mode: "onTouched",
  });
  const [requesterId, equipmentIds, kitId, scheduledPickupAt] = useWatch({
    control,
    name: ["requesterId", "equipmentIds", "kitId", "scheduledPickupAt"],
  });
  const businessHours = rules?.businessHours ?? [];
  const maxEquipments = rules?.maxEquipments ?? LOAN_MAX_EQUIPMENTS;
  const latestReturnDay = rules
    ? scheduledPickupAt?.add(rules.maxDurationDays, "day")
    : undefined;

  const requesterCode = canManage
    ? (options.requesters.find((requester) => requester.id === requesterId)
        ?.description ?? "")
    : (profile?.person?.code ?? "");
  const selectedEquipmentIds = equipmentIds ?? [];
  const selectedEquipments = findByIds(selectedEquipmentIds);
  const selectedKitEquipmentIds =
    options.kits
      .find((kit) => kit.id === kitId)
      ?.items.map((item) => item.id) ?? [];
  const equipmentOptions = [
    ...selectedEquipments,
    ...equipments.filter(
      (equipment) =>
        !selectedEquipmentIds.includes(equipment.id) &&
        !selectedKitEquipmentIds.includes(equipment.id),
    ),
  ];
  const kitOptions = options.kits.filter(
    (kit) =>
      kit.id === kitId ||
      !kit.items.some((item) => selectedEquipmentIds.includes(item.id)),
  );
  const selectedItems = getSelectedLoanItems(
    selectedEquipments,
    options.kits,
    kitId,
  );

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) =>
    createLoan(
      {
        requesterId: data.requesterId,
        equipmentIds: data.equipmentIds,
        kitId: data.kitId,
        scheduledPickupAt: data.scheduledPickupAt.toISOString(),
        scheduledReturnAt: data.scheduledReturnAt.toISOString(),
        notes: data.notes,
      },
      () => {
        reload?.();
        handleClose();
      },
    ),
  );

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={handleClose}>Cancelar</Button>
      <Button type="primary" onClick={submit} loading={loading}>
        Registrar
      </Button>
    </Flex>
  );

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      centered
      width={540}
      footer={footer}
    >
      <Typography.Title level={4}>Registrar préstamo</Typography.Title>
      <Typography.Paragraph type="secondary">
        El código del préstamo se genera automáticamente. Solo se muestran los
        equipos y kits disponibles para prestar.
      </Typography.Paragraph>

      <Form layout="vertical" onFinish={submit}>
        <div className="grid grid-cols-2 gap-x-4">
          {canManage ? (
            <FormSelect
              required
              control={control}
              name="requesterId"
              label="Solicitante"
              showSearch
              optionFilterProp="label"
              loading={loadingOptions}
              options={options.requesters.map((requester) => ({
                label: requester.name,
                value: requester.id,
              }))}
              size="middle"
            />
          ) : (
            <Field label="Solicitante">
              <Form.Item style={{ width: "100%" }}>
                <Input
                  disabled
                  value={profile?.person?.displayName ?? ""}
                  size="middle"
                />
              </Form.Item>
            </Field>
          )}
          <Field label="Código">
            <Form.Item style={{ width: "100%" }}>
              <Input disabled value={requesterCode} size="middle" />
            </Form.Item>
          </Field>

          <FormDatePicker
            required
            control={control}
            name="scheduledPickupAt"
            label="Fecha de recojo"
            showTime={{ format: "HH:mm", minuteStep: LOAN_MINUTE_STEP }}
            format={DATE_TIME_DISPLAY_FORMAT}
            disabledDate={(date) =>
              date.isBefore(dayjs(), "day") || isClosedDay(businessHours, date)
            }
            disabledTime={(date) =>
              getBusinessDisabledTime(businessHours, date)
            }
            size="middle"
          />
          <FormDatePicker
            required
            control={control}
            name="scheduledReturnAt"
            label="Fecha de devolución"
            showTime={{ format: "HH:mm", minuteStep: LOAN_MINUTE_STEP }}
            format={DATE_TIME_DISPLAY_FORMAT}
            disabledDate={(date) =>
              date.isBefore(scheduledPickupAt ?? dayjs(), "day") ||
              Boolean(
                latestReturnDay && date.isAfter(latestReturnDay, "day"),
              ) ||
              isClosedDay(businessHours, date)
            }
            disabledTime={(date) =>
              getBusinessDisabledTime(businessHours, date)
            }
            size="middle"
          />
        </div>

        <Tabs
          size="small"
          items={[
            {
              key: "equipments",
              label: "Equipos",
              children: (
                <Controller
                  name="equipmentIds"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="multiple"
                      maxCount={maxEquipments}
                      showSearch
                      filterOption={false}
                      onSearch={searchEquipments}
                      onOpenChange={(visible) => {
                        if (!visible) searchEquipments("");
                      }}
                      loading={loadingEquipments}
                      placeholder="Busca por nombre, código o serie"
                      notFoundContent="No se encontraron equipos disponibles"
                      options={equipmentOptions.map((equipment) => ({
                        label: `${equipment.name} · ${equipment.code}`,
                        value: equipment.id,
                      }))}
                      className="w-full"
                    />
                  )}
                />
              ),
            },
            {
              key: "kits",
              label: "Kits",
              children: (
                <Controller
                  name="kitId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      allowClear
                      showSearch
                      optionFilterProp="label"
                      loading={loadingOptions}
                      options={kitOptions.map((kit) => ({
                        label: `${kit.name} · ${kit.items.length} equipos`,
                        value: kit.id,
                      }))}
                      className="w-full"
                    />
                  )}
                />
              ),
            },
          ]}
        />

        <div className="mt-3 mb-4 flex flex-col gap-1">
          <Table
            size="small"
            rowKey="id"
            columns={LOAN_ITEM_COLUMNS}
            dataSource={selectedItems}
            pagination={false}
            locale={{ emptyText: "Seleccione equipos o kits para el préstamo" }}
          />
          <span className="text-(--ant-color-error)">
            <FormFooterError message={errors.equipmentIds?.message} />
          </span>
        </div>

        <FormTextArea
          showCount
          control={control}
          name="notes"
          label="Observaciones"
          autoSize={{ minRows: 2, maxRows: 4 }}
          size="middle"
          maxLength={255}
        />
      </Form>
    </Modal>
  );
};
