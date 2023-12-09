import { ChangeEvent, useEffect, useState } from "react";
import "./Home.page.scss";
import { Table } from "../../components";
import { fetchMatches, fetchPlayers, fetchTeams, useAppDispatch, useAppSelector } from "../../store";
import { format } from "date-fns";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const { teams, loading: loadingTeam, fetchError: fetchErrorTeam } = useAppSelector(
    (store) => store.team
  );

  const { players, loading: loadingPlayers, fetchError: fetchErrorPlayers } = useAppSelector(
    (store) => store.player
  );

  const { matches, loading: loadingMatches, fetchError: fetchErrorMatches } = useAppSelector(
    (store) => store.match
  );

  const [selectedTeam ,setSelectedTeam] = useState<number | undefined>(undefined);
  const [matchesRows ,setMatchesRows] = useState<string[][]>([]);
  const [playersRows ,setPlayersRows] = useState<string[][]>([]);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);
  
  useEffect(() => {
    if(selectedTeam){
      dispatch(fetchPlayers({teamId: selectedTeam}));
      dispatch(fetchMatches({teamId: selectedTeam}));
    }
  }, [selectedTeam, dispatch]);

  const matchesHeaders = ['Date', 'Home team', 'Score', 'Away team'];
  useEffect(() => {
    const matchesRows = matches.map(match => {
      return [
        format(new Date(match.match_date), 'dd/MM/yyyy'),
        match.match_hometeam_name,
        `${match.match_hometeam_score} - ${match.match_awayteam_score}`,
        match.match_awayteam_name,
      ];
    })
    setMatchesRows(matchesRows);
  }, [matches]);

  const playersHeaders = ['Name', 'Number', 'Type'];
  useEffect(() => {
    const playersRows = players.map(player => {
      return [
        player.player_name,
        player.player_number,
        player.player_type,
      ];
    })
    setPlayersRows(playersRows);
  }, [players])

  const onSelectTeamChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(Number(e.target.value));
  }

  const renderContent = () => {
    if (fetchErrorTeam) {
      return <div className="ErrorWrapper">
        <p>Error {fetchErrorTeam.message}</p>
          {fetchErrorTeam.errors && <>
          <p>Fields with errors</p>
          <ul>
            {fetchErrorTeam.errors.map(e => <li key={`error-field-${e.field}`}>{e.field}: {e.message}</li>)}
          </ul>
          </>}
        </div>;
    }

    if (loadingTeam) {
      return <p>Loading</p>;
    }

    return <div>
      <section>
        <label htmlFor="select-team">Teams</label>
        <select data-testid="select-team" id="select-team" value={selectedTeam} onChange={(onSelectTeamChangeHandler)}>
            <option value="0">- Select a team -</option>
            {teams.map(team => <option key={`team-${team.team_key}`} value={team.team_key}>{team.team_name}</option>)}
        </select>
      </section>
      {!!selectedTeam && (
        <div className="main-wrapper">
          <section>
            <h3>Players</h3>
            {loadingPlayers && <p>Loading players...</p>}
            {!loadingPlayers && !fetchErrorPlayers && (<Table data-testid="players-table" headers={playersHeaders} rows={playersRows} />)}
            {!loadingPlayers && fetchErrorPlayers && (<p>Players error: {fetchErrorPlayers.message}</p>)}
          </section>
          <section>
            <h3>Matches</h3>
            {loadingMatches && <p>Loading matches...</p>}
            {!loadingMatches && !fetchErrorMatches && (<Table data-testid="matches-table" headers={matchesHeaders} rows={matchesRows} />)}
            {!loadingMatches && fetchErrorMatches && (<p>Matches error: {fetchErrorMatches.message}</p>)}
          </section>
        </div>
      )}
      </div>;
  };

  return (
    <div className="HomePage">
      <main>
        {renderContent()}
      </main>
    </div>
  );
};