import { TestBed } from '@angular/core/testing';
import {LoaderService, LoaderState} from './loader.service';
import { take } from 'rxjs/operators';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
    service = TestBed.get(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loader', (done: DoneFn) => {
    service.loaderState.pipe(take(1)).subscribe((state: LoaderState) => {
      expect(state.show).toBe(true);
      done();
    });

    service.show();
  });

  it('should hide loader', (done: DoneFn) => {
    service.loaderState.pipe(take(1)).subscribe((state: LoaderState) => {
      expect(state.show).toBe(false);
      done();
    });

    service.hide();
  });

  it('should toggle loader state', (done: DoneFn) => {
    service.loaderState.pipe(take(2)).subscribe((state: LoaderState) => {
      if (state.index === 0) {
        expect(state.show).toBe(true);
        service.hide();
      } else {
        expect(state.show).toBe(false);
        done();
      }
    });

    service.show();
  });
});
