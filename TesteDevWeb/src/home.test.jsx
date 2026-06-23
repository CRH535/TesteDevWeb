import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Home from "./home.jsx";

describe("Home", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

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
    expect(screen.getByText("Carrinho")).toBeInTheDocument();
    expect(screen.getByTestId("home-cart-anchor")).toHaveTextContent("1");
    expect(screen.getAllByText("Jaqueta Urban Style")).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: "Sair da conta" }));

    expect(localStorage.getItem("sessao_usuario")).toBeNull();
    expect(trocarPagina).toHaveBeenCalledWith("login");
  });

  it("anima o carrinho a partir do clique e respeita o cooldown de 1 segundo", () => {
    vi.useFakeTimers();

    localStorage.setItem(
      "sessao_usuario",
      JSON.stringify({
        id: 1,
        nome: "Chris",
        email: "chris@teste.com",
        horario: Date.now(),
      }),
    );

    render(<Home trocarPagina={vi.fn()} />);

    const ancoraCarrinho = screen.getByTestId("home-cart-anchor");
    const botaoInteresse = screen.getAllByRole("button", {
      name: "Tenho interesse",
    })[0];

    ancoraCarrinho.getBoundingClientRect = vi.fn(() => ({
      left: 1100,
      top: 30,
      width: 120,
      height: 56,
      right: 1220,
      bottom: 86,
      x: 1100,
      y: 30,
      toJSON: () => ({}),
    }));

    botaoInteresse.getBoundingClientRect = vi.fn(() => ({
      left: 220,
      top: 520,
      width: 160,
      height: 48,
      right: 380,
      bottom: 568,
      x: 220,
      y: 520,
      toJSON: () => ({}),
    }));

    fireEvent.click(botaoInteresse, { clientX: 260, clientY: 540 });

    expect(screen.getByTestId("home-flying-cart")).toBeInTheDocument();

    fireEvent.click(botaoInteresse, { clientX: 262, clientY: 542 });

    expect(screen.getAllByTestId("home-flying-cart")).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(screen.queryByTestId("home-flying-cart")).not.toBeInTheDocument();

    fireEvent.click(botaoInteresse, { clientX: 264, clientY: 544 });

    expect(screen.queryByTestId("home-flying-cart")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    fireEvent.click(botaoInteresse, { clientX: 266, clientY: 546 });

    expect(screen.getByTestId("home-flying-cart")).toBeInTheDocument();
  });
});
