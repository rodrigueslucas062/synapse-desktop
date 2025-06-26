export const ToDo = () => {
  return (
    <div className="flex gap-4 w-full p-4 overflow-x-auto">
      {/* Coluna: A Fazer */}
      <div className="flex-1 min-w-[300px] bg-slate-100 rounded-2xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">A Fazer</h2>
        {/* Itens de tarefa aqui */}
        <div className="space-y-2">
          <div className="bg-white p-3 rounded-lg shadow-sm">Tarefa 1</div>
          <div className="bg-white p-3 rounded-lg shadow-sm">Tarefa 2</div>
        </div>
      </div>

      {/* Coluna: Em Andamento */}
      <div className="flex-1 min-w-[300px] bg-yellow-100 rounded-2xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">
          Em Andamento
        </h2>
        <div className="space-y-2">
          <div className="bg-white p-3 rounded-lg shadow-sm">Tarefa 3</div>
        </div>
      </div>

      {/* Coluna: Concluídas */}
      <div className="flex-1 min-w-[300px] bg-green-100 rounded-2xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          Concluídas
        </h2>
        <div className="space-y-2">
          <div className="bg-white p-3 rounded-lg shadow-sm line-through text-gray-500">
            Tarefa 4
          </div>
        </div>
      </div>
    </div>
  );
};
