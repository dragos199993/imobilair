import React from 'react'

export const Template = () => {
  return (
    <div className="mx-auto w-full max-w-lg cursor-pointer rounded-lg bg-gradient-to-br from-teal-100 via-teal-300 to-teal-500 px-10 py-8 shadow-xl">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-bold text-2xl">Model invitatie 1</h1>
        <p className="text-gray-600">Mihai si Margareta</p>
        <div className="text-base leading-7">
          <p className="font-medium text-gray-700">13.06.2021, ora 14:00</p>
        </div>
      </div>
    </div>
  )
}
