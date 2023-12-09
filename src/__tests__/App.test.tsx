import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouterAndProviders } from "./utils";
import App from "../App";
import { mswServer } from "./mocks/server";
import { matchesTasksHandlerError400, playersTasksHandlerError400, teamsTasksHandlerError400 } from "./mocks/handlers";

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

test("renders app successfully", () => {
  renderWithRouterAndProviders(<App />);
  const homePageHeading = screen.getByText(/Homepage/i);
  expect(homePageHeading).toBeInTheDocument();
});

test("fetches teams", async () => {
  renderWithRouterAndProviders(<App />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const productNameElement1 = await screen.findByText(/team name 1/i);
  expect(productNameElement1).toBeInTheDocument();

  const productNameElement2 = await screen.findByText(/team name 2/i);
  expect(productNameElement2).toBeInTheDocument();
});

test("fetches teams fails", async () => {
  mswServer.use(teamsTasksHandlerError400);
  renderWithRouterAndProviders(<App />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const errorMessage = await screen.findByText(
    /something went wrong/i
  );
  expect(errorMessage).toBeInTheDocument();
});

test("select a team and render content", async () => {
  renderWithRouterAndProviders(<App />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const selectTeam = await screen.findByText(/- select a team -/i);
  expect(selectTeam).toBeInTheDocument();
  
  const element = screen.getByTestId('select-team');
  expect(element).toBeInTheDocument();
  fireEvent.change(element, { target: { value: 1 } });

  const loadingPlayersText = screen.getByText(/loading players/i);
  expect(loadingPlayersText).toBeInTheDocument();

  const loadingMatchesTest = screen.getByText(/loading matches/i);
  expect(loadingMatchesTest).toBeInTheDocument();
 
  const playersTable = await screen.findByTestId('players-table');
  expect(playersTable).toBeInTheDocument();
 
  const matchesTable = await screen.findByTestId('matches-table');
  expect(matchesTable).toBeInTheDocument();
});

test("fetches content with error (matches fails)", async () => {
  mswServer.use(matchesTasksHandlerError400);
  renderWithRouterAndProviders(<App />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const selectTeam = await screen.findByText(/- select a team -/i);
  expect(selectTeam).toBeInTheDocument();
  
  const element = screen.getByTestId('select-team');
  expect(element).toBeInTheDocument();
  fireEvent.change(element, { target: { value: 1 } });

  const loadingPlayersText = screen.getByText(/loading players/i);
  expect(loadingPlayersText).toBeInTheDocument();

  const loadingMatchesTest = screen.getByText(/loading matches/i);
  expect(loadingMatchesTest).toBeInTheDocument();
 
  const playersTable = await screen.findByTestId('players-table');
  expect(playersTable).toBeInTheDocument();
 
  const matchesTable = document.querySelector('[data-testid="matches-table"]');
  expect(matchesTable).toBeNull();

  const matchesErrorText = await screen.findByText(/matches error/i);
  expect(matchesErrorText).toBeInTheDocument();
});

test("fetches content with error (players fails)", async () => {
  mswServer.use(playersTasksHandlerError400);
  renderWithRouterAndProviders(<App />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const selectTeam = await screen.findByText(/- select a team -/i);
  expect(selectTeam).toBeInTheDocument();
  
  const element = screen.getByTestId('select-team');
  expect(element).toBeInTheDocument();
  fireEvent.change(element, { target: { value: 1 } });

  const loadingPlayersText = screen.getByText(/loading players/i);
  expect(loadingPlayersText).toBeInTheDocument();

  const loadingMatchesTest = screen.getByText(/loading matches/i);
  expect(loadingMatchesTest).toBeInTheDocument();
 
  const playersTable = document.querySelector('[data-testid="players-table"]');
  expect(playersTable).toBeNull();
 
  const matchesTable = await screen.findByTestId('matches-table');
  expect(matchesTable).toBeInTheDocument();

  const playersErrorText = await screen.findByText(/players error/i);
  expect(playersErrorText).toBeInTheDocument();
});
