import { rest } from "msw";
import { MatchModelType, PlayerModelType, TeamModelType } from "../../../types";

const mockTeams: TeamModelType[] = [
  {
    team_key: '1',
    team_name: "team name 1",
    team_badge: "team_badge_1.png",
    team_country: "Argentina",
    team_founded: 1900
  },
  {
    team_key: '2',
    team_name: "team name 2",
    team_badge: "team_badge_2.png",
    team_country: "Argentina",
    team_founded: 1901
  },
];

const mockMatches: MatchModelType[] = [
  {
    match_id: '1',
    country_id: 1,
    country_name: 'name',
    league_id: 1,
    league_name: 'league',
    match_date: (new Date()).toLocaleString(),
    match_status: 'Finished',
    match_time: '90:00',
    match_hometeam_id: 1,
    match_hometeam_name: 'hometeam1',
    match_hometeam_score: 0,
    match_awayteam_name: 'awayteam2',
    match_awayteam_id: 2,
    match_awayteam_score: 2
  },
  {
    match_id: '2',
    country_id: 1,
    country_name: 'name',
    league_id: 1,
    league_name: 'league',
    match_date: (new Date()).toLocaleString(),
    match_status: 'Finished',
    match_time: '90:00',
    match_hometeam_id: 1,
    match_hometeam_name: 'awayteam3',
    match_hometeam_score: 0,
    match_awayteam_name: 'hometeam1',
    match_awayteam_id: 2,
    match_awayteam_score: 2
  },
];

const mockPlayers: PlayerModelType[] = [
  {
    player_id: "1",
    player_key: 1,
    player_image: "image.png",
    player_name: "player name 1",
    player_number: "22",
    player_country: "Argentina",
    player_type: "type",
    player_age: "22",
    player_birthdate: "11/11/1911",
    team_key: 1,
  },
  {
    player_id: "2",
    player_key: 2,
    player_image: "image.png",
    player_name: "player name 2",
    player_number: "22",
    player_country: "Argentina",
    player_type: "type",
    player_age: "22",
    player_birthdate: "11/11/1911",
    team_key: 1,
  },
];

const indexTeamsUrl = `${process.env.REACT_APP_API_HOST}/teams`;
const indexMatchesUrl = `${process.env.REACT_APP_API_HOST}/teams/:id/matches`;
const indexPlayersUrl = `${process.env.REACT_APP_API_HOST}/teams/:id/players`;

const indexTeamHandler = rest.get(indexTeamsUrl, async (req, res, ctx) =>
  res(ctx.json({ data: mockTeams }))
);
const indexMatchesHandler = rest.get(indexMatchesUrl, async (req, res, ctx) =>
  res(ctx.json({ data: mockMatches }))
);
const indexPlayersHandler = rest.get(indexPlayersUrl, async (req, res, ctx) =>
  res(ctx.json({ data: mockPlayers }))
);

export const teamsTasksHandlerError400 = rest.get(
  indexTeamsUrl,
  async (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: "Something went wrong" }))
);

export const matchesTasksHandlerError400 = rest.get(
  indexMatchesUrl,
  async (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: "Something went wrong" }))
);

export const playersTasksHandlerError400 = rest.get(
  indexPlayersUrl,
  async (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: "Something went wrong" }))
);

export const teamsTasksHandlerException = rest.get(
  indexTeamsUrl,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: "Something went wrong" }))
);

export const teamsTasksHandlerValidationError = rest.get(
  indexTeamsUrl,
  async (req, res, ctx) =>
    res(
      ctx.status(412),
      ctx.json({
        message: "Validation errors",
        errors: [{ field: "some-field", message: "some-error" }],
      })
    )
);

export const handlers = [indexTeamHandler, indexMatchesHandler, indexPlayersHandler];