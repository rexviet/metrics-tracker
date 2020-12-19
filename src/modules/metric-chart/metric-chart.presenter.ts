import { MetricPresenter } from '../metric/metric.presenter';
import { IMetricChart, MetricChartViewRes } from './metric-chart.type';

export class MetricChartPresenter {
  public static formatMetricChartViewRes(
    metricChart: IMetricChart,
  ): MetricChartViewRes {
    return new MetricChartViewRes(
      MetricPresenter.formatMetricViewRes(metricChart.metric),
      metricChart.key,
      metricChart.userId,
      metricChart.type,
    );
  }
}
