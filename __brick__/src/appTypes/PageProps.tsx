import { RootParams, RootProps } from "@/appTypes/RootProps";

export interface HomePageParamsRoute extends RootParams {}
export interface HomePageParams extends HomePageParamsRoute {
  type: "homepage";
}
export interface HomePageProps extends RootProps {
  params: Promise<HomePageParamsRoute>;
}

export interface StaticDataPageParamsRoute extends RootParams {}
export interface StaticDataPageParams extends StaticDataPageParamsRoute {
  type: "static_data";
}
export interface StaticDataPageProps extends RootProps {
  params: Promise<StaticDataPageParamsRoute>;
}

export interface DynamicParamPageParamsRoute extends RootParams {
  param: string;
}

export interface DynamicParamPageParams extends DynamicParamPageParamsRoute {
  type: "dynamic_param";
}

export interface DynamicParamPageProps extends RootProps {
  params: Promise<DynamicParamPageParamsRoute>;
}

export interface ReactQueryPageParamsRoute extends RootParams {}

export interface ReactQueryPageParams extends ReactQueryPageParamsRoute {
  type: "react_query";
}

export interface ReactQueryPageProps extends RootProps {
  params: Promise<ReactQueryPageParamsRoute>;
}

export type PagesParams =
  | HomePageParams
  | StaticDataPageParams
  | DynamicParamPageParams
  | ReactQueryPageParams;
