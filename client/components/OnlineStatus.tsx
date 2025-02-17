type Props = {
    isConnected: boolean
}

function OnlineStatus({isConnected}:Props) {

  return (
    <div className='text-gray-900 text-sm flex justify-end px-2 pt-0.5'>
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-600' : 'bg-red-600'} `}></div>
        <div className={`${!isConnected && 'font-bold'}`}>{isConnected ? 'Online' : 'Offline'}</div>
    </div>
  )
}

export default OnlineStatus