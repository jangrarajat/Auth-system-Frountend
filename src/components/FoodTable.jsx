import React from 'react'

function FoodTable({foods}) {
  return (
    <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-indigo-600 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Serving</th>
                <th className="px-6 py-3">Calories</th>
                <th className="px-6 py-3">Protein (g)</th>
              </tr>
            </thead>
            <tbody>
              {
                foods && foods?.map((food, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50">
                    <td className="px-6 py-4">{food.id}</td>
                    <td className="px-6 py-4">{food.name}</td>
                    <td className="px-6 py-4">{food.serving}</td>
                    <td className="px-6 py-4">{food.calories}</td>
                    <td className="px-6 py-4 text-green-400 font-semibold">{food.protein_g}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
  )
}

export default FoodTable
