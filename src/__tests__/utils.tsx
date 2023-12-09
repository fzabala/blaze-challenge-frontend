import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "../store";
import { teamSlice, matchSlice, playerSlice } from "../store";
import { BrowserRouter } from "react-router-dom";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

interface RenderWithRouterAndProvidersOptions {
  route?: string;
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { team: teamSlice.reducer, match: matchSlice.reducer, player: playerSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = "/" } = {}
) => {
  window.history.pushState({}, "", route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export function renderWithRouterAndProviders(
  ui: React.ReactElement,
  {
    route = "/",
    preloadedState = {},
    store = configureStore({
        reducer: { team: teamSlice.reducer, match: matchSlice.reducer, player: playerSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  }: RenderWithRouterAndProvidersOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  window.history.pushState({}, "", route);

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}