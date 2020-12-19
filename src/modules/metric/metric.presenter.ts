import { IMetric, MetricViewRes } from "./metric.type";

export class MetricPresenter {
  public static formatMetricViewRes(metric: IMetric): MetricViewRes {
    return new MetricViewRes(metric.id, metric.type, metric.value, metric.createdAt, metric.unit);
  }
}