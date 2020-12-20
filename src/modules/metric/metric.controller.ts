import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AddDistanceMetricDto,
  AddMetricDto,
  AddTemperatureMetricDto,
  GetMetricsDto,
} from './metric.dto';
import { MetricService } from './metric.service';
import {
  AddMetricViewReq,
  GetMetricsViewReq,
  MetricViewRes,
} from './metric.type';
import { MetricType } from './metric.enum';
import { IListRes, ISingleRes } from '../shared/response';
import { MetricPresenter } from './metric.presenter';

@Controller('metrics')
@ApiTags('metrics')
@ApiBearerAuth()
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post('/distance')
  @ApiOperation({ summary: 'API for Distance Sensor add distance metric' })
  public async addDistance(
    @Body() body: AddDistanceMetricDto,
    @Res() res: Response,
  ) {
    const addMetricReq = new AddMetricViewReq(
      body.userId,
      MetricType.DISTANCE,
      body.value,
      body.unit,
      body.createdAt,
    );
    const metric = await this.metricService.addMetric(addMetricReq);
    const resBody: ISingleRes<MetricViewRes> = {
      success: true,
      data: MetricPresenter.formatMetricViewRes(metric),
    };

    return res.status(HttpStatus.CREATED).send(resBody);
  }

  @Post('/temperature')
  @ApiOperation({
    summary: 'API for Temperature Sensor add temperature metric',
  })
  public async addTemperature(
    @Body() body: AddTemperatureMetricDto,
    @Res() res: Response,
  ) {
    const addMetricReq = new AddMetricViewReq(
      body.userId,
      MetricType.TEMPERATURE,
      body.value,
      body.unit,
      body.createdAt,
    );
    const metric = await this.metricService.addMetric(addMetricReq);
    const resBody: ISingleRes<MetricViewRes> = {
      success: true,
      data: MetricPresenter.formatMetricViewRes(metric),
    };

    return res.status(HttpStatus.CREATED).send(resBody);
  }

  @Post('')
  @ApiOperation({ summary: 'API for user add metric' })
  public async addMetric(@Body() body: AddMetricDto, @Res() res: Response) {
    const addMetricReq = new AddMetricViewReq(
      body.userId,
      body.type,
      body.value,
      body.unit,
      body.createdAt,
    );
    const metric = await this.metricService.addMetric(addMetricReq);
    const resBody: ISingleRes<MetricViewRes> = {
      success: true,
      data: MetricPresenter.formatMetricViewRes(metric),
    };

    return res.status(HttpStatus.CREATED).send(resBody);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get list metrics' })
  public async getMetrics(@Query() query: GetMetricsDto, @Res() res: Response) {
    const getMetricsReq = new GetMetricsViewReq(
      query.userId,
      query.type,
      query.from,
      query.to,
      query.formatUnit,
      query.sortField,
      query.order,
      query.offset,
      query.limit,
    );
    const listMetrics = await this.metricService.getMetrics(getMetricsReq);

    const resBody: IListRes<MetricViewRes> = {
      success: true,
      data: listMetrics.data.map(MetricPresenter.formatMetricViewRes),
      total: listMetrics.total,
      metadata: {
        sortField: getMetricsReq.sortField,
        offset: getMetricsReq.offset,
        limit: getMetricsReq.limit,
      },
    };
    return res.status(HttpStatus.OK).send(resBody);
  }
}
