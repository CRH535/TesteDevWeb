import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "sessao_usuario",
      JSON.stringify({
        id: 1,
        nome: "Chris",
        email: "chris@teste.com",
        horario: Date.now(),
      }),
    );
  });
});

test("anima o carrinho visualmente e respeita o cooldown", async ({ page }) => {
  const errosDeConsole = [];

  page.on("console", (mensagem) => {
    if (mensagem.type() === "error") {
      errosDeConsole.push(mensagem.text());
    }
  });

  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Bem-vindo, Chris! Sua jornada de compra comeca aqui\./,
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: /Moda/ }).click();
  await page.getByRole("button", { name: "Tenho interesse" }).click();

  const indicador = page.getByTestId("home-flying-cart");
  const carrinho = page.getByTestId("home-cart-anchor");

  await expect(indicador).toBeVisible();
  await expect(carrinho).toContainText("1");

  await page.getByRole("button", { name: "Tenho interesse" }).click();

  await expect(page.getByTestId("home-flying-cart")).toHaveCount(1);

  await page.waitForTimeout(850);
  await expect(page.getByTestId("home-flying-cart")).toHaveCount(0);

  await page.waitForTimeout(250);
  await page.getByRole("button", { name: "Tenho interesse" }).click();

  await expect(page.getByTestId("home-flying-cart")).toHaveCount(1);
  await expect(carrinho).toContainText("3");

  expect(errosDeConsole).toEqual([]);
});
