import { Test, TestingModule } from '@nestjs/testing';
import { UpperOneLetterService } from './upper-one-letter.service';

describe('UpperOneLetterService', () => {
  let service: UpperOneLetterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpperOneLetterService],
    }).compile();

    service = module.get<UpperOneLetterService>(UpperOneLetterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
