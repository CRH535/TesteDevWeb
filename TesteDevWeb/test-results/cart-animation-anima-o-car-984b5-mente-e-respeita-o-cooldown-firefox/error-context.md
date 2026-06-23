# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart-animation.spec.js >> anima o carrinho visualmente e respeita o cooldown
- Location: e2e\cart-animation.spec.js:17:1

# Error details

```
TimeoutError: browserType.launch: Timeout 180000ms exceeded.
Call log:
  - <launching> C:\Users\Chris\AppData\Local\ms-playwright\firefox-1532\firefox\firefox.exe -no-remote -headless -profile C:\Users\Chris\AppData\Local\Temp\playwright_firefoxdev_profile-2NKDfV -juggler-pipe -silent
  - <launched> pid=22996
  - [pid=22996][err] *** You are running in headless mode.
  - [pid=22996][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=1.94313) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt

```