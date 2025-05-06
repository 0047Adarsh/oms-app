// components/DataTable.js
import '@/styles/OrderTable.css';

export default function DataTable({ columns, data, onStatusUpdate }) {
  return (
    <div className="order-table-container">
      <table className="order-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j} data-label={col.header}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
              <td data-label="Action">
                <button
                  onClick={() => onStatusUpdate?.(row)}
                  className="order-action-btn"
                >
                  🔄 Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}