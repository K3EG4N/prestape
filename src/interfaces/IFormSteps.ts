import type { StepsProps } from "antd";

export interface IFormStepItem {
  title: string;
  content?: string;
}

export interface IFormStepsProps extends Omit<StepsProps, "items"> {
  items: IFormStepItem[];
}
