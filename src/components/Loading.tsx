import loading from '../assets/black loading.gif'

export const Loading = ()=>{
    return <div className='flex h-screen items-center backdrop:blur-2xl justify-center'>
        <img className='h-10 w-10 text-black' src={loading} alt="loading..." />
    </div>
}
