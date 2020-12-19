import { Response } from 'express';
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddDistanceMetricDto, AddTemperatureMetricDto } from "./metric.dto";
import { MetricService } from "./metric.service";
import { AddMetricViewReq, MetricViewRes } from './metric.type';
import { MetricType } from './metric.enum';
import { ISingleRes } from '../shared/response';
import { MetricPresenter } from './metric.presenter';

@Controller('metrics')
@ApiTags('metrics')
@ApiBearerAuth()
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post('/distance')
  @ApiOperation({ summary: 'Add distance metric' })
  public async addDistance(
    @Body() body: AddDistanceMetricDto,
    @Res() res: Response,
  ) {
    const addMetricReq = new AddMetricViewReq(
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

    return res.status(HttpStatus.OK).send(resBody);
  }

  @Post('/temperature')
  @ApiOperation({ summary: 'Add temperature metric' })
  public async addTemperature(
    @Body() body: AddTemperatureMetricDto,
    @Res() res: Response,
  ) {
    const addMetricReq = new AddMetricViewReq(
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

    return res.status(HttpStatus.OK).send(resBody);
  }
}