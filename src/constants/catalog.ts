import type {
  ICatalogTabOption,
  ICategory,
  IKit,
} from "@/interfaces/ICatalog";

export const CATALOG_TABS: ICatalogTabOption[] = [
  {
    label: "Equipos",
    value: "equipment",
    icon: "equipment",
    createLabel: "Crear equipo",
  },
  {
    label: "Categorías",
    value: "categories",
    icon: "categories",
    createLabel: "Crear categoría",
  },
  { label: "Kits", value: "kits", icon: "kits", createLabel: "Crear kit" },
];

export const KIT_VISIBLE_ITEMS = 2;

export const MOCK_KITS: IKit[] = [
  {
    id: 1,
    code: "KT-0001",
    serial: "KIT-PER-001",
    name: "Kit de periféricos",
    description: "Mouse y teclado inalámbricos para estación de trabajo",
    items: ["Mouse Logitech MX Master 3", "Teclado Logitech MX Keys"],
    available: true,
  },
  {
    id: 2,
    code: "KT-0002",
    serial: "KIT-FOT-001",
    name: "Kit de fotografía",
    description: "Todo lo necesario para una sesión de fotos",
    items: [
      "Cámara Canon EOS R6",
      "Trípode Manfrotto 190X",
      "Batería extra",
      "Tarjeta SD 128 GB",
    ],
    available: false,
  },
  {
    id: 3,
    code: "KT-0003",
    serial: "KIT-AUD-001",
    name: "Kit de grabación de audio",
    description: "Micrófono con accesorios para entrevistas",
    items: ["Micrófono Rode NTG4+", "Boom pole", "Cable XLR"],
    available: true,
  },
];

export const MOCK_CATEGORIES: ICategory[] = [
  {
    id: 1,
    name: "Fotografía",
    description: "Cámaras y lentes",
    equipmentCount: 8,
  },
  {
    id: 2,
    name: "Audio",
    description: "Micrófonos y grabadoras",
    equipmentCount: 5,
  },
  {
    id: 3,
    name: "Cómputo",
    description: "Laptops y tablets",
    equipmentCount: 12,
  },
  {
    id: 4,
    name: "Periféricos",
    description: "Mouse, teclados y monitores",
    equipmentCount: 9,
  },
  {
    id: 5,
    name: "Accesorios",
    description: "Trípodes, cables y baterías",
    equipmentCount: 20,
  },
];
