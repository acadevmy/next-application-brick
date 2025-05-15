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

export interface DynamicTimeZonePageParamsRoute extends RootParams {
  time_zone: string;
}

export interface DynamicTimeZonePageParams
  extends DynamicTimeZonePageParamsRoute {
  type: "dynamic_time_zone";
}

export interface DynamicTimeZonePageProps extends RootProps {
  params: Promise<DynamicTimeZonePageParamsRoute>;
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
  | DynamicTimeZonePageParams
  | ReactQueryPageParams;
