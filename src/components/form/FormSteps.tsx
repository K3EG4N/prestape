import { Steps } from "antd";
import type { StepsProps } from "antd";
import type { IFormStepsProps } from "@/interfaces/IFormSteps";

const stepsStyles: StepsProps["styles"] = {
  itemIcon: { borderRadius: "30%" },
  itemTitle: {
    fontWeight: "600",
    fontSize: "13px",
  },
  itemContent: {
    fontSize: "11px",
    color: "#888",
    fontStyle: "italic",
  },
};

export const FormSteps = ({ items, ...props }: IFormStepsProps) => {
  return (
    <Steps
      titlePlacement="vertical"
      styles={stepsStyles}
      {...props}
      items={items.map(({ title, content }) => ({ title, content }))}
    />
  );
};
