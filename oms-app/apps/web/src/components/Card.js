// export default function Card({ title, children }) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">{title}</h2>
//         {children}
//       </div>
//     );
//   }


export default function Card({ title = '', children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}