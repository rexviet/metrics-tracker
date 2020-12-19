import { Response } from 'express';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetMetricChartDto } from './metric-chart.dto';
import { MetricChartService } from './metric-chart.service';
import { GetMetricChartViewReq, MetricChartViewRes } from './metric-chart.type';
import { ISingleRes } from '../shared/response';
import { MetricChartPresenter } from './metric-chart.presenter';

@Controller('metrics-chart')
@ApiTags('metrics-chart')
@ApiBearerAuth()
export class MetricChartController {
  constructor(private readonly metricChartService: MetricChartService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get list metrics to draw chart' })
  public async getMetricsChart(
    @Query() query: GetMetricChartDto,
    @Res() res: Response,
  ) {
    const getChartReq = new GetMetricChartViewReq(
      query.userId,
      query.from,
      query.to,
      query.type,
      query.formatUnit,
    );
    const metricsChart = await this.metricChartService.getMetricsChart(
      getChartReq,
    );

    const resBody: ISingleRes<MetricChartViewRes[]> = {
      success: true,
      data: metricsChart.map(MetricChartPresenter.formatMetricChartViewRes),
    };

    return res.status(HttpStatus.OK).send(resBody);
  }
}
