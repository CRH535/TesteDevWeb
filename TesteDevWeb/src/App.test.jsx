import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { fazerHashDaSenha } from "./AuthContext.jsx";
import { App } from "./main.jsx";

describe("App", () => {
  it("redireciona para a nova home apos login bem-sucedido", async () => {
    localStorage.setItem(
      "lista_usuarios",
      JSON.stringify([
        {
          id: 1,
          nome: "Chris",
          email: "chris@teste.com",
          senha: fazerHashDaSenha("senha123"),
        },
      ]),
    );

    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText("E-mail"), "chris@teste.com");
    await user.type(screen.getByLabelText("Senha"), "senha123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(
      screen.getByRole("heading", {
        name: "Pagina inicial do e-commerce",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Bem-vindo, Chris! Sua jornada de compra comeca aqui\./,
      }),
    ).toBeInTheDocument();
  });
});
