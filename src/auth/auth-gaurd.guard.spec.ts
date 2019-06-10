import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGaurdGuard } from './auth-gaurd.guard';

describe('AuthGaurdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGaurdGuard]
    });
  });

  it('should ...', inject([AuthGaurdGuard], (guard: AuthGaurdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
