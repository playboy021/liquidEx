import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ButtonBridgeAssetsModal } from '../../common/button';

export default function BridgeAssetsModal({ closeModal, open, tokens }) {

    const [search, setSearch] = useState("");

    const searchFilter = (tokenName) => {
        return tokens[tokenName].originalSymbol.toLowerCase().includes(search.toLowerCase());
    }

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-30" onClose={() => { closeModal() }}>
                    <div className="fixed inset-0 bg-black/30 blur" aria-hidden="true" />

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-opacity-25 bg-gray-500" />
                    </Transition.Child>

                    <div className="fixed inset-0">

                        <div className="flex items-center justify-center min-h-full p-1 text-center">


                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >

                                <Dialog.Panel className="w-full max-w-md  p-5 mb-8 ml-1 mr-1 overflow-hidden text-left align-middle transition-all transform rounded-2xl lightBlueGlass" style={{
                                    minWidth: '380px',
                                    height: "530px",
                                    width: "380px",
                                    top: '100px'

                                    // height: "55vh",
                                    // width: "38vh"
                                }} >


                                    <Dialog.Title
                                        as="h1"
                                        className="mt-1 mb-4 text-xl font-bold text-white"
                                    >
                                        Select a Token
                                    </Dialog.Title>
                                    <input type='text' className='w-full p-3 pl-3 pr-3 rounded-lg mb-4 bridgeInputTransparentModal border-indigo-600 border text-white focus:border-indigo-600' placeholder='Input token name' onChange={(e) => setSearch(e.target.value)} />
                                    <div className="rounded-lg overflow-y-auto mb-4" style={{maxHeight: '300px'}}>
                                        <div className='rounded-lg bg-white bg-opacity-60 p-1 border_brdg'>

                                            <div className='rounded-lg'>
                                              
                                              {Object.keys(tokens).filter(searchFilter).map(function (tokenName) {
                                                    return (
                                                        <div key={tokenName} className='flex gap-1 m-1 rounded-lg' >

                                                            <ButtonBridgeAssetsModal onClick={() => { setSelectedToken(tokenName); setIsOpen(false);; setSearch('') }} className='w-full h-10 bg-opacity-0 border-indigo-600 text-indigo-800' >
                                                                <div className='inline-flex'>
                                                                    <img src={tokens[tokenName]?.logoUrl} width='32px' height='32px' alt='' />&nbsp;<div className='grid grid-cols-1 text-xs'><span className='tokenName_small'>{tokens[tokenName]?.name}</span><span>{tokens[tokenName]?.originalSymbol}</span></div>
                                                                </div>

                                                            </ButtonBridgeAssetsModal>
                                                        </div>

                                                    )
                                                })

                                                }

                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>

                            </Transition.Child>


                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}

  {/* {Object.keys(tokens).filter(searchFilter).map(function (tokenName) {
                                                    return (
                                                        <div key={tokenName} className='flex justify-start gap-1 mt-1 mb-1 rounded-md justify-items-start'>

                                                            <Button variant='filled' size='md' color='gray' fullWidth onClick={() => { setSelectedToken(tokenName); setIsOpen(false);; setSearch('') }} className=' brdg_modal_btn'>
                                                                <div className='inline-flex'>
                                                                    <img src={tokens[tokenName]?.logoUrl} width='28px' height='28px' alt='' />&nbsp;<div className='grid grid-cols-1'><span className='tokenName_small'>{tokens[tokenName]?.name}</span><span>{tokens[tokenName]?.originalSymbol}</span></div>
                                                                </div>

                                                            </Button>
                                                        </div>

                                                    )
                                                })

                                                } */}