import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsDefined } from 'class-validator';
import { FormatMetricDto } from '../metric/metric.dto';

export class GetMetricChartDto extends FormatMetricDto {
  @ApiProperty({
    type: String,
    example: 'user_1',
    description: 'User id',
  })
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty({ example: new Date('2020-12-01').toISOString() })
  @IsDate({ message: 'Invalid from' })
  @Type(() => Date)
  from: Date;

  @ApiProperty({ example: new Date('2020-12-31').toISOString() })
  @IsDate({ message: 'Invalid to' })
  @Type(() => Date)
  to: Date;
}
