import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ButtonBridgeAssetsModal } from '../../common/button';
import { XIcon } from '@heroicons/react/solid';

export default function BridgeAssetsModal({ closeModal, open, tokens, setOpen, setSelectedToken }) {

    const [search, setSearch] = useState('');

    const searchFilter = (tokenName) => {
        return tokens[tokenName].originalSymbol.toLowerCase().includes(search.toLowerCase());
    }

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-30" onClose={() => { closeModal(), setSearch('') }}>
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

                                <Dialog.Panel className="w-full max-w-md  p-5 mb-8 ml-1 mr-1 overflow-hidden text-left align-middle transition-all transform rounded-2xl lightBlueGlass bridgeTokenSearchGlow" style={{
                                    minWidth: '380px',
                                    height: "505px",
                                    width: "380px",
                                    top: '100px'

                                    // height: "55vh",
                                    // width: "38vh"
                                }} >


                                    <Dialog.Title
                                        as="h1"
                                        className="mt-1 mb-4 text-xl font-bold text-white flex justify-between"
                                    >
                                        Select a Token
                                        <div className='flex cursor-pointer hover:opacity-50 items-center' onClick={() => {closeModal(), setSearch('')}}>
                                            <XIcon width='25px' height='25px'/>
                                        </div>
                                    </Dialog.Title>
                                    <input type='text' className='w-full p-3 pl-3 pr-3 rounded-lg mb-2 bridgeInputTransparentModal border-indigo-600 border text-white focus:border-indigo-600' placeholder='Input token name' onChange={(e) => setSearch(e.target.value)} />
                                    <div className='w-full p-3 pl-3 pr-3 rounded-lg mb-2 bridgeInputTransparentModal border-indigo-600 border text-white focus:border-indigo-600 text-center'>Popular tokens</div>
                                    <div className="rounded-lg overflow-y-auto mb-4" style={{maxHeight: '300px'}}>
                                        <div className='rounded-lg bg-white bg-opacity-50 p-1 border_brdg'>

                                            <div className='rounded-lg'>
                                              
                                              {Object.keys(tokens).filter(searchFilter).map(function (tokenName) {
                                                    return (
                                                        <div key={tokenName} className='flex gap-1 m-1 rounded-lg' >

                                                            <ButtonBridgeAssetsModal onClick={() => { setSelectedToken(tokenName); setOpen(false);; setSearch('') }} className='w-full h-10 bg-opacity-0 border-indigo-600 text-indigo-800' >
                                                                <div className='inline-flex'>
                                                                    <img src={tokens[tokenName]?.logoUrl} width='30px' height='30px' alt='' />&nbsp;<div className='grid grid-cols-1 text-xs'><span className='tokenName_small'>{tokens[tokenName]?.name}</span><span>{tokens[tokenName]?.originalSymbol}</span></div>
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
