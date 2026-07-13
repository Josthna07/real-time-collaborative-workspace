function DataTable({
  children,
}) {

  return (

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      <table className="w-full">

        {children}

      </table>

    </div>

  );

}

export default DataTable;