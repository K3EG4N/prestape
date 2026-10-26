import type {
  ICatalogTabOption,
  ICategory,
  IEquipment,
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

export const MOCK_EQUIPMENT: IEquipment[] = [
  {
    id: 1,
    code: "EQ-0001",
    serial: "CN-R6-0012",
    name: "Cámara Canon EOS R6",
    description: "Cámara mirrorless full frame de 20 MP",
    category: "Fotografía",
    available: true,
  },
  {
    id: 2,
    code: "EQ-0002",
    serial: "MF-190-0031",
    name: "Trípode Manfrotto 190X",
    description: "Trípode de aluminio con rótula 3D",
    category: "Accesorios",
    available: false,
  },
  {
    id: 3,
    code: "EQ-0003",
    serial: "RD-NTG-0007",
    name: "Micrófono Rode NTG4+",
    description: "Micrófono shotgun con batería recargable",
    category: "Audio",
    available: true,
  },
  {
    id: 4,
    code: "EQ-0004",
    serial: "DL-XPS-0104",
    name: "Laptop Dell XPS 15",
    description: "Intel i7, 16 GB RAM, 512 GB SSD",
    category: "Cómputo",
    available: true,
  },
  {
    id: 5,
    code: "EQ-0005",
    serial: "LG-MX3-0218",
    name: "Mouse Logitech MX Master 3",
    description: "Mouse inalámbrico ergonómico",
    category: "Periféricos",
    available: true,
  },
  {
    id: 6,
    code: "EQ-0006",
    serial: "LG-MXK-0144",
    name: "Teclado Logitech MX Keys",
    description: "Teclado inalámbrico retroiluminado",
    category: "Periféricos",
    available: true,
  },
];

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
