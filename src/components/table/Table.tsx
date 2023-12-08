import "./Table.scss";

type TableType = {
  headers: string[];
  rows: string[][];
}

export const Table = ({headers, rows}: TableType) => {
  return <table className="Table">
      <thead>
        <tr>
          {headers.map(header => <th>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr>
            {row.map(cell => <td>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
};