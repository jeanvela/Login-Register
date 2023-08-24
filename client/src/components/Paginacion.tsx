import { useState } from 'react';

interface Pros {
    page: number
    setPage: (number: number) => void
    max: number
}

const Paginacion = ({page, setPage, max}: Pros) => {
    const [input, setInput] = useState(1)

    const nextPage = () => {
        setInput(input + 1)
        setPage(page + 1)
    }

    const previousPage = () => {
        setInput(input - 1)
        setPage(page - 1)
    }

  return (
    <div className='flex items-center justify-center gap-x-4 mt-4'>
        <button disabled={page === 1 || page < 1} onClick={previousPage} className='bg-black border-none py-1 px-3.5 rounded-sm h-8 flex justify-center items-center cursor-pointer font-bold text-xl'>{`<`}</button>
        <p>{input}</p>
        <p>of {max}</p>
        <button disabled={page === Math.ceil(max) || page > Math.ceil(max)} onClick={nextPage} className='bg-black border-none py-1 px-3.5 rounded-sm h-8 flex justify-center items-center cursor-pointer font-bold text-xl'>{`>`}</button>
    </div>
  )
}

export default Paginacion
