"""
Iteration 6 - Comprehensive Final QA persistent script.
Run with the browser automation tool. Preserved for regression rerun.

Sections:
  1. Full 60s real-time ceremony run: records every countdown number 60..0,
     all scene-message-s0..s19 transitions, verifies celebration + coming-soon.
  2. Double-tap protection: second tap after start must NOT re-trigger.
  3. Storage bug resilience: preseeded legacy keys and storage-throwing.
  4. Audio: oscillator instrumentation (expect 4 at zero, 0 before).
  5. Reload from any phase returns to idle.
  6. Responsive viewports: 1920x1080, 1440x900, 1366x768, 820x1180, 430x932, 390x844.
  7. Optional image failure: abort /photo-1544984243.../ and verify ceremony continues.

Outputs are written to:
  /app/frontend/tests/iteration_6_run.json
  /app/frontend/tests/iteration_6_viewports.json

Assets checked separately with curl (see iteration_6 report).
"""
