import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Login from "./Login.jsx";

describe("Login", () => {
  it("mantem o cadastro funcional e retorna para o login apos sucesso", async () => {
    const user = userEvent.setup();

    render(<Login trocarPagina={vi.fn()} />);

    await user.click(screen.getByText("Criar conta"));
    await user.type(screen.getByLabelText("Nome completo"), "Chris Dev");
    await user.type(screen.getByLabelText("E-mail"), "novo@teste.com");
    await user.type(screen.getByLabelText("Senha"), "senha123");
    await user.type(screen.getByLabelText("Confirmar senha"), "senha123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(screen.getByText(/Conta criada com sucesso!/)).toBeInTheDocument();

    const usuariosSalvos = JSON.parse(localStorage.getItem("lista_usuarios"));
    expect(usuariosSalvos).toHaveLength(1);
    expect(usuariosSalvos[0].email).toBe("novo@teste.com");

    await waitFor(
      () => {
        expect(
          screen.getByRole("heading", {
            name: "Entrar",
          }),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  }, 8000);
});
