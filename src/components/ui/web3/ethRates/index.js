import { useEthPrice, coursePrice } from "@/components/hooks/useEthPrice"
import Image from "next/image"
import { Loader } from "../../common"

export default function EthRates() {
  const data = useEthPrice()

  return (
    <div className="flex flex-col xs:flex-row justify-evenly my-4">
      <div className="flex items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-lg glow-on-hover border-indigo-200">
          <div className='flex items-center'>
            { data['eth'].data ? 
              <> 
                <Image
                  layout="fixed"
                  width={35}
                  height={35}
                  src='/small-eth.webp'
                />
                <span className="text-2xl font-bold"> = {data['eth'].data}$</span>
              </>
              :
              <div className="grid grid-cols-5"><div className="col-start-3"><Loader /></div></div>
            }
          </div>
          <p className="text-md text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-lg glow-on-hover border-indigo-200 bg-white">
          <div className='flex items-center'>
            { data['eth'].data ?
              <>
                <span className="text-2xl font-bold">
                  {data['eth'].perItem}
                </span>
                <Image
                  layout="fixed"
                  width={35}
                  height={35}
                  src='/small-eth.webp'
                />
                <span className='text-2xl font-bold'>
                  = {coursePrice}$
                </span>
              </> :
              <div className="grid grid-cols-5"><div className="col-start-3"><Loader /></div></div>
            }
          </div>
          <p className="text-md text-gray-500">Price per Item</p>
        </div>
      </div>
    </div>
  )
}
