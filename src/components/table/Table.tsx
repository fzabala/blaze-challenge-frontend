import "./Table.scss";

type TableType = {
  headers: string[];
  rows: string[][];
}

export const Table = ({headers, rows, ...props}: TableType) => {
  return <table className="Table" {...props}>
      <thead>
        <tr>
          {headers.map((header, indexHeader) => <th key={`th-${indexHeader}`}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, indexRow) => (
          <tr key={`tr-${indexRow}`}>
            {row.map((cell, indexCell) => <td key={`td-${indexCell}`}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
};