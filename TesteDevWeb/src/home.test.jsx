import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Home from "./home.jsx";

describe("Home", () => {
  it("mantem a nova jornada da home funcional e permite logout", async () => {
    localStorage.setItem(
      "sessao_usuario",
      JSON.stringify({
        id: 1,
        nome: "Chris",
        email: "chris@teste.com",
        horario: Date.now(),
      }),
    );

    const trocarPagina = vi.fn();
    const user = userEvent.setup();

    render(<Home trocarPagina={trocarPagina} />);

    expect(
      screen.getByRole("heading", {
        name: /Bem-vindo, Chris! Sua jornada de compra comeca aqui\./,
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /Moda/,
      }),
    );

    expect(screen.getByText("Categoria atual:")).toBeInTheDocument();
    expect(screen.getByText("Jaqueta Urban Style")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Tenho interesse",
      }),
    );

    expect(screen.getByText("Interesses")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getAllByText("Jaqueta Urban Style")).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: "Sair da conta" }));

    expect(localStorage.getItem("sessao_usuario")).toBeNull();
    expect(trocarPagina).toHaveBeenCalledWith("login");
  });
});
